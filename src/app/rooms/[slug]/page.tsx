import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Wind, Thermometer, Users, Coffee, Check, ChevronLeft, Phone } from "lucide-react";
import { rooms, getRoomBySlug } from "@/data/resort";

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = getRoomBySlug(slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: room.name,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = getRoomBySlug(slug);

  if (!room) notFound();

  const fanRate = room.basePaxRate;
  const acRate = room.basePaxRate + room.acSurcharge;

  return (
    <div className="bg-white min-h-screen pb-28 sm:pb-16">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1.5 text-[15px] text-gray-500 hover:text-[#2d6a2d] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to all rooms
        </Link>
      </div>

      {/* Hero image */}
      <div className="relative h-[55vw] max-h-[520px] min-h-[280px] bg-gray-100 overflow-hidden">
        <Image
          src={room.heroImage}
          alt={room.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Room name + tags */}
            <div>
              {room.tag && (
                <span className="inline-block bg-[#2d6a2d]/10 text-[#2d6a2d] text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  {room.tag}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">{room.name}</h1>
              {/* Occupancy row */}
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="flex items-center gap-2 text-[16px] text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Users className="w-5 h-5 text-[#2d6a2d]" />
                  Up to {room.standardGuests} base guests
                  {room.maxExtraGuests > 0 ? ` (+${room.maxExtraGuests} extra)` : " — no extra guests"}
                </span>
                <span className="flex items-center gap-2 text-[16px] text-gray-700 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                  <Coffee className="w-5 h-5 text-[#2d6a2d]" />
                  Free breakfast for {room.standardGuests}
                </span>
              </div>
            </div>

            {/* Description — 17px minimum for elder readability */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this room</h2>
              <p className="text-[17px] text-gray-700 leading-[1.8]">{room.description}</p>
            </div>

            {/* Fan / AC pricing section */}
            <div className="bg-[#faf7f2] rounded-2xl p-6 border border-[#2d6a2d]/10">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Room Type & Pricing</h2>
              {room.hasAcOption ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Wind className="w-5 h-5 text-[#2d6a2d]" />
                      <span className="font-bold text-gray-900 text-[16px]">Fan Room</span>
                    </div>
                    <p className="text-3xl font-bold text-[#2d6a2d]">₱{fanRate.toLocaleString()}</p>
                    <p className="text-[14px] text-gray-500 mt-1">per night</p>
                  </div>
                  <div className="bg-white rounded-xl p-5 border border-[#2d6a2d]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Thermometer className="w-5 h-5 text-[#2d6a2d]" />
                      <span className="font-bold text-gray-900 text-[16px]">Air-Conditioned Room</span>
                    </div>
                    <p className="text-3xl font-bold text-[#2d6a2d]">₱{acRate.toLocaleString()}</p>
                    <p className="text-[14px] text-gray-500 mt-1">per night (+₱500 AC surcharge)</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-5 border border-gray-200 max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5 text-[#2d6a2d]" />
                    <span className="font-bold text-gray-900 text-[16px]">Fan Room (only option)</span>
                  </div>
                  <p className="text-3xl font-bold text-[#2d6a2d]">₱{fanRate.toLocaleString()}</p>
                  <p className="text-[14px] text-gray-500 mt-1">per night</p>
                  <p className="text-[13px] text-amber-700 mt-2 bg-amber-50 px-3 py-1.5 rounded-lg">
                    Mini Cabin has no AC option. Enjoy the cool mountain breeze!
                  </p>
                </div>
              )}

              {/* Extra guest note */}
              {room.maxExtraGuests > 0 ? (
                <p className="text-[15px] text-gray-600 mt-4 p-3 bg-white rounded-xl border border-gray-100">
                  ➕ Extra guests: <strong>₱500/person</strong> — includes breakfast & bed (max {room.maxExtraGuests} extra)
                </p>
              ) : (
                <p className="text-[15px] text-amber-700 mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  ⚠️ This room does not allow extra guests.
                </p>
              )}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Room Inclusions</h2>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((item) => (
                  <span
                    key={item}
                    className="flex items-center gap-2 text-[15px] text-gray-800 bg-[#2d6a2d]/8 border border-[#2d6a2d]/15 px-4 py-2 rounded-xl"
                  >
                    <Check className="w-4 h-4 text-[#2d6a2d] shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {room.images.length > 1 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.images.map((src, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                      <Image
                        src={src}
                        alt={`${room.name} photo ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky booking card (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
              <p className="text-[15px] text-gray-500 mb-5">{room.beds} · {room.standardGuests} guests</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-[15px] text-gray-700">Fan Room</span>
                  <span className="font-bold text-[17px] text-[#2d6a2d]">₱{fanRate.toLocaleString()}/night</span>
                </div>
                {room.hasAcOption && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-[15px] text-gray-700">AC Room</span>
                    <span className="font-bold text-[17px] text-[#2d6a2d]">₱{acRate.toLocaleString()}/night</span>
                  </div>
                )}
                {room.maxExtraGuests > 0 && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[14px] text-gray-600">Extra guest</span>
                    <span className="text-[14px] text-gray-600">₱500/head</span>
                  </div>
                )}
              </div>

              <Link
                href={`/reserve?room=${room.slug}`}
                className="block w-full text-center bg-[#2d6a2d] text-white py-4 rounded-xl text-[17px] font-bold hover:bg-[#1a4a1a] transition-colors mb-3"
              >
                Reserve This Room
              </Link>
              <a
                href="tel:+639953855517"
                className="flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl text-[15px] font-semibold hover:border-[#2d6a2d] hover:text-[#2d6a2d] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call to Inquire
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="tel:+639953855517"
          className="flex-none flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-4 py-3.5 rounded-xl font-semibold hover:border-[#2d6a2d] hover:text-[#2d6a2d] transition-colors"
        >
          <Phone className="w-5 h-5" />
        </a>
        <Link
          href={`/reserve?room=${room.slug}`}
          className="flex-1 text-center bg-[#2d6a2d] text-white py-4 rounded-xl text-[17px] font-bold hover:bg-[#1a4a1a] transition-colors"
        >
          Reserve This Room
        </Link>
      </div>
    </div>
  );
}
