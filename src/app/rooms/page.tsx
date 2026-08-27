import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wind, Thermometer, Users, Coffee } from "lucide-react";
import { rooms } from "@/data/resort";

export const metadata: Metadata = {
  title: "Our Rooms & Cabins",
  description:
    "Browse all rooms at Cielo Alto Place — Mini Cabin, Regular Cabin, Family Cabin, Holiday Rooms, and the iconic Loft Cabin. Free breakfast included in all rooms.",
};

export default function RoomsPage() {
  return (
    <div className="bg-[#faf7f2] min-h-screen">
      {/* Page header */}
      <section className="bg-white border-b border-gray-100 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[12px] font-bold text-[#2d6a2d] uppercase tracking-widest mb-3">Where You'll Sleep</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Rooms & Cabins</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Every room includes <strong>free breakfast</strong> for all base guests.
            Most rooms offer a choice of <strong>fan or air conditioning</strong> — AC adds ₱500.
          </p>
        </div>
      </section>

      {/* Policy bar */}
      <div className="bg-[#2d6a2d] text-white text-center py-3 px-4 text-[14px] sm:text-[15px]">
        🍳 <strong>Free breakfast</strong> included for all base guests &nbsp;·&nbsp;
        Extra guest: <strong>₱500/head</strong> (includes breakfast & bed) &nbsp;·&nbsp;
        ❄️ AC upgrade: <strong>+₱500</strong>
      </div>

      {/* Rooms grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.slug}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Room image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={room.heroImage}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Fan/AC badge */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {room.hasAcOption ? (
                    <span className="bg-white/90 text-[#2d6a2d] px-3 py-1 rounded-full text-[12px] font-bold shadow">
                      Fan / AC
                    </span>
                  ) : (
                    <span className="bg-white/90 text-gray-700 px-3 py-1 rounded-full text-[12px] font-bold shadow">
                      Fan Only
                    </span>
                  )}
                </div>
                {room.tag && (
                  <div className="absolute top-3 left-3 bg-[#2d6a2d] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shadow">
                    {room.tag}
                  </div>
                )}
              </div>

              {/* Room info */}
              <div className="p-6">
                {/* Room name — large for elder readability */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{room.name}</h2>

                {/* Short description */}
                <p className="text-[16px] text-gray-600 leading-relaxed mb-4">{room.shortDescription}</p>

                {/* Key stats */}
                <div className="flex flex-wrap gap-3 mb-5">
                  <span className="flex items-center gap-1.5 text-[14px] text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Users className="w-4 h-4 text-[#2d6a2d]" />
                    {room.standardGuests} guests
                    {room.maxExtraGuests > 0 && ` + ${room.maxExtraGuests} extra`}
                  </span>
                  <span className="flex items-center gap-1.5 text-[14px] text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <Coffee className="w-4 h-4 text-[#2d6a2d]" />
                    Free breakfast
                  </span>
                  <span className="flex items-center gap-1.5 text-[14px] text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    {room.hasAcOption ? <Thermometer className="w-4 h-4 text-[#2d6a2d]" /> : <Wind className="w-4 h-4 text-[#2d6a2d]" />}
                    {room.hasAcOption ? "Fan or AC" : "Fan room"}
                  </span>
                  <span className="flex items-center gap-1.5 text-[14px] text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    🚿 {room.hasCR === "private" ? "Private CR" : "Shared CR"}
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between gap-4">
                  <div>
                    {/* Fan rate — large and clear */}
                    <div>
                      <span className="text-3xl font-bold text-[#2d6a2d]">₱{room.basePaxRate.toLocaleString()}</span>
                      <span className="text-[14px] text-gray-500 ml-1">/ night (fan)</span>
                    </div>
                    {room.hasAcOption && (
                      <p className="text-[14px] text-gray-500 mt-0.5">
                        ₱{(room.basePaxRate + room.acSurcharge).toLocaleString()}/night with AC
                      </p>
                    )}
                  </div>
                  {/* Big button — full width on mobile */}
                  <Link
                    href={`/rooms/${room.slug}`}
                    className="bg-[#2d6a2d] text-white px-6 py-3 rounded-xl text-[15px] font-bold hover:bg-[#1a4a1a] transition-colors whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-14 px-4 text-center bg-white border-t border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Found your room?</h2>
        <p className="text-lg text-gray-600 mb-6">Book directly and pay securely via GCash or bank transfer.</p>
        <Link
          href="/reserve"
          className="inline-block bg-[#2d6a2d] text-white px-10 py-4 rounded-xl text-[18px] font-bold hover:bg-[#1a4a1a] transition-colors"
        >
          Reserve Now
        </Link>
      </section>
    </div>
  );
}
