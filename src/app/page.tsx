import Image from "next/image";
import Link from "next/link";
import { rooms, resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  const featured = rooms.filter((r) =>
    ["loft-cabin", "regular-cabin", "family-cabin"].includes(r.slug)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* ─────────────────────── 1. HERO SECTION ─────────────────────── */}
      <section className="relative w-full h-[95vh] min-h-[600px] max-h-[920px] flex items-center justify-center slant-edge-bottom overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/loft-cabin/photo_1_2026-08-26_10-20-21.jpg"
            alt="Cielo Alto Place - Mountain cabins nestled in Tanay highlands"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-black/20 to-black/50" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-5 sm:px-8 mt-16">
          <Reveal delay={100}>
            <div className="inline-flex items-center gap-2 bg-surface/85 backdrop-blur-md text-primary px-4 py-1.5 rounded-full mb-6 border border-outline/10 text-xs font-semibold uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary">terrain</span>
              Tanay, Rizal Philippines
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-on-primary mb-6 drop-shadow-md leading-[1.08]">
              Experience Mountain Serenity
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="text-lg sm:text-xl text-inverse-on-surface mb-10 max-w-2xl mx-auto drop-shadow font-normal leading-relaxed">
              Disconnect from the city noise and immerse yourself in iconic A-frame cabins, crisp highland breeze, and warm Filipino hospitality.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/reserve"
                className="bg-primary text-on-primary font-semibold text-[15px] h-[56px] px-8 rounded-lg flex items-center justify-center w-full sm:w-auto hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-lg active:scale-95 duration-200"
              >
                Book a Cabin
              </Link>
              <Link
                href="/rooms"
                className="bg-surface/90 backdrop-blur-sm text-primary font-semibold text-[15px] h-[56px] px-8 rounded-lg flex items-center justify-center w-full sm:w-auto hover:bg-surface transition-colors shadow-lg border border-outline/10 active:scale-95 duration-200"
              >
                Explore Accommodations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 2. OUR STORY (Side-by-side with Activities Hero image) ─────────────────────── */}
      <section className="py-20 md:py-28 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
              <Image
                src="/images/activities/photo_1_2026-08-26_10-21-07.jpg"
                alt="Cielo Alto Place mountain grounds and highland retreat"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="space-y-6">
            <div className="flex items-center gap-2 text-tertiary font-semibold">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                park
              </span>
              <span className="text-xs uppercase tracking-[0.25em]">Our Story</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Rooted in the Highlands
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
              Cielo Alto Place was born from a simple desire: to create a sanctuary where the rugged beauty of the Tanay mountains meets genuine comfort. Located along Km 57 of Marcos Highway, our cabins blur the line between indoor rest and outdoor majesty.
            </p>
            <p className="text-on-surface-variant text-base leading-relaxed">
              Whether you are here for cool morning mist, quiet couple moments, or hearty family bonfire feasts under the stars, your mountain getaway is built with care.
            </p>
            <div className="pt-2">
              <Link
                href="/rooms"
                className="text-sm font-semibold text-tertiary-container border-b-2 border-tertiary-container pb-1 hover:text-on-tertiary-container transition-colors inline-flex items-center gap-2"
              >
                Discover our rooms & cabins <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 3. FEATURED ACCOMMODATIONS (Bento Layout) ─────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-container-low px-5 sm:px-8 lg:px-12 border-y border-outline/10">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold">Where You'll Stay</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Your Mountain Hideaway
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
                Every room includes <strong>free breakfast</strong> for base guests. Fan or Air Conditioning available.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Featured: Loft Cabin (Span 8) */}
            {featured[0] && (
              <Reveal className="md:col-span-8 group relative rounded-2xl overflow-hidden bg-surface border border-outline/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="h-64 sm:h-80 md:h-96 relative overflow-hidden bg-surface-container">
                    <Image
                      src={featured[0].heroImage}
                      alt={featured[0].name}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded">
                      Iconic A-Frame
                    </div>
                    <div className="absolute top-4 right-4 bg-surface/90 text-primary text-xs font-bold px-3 py-1.5 rounded shadow">
                      Fan · AC Available
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-1">
                          {featured[0].name}
                        </h3>
                        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                          {featured[0].shortDescription}
                        </p>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container text-xs font-bold px-3 py-1.5 rounded shrink-0">
                        {featured[0].standardGuests} Guests · Up to {featured[0].standardGuests + featured[0].maxExtraGuests}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-medium text-secondary mt-4 mb-6">
                      <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded">
                        <span className="material-symbols-outlined text-[16px]">bed</span> {featured[0].beds}
                      </span>
                      <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded">
                        <span className="material-symbols-outlined text-[16px]">balcony</span> Private Veranda
                      </span>
                      <span className="flex items-center gap-1.5 bg-surface-container px-3 py-1 rounded">
                        <span className="material-symbols-outlined text-[16px]">shower</span> Private CR
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-outline/10 pt-4">
                  <div>
                    <span className="text-xs text-on-surface-variant uppercase tracking-wider block">Starting from</span>
                    <span className="font-serif text-3xl font-bold text-primary">₱{featured[0].basePaxRate.toLocaleString()}</span>
                    <span className="text-xs text-on-surface-variant ml-1">/ night</span>
                  </div>
                  <Link
                    href={`/rooms/${featured[0].slug}`}
                    className="w-full sm:w-auto bg-primary text-on-primary font-semibold text-sm h-[48px] px-7 rounded-lg flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors"
                  >
                    View Cabin Details
                  </Link>
                </div>
              </Reveal>
            )}

            {/* Side 2 Cabins (Span 4) */}
            <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8">
              {featured.slice(1, 3).map((room, i) => (
                <Reveal key={room.slug} delay={i * 100} className="flex-1 group relative rounded-2xl overflow-hidden bg-surface border border-outline/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                  <div className="h-44 relative overflow-hidden bg-surface-container">
                    <Image
                      src={room.heroImage}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 bg-surface/90 text-primary text-[11px] font-bold px-2.5 py-1 rounded shadow">
                      {room.hasAcOption ? "Fan / AC" : "Fan"}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif text-xl font-bold text-primary">{room.name}</h3>
                        <span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded">
                          {room.standardGuests} Guests
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">
                        {room.shortDescription}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-outline/10">
                      <div>
                        <span className="font-serif text-lg font-bold text-primary">₱{room.basePaxRate.toLocaleString()}</span>
                        <span className="text-[11px] text-on-surface-variant">/nt</span>
                      </div>
                      <Link
                        href={`/rooms/${room.slug}`}
                        className="text-xs font-semibold text-tertiary-container hover:text-on-tertiary-container flex items-center gap-1"
                      >
                        Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={200}>
            <div className="text-center mt-12">
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 bg-surface text-primary border border-outline/25 h-[52px] px-8 rounded-lg font-semibold text-sm hover:bg-surface-container transition-colors shadow-sm"
              >
                Browse All {rooms.length} Accommodations
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 4. DINING (Side-by-side Layout without Card Container) ─────────────────────── */}
      <section className="py-20 md:py-28 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Clean High-Res Image */}
          <Reveal className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-surface-container">
            <Image
              src="/images/restaurant/photo_1_2026-08-26_10-22-58.jpg"
              alt="Cielo Alto Restaurant with acoustic music atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </Reveal>

          {/* Right: Clean Typography without Card Container */}
          <Reveal delay={150} className="space-y-6">
            <div className="flex items-center gap-2 text-tertiary font-bold text-xs uppercase tracking-[0.25em]">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                restaurant
              </span>
              <span>Highland Dining</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Highland Flavors & Acoustic Nights
            </h2>

            <p className="text-on-surface-variant text-base sm:text-lg leading-relaxed">
              Gather around fire-warmed tables for our signature inihaw grilled favorites, freshly baked pizza, silog breakfasts, and hot brewed mountain coffee. Live acoustic music every evening sets the perfect mountain soundtrack.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary">
              <span className="material-symbols-outlined text-[18px] text-tertiary">schedule</span>
              <span>Open Daily 7:00 AM – 9:00 PM · Live acoustic nightly</span>
            </div>

            <div className="pt-2">
              <Link
                href="/dining"
                className="bg-primary text-on-primary font-semibold text-sm h-[52px] px-8 rounded-lg inline-flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95"
              >
                View Full Menu
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 5. CURATED ACTIVITIES (Large Visual Cards like Piero) ─────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-container-low px-5 sm:px-8 lg:px-12 border-t border-outline/10">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16 space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold">Curated Experiences</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Find Your Mountain Rhythm
              </h2>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto">
                Engage with the mountain outdoors through unique activities for thrill, play, and relaxation.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Card 1: Go-Kart & Bump Cars (Large Span 8) */}
            <Reveal className="md:col-span-12 lg:col-span-8">
              <Link
                href="/activities"
                className="group relative block overflow-hidden rounded-2xl shadow-md aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1] bg-primary"
              >
                <Image
                  src="/images/activities/photo_6_2026-08-26_10-21-07.jpg"
                  alt="Bump Cars & Go-Kart in Tanay"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col items-start text-left text-on-primary">
                  <span className="bg-tertiary-container/90 text-on-tertiary-container text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-3">
                    Thrill &amp; Play
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-2">
                    Bump Cars &amp; Go-Karts
                  </h3>
                  <p className="text-surface-variant text-xs sm:text-sm max-w-lg mb-4 line-clamp-2">
                    Race across high-altitude outdoor tracks surrounded by pine trees and cool mountain air.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary-fixed group-hover:text-on-primary transition-colors">
                    Explore Activity <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 2: Bonfire Nights (Span 4) */}
            <Reveal delay={150} className="md:col-span-6 lg:col-span-4">
              <Link
                href="/activities"
                className="group relative block overflow-hidden rounded-2xl shadow-md aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1/1] bg-primary h-full"
              >
                <Image
                  src="/images/activities/665830522_1483732633763632_8675381043862118360_n.jpg"
                  alt="Bonfire Nights under Tanay stars"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start text-left text-on-primary">
                  <span className="bg-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-2">
                    Evening Magic
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                    Bonfire Nights
                  </h3>
                  <p className="text-surface-variant text-xs mb-3 line-clamp-2">
                    Gather under the clear star-lit highland sky with warm fire and storytelling.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary-fixed group-hover:text-on-primary transition-colors">
                    Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 3: Carnival & Arcade Games (Span 4) */}
            <Reveal delay={200} className="md:col-span-6 lg:col-span-4">
              <Link
                href="/activities"
                className="group relative block overflow-hidden rounded-2xl shadow-md aspect-[4/3] sm:aspect-square bg-primary"
              >
                <Image
                  src="/images/activities/photo_5_2026-08-26_10-21-07.jpg"
                  alt="Carnival Games at Cielo Alto"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start text-left text-on-primary">
                  <span className="bg-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-2">
                    Recreation
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                    Carnival Games
                  </h3>
                  <p className="text-surface-variant text-xs mb-3 line-clamp-2">
                    Win prizes, test your aim, and enjoy fish scooping and arcade game stations.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary-fixed group-hover:text-on-primary transition-colors">
                    Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 4: Play Park & Pet-Friendly Grounds (Span 4) */}
            <Reveal delay={250} className="md:col-span-6 lg:col-span-4">
              <Link
                href="/activities"
                className="group relative block overflow-hidden rounded-2xl shadow-md aspect-[4/3] sm:aspect-square bg-primary"
              >
                <Image
                  src="/images/activities/photo_8_2026-08-26_10-21-07.jpg"
                  alt="Outdoor playground and pet-friendly resort grounds"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start text-left text-on-primary">
                  <span className="bg-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-2">
                    Family &amp; Pets
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                    Playground &amp; Grounds
                  </h3>
                  <p className="text-surface-variant text-xs mb-3 line-clamp-2">
                    Spacious turf grounds and outdoor play park for kids and furry family members.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary-fixed group-hover:text-on-primary transition-colors">
                    Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Card 5: Scenic Photo Spots (Span 4) */}
            <Reveal delay={300} className="md:col-span-6 lg:col-span-4">
              <Link
                href="/activities"
                className="group relative block overflow-hidden rounded-2xl shadow-md aspect-[4/3] sm:aspect-square bg-primary"
              >
                <Image
                  src="/images/activities/468482510_918210906937450_3873911303095158899_n.jpg"
                  alt="Scenic mountain photo spots"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col items-start text-left text-on-primary">
                  <span className="bg-primary-container text-on-primary-container text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-2">
                    Highland Views
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1">
                    Scenic Photo Spots
                  </h3>
                  <p className="text-surface-variant text-xs mb-3 line-clamp-2">
                    Capture the sea of clouds and mountain silhouettes across our scenic vantage points.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary-fixed group-hover:text-on-primary transition-colors">
                    Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────── 6. FINAL BOOKING CTA ─────────────────────── */}
      <section className="py-20 md:py-24 bg-surface-container-low border-t border-outline/10 text-center px-5 sm:px-8">
        <div className="max-w-2xl mx-auto bg-surface rounded-3xl p-8 sm:p-12 border border-outline/15 shadow-sm space-y-6">
          <Reveal>
            <span className="material-symbols-outlined text-4xl text-primary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
              cabin
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight">
              Ready for your mountain retreat?
            </h2>
            <p className="text-on-surface-variant text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Book directly online. Enjoy free daily breakfast and seamless cashless reservation via GCash or Bank Transfer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link
                href="/reserve"
                className="bg-primary text-on-primary font-bold text-sm h-[54px] px-8 rounded-xl flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95 duration-200"
              >
                Reserve Your Stay
              </Link>
              <a
                href="tel:+639953855517"
                className="border border-outline/25 text-primary bg-surface font-semibold text-sm h-[54px] px-8 rounded-xl flex items-center justify-center hover:bg-surface-container transition-colors"
              >
                Call +63 995 385 5517
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
