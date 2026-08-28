import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";
import { MenuAccordion } from "@/components/ui/MenuAccordion";

export const metadata: Metadata = {
  title: "Dining & Acoustic Experience",
  description:
    "Open daily 7AM–9PM. Fresh inihaw grills, silog breakfast, pizza, coffee, and live acoustic music nightly in Tanay, Rizal.",
};

export default function DiningPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* ─────────────────────── 1. HERO SECTION ─────────────────────── */}
      <section className="relative w-full h-[65vh] min-h-[480px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/restaurant/photo_1_2026-08-26_10-22-58.jpg"
            alt="Cielo Alto Restaurant - Dining in the mountains"
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
              Culinary Heights · Open 7:00 AM – 9:00 PM
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-on-primary mb-5 max-w-3xl mx-auto leading-tight">
              Dining & Acoustic Experience
            </h1>
            <p className="text-base sm:text-lg text-surface-container-high max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Savor freshly grilled specialties, hearty Filipino silog favorites, and warm brewed coffee while acoustic melodies echo through the cool mountain air.
            </p>
            <div className="inline-flex items-center gap-2 bg-surface/90 text-primary font-bold text-xs px-5 py-2.5 rounded-full shadow">
              <span className="material-symbols-outlined text-[16px] text-tertiary">music_note</span>
              {resort.dining.acousticSchedule}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 2. HIGHLIGHTS CATEGORIES ─────────────────────── */}
      <section className="py-16 md:py-24 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto" id="menu">
        <Reveal>
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold">What We Serve</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Highland Flavors
            </h2>
            <div className="w-12 h-1 bg-tertiary-container mx-auto rounded-full mt-2" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Card 1: Breakfast (Span 7) */}
          <Reveal className="col-span-1 md:col-span-7 bg-surface-container-low rounded-2xl overflow-hidden border border-outline/15 group relative flex flex-col md:flex-row h-full min-h-[380px] shadow-sm">
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-surface-container">
              <Image
                src={resort.dining.restaurantImages[1] || resort.dining.restaurantImages[0]}
                alt="Breakfast at Cielo Alto"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8 w-full md:w-1/2 flex flex-col justify-center bg-surface-container-low">
              <div className="flex items-center gap-2 mb-3 text-tertiary font-bold text-xs uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                <span>Breakfast Favorites</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">All-Day Silog Meals</h3>
              <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-4">
                Served 7:00 AM – 10:00 AM with bottled water. Enjoy Tapsilog, Tocilog, Bangsilog, Danggitsilog, and American pancake sets.
              </p>
              <span className="font-serif text-xl font-bold text-primary">Starting from ₱280</span>
            </div>
          </Reveal>

          {/* Card 2: Brewed Coffee & Drinks (Span 5) */}
          <Reveal delay={100} className="col-span-1 md:col-span-5 bg-primary-container rounded-2xl overflow-hidden group relative h-full min-h-[380px] flex flex-col justify-end p-6 sm:p-8 shadow-sm">
            <Image
              src={resort.dining.restaurantImages[2] || resort.dining.restaurantImages[0]}
              alt="Artisan mountain coffee"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover opacity-35 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/75 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2 text-primary-fixed text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px]">local_cafe</span>
                <span>Brewed Mountain Roast</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-on-primary mb-2">Coffee & Beverages</h3>
              <p className="text-on-primary-container text-xs sm:text-sm leading-relaxed mb-4">
                Espresso, Cappuccino, Spanish & Salted Caramel Lattes, Mango Shakes, Frappes, and fresh herbal teas.
              </p>
              <span className="font-serif text-xl font-bold text-on-primary">From ₱90 – ₱220</span>
            </div>
          </Reveal>

          {/* Card 3: Fresh Inihaw Grills (Span 6) */}
          <Reveal delay={150} className="col-span-1 md:col-span-6 bg-surface rounded-2xl p-6 sm:p-8 border border-outline/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-tertiary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">outdoor_grill</span>
              <span>Freshly Inihaw</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Solo Inihaw Meals</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
              Served with plain rice, salted red egg, hot soup, fresh veggies & side dish:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-on-surface pt-2">
              <div className="p-2 bg-surface-container-low rounded flex justify-between">
                <span>Grilled Pork Liempo</span>
                <strong className="text-primary">₱320</strong>
              </div>
              <div className="p-2 bg-surface-container-low rounded flex justify-between">
                <span>Grilled Chicken</span>
                <strong className="text-primary">₱290</strong>
              </div>
              <div className="p-2 bg-surface-container-low rounded flex justify-between">
                <span>Stuffed Squid</span>
                <strong className="text-primary">₱420</strong>
              </div>
              <div className="p-2 bg-surface-container-low rounded flex justify-between">
                <span>Tuna Panga</span>
                <strong className="text-primary">₱480</strong>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Fiesta Platters & Pizza (Span 6) */}
          <Reveal delay={200} className="col-span-1 md:col-span-6 bg-surface rounded-2xl p-6 sm:p-8 border border-outline/15 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-tertiary text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[18px]">groups</span>
              <span>Groups & Sharing</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Fiesta Platters & Pizza</h3>
            <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed">
              Family-sized boodle sets good for 6–8 pax with tilapia, bangus, pusit, liempo, hotdogs & 2 rice platters:
            </p>
            <div className="space-y-2 text-xs font-medium text-on-surface pt-2">
              <div className="p-2.5 bg-surface-container-low rounded flex justify-between">
                <span>Fiesta Platter Set 1 (6–8 pax)</span>
                <strong className="text-primary">₱1,699</strong>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded flex justify-between">
                <span>Fiesta Platter Set 2 with Tuna & Chicken (6–8 pax)</span>
                <strong className="text-primary">₱1,999</strong>
              </div>
              <div className="p-2.5 bg-surface-container-low rounded flex justify-between">
                <span>Handcrafted Pizzas (Special, All Meat, Shawarma)</span>
                <strong className="text-primary">₱520 – ₱580</strong>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────── 3. LIVE ACOUSTIC & DINING ATMOSPHERE GALLERY ─────────────────────── */}
      <section className="py-16 bg-surface-container-low border-t border-outline/10 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto space-y-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold block mb-1">
                Mountain Atmosphere
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-3">
                Live Acoustic & Dining Gallery
              </h2>
              <p className="text-sm text-on-surface-variant">
                Every evening from 6:00 PM to 9:00 PM, enjoy live acoustic performances surrounded by the cold breeze of Tanay.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resort.dining.restaurantImages.map((src, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden shadow-sm bg-surface-container group">
                  <Image
                    src={src}
                    alt={`Cielo Alto restaurant atmosphere ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 4. FULL MENU IMAGES ─────────────────────── */}
      <section className="py-16 bg-surface border-y border-outline/10 px-5 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl font-bold text-primary mb-3">Restaurant Menu Cards</h2>
              <p className="text-sm text-on-surface-variant">Printed menu available at the dining hall</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resort.dining.menuImages.map((src, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="rounded-2xl overflow-hidden border border-outline/15 shadow-md bg-surface">
                  <Image
                    src={src}
                    alt={`Menu page ${idx + 1}`}
                    width={800}
                    height={1100}
                    className="w-full h-auto"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 5. COMPLETE MENU DIRECTORY ─────────────────────── */}
      <section className="py-20 px-5 sm:px-8 lg:px-12 max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">Full Menu Directory</h2>
            <p className="text-sm text-on-surface-variant">Walk-in diners and resort guests welcome all day</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <MenuAccordion menu={resort.dining.menu} />
        </Reveal>
      </section>

      {/* ─────────────────────── 6. RESERVATION CTA ─────────────────────── */}
      <section className="py-20 px-5 sm:px-8 bg-surface-container-low border-t border-outline/10 text-center">
        <div className="max-w-2xl mx-auto bg-surface rounded-3xl p-8 sm:p-12 border border-outline/15 shadow-sm space-y-6">
          <Reveal>
            <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
              Highland Dining & Getaways
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Stay & Dine in the Highlands
            </h2>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Book a cabin and enjoy free breakfast for all guests, scenic views, and live acoustic music.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/reserve"
                className="w-full sm:w-auto bg-primary text-on-primary font-bold text-sm h-[52px] px-8 rounded-xl flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95"
              >
                Book Your Cabin
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
