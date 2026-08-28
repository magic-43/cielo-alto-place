import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    const formData = await req.formData();
    const proofFile = formData.get("proofFile") as File | null;
    const paymentMethod = (formData.get("paymentMethod") as string) || "gcash";
    const amountClaimedRaw = formData.get("amountClaimed");

    if (!proofFile) {
      return NextResponse.json(
        { error: "Payment proof file is required." },
        { status: 400 }
      );
    }

    if (proofFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    const allowedTypes: Record<string, string> = {
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/webp": "webp",
      "application/pdf": "pdf",
    };

    const fileExt = allowedTypes[proofFile.type];
    if (!fileExt) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, and PDF files are accepted." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // 1. Fetch booking by reference
    const { data: booking, error: bookingErr } = await supabase
      .from("bookings")
      .select("id, reference, status, grand_total")
      .eq("reference", reference)
      .single();

    if (bookingErr || !booking) {
      return NextResponse.json({ error: "Booking not found." }, { status: 404 });
    }

    // 2. Upload file to Supabase storage bucket 'payment-proofs'
    const fileName = `cielo-${reference}-${Date.now()}.${fileExt}`;
    const filePath = `receipts/${fileName}`;

    const { error: uploadErr } = await supabase.storage
      .from("payment-proofs")
      .upload(filePath, proofFile, {
        contentType: proofFile.type,
        upsert: true,
      });

    if (uploadErr) {
      console.error("Payment proof upload failed:", uploadErr);
      return NextResponse.json(
        { error: "Failed to upload receipt file to storage." },
        { status: 500 }
      );
    }

    const amountClaimed =
      amountClaimedRaw ? parseFloat(amountClaimedRaw as string) : booking.grand_total;

    // 3. Insert record into payment_submissions table
    const { error: submissionErr } = await supabase
      .from("payment_submissions")
      .insert({
        booking_id: booking.id,
        payment_method: paymentMethod,
        amount_claimed: amountClaimed,
        proof_storage_path: filePath,
        status: "pending_review",
      });

    if (submissionErr) {
      console.error("Submission insert failed:", submissionErr);
      return NextResponse.json(
        { error: "Failed to log payment submission in database." },
        { status: 500 }
      );
    }

    // 4. Update booking status to pending_review
    await supabase
      .from("bookings")
      .update({ status: "pending_review" })
      .eq("id", booking.id);

    return NextResponse.json({
      success: true,
      reference: booking.reference,
      message: "Payment proof uploaded and submitted for review.",
    });
  } catch (err) {
    console.error("Payment proof submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during submission." },
      { status: 500 }
    );
  }
}
