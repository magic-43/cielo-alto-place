import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Star, ChevronRight, Phone } from "lucide-react";
import { rooms, resort, featuredRooms } from "@/data/resort";

export default function HomePage() {
  return (
    <div>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section className="relative h-[90svh] min-h-[520px] max-h-[820px] flex items-end overflow-hidden">
        <Image
          src="/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg"
          alt="Cielo Alto Place — iconic A-frame cabins with mountain views"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Hero text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
          <div className="max-w-2xl">
            <p className="text-[13px] font-bold text-[#4a9e4a] uppercase tracking-widest mb-3">
              ⛰️ Tanay, Rizal Philippines
            </p>
            <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-4">
              Escape to the<br />
              <span className="text-[#4a9e4a]">Mountains</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed max-w-lg">
              A-frame cabins, highland air, and panoramic Tanay views — with free breakfast and warm Filipino hospitality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/reserve"
                className="inline-flex items-center justify-center gap-2 bg-[#2d6a2d] text-white px-8 py-4 rounded-xl text-[17px] font-bold hover:bg-[#1a4a1a] transition-colors"
              >
                Book Your Stay
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center bg-white/15 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-xl text-[17px] font-semibold hover:bg-white/25 transition-colors"
              >
                View Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── QUICK INFO BAR ─────────────────────── */}
      <section className="bg-[#2d6a2d] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-[14px]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#4a9e4a]" />
            <span>Check-in: <strong>2:00 PM</strong> · Check-out: <strong>12:00 Noon</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#4a9e4a]" />
            <span>Km 57 Marcos Highway, Tanay, Rizal</span>
          </div>
          <a href="tel:+639953855517" className="flex items-center gap-2 hover:text-[#4a9e4a] transition-colors">
            <Phone className="w-4 h-4 text-[#4a9e4a]" />
            <span>+63 995 385 5517</span>
          </a>
        </div>
      </section>

      {/* ─────────────────────── FEATURED ROOMS ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold text-[#2d6a2d] uppercase tracking-widest mb-2">Where You'll Stay</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Rooms & Cabins</h2>
            <p className="text-lg text-gray-600 mt-3 max-w-xl mx-auto">
              Every room includes <strong>free breakfast</strong>. Fan or AC option available for most rooms.
            </p>
          </div>

          {/* Featured rooms grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredRooms.map((room) => (
              <Link key={room.slug} href={`/rooms/${room.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={room.heroImage}
                    alt={room.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {room.tag && (
                    <div className="absolute top-3 left-3 bg-[#2d6a2d] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">
                      {room.tag}
                    </div>
                  )}
                  {room.hasAcOption && (
                    <div className="absolute top-3 right-3 bg-white/90 text-[#2d6a2d] px-2.5 py-1 rounded-full text-[11px] font-bold">
                      Fan / AC
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{room.name}</h3>
                  <p className="text-[14px] text-gray-500 mb-3 leading-relaxed">{room.shortDescription}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#2d6a2d]">₱{room.basePaxRate.toLocaleString()}</span>
                      <span className="text-[13px] text-gray-500 ml-1">/ night</span>
                    </div>
                    <span className="text-[13px] font-semibold text-[#2d6a2d] group-hover:underline">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 border-2 border-[#2d6a2d] text-[#2d6a2d] px-8 py-3.5 rounded-xl text-[16px] font-bold hover:bg-[#2d6a2d] hover:text-white transition-colors"
            >
              See All {rooms.length} Rooms
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── WHY CIELO ALTO ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[12px] font-bold text-[#2d6a2d] uppercase tracking-widest mb-3">Why Cielo Alto?</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">A different kind of mountain getaway</h2>
              <div className="space-y-5">
                {[
                  { icon: "🍳", title: "Free Breakfast Included", desc: "Every room comes with free breakfast for all base guests — no hidden extras." },
                  { icon: "⛰️", title: "Panoramic Mountain Views", desc: "Wake up to sweeping highland views of Tanay, Rizal from your private veranda." },
                  { icon: "❄️", title: "Fan or AC — Your Choice", desc: "Cool mountain air or air conditioning? Choose what makes you comfortable." },
                  { icon: "🐾", title: "Pet-Friendly Property", desc: "Bring your furry family members — pets are welcome at Cielo Alto Place." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-2xl mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-[17px] font-bold text-gray-900">{item.title}</h3>
                      <p className="text-[15px] text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/activities/photo_1_2026-08-26_10-21-07.jpg"
                alt="Activities at Cielo Alto Place"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────── ACTIVITIES STRIP ─────────────────────── */}
      <section className="py-16 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-bold text-[#2d6a2d] uppercase tracking-widest mb-2">Things to Do</p>
            <h2 className="text-3xl font-bold text-gray-900">Activities for Everyone</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {resort.activities.slice(0, 4).map((a) => (
              <div key={a.name} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100">
                <div className="text-4xl mb-3">{a.icon}</div>
                <p className="font-bold text-[15px] text-gray-900">{a.name}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/activities" className="text-[15px] font-semibold text-[#2d6a2d] hover:underline flex items-center justify-center gap-1">
              See all activities <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────── DINING TEASER ─────────────────────── */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/images/restaurant/photo_1_2026-08-26_10-22-58.jpg"
          alt="Cielo Alto Place Restaurant"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[12px] font-bold text-[#4a9e4a] uppercase tracking-widest mb-3">Open Daily · 7 AM – 9 PM</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Eat, Relax, Enjoy</h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Freshly grilled meals, Filipino favorites, pizza, coffee, and live acoustic music every night — all with cold mountain air.
          </p>
          <Link
            href="/dining"
            className="inline-flex items-center gap-2 bg-white text-[#2d6a2d] px-8 py-3.5 rounded-xl text-[16px] font-bold hover:bg-gray-100 transition-colors"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ─────────────────────── BOOK CTA ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#2d6a2d]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Star className="w-10 h-10 text-[#4a9e4a] mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Book Your Mountain Escape?</h2>
          <p className="text-lg text-white/80 mb-8">
            Choose your cabin, select your dates, and pay via GCash or bank transfer. Cashless, easy, and secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/reserve"
              className="bg-white text-[#2d6a2d] px-8 py-4 rounded-xl text-[17px] font-bold hover:bg-gray-100 transition-colors"
            >
              Book Now
            </Link>
            <a
              href="tel:+639953855517"
              className="border-2 border-white/60 text-white px-8 py-4 rounded-xl text-[17px] font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
