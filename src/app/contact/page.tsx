import type { Metadata } from "next";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact & Location | Cielo Alto Place",
  description:
    "Find Cielo Alto Place at Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal. Call +63 995 385 5517 or email cieloaltoplaceph@gmail.com.",
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-20">
      {/* ─────────────────────── PAGE HERO ─────────────────────── */}
      <section className="relative w-full h-[38vh] min-h-[280px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/activities/photo_1_2026-08-26_10-21-07.jpg"
            alt="Cielo Alto Place Location"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-5 sm:px-8 max-w-[1200px] mx-auto mt-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary-fixed mb-2 block">
            Km 57 Marcos Highway · Tanay, Rizal
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-on-primary mb-2">
            Contact & Location
          </h1>
          <p className="text-xs sm:text-sm text-surface-container-high max-w-lg mx-auto">
            Reach out for bookings, event inquiries, or driving directions. We look forward to welcoming you to the highlands.
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-12 space-y-16">
        {/* ─────────────────────── CONTACT INFORMATION CARDS ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal delay={50}>
            <a
              href={`tel:${resort.phone.replace(/\s/g, "")}`}
              className="bg-surface p-8 rounded-2xl border border-outline/15 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Phone / Viber
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-primary">
                  {resort.phone}
                </p>
              </div>
              <span className="text-xs font-semibold text-tertiary flex items-center gap-1 mt-6">
                Tap to call concierge
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={100}>
            <a
              href={`mailto:${resort.email}`}
              className="bg-surface p-8 rounded-2xl border border-outline/15 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Email Address
                </span>
                <p className="font-serif text-lg sm:text-xl font-bold text-primary break-all">
                  {resort.email}
                </p>
              </div>
              <span className="text-xs font-semibold text-tertiary flex items-center gap-1 mt-6">
                Send an email inquiry
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={150}>
            <a
              href={resort.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface p-8 rounded-2xl border border-outline/15 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">forum</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                  Official Facebook Page
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-primary">
                  Cielo Alto Place
                </p>
              </div>
              <span className="text-xs font-semibold text-tertiary flex items-center gap-1 mt-6">
                Message on Messenger
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* ─────────────────────── INTERACTIVE MAP & NAVIGATION ACTIONS ─────────────────────── */}
        <div className="bg-surface rounded-2xl border border-outline/15 shadow-sm overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Map Frame */}
            <div className="lg:col-span-7 h-[340px] sm:h-[400px] rounded-xl overflow-hidden border border-outline/15 relative bg-surface-container">
              <iframe
                src="https://maps.google.com/maps?q=Cielo+Alto+Place+Tanay+Rizal&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cielo Alto Place Map"
                className="w-full h-full"
              />
            </div>

            {/* Address & Direct Navigation Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-tertiary font-bold block mb-1">
                  Resort Coordinates & Address
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-3">
                  Find Us in the Highlands
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  <strong>{resort.address}</strong>
                  <br />
                  Situated directly along Marcos Highway with wide frontage and secure mountain-view parking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={resort.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-on-primary font-bold text-sm h-[52px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">map</span>
                  Open in Google Maps
                </a>
                <a
                  href="https://waze.com/ul?ll=14.5888,121.3650&navigate=yes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-surface-container-high border border-outline/20 text-primary font-bold text-sm h-[52px] rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">navigation</span>
                  Navigate with Waze
                </a>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-outline/10 text-xs text-on-surface-variant space-y-1">
                <div className="flex justify-between">
                  <span>Check-in:</span>
                  <strong className="text-on-surface">{resort.checkIn}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Check-out:</span>
                  <strong className="text-on-surface">{resort.checkOut}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────── THE JOURNEY HERE GUIDE (1:1 Reference Styling + Original Content) ─────────────────────── */}
        <section className="pt-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-10 text-center">
              The Journey Here
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: By Private Car */}
            <Reveal delay={100}>
              <div className="relative bg-surface-container-low p-8 sm:p-10 rounded-2xl border border-outline/10 shadow-sm h-full flex flex-col justify-between overflow-hidden">
                {/* Decorative corner block from reference */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-surface-container-high/50 rounded-bl-2xl" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">directions_car</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
                    By Private Car
                  </h3>

                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-8">
                    From Masinag (Antipolo), take Marcos Highway (Manila East Road) towards Tanay. Cielo Alto Place is located at <strong>Km 57, Sitio Mayagay</strong>, on the right side of the highway.
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-outline/10 text-xs sm:text-sm font-medium text-primary">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-tertiary">near_me</span>
                    <span>Scenic route via Marcos Highway (Km 57)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-primary">local_parking</span>
                    <span>Free and ample secure parking on premises</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Card 2: By Public Transport */}
            <Reveal delay={200}>
              <div className="relative bg-surface-container-low p-8 sm:p-10 rounded-2xl border border-outline/10 shadow-sm h-full flex flex-col justify-between overflow-hidden">
                {/* Decorative corner block from reference */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-surface-container-high/50 rounded-bl-2xl" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-[24px]">directions_bus</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
                    By Public Transport (Bus / UV)
                  </h3>

                  <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed mb-8">
                    Ride a Tanay-bound bus or UV Express from Cubao (EDSA) or Masinag. Tell the driver or conductor to drop you off directly at <strong>Km 57 / Cielo Alto Place</strong>.
                  </p>
                </div>

                <div className="space-y-3 pt-6 border-t border-outline/10 text-xs sm:text-sm font-medium text-primary">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary">airport_shuttle</span>
                    <span>Direct drop-off at Km 57 Marcos Highway</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-secondary">call</span>
                    <span>Need directions on the road? Call +63 995 385 5517</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </section>
    </div>
  );
}
