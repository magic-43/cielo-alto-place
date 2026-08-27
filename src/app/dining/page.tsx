import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resort } from "@/data/resort";

export const metadata: Metadata = {
  title: "Dining & Restaurant",
  description:
    "Open daily 7AM–9PM. Freshly grilled Filipino meals, pizza, silog breakfast, coffee, live acoustic music nightly. Full menu at Cielo Alto Place Restaurant in Tanay, Rizal.",
};

export default function DiningPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[45vw] max-h-[420px] min-h-[240px] overflow-hidden">
        <Image
          src={resort.dining.restaurantImages[0]}
          alt="Cielo Alto Place Restaurant"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-12">
          <div className="text-white">
            <p className="text-[12px] font-bold text-[#4a9e4a] uppercase tracking-widest mb-2">Restaurant</p>
            <h1 className="text-4xl sm:text-5xl font-bold">Dining at Cielo Alto</h1>
            <p className="text-[16px] text-white/80 mt-2">{resort.dining.tagline}</p>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <div className="bg-[#2d6a2d] text-white py-4 px-4 text-center text-[15px]">
        🕖 {resort.dining.hours} &nbsp;·&nbsp; 🎸 {resort.dining.acousticSchedule}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Restaurant photos */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Our Restaurant</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {resort.dining.restaurantImages.slice(1).map((src, idx) => (
              <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={src}
                  alt={`Restaurant photo ${idx + 2}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Menu images */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-5">Full Menu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {resort.dining.menuImages.map((src, idx) => (
              <div key={idx} className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Image
                  src={src}
                  alt={`Menu page ${idx + 1}`}
                  width={800}
                  height={1100}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Menu by category */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="space-y-8">
            {resort.dining.menu.map((category) => (
              <div key={category.category} className="bg-[#faf7f2] rounded-2xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-[#2d6a2d] mb-1">{category.category}</h3>
                {category.note && (
                  <p className="text-[13px] text-gray-500 mb-4 italic">{category.note}</p>
                )}
                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item.name} className="flex items-baseline justify-between py-2 border-b border-gray-100 last:border-0 gap-4">
                      <span className="text-[16px] text-gray-800 leading-snug flex-1">{item.name}</span>
                      <span className="text-[16px] font-bold text-[#2d6a2d] shrink-0">₱{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#2d6a2d] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Stay, eat, and enjoy</h2>
          <p className="text-[16px] text-white/80 mb-5">Book a room and start your Cielo Alto experience</p>
          <Link
            href="/reserve"
            className="inline-block bg-white text-[#2d6a2d] px-8 py-3.5 rounded-xl text-[17px] font-bold hover:bg-gray-100 transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
