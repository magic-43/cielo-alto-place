import type { Metadata } from "next";
import Link from "next/link";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Privacy Policy regarding personal data, reservation records, and payment processing at Cielo Alto Place.",
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "When you make a reservation, submit an inquiry, or upload payment proof, we collect personal information necessary to manage your booking and provide hospitality services. This includes your full name, email address, mobile phone number, requested check-in/check-out dates, guest counts, special requests, and uploaded payment receipts.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your data is used strictly for booking verification, reservation confirmation, guest communication, billing records, and concierge assistance. We also use contact details to send your booking reference code, arrival guidelines, and necessary check-in updates.",
    },
    {
      title: "3. Cashless Payment & Receipt Safety",
      content:
        "Payment proofs uploaded to our secure servers (such as GCash or bank transfer transaction screenshots) are stored in access-controlled cloud storage. These proofs are used solely by authorized administrative personnel to verify and reconcile payments.",
    },
    {
      title: "4. Data Sharing & Third Parties",
      content:
        "Cielo Alto Place does not sell, rent, or trade your personal information. We do not disclose guest details to third parties except where required by Philippine law, government health/safety regulations, or to maintain essential hosting and database infrastructure.",
    },
    {
      title: "5. Data Retention & Security",
      content:
        "We maintain standard administrative and technical safeguards to protect your personal details against unauthorized access, loss, or alteration. Reservation records are retained only as long as necessary for administrative, legal, and taxation compliance.",
    },
    {
      title: "6. Your Rights & Privacy Inquiries",
      content:
        "You have the right to request access to or correction of your personal information held in our records. If you have any questions or concerns regarding our privacy practices, please contact us directly.",
    },
  ];

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-5 sm:px-8 max-w-4xl">
        {/* Header Intro */}
        <div className="text-center mb-14">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold mb-3 block">
              Data Protection
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-primary mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-on-surface-variant text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We respect your privacy and are committed to protecting the personal information you share with us.
            </p>
            <div className="w-12 h-1 bg-tertiary-container mx-auto rounded-full mt-6" />
          </Reveal>
        </div>

        {/* Content Box */}
        <div className="bg-surface rounded-3xl p-6 sm:p-10 md:p-12 border border-outline/15 shadow-sm space-y-10">
          <div className="border-b border-outline/10 pb-6">
            <p className="text-on-surface-variant text-sm sm:text-base leading-relaxed">
              This Privacy Policy explains how <strong>{resort.name}</strong> collects, stores, processes, and protects your information when you visit our website or make a reservation. Last updated: August 2026.
            </p>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-8 divide-y divide-outline/10">
            {sections.map((sec, idx) => (
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

          {/* Contact / Navigation Footer */}
          <div className="border-t border-outline/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-on-surface-variant">
              For inquiries: {resort.email} · {resort.phone}
            </p>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/terms"
                className="border border-outline/25 text-primary text-xs font-semibold px-6 py-3 rounded-xl hover:bg-surface-container transition-colors text-center w-full sm:w-auto"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/contact"
                className="bg-primary text-on-primary text-xs font-bold px-6 py-3 rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors text-center w-full sm:w-auto"
              >
                Contact Concierge
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
