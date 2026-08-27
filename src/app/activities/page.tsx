import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resort, activityImages } from "@/data/resort";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Bump cars, go-karts, bonfire nights, carnival games, grilling area, pet-friendly stays, Instagram spots and more — activities for everyone at Cielo Alto Place.",
};

export default function ActivitiesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <section className="relative h-[45vw] max-h-[420px] min-h-[240px] overflow-hidden">
        <Image
          src={activityImages[0]}
          alt="Activities at Cielo Alto Place"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-end p-6 sm:p-12">
          <div className="text-white">
            <p className="text-[12px] font-bold text-[#4a9e4a] uppercase tracking-widest mb-2">For Guests</p>
            <h1 className="text-4xl sm:text-5xl font-bold">Activities</h1>
            <p className="text-[17px] text-white/80 mt-2">Something fun for every guest at Cielo Alto Place</p>
          </div>
        </div>
      </section>

      {/* Activities grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {resort.activities.map((activity) => (
            <div key={activity.name} className="bg-[#faf7f2] rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-shadow">
              <div className="text-5xl mb-4">{activity.icon}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{activity.name}</h2>
              <p className="text-[15px] text-gray-600 leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>

        {/* Photo wall */}
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {activityImages.slice(1, 10).map((src, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={src}
                  alt={`Cielo Alto activities photo ${idx + 2}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2d6a2d] rounded-2xl p-8 sm:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to experience it all?</h2>
          <p className="text-[17px] text-white/80 mb-6 max-w-lg mx-auto">
            Book your stay and enjoy activities, bonfire nights, great food, and mountain air all in one place.
          </p>
          <Link
            href="/reserve"
            className="inline-block bg-white text-[#2d6a2d] px-8 py-4 rounded-xl text-[17px] font-bold hover:bg-gray-100 transition-colors"
          >
            Book Your Stay
          </Link>
        </div>
      </section>
    </div>
  );
}
