import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDynamicRooms } from "@/lib/resort-data";
import { Reveal } from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Accommodations & Cabins",
  description:
    "Explore our highland cabins in Tanay, Rizal. Loft Cabin, Family Cabin, Regular Cabin, Mini Cabin, and Holiday Rooms with free breakfast and optional AC.",
};

export default async function RoomsPage() {
  const rooms = await getDynamicRooms();
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* ─────────────────────── PAGE HERO ─────────────────────── */}
      <section className="relative w-full h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg"
            alt="Cielo Alto Place - Mountain cabins and accommodations"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-[1200px] mx-auto mt-12">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-primary-fixed font-bold mb-3 block">
              Where You'll Sleep · Cabins & Rooms
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-on-primary mb-4 leading-tight">
              Highland Accommodations
            </h1>
            <p className="text-base sm:text-lg text-surface-container-high max-w-2xl mx-auto leading-relaxed font-normal">
              Every stay includes <strong>complimentary breakfast</strong> for all base guests.
              Choose between natural mountain breeze cooling or optional air conditioning.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── POLICY BANNER ─────────────────────── */}
      <div className="bg-primary text-on-primary py-3.5 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs sm:text-sm font-medium tracking-wide text-center">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">restaurant</span>
            <strong>Free breakfast</strong> included for all base guests
          </span>
          <span className="hidden sm:inline text-outline-variant">·</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">ac_unit</span>
            AC upgrade: <strong>+₱500 / night</strong>
          </span>
          <span className="hidden sm:inline text-outline-variant">·</span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-primary-fixed">group_add</span>
            Extra guests: <strong>₱500 / head</strong> (bed + breakfast)
          </span>
        </div>
      </div>

      {/* ─────────────────────── ROOMS DIRECTORY GRID ─────────────────────── */}
      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rooms.map((room, i) => (
            <Reveal key={room.slug} delay={i * 70}>
              <div className="bg-surface rounded-2xl overflow-hidden border border-outline/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  {/* Image container with A-frame corner touch */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-surface-container">
                    <Image
                      src={room.heroImage}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {room.tag && (
                        <span className="bg-primary text-on-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                          {room.tag}
                        </span>
                      )}
                      <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-3 py-1 rounded shadow">
                        {room.standardGuests} Guests {room.maxExtraGuests > 0 ? `(+${room.maxExtraGuests} extra)` : ""}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="bg-surface/90 backdrop-blur-sm text-primary text-[11px] font-bold px-3 py-1 rounded shadow">
                        {room.hasAcOption ? "Fan or AC" : "Fan Room"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-2">
                      {room.name}
                    </h2>
                    <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-6">
                      {room.shortDescription}
                    </p>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant font-medium mb-6">
                      <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded">
                        <span className="material-symbols-outlined text-[18px] text-primary">bed</span>
                        <span>{room.beds}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded">
                        <span className="material-symbols-outlined text-[18px] text-primary">
                          {room.hasCR === "private" ? "shower" : "wc"}
                        </span>
                        <span>{room.hasCR === "private" ? "Private CR" : "Shared CR"}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded">
                        <span className="material-symbols-outlined text-[18px] text-primary">balcony</span>
                        <span>{room.hasVeranda ? "Private Veranda" : "Common Area"}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-surface-container-low p-2.5 rounded">
                        <span className="material-symbols-outlined text-[18px] text-primary">restaurant</span>
                        <span>Free Breakfast</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Price & Buttons */}
                <div className="p-6 sm:p-8 pt-0 border-t border-outline/10 mt-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5">
                    <div>
                      <span className="text-[11px] text-on-surface-variant uppercase tracking-wider block">
                        Base Rate (Fan)
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-bold text-primary">
                          ₱{room.basePaxRate.toLocaleString()}
                        </span>
                        <span className="text-xs text-on-surface-variant">/ night</span>
                      </div>
                      {room.hasAcOption && (
                        <span className="text-xs text-on-surface-variant">
                          ₱{(room.basePaxRate + room.acSurcharge).toLocaleString()} with AC option
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="flex-1 sm:flex-initial bg-surface-container-high text-primary hover:bg-surface-variant font-semibold text-xs h-[48px] px-5 rounded flex items-center justify-center transition-colors"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/reserve?room=${room.slug}`}
                        className="flex-1 sm:flex-initial bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container font-semibold text-xs h-[48px] px-6 rounded flex items-center justify-center transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
