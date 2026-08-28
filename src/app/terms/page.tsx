import type { Metadata } from "next";
import Link from "next/link";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Cielo Alto Place",
  description: "Read the reservation, check-in, payment, and stay terms for Cielo Alto Place in Tanay, Rizal.",
};

export default function TermsPage() {
  const termsSections = [
    {
      title: "1. Reservation & Cashless Payment",
      content:
        "To secure your booking at Cielo Alto Place, reservations must be made through our official website or direct inquiry. As a cashless property, payments and booking confirmations are handled strictly via official GCash or online Bank Transfer. Full payment or the required deposit must be verified before check-in.",
    },
    {
      title: "2. Check-In & Check-Out Times",
      content:
        "Standard check-in time begins at 2:00 PM. Check-out time is strictly 12:00 Noon the following day. Early check-in or late check-out is subject to room availability and may incur additional hourly fees.",
    },
    {
      title: "3. Occupancy & Extra Guest Policy",
      content:
        "Each cabin and room has a designated standard guest capacity. Extra guests beyond the standard capacity are allowed only up to the cabin's maximum limit at a rate of ₱500 per head per night (inclusive of extra bed setup and complimentary breakfast). Mini Cabin is strictly good for 2 guests with no extra guests allowed.",
    },
    {
      title: "4. Complimentary Breakfast",
      content:
        "Free breakfast is included for all registered base guests (and extra paying guests). Breakfast meals are freshly prepared and served between 7:00 AM and 10:00 AM daily at the resort dining area.",
    },
    {
      title: "5. Cooling & Room Amenities",
      content:
        "Base cabin rates apply to fan-cooled accommodations. For rooms equipped with air conditioning (Regular Cabin, Family Cabin, Holiday Rooms, and Loft Cabin), guests may select an AC upgrade for a ₱500/night surcharge.",
    },
    {
      title: "6. Pet-Friendly Guidelines",
      content:
        "Cielo Alto Place welcomes furry companions! Pet owners are responsible for their pets' safety, behavior, and waste cleanup. Pets must be supervised at all times around common areas and walkways.",
    },
    {
      title: "7. Quiet Hours & Resort Etiquette",
      content:
        "To preserve the peaceful mountain serenity for all guests, quiet hours are observed starting at 10:00 PM. Bonfire activities, outdoor gatherings, and acoustic sessions conclude in accordance with resort guidelines.",
    },
    {
      title: "8. Cancellation & Rescheduling",
      content:
        "Rescheduling requests must be communicated at least 5 days prior to your reserved check-in date. In cases of severe weather disturbances or natural force majeure, reservations may be rebooked without penalty subject to date availability.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-5 sm:px-8 max-w-4xl">
        {/* Header Intro */}
        <div className="text-center mb-14">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold mb-3 block">
              Legal & Policy
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Please review the resort policies regarding reservations, arrivals, room usage, and guest stays.
            </p>
            <div className="w-12 h-1 bg-tertiary-container mx-auto rounded-full mt-6" />
          </Reveal>
        </div>

        {/* Content Box */}
        <div className="bg-surface rounded-3xl p-6 sm:p-10 md:p-12 border border-outline/15 shadow-sm space-y-10">
          <div className="border-b border-outline/10 pb-6">
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              Welcome to <strong>{resort.name}</strong>. By making a reservation or staying on the resort premises located at {resort.address}, guests agree to adhere to the following policies and house rules.
            </p>
          </div>

          {/* Quick Reminders Box */}
          <div className="bg-surface-container-low rounded-2xl p-6 border border-outline/10 space-y-3">
            <h2 className="font-serif text-lg font-bold text-primary">Quick Reminders</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-on-surface">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                <span><strong>Check-in:</strong> 2:00 PM · <strong>Check-out:</strong> 12:00 Noon (next day)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                <span><strong>Free Breakfast:</strong> Included for all registered guests (7:00 AM – 10:00 AM)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                <span><strong>Extra Person Fee:</strong> ₱500 per head per night (bed & breakfast included)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                <span><strong>Cashless Only:</strong> Payment via GCash or Bank Transfer</span>
              </li>
            </ul>
          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-8 divide-y divide-outline/10">
            {termsSections.map((sec, idx) => (
              <div key={idx} className={idx > 0 ? "pt-8" : ""}>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-3">
                  {sec.title}
                </h2>
                <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Footer Navigation */}
          <div className="border-t border-outline/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-on-surface-variant">
              Have questions? Reach us at {resort.phone} or {resort.email}
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/contact"
                className="bg-primary text-on-primary text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors text-center w-full sm:w-auto"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="border border-outline/25 text-primary text-xs font-semibold px-6 py-3 rounded-xl hover:bg-surface-container transition-colors text-center w-full sm:w-auto"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
