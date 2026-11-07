import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { rooms } from "@/data/resort";

function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "CA-"; // CA = Cielo Alto
  for (let i = 0; i < 8; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      room_slug,
      room_type,
      check_in,
      check_out,
      extra_guests,
      child_guests,
      guest_name,
      guest_email,
      guest_phone,
      special_requests,
      client_request_id,
    } = body;

    // Validate required fields
    if (!room_slug || !check_in || !check_out || !guest_name || !guest_phone) {
      return NextResponse.json(
        { error: "Missing required fields: room, dates, name, or phone." },
        { status: 400 }
      );
    }

    // Find local fallback room data for rules & metadata
    const roomData = rooms.find((r) => r.slug === room_slug);
    if (!roomData) {
      return NextResponse.json({ error: "Selected room not found." }, { status: 400 });
    }

    // Validate dates
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime()) || checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "Check-out date must be after check-in date." },
        { status: 400 }
      );
    }

    const nights = Math.max(
      1,
      Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    );

    const supabase = createAdminClient();

    // 1. Get room and dynamic pricing from DB (filter by property_id='cielo')
    let { data: roomRow, error: roomError } = await supabase
      .from("rooms")
      .select("id, name, slug, regular_rate, ac_surcharge, standard_guests, max_extra_guests, is_active")
      .eq("slug", room_slug)
      .eq("property_id", "cielo")
      .single();

    if (roomError || !roomRow) {
      // Fallback query by slug if property_id was omitted
      const { data: anyRoom } = await supabase
        .from("rooms")
        .select("id, name, slug, regular_rate, ac_surcharge, standard_guests, max_extra_guests, is_active")
        .eq("slug", room_slug)
        .single();
      roomRow = anyRoom;
    }

    if (!roomRow) {
      console.error("Room lookup failed for slug:", room_slug);
      return NextResponse.json(
        { error: `Room configuration for '${roomData.name}' is currently unavailable.` },
        { status: 404 }
      );
    }

    // Fetch live resort settings for extra person fee
    const { data: settingsRow } = await supabase
      .from("resort_settings")
      .select("extra_person_fee")
      .or("property_id.eq.cielo,id.eq.2")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();

    const extraPaxFee = Number(settingsRow?.extra_person_fee) || 500;

    // Validate extra guests against dynamic DB limits
    const maxAllowedExtra =
      typeof roomRow.max_extra_guests === "number"
        ? roomRow.max_extra_guests
        : roomData.maxExtraGuests;

    const standardGuestsCount =
      typeof roomRow.standard_guests === "number"
        ? roomRow.standard_guests
        : roomData.standardGuests;

    const extraGuestsCount = Number(extra_guests) || 0;
    if (extraGuestsCount > maxAllowedExtra) {
      return NextResponse.json(
        { error: `Maximum ${maxAllowedExtra} extra guests allowed for ${roomRow.name || roomData.name}.` },
        { status: 400 }
      );
    }

    const childGuestsCount = Number(child_guests) || 0;

    // Calculate rates and totals using live DB prices
    const basePaxRate =
      typeof roomRow.regular_rate === "number" && roomRow.regular_rate > 0
        ? roomRow.regular_rate
        : roomData.basePaxRate;

    const acSurcharge =
      typeof roomRow.ac_surcharge === "number" && roomRow.ac_surcharge > 0
        ? roomRow.ac_surcharge
        : roomData.acSurcharge;

    const isAc = room_type === "ac" && roomData.hasAcOption;
    const ratePerNight = isAc ? basePaxRate + acSurcharge : basePaxRate;
    const roomTotal = ratePerNight * nights;
    const extraPersonTotal = extraGuestsCount * extraPaxFee * nights;
    const grandTotal = roomTotal + extraPersonTotal;
    const adultGuests = standardGuestsCount + extraGuestsCount;

    // 2. Idempotency Check if client_request_id provided
    const requestId = client_request_id || crypto.randomUUID();
    if (client_request_id) {
      const { data: existing } = await supabase
        .from("bookings")
        .select("id, reference, grand_total")
        .eq("client_request_id", client_request_id)
        .single();

      if (existing) {
        return NextResponse.json(
          {
            id: existing.id,
            reference: existing.reference,
            grand_total: existing.grand_total,
          },
          { status: 200 }
        );
      }
    }

    // 3. Generate guest access token and unique reference
    const reference = generateReference();
    const rawToken = crypto.randomBytes(32).toString("hex");
    const guestAccessTokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

    const email = guest_email?.trim()
      ? guest_email.trim().toLowerCase()
      : `${reference.toLowerCase()}@cieloaltoplace.local`;

    const coolingNote = isAc ? "AC (+₱500/night)" : "Fan Room";
    const formattedSpecialRequests = special_requests?.trim()
      ? `${special_requests.trim()} [Cooling: ${coolingNote}]`
      : `[Cooling: ${coolingNote}]`;

    // 4. Insert booking with full DB schema snapshot fields
    const { data: insertedBooking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        reference,
        room_id: roomRow.id,
        property_id: "cielo",
        client_request_id: requestId,
        guest_access_token_hash: guestAccessTokenHash,
        guest_name: guest_name.trim(),
        guest_email: email,
        guest_phone: guest_phone.trim(),
        check_in,
        check_out,
        adult_guests: adultGuests,
        child_guests: childGuestsCount,
        nights,
        regular_rate_snapshot: ratePerNight,
        discount_percentage_snapshot: 0,
        discounted_rate_snapshot: ratePerNight,
        extra_person_fee_snapshot: extraPaxFee,
        security_deposit_snapshot: 0,
        room_total: roomTotal,
        extra_person_total: extraPersonTotal,
        grand_total: grandTotal,
        payment_option: "full",
        amount_due_now: grandTotal,
        remaining_balance: 0,
        status: "awaiting_payment",
        special_requests: formattedSpecialRequests,
      })
      .select("id, reference, grand_total")
      .single();

    if (bookingError) {
      console.error("Booking insert error:", bookingError);
      return NextResponse.json(
        { error: bookingError.message || "Failed to create booking. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        id: insertedBooking.id,
        reference: insertedBooking.reference,
        grand_total: insertedBooking.grand_total,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Booking API unexpected error:", err);
    return NextResponse.json(
      { error: err?.message || "Server error. Please try again." },
      { status: 500 }
    );
  }
}
