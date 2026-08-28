import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resort, activityImages } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Guest Activities & Grounds",
  description:
    "Bump cars, go-karts, bonfire nights, carnival games, scenic photo spots, and pet-friendly mountain grounds at Cielo Alto Place.",
};

const activityIcons: Record<string, string> = {
  "Bump Cars & Go-Kart": "sports_motorsports",
  "Bonfire Nights": "local_fire_department",
  "Carnival Games": "attractions",
  "Massage Chairs": "spa",
  "Grilling Area": "outdoor_grill",
  "Restaurant & Mini Mart": "storefront",
  "Scenic Instagram Spots": "photo_camera",
  "Pet-Friendly": "pets",
};

export default function ActivitiesPage() {
  return (
    <div className="bg-background min-h-screen pb-0">
      {/* ─────────────────────── HERO SECTION ─────────────────────── */}
      <section className="relative w-full h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/activities/cover.jpg"
            alt="Activities at Cielo Alto Place"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-[1200px] mx-auto mt-12">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-fixed mb-3 block">
              Highland Adventures · Open to Guests
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-on-primary mb-5 leading-tight">
              Activities & Experiences
            </h1>
            <p className="text-base sm:text-lg text-surface-container-high max-w-2xl mx-auto leading-relaxed font-normal">
              From go-kart action and carnival games to calming bonfire nights under the stars, there is something for everyone.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── ACTIVITIES GRID ─────────────────────── */}
      <section className="py-16 md:py-24 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold">On-Site Recreation</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Curated for All Ages
            </h2>
            <div className="w-12 h-1 bg-tertiary-container mx-auto rounded-full mt-2" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resort.activities.map((activity, i) => {
            const iconName = activityIcons[activity.name] || "park";
            return (
              <Reveal key={activity.name} delay={i * 60}>
                <div className="bg-surface rounded-2xl p-6 border border-outline/15 shadow-sm hover:shadow-md transition-all h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-5">
                      <span className="material-symbols-outlined text-[24px]">
                        {iconName}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">
                      {activity.name}
                    </h3>
                    <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────── HIGHLAND MOMENTS BENTO GRID (Clean Photography - No Text Overlay) ─────────────────────── */}
      <section className="py-16 md:py-24 bg-surface-container-low border-y border-outline/10 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-14 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold block">Moments</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Highland Moments
              </h2>
              <p className="text-sm text-on-surface-variant max-w-lg mx-auto">
                Real glimpses of memories made across our ridge viewpoints, outdoor tracks, and evening bonfires.
              </p>
            </div>
          </Reveal>

          {/* Responsive 2-to-4 column mosaic bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[250px] gap-4">
            {activityImages.map((src, index) => {
              let spanClasses = "col-span-1 row-span-1";
              switch (index % 10) {
                case 0:
                  spanClasses = "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
                  break;
                case 1:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-2";
                  break;
                case 2:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
                  break;
                case 3:
                  spanClasses = "col-span-2 row-span-1 md:col-span-1 md:row-span-1";
                  break;
                case 4:
                  spanClasses = "col-span-1 row-span-2 md:col-span-2 md:row-span-1";
                  break;
                case 5:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
                  break;
                case 6:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-2";
                  break;
                case 7:
                  spanClasses = "col-span-2 row-span-2 md:col-span-2 md:row-span-2";
                  break;
                case 8:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
                  break;
                case 9:
                  spanClasses = "col-span-1 row-span-1 md:col-span-1 md:row-span-1";
                  break;
              }

              return (
                <Reveal
                  key={index}
                  delay={(index % 4) * 80}
                  className={`relative rounded-2xl overflow-hidden shadow-sm group bg-surface-container ${spanClasses}`}
                >
                  <Image
                    src={src}
                    alt={`Cielo Alto moment ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────── CTA SECTION (Warm Light Background - Distinct from Footer) ─────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-surface-container-low border-t border-outline/10 text-center">
        <div className="max-w-2xl mx-auto bg-surface rounded-3xl p-8 sm:p-12 border border-outline/15 shadow-sm space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
              Plan Your Adventure
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Ready to Experience Cielo Alto?
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              Book your mountain cabin today and enjoy free breakfast, bonfires, go-karts, and cool breezes in Tanay, Rizal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/reserve"
                className="w-full sm:w-auto bg-primary text-on-primary font-bold text-sm h-[52px] px-8 rounded-xl flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95"
              >
                Book Your Stay
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto border border-outline/25 text-primary bg-surface font-semibold text-sm h-[52px] px-8 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                Contact Concierge
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
