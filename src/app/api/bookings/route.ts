import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
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
      guest_name,
      guest_email,
      guest_phone,
      special_requests,
    } = body;

    // Validate required fields
    if (!room_slug || !check_in || !check_out || !guest_name || !guest_email || !guest_phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Find room data
    const roomData = rooms.find((r) => r.slug === room_slug);
    if (!roomData) return NextResponse.json({ error: "Room not found" }, { status: 400 });

    // Validate dates
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }
    const nights = Math.round((checkOutDate.getTime() - checkInDate.getTime()) / 86400000);

    // Validate extra guests
    const extraGuests = Number(extra_guests) || 0;
    if (extraGuests > roomData.maxExtraGuests) {
      return NextResponse.json({ error: `Max ${roomData.maxExtraGuests} extra guests for this room` }, { status: 400 });
    }

    // Calculate totals
    const isAc = room_type === "ac" && roomData.hasAcOption;
    const ratePerNight = isAc ? roomData.basePaxRate + roomData.acSurcharge : roomData.basePaxRate;
    const extraFee = extraGuests * 500 * nights;
    const grandTotal = ratePerNight * nights + extraFee;
    const adultGuests = roomData.standardGuests + extraGuests;

    const supabase = await createClient();

    // Get room ID from Supabase
    const { data: roomRow, error: roomError } = await supabase
      .from("rooms")
      .select("id")
      .eq("slug", room_slug)
      .eq("property_id", "cielo")
      .single();

    if (roomError || !roomRow) {
      return NextResponse.json({ error: "Room not found in database. Please run migration 009." }, { status: 500 });
    }

    const reference = generateReference();

    // Insert booking
    const { error: bookingError } = await supabase.from("bookings").insert({
      reference,
      room_id: roomRow.id,
      property_id: "cielo",
      guest_name: guest_name.trim(),
      guest_email: guest_email.trim().toLowerCase(),
      guest_phone: guest_phone.trim(),
      check_in,
      check_out,
      adult_guests: adultGuests,
      grand_total: grandTotal,
      status: "awaiting_payment",
      special_requests: special_requests?.trim() || null,
      // Store AC info in a notes field if available, otherwise just in the total
    });

    if (bookingError) {
      console.error("Booking insert error:", bookingError);
      return NextResponse.json({ error: "Failed to create booking. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ reference, grand_total: grandTotal }, { status: 201 });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
