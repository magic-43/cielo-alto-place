"use client";

import Link from "next/link";
import type { RoomType } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";
import {
  RoomGalleryView,
  RoomHeroGrid,
  RoomGallerySmallGrid,
} from "@/components/ui/RoomGalleryLightbox";

export function RoomDetailClient({ room }: { room: RoomType }) {
  const { handleOpen, lightboxModal } = RoomGalleryView({
    roomName: room.name,
    images: room.images,
    heroTag: room.tag,
  });

  const fanRate = room.basePaxRate;

  return (
    <>
      {lightboxModal}

      {/* ─────────────────────── TOP HERO 3-PHOTO GRID ─────────────────────── */}
      <RoomHeroGrid
        roomName={room.name}
        images={room.images}
        heroTag={room.tag}
        onImageClick={handleOpen}
      />

      {/* ─────────────────────── 2-COLUMN MAIN CONTENT & STICKY BOOKING ─────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 mt-4">
        {/* Left Column: Information & Inline Gallery */}
        <div className="md:col-span-7 space-y-10">
          {/* Title & Basic Specs */}
          <div className="border-b border-outline/10 pb-8">
            <Reveal>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                {room.name}
              </h1>
              <div className="flex flex-wrap gap-3 text-xs sm:text-sm font-semibold text-on-surface-variant">
                <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-lg border border-outline/10">
                  <span className="material-symbols-outlined text-[18px] text-primary">group</span>
                  {room.standardGuests} Base Guests {room.maxExtraGuests > 0 ? `(up to ${room.standardGuests + room.maxExtraGuests})` : ""}
                </span>
                <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-lg border border-outline/10">
                  <span className="material-symbols-outlined text-[18px] text-primary">bed</span>
                  {room.beds}
                </span>
                <span className="flex items-center gap-1.5 bg-surface-container-low px-3.5 py-1.5 rounded-lg border border-outline/10">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {room.hasCR === "private" ? "shower" : "wc"}
                  </span>
                  {room.crNotes}
                </span>
              </div>
              <p className="text-on-surface-variant text-base sm:text-lg leading-[1.85] mt-6">
                {room.description}
              </p>
            </Reveal>
          </div>

          {/* Highlights & Inclusions */}
          <Reveal delay={100}>
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-6">
                Inclusions & Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg border border-outline/10">
                    <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span className="text-sm font-medium text-on-surface">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Important Rules / Notes */}
          <Reveal delay={150}>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline/10 space-y-3">
              <h3 className="font-serif font-bold text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">info</span>
                Things to Note
              </h3>
              <ul className="space-y-2 text-sm text-on-surface-variant list-disc pl-5">
                <li><strong>Check-in:</strong> 2:00 PM · <strong>Check-out:</strong> 12:00 Noon (next day)</li>
                <li><strong>Breakfast:</strong> Included every morning for all base guests.</li>
                {room.maxExtraGuests > 0 ? (
                  <li><strong>Extra Guests:</strong> Allowed up to {room.maxExtraGuests} additional person(s) at ₱500/head/night (includes bed and breakfast).</li>
                ) : (
                  <li className="text-amber-800"><strong>Occupancy:</strong> Strictly 2 guests max for Mini Cabin (no extra guests).</li>
                )}
                <li><strong>Payment:</strong> Cashless via GCash or Bank Transfer with reference code.</li>
              </ul>
            </div>
          </Reveal>

          {/* Inline Cabin Gallery (Small Grid inside left column without distortion) */}
          <Reveal delay={200}>
            <RoomGallerySmallGrid
              images={room.images}
              onImageClick={handleOpen}
            />
          </Reveal>
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="md:col-span-5 relative">
          <div className="sticky top-28 bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline/15 shadow-sm space-y-6">
            <div className="border-b border-outline/10 pb-4">
              <span className="text-xs text-on-surface-variant uppercase tracking-wider block mb-1">
                Room Starting Rate
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                  ₱{fanRate.toLocaleString()}
                </span>
                <span className="text-sm text-on-surface-variant">/ night</span>
              </div>
            </div>

            {/* Cooling Options Display */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                Available Cooling Option
              </h3>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 bg-surface rounded-xl border border-outline/15">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">air</span>
                    <span className="text-sm font-semibold text-on-surface">Mountain Breeze Fan Room</span>
                  </div>
                  <span className="text-xs font-bold text-primary">Base Rate</span>
                </div>

                {room.hasAcOption && (
                  <div className="flex items-center justify-between p-3.5 bg-surface rounded-xl border border-primary/25">
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[20px]">ac_unit</span>
                      <span className="text-sm font-semibold text-on-surface">Air Conditioning Upgrade</span>
                    </div>
                    <span className="text-xs font-bold text-primary">+₱500 / night</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick overview */}
            <div className="bg-surface p-4 rounded-xl border border-outline/10 space-y-2 text-xs text-on-surface-variant">
              <div className="flex justify-between">
                <span>Base Capacity</span>
                <strong className="text-on-surface">{room.standardGuests} Guests</strong>
              </div>
              <div className="flex justify-between">
                <span>Breakfast Included</span>
                <strong className="text-on-surface">Yes (Free)</strong>
              </div>
              <div className="flex justify-between">
                <span>Max Extra Guests</span>
                <strong className="text-on-surface">{room.maxExtraGuests > 0 ? `${room.maxExtraGuests} pax (+₱500/head)` : "None"}</strong>
              </div>
            </div>

            {/* Direct Reserve Button */}
            <Link
              href={`/reserve?room=${room.slug}`}
              className="w-full bg-primary text-on-primary font-bold text-sm h-[56px] rounded flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm active:scale-95 duration-200"
            >
              Reserve This Cabin
            </Link>

            <a
              href="tel:+639953855517"
              className="w-full border border-outline/20 text-on-surface-variant font-semibold text-xs h-[46px] rounded flex items-center justify-center gap-2 hover:bg-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              Inquire via Phone / Viber
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Booking Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-surface/95 backdrop-blur-md border border-outline/15 p-3.5 rounded-2xl flex items-center justify-between shadow-2xl px-5">
        <div>
          <span className="text-[10px] text-on-surface-variant uppercase block">Starting from</span>
          <span className="font-serif text-xl font-bold text-primary">₱{fanRate.toLocaleString()}</span>
          <span className="text-[10px] text-on-surface-variant">/nt</span>
        </div>
        <Link
          href={`/reserve?room=${room.slug}`}
          className="bg-primary text-on-primary font-bold text-xs px-6 py-3 rounded-xl shadow"
        >
          Reserve Now
        </Link>
      </div>
    </>
  );
}
