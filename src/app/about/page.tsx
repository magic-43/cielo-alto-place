import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us & Our Story | Cielo Alto Place",
  description:
    "Discover the story of Cielo Alto Place — a mountain sanctuary in Tanay, Rizal built for quiet escapes, family gatherings, and connection with nature.",
};

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* ─────────────────────── 1. HERO SECTION WITH TEAM COVER ─────────────────────── */}
      <section className="relative w-full h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team.jpg"
            alt="Cielo Alto Place Team & Mountain Resort"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-[1200px] mx-auto mt-14">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-fixed mb-3 block drop-shadow">
              Our Story & Heart · Tanay, Rizal
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-md">
              A Mountain Sanctuary Above the Clouds
            </h1>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
              Where mountain breezes, towering A-frame cabins, and warm Filipino hospitality come together to give you the rest you deserve.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 space-y-24">
        {/* ─────────────────────── 2. OUR STORY & ROOTS ─────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-tertiary font-bold block">
                Highland Heritage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
                Born From a Simple Wish for Slower, Greener Days
              </h2>
              <div className="space-y-4 text-on-surface-variant text-base sm:text-lg leading-[1.85]">
                <p>
                  Perched along <strong>Km 57 Marcos Highway</strong> in the quiet mountain hills of Sitio Mayagay, Tanay, <strong>Cielo Alto Place</strong> was founded on a pure, simple vision: to create a highland haven where families, couples, and friends can leave the noise of the city behind and breathe fresh mountain air.
                </p>
                <p>
                  Surrounded by rolling ridges and pine trees, our resort pairs authentic rustic architecture with modern comforts. From our signature A-frame cabins and panoramic verandas to our bonfire grounds and on-site restaurant, every corner of Cielo Alto is crafted to inspire unhurried connection.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md"
                  style={{ clipPath: "polygon(0 0, 100% 8%, 100% 100%, 0 92%)" }}
                >
                  <Image
                    src="/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg"
                    alt="Iconic A-Frame Cabin"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md mt-6"
                  style={{ clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0 100%)" }}
                >
                  <Image
                    src="/images/activities/photo_1_2026-08-26_10-21-07.jpg"
                    alt="Scenic Mountain Ridges"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────── 3. OUR GUIDING PILLARS ─────────────────────── */}
        <section className="bg-surface rounded-3xl p-8 sm:p-12 border border-outline/15 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                The Cielo Experience
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                What Makes Your Stay Special
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={100}>
              <div className="bg-surface-container-low p-8 rounded-2xl border border-outline/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">forest</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                    Highland Serenity
                  </h3>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Over 2,000 feet above sea level with naturally crisp mountain breezes, starry night skies, and sea of clouds at sunrise.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="bg-surface-container-low p-8 rounded-2xl border border-outline/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                    Warm Hospitality
                  </h3>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Our dedicated on-site team is passionate about making your mountain holiday seamless, comforting, and memorable.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="bg-surface-container-low p-8 rounded-2xl border border-outline/10 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                    Unrushed Moments
                  </h3>
                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                    Evening bonfires, go-karts, live acoustic dining, and quiet morning coffees overlooking the Rizal mountain range.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ─────────────────────── 4. EXPLORE THE GROUNDS (Correct Verified Images) ─────────────────────── */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                Explore The Grounds
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                A Glimpse Into Mountain Living
              </h2>
            </Reveal>
            <Link
              href="/rooms"
              className="text-xs font-bold uppercase tracking-wider text-primary hover:text-primary-container flex items-center gap-1 shrink-0"
            >
              View Accommodations
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Cabins */}
            <div className="relative h-72 rounded-2xl overflow-hidden bg-surface-container shadow-sm group">
              <Image
                src="/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg"
                alt="Cozy A-Frame Cabins"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif text-lg font-bold text-white">
                Cozy A-Frame Cabins
              </span>
            </div>

            {/* Card 2: Activities & Go-Karts */}
            <div className="relative h-72 rounded-2xl overflow-hidden bg-surface-container shadow-sm group">
              <Image
                src="/images/activities/665830522_1483732633763632_8675381043862118360_n.jpg"
                alt="Highland Activities and Go-Karts"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif text-lg font-bold text-white">
                Fun Mountain Activities
              </span>
            </div>

            {/* Card 3: Dining & Restaurant */}
            <div className="relative h-72 rounded-2xl overflow-hidden bg-surface-container shadow-sm group">
              <Image
                src="/images/restaurant/photo_1_2026-08-26_10-22-58.jpg"
                alt="Comforting Filipino Dining & Restaurant"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif text-lg font-bold text-white">
                Comforting Filipino Dining
              </span>
            </div>
          </div>
        </section>

        {/* ─────────────────────── 5. INVITATION CTA (Warm Light Container - Distinct from Footer) ─────────────────────── */}
        <section className="bg-surface-container-low rounded-3xl p-8 sm:p-12 border border-outline/15 shadow-sm text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <Reveal>
              <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                Your Mountain Retreat
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-primary leading-tight">
                Ready to Experience Cielo Alto?
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-lg mx-auto">
                Whether for a quiet couple's getaway, a festive family vacation, or an intimate mountain celebration, we are ready to welcome you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  href="/reserve"
                  className="w-full sm:w-auto bg-primary text-on-primary font-bold text-sm h-[52px] px-8 rounded-xl flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95"
                >
                  Book Your Escape
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
    </div>
  );
}
