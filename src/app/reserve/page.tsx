"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { rooms, resort } from "@/data/resort";
import type { RoomType } from "@/data/resort";
import { ReservationProgress } from "@/components/ui/ReservationProgress";
import { Upload, CheckCircle2, X, AlertCircle, RotateCcw } from "lucide-react";
import { useResortSettings } from "@/hooks/useResortSettings";

type StepNumber = 1 | 2 | 3 | 4;
const STORAGE_KEY = "cielo_reserve_draft";

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

function formatTomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function calculateNights(start: string, end: string) {
  if (!start || !end) return 1;
  const s = new Date(start);
  const e = new Date(end);
  const diff = (e.getTime() - s.getTime()) / (1000 * 3600 * 24);
  return diff > 0 ? Math.round(diff) : 1;
}

function ReserveInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const preselectedSlug = searchParams.get("room");

  // Read dynamic database settings for payments and booking
  const {
    gcashName,
    gcashNumber,
    gcashEnabled,
    bankName,
    bankAccountName,
    bankAccountNumber,
    bankEnabled,
    extraPaxFee,
    checkInTime,
    checkOutTime,
  } = useResortSettings();

  const [step, setStep] = useState<StepNumber>(1);
  const [room, setRoom] = useState<RoomType | null>(() => {
    if (preselectedSlug) {
      return rooms.find((r) => r.slug === preselectedSlug) || null;
    }
    return null;
  });
  const [roomType, setRoomType] = useState<"fan" | "ac">("fan");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [extraGuests, setExtraGuests] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Payment proof state
  const [paymentMethod, setPaymentMethod] = useState<"gcash" | "bank_transfer">("gcash");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 1. Restore state from sessionStorage on page load/refresh
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step && [1, 2, 3, 4].includes(parsed.step)) setStep(parsed.step);
        if (parsed.checkIn) setCheckIn(parsed.checkIn);
        if (parsed.checkOut) setCheckOut(parsed.checkOut);
        if (typeof parsed.extraGuests === "number") setExtraGuests(parsed.extraGuests);
        if (parsed.roomSlug && !preselectedSlug) {
          const matched = rooms.find((r) => r.slug === parsed.roomSlug);
          if (matched) setRoom(matched);
        }
        if (parsed.roomType) setRoomType(parsed.roomType);
        if (parsed.guestName) setGuestName(parsed.guestName);
        if (parsed.guestEmail) setGuestEmail(parsed.guestEmail);
        if (parsed.guestPhone) setGuestPhone(parsed.guestPhone);
        if (parsed.specialRequests) setSpecialRequests(parsed.specialRequests);
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
      }
    } catch (err) {
      console.warn("Could not restore saved booking draft:", err);
    }
  }, [preselectedSlug]);

  // 2. Persist state to sessionStorage whenever user makes changes
  useEffect(() => {
    try {
      const draft = {
        step,
        checkIn,
        checkOut,
        extraGuests,
        roomSlug: room?.slug || "",
        roomType,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        paymentMethod,
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch (err) {
      // Storage unavailable or disabled
    }
  }, [
    step,
    checkIn,
    checkOut,
    extraGuests,
    room,
    roomType,
    guestName,
    guestEmail,
    guestPhone,
    specialRequests,
    paymentMethod,
  ]);

  // Handle URL preselected room
  useEffect(() => {
    if (preselectedSlug) {
      const matched = rooms.find((r) => r.slug === preselectedSlug);
      if (matched) {
        setRoom(matched);
        setExtraGuests(0);
        setRoomType("fan");
      }
    }
  }, [preselectedSlug]);

  // Clear booking draft and restart
  const handleResetDraft = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    setStep(1);
    setCheckIn("");
    setCheckOut("");
    setExtraGuests(0);
    setRoom(null);
    setRoomType("fan");
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setSpecialRequests("");
    setProofFile(null);
    setProofPreview(null);
    setError("");
  };

  const hasDates = Boolean(checkIn && checkOut && new Date(checkOut) > new Date(checkIn));
  const nights = hasDates ? calculateNights(checkIn, checkOut) : 1;
  const roomBase = room ? room.basePaxRate * (hasDates ? nights : 1) : 0;
  const acCost = room && roomType === "ac" && room.hasAcOption ? room.acSurcharge * (hasDates ? nights : 1) : 0;
  const extraGuestCost = hasDates ? extraGuests * extraPaxFee * nights : extraGuests * extraPaxFee;
  const totalAmount = room ? roomBase + acCost + extraGuestCost : 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Receipt file is too large. Please upload an image under 10MB.");
      return;
    }

    setProofFile(file);
    setError("");

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setProofPreview(url);
    } else {
      setProofPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    if (proofPreview) {
      URL.revokeObjectURL(proofPreview);
      setProofPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Step 1 Validation
  const handleStep1Next = () => {
    if (!checkIn || !checkOut) {
      setError("Please select both check-in and check-out dates before proceeding.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    setError("");
    setStep(2);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // Step 2 Validation
  const handleStep2Next = () => {
    if (!room) {
      setError("Please choose a cabin or room before continuing.");
      return;
    }
    setError("");
    setStep(3);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // Step Progress Click Guard
  const handleStepClick = (targetStep: StepNumber) => {
    if (targetStep >= 2 && (!checkIn || !checkOut)) {
      setError("Please select your stay dates in Step 1 first.");
      return;
    }
    if (targetStep >= 3 && !room) {
      setError("Please select a cabin in Step 2 first.");
      return;
    }
    if (targetStep === 4 && (!guestName.trim() || !guestPhone.trim())) {
      setError("Please complete guest details in Step 3 first.");
      return;
    }
    setError("");
    setStep(targetStep);
  };

  // Step 3 Validation
  const handleStep3Next = () => {
    if (!guestName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!guestPhone.trim()) {
      setError("Please enter your mobile/Viber phone number.");
      return;
    }
    setError("");
    setStep(4);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  // Step 4 Final Submission (Creates Booking & Uploads Payment Proof)
  const handleFinalSubmit = async () => {
    if (!room) {
      setError("Please select a cabin before submitting.");
      return;
    }
    if (!proofFile) {
      setError("Please attach your GCash or Bank Transfer payment receipt screenshot.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // 1. Create booking in Supabase
      const bookingPayload = {
        room_slug: room.slug,
        room_type: roomType,
        check_in: checkIn,
        check_out: checkOut,
        extra_guests: extraGuests,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_phone: guestPhone,
        special_requests: specialRequests,
      };

      const bookingRes = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      const bookingData = await bookingRes.json();

      if (!bookingRes.ok) {
        throw new Error(bookingData.error || "Failed to create booking.");
      }

      const reference = bookingData.reference;

      // 2. Upload payment proof to Supabase storage & payment_submissions
      const formData = new FormData();
      formData.append("proofFile", proofFile);
      formData.append("paymentMethod", paymentMethod);
      formData.append("amountClaimed", totalAmount.toString());

      const proofRes = await fetch(`/api/bookings/${reference}/payment-proof`, {
        method: "POST",
        body: formData,
      });

      if (!proofRes.ok) {
        const proofData = await proofRes.json();
        throw new Error(proofData.error || "Failed to upload payment proof.");
      }

      // Success -> Clear draft & route to confirmation page
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}

      router.push(`/reserve/confirmation?ref=${reference}`);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An error occurred while submitting your reservation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* ─────────────────────── PAGE HERO ─────────────────────── */}
      <section className="relative w-full h-[38vh] min-h-[280px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/book-ur-stay-cover.jpg"
            alt="Cielo Alto Place Reservations"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-[1200px] mx-auto mt-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-fixed mb-2 block">
            Online Reservations · Tanay, Rizal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-on-primary mb-2">
            Reserve Your Mountain Escape
          </h1>
          <p className="text-xs sm:text-sm text-surface-container-high max-w-lg mx-auto">
            Direct booking with free breakfast, zero platform fees, and easy cashless payment.
          </p>
        </div>
      </section>

      {/* ─────────────────────── STEP PROGRESS BAR ─────────────────────── */}
      <ReservationProgress
        currentStep={step}
        onStepClick={(targetStep) => handleStepClick(targetStep)}
      />

      {/* ─────────────────────── MAIN WIZARD BODY ─────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─────────────────────── LEFT: ACTIVE STEP FORM ─────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl text-sm flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* ── STEP 1: DATES & GUESTS ── */}
            {step === 1 && (
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-outline/15 shadow-sm space-y-6 animate-fadeIn w-full max-w-full overflow-hidden box-border">
                <div>
                  <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                    Step 1 of 4
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    When will you be staying?
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Select your arrival and departure dates.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      min={formatToday()}
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base font-semibold text-primary focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                    />
                    <span className="text-[11px] text-on-surface-variant mt-1 block">
                      Check-in: 2:00 PM
                    </span>
                  </div>

                  <div className="w-full min-w-0">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-2">
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      min={checkIn || formatToday()}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base font-semibold text-primary focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                    />
                    <span className="text-[11px] text-on-surface-variant mt-1 block">
                      Check-out: 12:00 Noon ({nights} {nights === 1 ? "night" : "nights"})
                    </span>
                  </div>
                </div>

                {/* Extra guests counter */}
                <div className="p-4 sm:p-5 bg-surface-container-low rounded-xl border border-outline/10 space-y-3 w-full min-w-0 box-border">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-serif font-bold text-base text-primary block">
                        Extra Guests (+₱500/head/night)
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Includes extra bed setup and complimentary daily breakfast.
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setExtraGuests(Math.max(0, extraGuests - 1))}
                        disabled={extraGuests === 0}
                        className="w-10 h-10 rounded-lg bg-surface border border-outline/20 flex items-center justify-center font-bold text-primary disabled:opacity-30 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-serif text-lg font-bold w-6 text-center text-primary">
                        {extraGuests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setExtraGuests(Math.min(4, extraGuests + 1))}
                        disabled={extraGuests >= 4}
                        className="w-10 h-10 rounded-lg bg-surface border border-outline/20 flex items-center justify-center font-bold text-primary disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3.5 bg-primary-container/30 rounded-xl text-xs text-primary font-medium">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                  Free breakfast included for all base guests every morning!
                </div>

                <button
                  type="button"
                  onClick={handleStep1Next}
                  disabled={!checkIn || !checkOut}
                  className="w-full bg-primary text-on-primary font-bold text-base h-[54px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to Select Cabin
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            )}

            {/* ── STEP 2: CABIN & COOLING ── */}
            {step === 2 && (
              <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-outline/15 shadow-sm space-y-6 animate-fadeIn">
                <div>
                  <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                    Step 2 of 4
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    Choose Your Accommodations
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    {hasDates
                      ? `Showing available cabins for ${nights} ${nights === 1 ? "night" : "nights"}.`
                      : "Please select a cabin from the list below."}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {rooms.map((r) => {
                    const isSelected = room?.slug === r.slug;
                    const isMiniCabin = r.slug === "mini-cabin";
                    const isOverCapacity = isMiniCabin && extraGuests > 0;

                    return (
                      <div
                        key={r.slug}
                        onClick={() => {
                          if (isOverCapacity) return;
                          setRoom(r);
                          if (!r.hasAcOption) setRoomType("fan");
                          setError("");
                        }}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center ${
                          isOverCapacity
                            ? "opacity-40 cursor-not-allowed bg-surface-container-lowest"
                            : isSelected
                            ? "bg-surface-container-high border-primary ring-2 ring-primary/20 shadow-sm"
                            : "bg-surface-container-low border-outline/15 hover:border-primary/40"
                        }`}
                      >
                        <div className="flex gap-3.5 items-center">
                          <div className="w-20 h-16 rounded-lg overflow-hidden relative shrink-0 bg-surface-container">
                            <Image
                              src={r.heroImage}
                              alt={r.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-serif font-bold text-base text-primary">
                                {r.name}
                              </h3>
                              {r.tag && (
                                <span className="text-[10px] bg-primary text-on-primary font-bold px-2 py-0.5 rounded">
                                  {r.tag}
                                </span>
                              )}
                              {isSelected && (
                                <span className="text-[10px] bg-primary-container text-on-primary-container font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[12px]">check</span>
                                  Selected
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-on-surface-variant block mt-0.5">
                              {r.beds} · {r.hasCR === "private" ? "Private CR" : "Shared CR"} · {r.standardGuests} Base Guests
                            </span>
                            {isOverCapacity && (
                              <span className="text-[11px] text-red-600 font-semibold block mt-0.5">
                                Not available (Mini cabin accommodates max 2 guests)
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-baseline sm:items-end justify-between w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline/10">
                          <div className="font-serif text-lg font-bold text-primary">
                            ₱{(r.basePaxRate * (hasDates ? nights : 1)).toLocaleString()}
                          </div>
                          <span className="text-[11px] text-on-surface-variant">
                            {hasDates ? `for ${nights} ${nights === 1 ? "night" : "nights"}` : "per night"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Cooling Option Selector */}
                {room ? (
                  <div className="pt-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary block mb-3">
                      Cooling Option for {room.name}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <label
                        className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          roomType === "fan"
                            ? "bg-surface-container-high border-primary ring-2 ring-primary/20"
                            : "bg-surface-container-low border-outline/15 hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="cooling"
                            value="fan"
                            checked={roomType === "fan"}
                            onChange={() => setRoomType("fan")}
                            className="w-4 h-4 text-primary"
                          />
                          <div>
                            <div className="font-bold text-sm text-primary">Mountain Breeze Fan</div>
                            <div className="text-xs text-on-surface-variant">Cool mountain night air</div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-primary">Included</span>
                      </label>

                      {room.hasAcOption ? (
                        <label
                          className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            roomType === "ac"
                              ? "bg-surface-container-high border-primary ring-2 ring-primary/20"
                              : "bg-surface-container-low border-outline/15 hover:border-primary/40"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="cooling"
                              value="ac"
                              checked={roomType === "ac"}
                              onChange={() => setRoomType("ac")}
                              className="w-4 h-4 text-primary"
                            />
                            <div>
                              <div className="font-bold text-sm text-primary">Air Conditioning</div>
                              <div className="text-xs text-on-surface-variant">Recommended for afternoons</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-primary">
                            +₱{(room.acSurcharge * (hasDates ? nights : 1)).toLocaleString()}
                          </span>
                        </label>
                      ) : (
                        <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline/10 opacity-60 flex items-center justify-between">
                          <span className="text-xs text-on-surface-variant">AC Upgrade Not Available</span>
                          <span className="text-xs text-on-surface-variant italic">Fan Only</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-primary-container/20 border border-primary/20 text-xs text-primary font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">touch_app</span>
                    Please click or tap one of the cabins above to select your room.
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-surface-container-high text-primary font-semibold text-sm h-[54px] px-6 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleStep2Next}
                    disabled={!room}
                    className="flex-1 bg-primary text-on-primary font-bold text-sm h-[54px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Continue to Guest Details
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: GUEST INFORMATION ── */}
            {step === 3 && (
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-outline/15 shadow-sm space-y-6 animate-fadeIn w-full max-w-full overflow-hidden box-border">
                <div>
                  <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                    Step 3 of 4
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    Guest Information
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Who should we address the reservation and check-in voucher to?
                  </p>
                </div>

                <div className="space-y-4 w-full min-w-0">
                  <div className="w-full min-w-0">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maria Santos"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full min-w-0">
                    <div className="w-full min-w-0">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                        Mobile / Viber Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0917 123 4567"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>

                    <div className="w-full min-w-0">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. maria@gmail.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="w-full min-w-0">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Estimated arrival time, bringing pet, celebrating birthday..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full min-w-0 max-w-full box-border bg-surface-container-low border border-outline/20 rounded-xl p-3.5 text-base text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-surface-container-high text-primary font-semibold text-sm h-[54px] px-6 rounded-xl hover:bg-surface-variant transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleStep3Next}
                    className="flex-1 bg-primary text-on-primary font-bold text-base h-[54px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95 cursor-pointer"
                  >
                    Continue to Payment &amp; Upload
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 4: PAYMENT METHOD & PROOF UPLOAD ── */}
            {step === 4 && (
              <div className="bg-surface rounded-2xl p-5 sm:p-8 border border-outline/15 shadow-sm space-y-6 animate-fadeIn w-full max-w-full overflow-hidden box-border">
                <div>
                  <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                    Step 4 of 4
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                    Payment & Proof of Transfer
                  </h2>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                    Transfer the total amount via GCash or Bank Transfer, then upload your transaction receipt.
                  </p>
                </div>

                {/* Payment Method Tabs */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("gcash")}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "gcash"
                        ? "bg-surface-container-high border-primary ring-2 ring-primary/20 shadow-sm"
                        : "bg-surface-container-low border-outline/15 hover:border-primary/40 opacity-70"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-[24px]">phone_iphone</span>
                    <span className="font-bold text-xs sm:text-sm text-primary">GCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank_transfer")}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "bank_transfer"
                        ? "bg-surface-container-high border-primary ring-2 ring-primary/20 shadow-sm"
                        : "bg-surface-container-low border-outline/15 hover:border-primary/40 opacity-70"
                    }`}
                  >
                    <span className="material-symbols-outlined text-primary text-[24px]">account_balance</span>
                    <span className="font-bold text-xs sm:text-sm text-primary">
                      {bankName ? `Bank (${bankName})` : "Bank Transfer"}
                    </span>
                  </button>
                </div>

                {/* Account Details Box */}
                <div className="bg-surface-container-low p-5 rounded-xl border border-outline/10 space-y-2">
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    {paymentMethod === "gcash" ? "GCash Account Details" : "Bank Transfer Details"}
                  </div>

                  {paymentMethod === "gcash" ? (
                    <div className="space-y-1 text-xs sm:text-sm text-on-surface">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Account Name:</span>
                        <strong className="text-primary font-mono">{gcashName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Account / Mobile Number:</span>
                        <strong className="text-primary font-mono text-base font-bold">{gcashNumber}</strong>
                      </div>
                      <div className="flex justify-between border-t border-outline/10 pt-1.5 mt-1.5">
                        <span className="text-on-surface-variant">Amount to Send:</span>
                        <strong className="font-serif text-base text-primary font-bold">
                          ₱{totalAmount.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-xs sm:text-sm text-on-surface">
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Bank Name:</span>
                        <strong className="text-primary">{bankName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Account Name:</span>
                        <strong className="text-primary font-mono">{bankAccountName}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Account Number:</span>
                        <strong className="text-primary font-mono text-base font-bold">{bankAccountNumber}</strong>
                      </div>
                      <div className="flex justify-between border-t border-outline/10 pt-1.5 mt-1.5">
                        <span className="text-on-surface-variant">Amount to Send:</span>
                        <strong className="font-serif text-base text-primary font-bold">
                          ₱{totalAmount.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Receipt Dropzone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-primary block">
                    Upload Payment Proof / Receipt Screenshot *
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="receipt-upload"
                  />

                  {!proofFile ? (
                    <label
                      htmlFor="receipt-upload"
                      className="border-2 border-dashed border-outline/30 hover:border-primary/60 bg-surface-container-low rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center cursor-pointer transition-colors group"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-primary block">
                          Tap or click to select receipt image
                        </span>
                        <span className="text-xs text-on-surface-variant mt-0.5 block">
                          Supports JPG, PNG, or PDF up to 10MB
                        </span>
                      </div>
                    </label>
                  ) : (
                    <div className="p-4 bg-surface-container-high rounded-xl border border-outline/15 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {proofPreview ? (
                          <div className="w-14 h-14 rounded-lg overflow-hidden relative shrink-0 border border-outline/20">
                            <Image
                              src={proofPreview}
                              alt="Receipt preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                        )}
                        <div className="overflow-hidden text-left">
                          <span className="text-sm font-semibold text-primary block truncate">
                            {proofFile.name}
                          </span>
                          <span className="text-xs text-on-surface-variant">
                            {(proofFile.size / 1024).toFixed(1)} KB · Ready for upload
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-2 rounded-full hover:bg-surface-container-highest text-on-surface-variant shrink-0"
                        title="Remove file"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={submitting}
                    className="bg-surface-container-high text-primary font-semibold text-sm h-[54px] px-6 rounded-xl hover:bg-surface-variant transition-colors disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    disabled={submitting || !proofFile}
                    className="flex-1 bg-primary text-on-primary font-bold text-sm h-[54px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      "Submitting Reservation..."
                    ) : (
                      <>
                        Submit Reservation & Payment Proof
                        <CheckCircle2 className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────── RIGHT: LIVE STICKY BREAKDOWN CARD ─────────────────────── */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              {/* Decorative Cabin Image */}
              <div
                className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm bg-surface-container"
                style={{ clipPath: "polygon(0 0, 100% 10%, 100% 100%, 0 100%)" }}
              >
                <Image
                  src={room?.heroImage || "/images/book-ur-stay-cover.jpg"}
                  alt={room?.name || "Cielo Alto Place"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-on-primary">
                  <span className="font-serif text-lg font-bold block">
                    {room ? room.name : "Select a Cabin"}
                  </span>
                  <span className="text-xs text-primary-fixed flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    Km 57 Marcos Highway, Tanay
                  </span>
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-outline/15 shadow-sm space-y-6">
                <h3 className="font-serif text-xl font-bold text-primary border-b border-outline/10 pb-4">
                  Reservation Summary
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-on-surface">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">
                      {room ? (
                        `${room.name} (${hasDates ? `${nights} ${nights === 1 ? "night" : "nights"}` : "1 night"})`
                      ) : (
                        "Accommodation"
                      )}
                    </span>
                    <span className="font-semibold">
                      {room ? `₱${roomBase.toLocaleString()}` : "Not selected"}
                    </span>
                  </div>

                  {acCost > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>AC Upgrade ({hasDates ? `${nights} ${nights === 1 ? "night" : "nights"}` : "1 night"})</span>
                      <span className="font-semibold">+₱{acCost.toLocaleString()}</span>
                    </div>
                  )}

                  {extraGuestCost > 0 && (
                    <div className="flex justify-between text-primary">
                      <span>Extra Guests ({extraGuests} pax × {hasDates ? nights : 1}n)</span>
                      <span className="font-semibold">+₱{extraGuestCost.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-on-surface-variant">
                    <span>Complimentary Breakfast</span>
                    <span className="font-bold text-primary uppercase">Free</span>
                  </div>
                </div>

                <div className="border-t border-outline/15 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-lg font-bold text-primary">Total Payable</span>
                    <span className="font-serif text-3xl font-bold text-primary">
                      {room && hasDates ? `₱${totalAmount.toLocaleString()}` : "₱0.00"}
                    </span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant mt-1 block">
                    {room && hasDates
                      ? "Upload your proof of transfer in Step 4 to complete reservation."
                      : "Select your dates and cabin to calculate your stay total."}
                  </span>
                </div>

                <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline/10 text-xs text-on-surface-variant space-y-1">
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <strong className="text-on-surface">
                      {checkIn ? `${checkIn} (${checkInTime})` : "Not selected"}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <strong className="text-on-surface">
                      {checkOut ? `${checkOut} (${checkOutTime})` : "Not selected"}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={handleResetDraft}
                    className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Clear draft &amp; start over</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReservePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-on-surface-variant text-sm">Loading reservation experience...</p>
        </div>
      }
    >
      <ReserveInner />
    </Suspense>
  );
}
