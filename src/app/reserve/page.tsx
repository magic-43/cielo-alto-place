"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Wind, Thermometer, Users, Check } from "lucide-react";
import { rooms } from "@/data/resort";
import type { RoomType } from "@/data/resort";

// ─── Types ───────────────────────────────────────────────────
type BookingState = {
  step: number;
  room: RoomType | null;
  roomType: "fan" | "ac";
  checkIn: string;
  checkOut: string;
  extraGuests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
};

// ─── Step indicator ─────────────────────────────────────────
function StepBar({ step }: { step: number }) {
  const steps = ["Choose Room", "Dates & Guests", "Your Info", "Review & Pay"];
  return (
    <div className="flex items-center justify-center gap-2 mb-8 px-2">
      {steps.map((label, idx) => {
        const num = idx + 1;
        const active = step === num;
        const done = step > num;
        return (
          <div key={label} className="flex items-center">
            <div className={`flex flex-col items-center ${idx < steps.length - 1 ? "mr-2" : ""}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                  done ? "bg-[#2d6a2d] text-white" : active ? "bg-[#2d6a2d] text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
                {done ? <Check className="w-4 h-4" /> : num}
              </div>
              <span className={`text-[10px] mt-1 font-medium whitespace-nowrap hidden sm:block ${active ? "text-[#2d6a2d]" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-[2px] w-6 sm:w-12 mr-2 ${done ? "bg-[#2d6a2d]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── STEP 1: Choose Room ─────────────────────────────────────
function StepChooseRoom({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">Choose Your Room</h2>
      <p className="text-[16px] text-gray-600">All rooms include free breakfast. Fan or AC selection comes next.</p>
      <div className="grid grid-cols-1 gap-4">
        {rooms.map((room) => {
          const selected = booking.room?.slug === room.slug;
          return (
            <button
              key={room.slug}
              onClick={() => setBooking({ ...booking, room, roomType: room.hasAcOption ? "fan" : "fan" })}
              className={`w-full text-left flex gap-4 p-4 rounded-2xl border-2 transition-all ${
                selected ? "border-[#2d6a2d] bg-[#2d6a2d]/5" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                <Image src={room.heroImage} alt={room.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-[17px] font-bold text-gray-900">{room.name}</h3>
                  {selected && (
                    <div className="w-5 h-5 bg-[#2d6a2d] rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-[14px] text-gray-500 leading-snug mt-0.5">{room.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[13px] font-bold text-[#2d6a2d]">₱{room.basePaxRate.toLocaleString()}/night</span>
                  {room.hasAcOption && <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Fan / AC avail.</span>}
                  <span className="text-[12px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{room.standardGuests} base guests</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── STEP 2: Dates & Guests ──────────────────────────────────
function StepDatesGuests({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  const room = booking.room!;
  const today = new Date().toISOString().split("T")[0];

  // nights calc
  const nights =
    booking.checkIn && booking.checkOut
      ? Math.max(0, Math.round((new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000))
      : 0;

  const ratePerNight = booking.roomType === "ac" ? room.basePaxRate + room.acSurcharge : room.basePaxRate;
  const extraFee = booking.extraGuests * 500 * nights;
  const subtotal = ratePerNight * nights + extraFee;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dates & Guests</h2>

      {/* Fan / AC toggle — only for rooms that have AC */}
      {room.hasAcOption && (
        <div>
          <p className="text-[15px] font-semibold text-gray-700 mb-3">Room Type</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setBooking({ ...booking, roomType: "fan" })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${booking.roomType === "fan" ? "border-[#2d6a2d] bg-[#2d6a2d]/5" : "border-gray-200"}`}
            >
              <Wind className="w-5 h-5 text-[#2d6a2d] mb-2" />
              <p className="font-bold text-gray-900">Fan Room</p>
              <p className="text-[14px] text-[#2d6a2d] font-bold mt-0.5">₱{room.basePaxRate.toLocaleString()}/night</p>
            </button>
            <button
              onClick={() => setBooking({ ...booking, roomType: "ac" })}
              className={`p-4 rounded-xl border-2 text-left transition-all ${booking.roomType === "ac" ? "border-[#2d6a2d] bg-[#2d6a2d]/5" : "border-gray-200"}`}
            >
              <Thermometer className="w-5 h-5 text-[#2d6a2d] mb-2" />
              <p className="font-bold text-gray-900">Air-Conditioned</p>
              <p className="text-[14px] text-[#2d6a2d] font-bold mt-0.5">₱{(room.basePaxRate + room.acSurcharge).toLocaleString()}/night</p>
              <p className="text-[11px] text-gray-400">+₱500 AC surcharge</p>
            </button>
          </div>
        </div>
      )}

      {/* Date pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[15px] font-semibold text-gray-700 mb-2">Check-in Date</label>
          <input
            type="date"
            min={today}
            value={booking.checkIn}
            onChange={(e) => setBooking({ ...booking, checkIn: e.target.value, checkOut: "" })}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none"
          />
          <p className="text-[13px] text-gray-500 mt-1">Check-in from 2:00 PM</p>
        </div>
        <div>
          <label className="block text-[15px] font-semibold text-gray-700 mb-2">Check-out Date</label>
          <input
            type="date"
            min={booking.checkIn || today}
            value={booking.checkOut}
            onChange={(e) => setBooking({ ...booking, checkOut: e.target.value })}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none"
          />
          <p className="text-[13px] text-gray-500 mt-1">Check-out by 12:00 Noon</p>
        </div>
      </div>

      {/* Extra guests */}
      {room.maxExtraGuests > 0 && (
        <div>
          <label className="block text-[15px] font-semibold text-gray-700 mb-1">
            Extra Guests
          </label>
          <p className="text-[13px] text-gray-500 mb-2">
            Base includes {room.standardGuests} guests. Add up to {room.maxExtraGuests} more at ₱500/head/night (includes breakfast & bed).
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setBooking({ ...booking, extraGuests: Math.max(0, booking.extraGuests - 1) })}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 text-xl font-bold hover:border-[#2d6a2d] transition-colors"
            >
              −
            </button>
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">{booking.extraGuests}</span>
              <p className="text-[12px] text-gray-500">extra guest{booking.extraGuests !== 1 ? "s" : ""}</p>
            </div>
            <button
              onClick={() => setBooking({ ...booking, extraGuests: Math.min(room.maxExtraGuests, booking.extraGuests + 1) })}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 text-xl font-bold hover:border-[#2d6a2d] transition-colors"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Summary */}
      {nights > 0 && (
        <div className="bg-[#faf7f2] rounded-xl p-5 border border-[#2d6a2d]/10 space-y-2">
          <div className="flex justify-between text-[15px]">
            <span className="text-gray-700">₱{ratePerNight.toLocaleString()} × {nights} night{nights !== 1 ? "s" : ""}</span>
            <span className="font-semibold">₱{(ratePerNight * nights).toLocaleString()}</span>
          </div>
          {booking.extraGuests > 0 && (
            <div className="flex justify-between text-[15px]">
              <span className="text-gray-700">{booking.extraGuests} extra guest{booking.extraGuests !== 1 ? "s" : ""} × {nights} night{nights !== 1 ? "s" : ""}</span>
              <span className="font-semibold">₱{extraFee.toLocaleString()}</span>
            </div>
          )}
          <div className="border-t border-[#2d6a2d]/10 pt-2 flex justify-between text-[17px] font-bold">
            <span>Estimated Total</span>
            <span className="text-[#2d6a2d]">₱{subtotal.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STEP 3: Guest Info ──────────────────────────────────────
function StepGuestInfo({ booking, setBooking }: { booking: BookingState; setBooking: (b: BookingState) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
      <p className="text-[15px] text-gray-600">Please provide correct details for your booking confirmation.</p>

      <div>
        <label className="block text-[15px] font-semibold text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
          value={booking.guestName}
          onChange={(e) => setBooking({ ...booking, guestName: e.target.value })}
          placeholder="Enter your full name"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-gray-700 mb-2">Email Address *</label>
        <input
          type="email"
          value={booking.guestEmail}
          onChange={(e) => setBooking({ ...booking, guestEmail: e.target.value })}
          placeholder="your@email.com"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none"
        />
        <p className="text-[13px] text-gray-500 mt-1">Booking confirmation will be sent here</p>
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-gray-700 mb-2">Phone Number *</label>
        <input
          type="tel"
          value={booking.guestPhone}
          onChange={(e) => setBooking({ ...booking, guestPhone: e.target.value })}
          placeholder="+63 9XX XXX XXXX"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[15px] font-semibold text-gray-700 mb-2">Special Requests <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea
          value={booking.specialRequests}
          onChange={(e) => setBooking({ ...booking, specialRequests: e.target.value })}
          placeholder="Allergies, arrival time, accessibility needs, etc."
          rows={3}
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 text-[16px] focus:border-[#2d6a2d] focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}

// ─── STEP 4: Review & Pay ────────────────────────────────────
function StepReview({
  booking,
  onSubmit,
  submitting,
}: {
  booking: BookingState;
  onSubmit: () => void;
  submitting: boolean;
}) {
  const room = booking.room!;
  const nights = Math.max(0, Math.round(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / 86400000
  ));
  const ratePerNight = booking.roomType === "ac" ? room.basePaxRate + room.acSurcharge : room.basePaxRate;
  const extraFee = booking.extraGuests * 500 * nights;
  const total = ratePerNight * nights + extraFee;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Review Your Booking</h2>

      {/* Summary card */}
      <div className="bg-[#faf7f2] rounded-2xl p-5 space-y-3 border border-[#2d6a2d]/10">
        <div className="flex gap-3">
          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
            <Image src={room.heroImage} alt={room.name} fill sizes="80px" className="object-cover" />
          </div>
          <div>
            <p className="font-bold text-[17px] text-gray-900">{room.name}</p>
            <p className="text-[14px] text-gray-500 capitalize">{booking.roomType} room</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-2 text-[15px]">
          <Row label="Check-in" value={booking.checkIn} />
          <Row label="Check-out" value={booking.checkOut} />
          <Row label="Nights" value={`${nights}`} />
          <Row label="Base guests" value={`${room.standardGuests}`} />
          {booking.extraGuests > 0 && <Row label="Extra guests" value={`${booking.extraGuests}`} />}
          <Row label="Name" value={booking.guestName} />
          <Row label="Email" value={booking.guestEmail} />
          <Row label="Phone" value={booking.guestPhone} />
        </div>

        <div className="border-t border-gray-200 pt-3 space-y-1 text-[15px]">
          <div className="flex justify-between">
            <span className="text-gray-600">Room ({nights} night{nights !== 1 ? "s" : ""})</span>
            <span>₱{(ratePerNight * nights).toLocaleString()}</span>
          </div>
          {extraFee > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Extra guests</span>
              <span>₱{extraFee.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-[17px] pt-2 border-t border-gray-200">
            <span>Total</span>
            <span className="text-[#2d6a2d]">₱{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[14px] text-amber-800">
        <strong>Payment Instructions:</strong> After confirming, you will receive a booking reference. Send payment via GCash or Bank Transfer and upload your proof of payment to complete the booking. Details will be shown on the next page.
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full bg-[#2d6a2d] text-white py-4 rounded-xl text-[17px] font-bold hover:bg-[#1a4a1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Processing…" : "Confirm Booking →"}
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

// ─── Main reserve page ───────────────────────────────────────
function ReserveInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedSlug = searchParams.get("room");

  const preselectedRoom = preselectedSlug ? rooms.find((r) => r.slug === preselectedSlug) ?? null : null;

  const [booking, setBooking] = useState<BookingState>({
    step: preselectedRoom ? 2 : 1,
    room: preselectedRoom,
    roomType: "fan",
    checkIn: "",
    checkOut: "",
    extraGuests: 0,
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    specialRequests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canAdvance = (() => {
    if (booking.step === 1) return booking.room !== null;
    if (booking.step === 2) return booking.checkIn !== "" && booking.checkOut !== "" && booking.checkOut > booking.checkIn;
    if (booking.step === 3) return booking.guestName.trim() !== "" && booking.guestEmail.trim() !== "" && booking.guestPhone.trim() !== "";
    return false;
  })();

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: booking.room!.slug,
          room_type: booking.roomType,
          check_in: booking.checkIn,
          check_out: booking.checkOut,
          extra_guests: booking.extraGuests,
          guest_name: booking.guestName,
          guest_email: booking.guestEmail,
          guest_phone: booking.guestPhone,
          special_requests: booking.specialRequests,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      router.push(`/reserve/confirmation?ref=${data.reference}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">Reserve a Room</h1>
        <p className="text-center text-[15px] text-gray-500 mb-8">Secure your mountain getaway at Cielo Alto Place</p>

        <StepBar step={booking.step} />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {booking.step === 1 && <StepChooseRoom booking={booking} setBooking={setBooking} />}
          {booking.step === 2 && <StepDatesGuests booking={booking} setBooking={setBooking} />}
          {booking.step === 3 && <StepGuestInfo booking={booking} setBooking={setBooking} />}
          {booking.step === 4 && <StepReview booking={booking} onSubmit={handleSubmit} submitting={submitting} />}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-[14px]">
              {error}
            </div>
          )}

          {/* Navigation buttons */}
          {booking.step < 4 && (
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
              {booking.step > 1 ? (
                <button
                  onClick={() => setBooking({ ...booking, step: booking.step - 1 })}
                  className="flex items-center gap-2 text-[15px] text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              ) : <div />}

              <button
                onClick={() => setBooking({ ...booking, step: booking.step + 1 })}
                disabled={!canAdvance}
                className="flex items-center gap-2 bg-[#2d6a2d] text-white px-7 py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#1a4a1a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {booking.step === 3 ? "Review Booking" : "Continue"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#faf7f2]"><p className="text-gray-500">Loading…</p></div>}>
      <ReserveInner />
    </Suspense>
  );
}
