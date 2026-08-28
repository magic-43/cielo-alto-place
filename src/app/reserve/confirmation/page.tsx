"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { resort } from "@/data/resort";
import { Reveal } from "@/components/ui/Reveal";
import { CheckCircle2, ShieldCheck, Phone, Home } from "lucide-react";

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "CA-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div className="min-h-screen bg-background pt-28 md:pt-36 pb-20 px-5 sm:px-8">
      <div className="max-w-2xl mx-auto">
        <Reveal>
          {/* Success Banner */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle2 className="w-9 h-9 text-primary-fixed" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-tertiary font-bold mb-2 block">
              Reservation & Payment Received
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">
              Booking Submitted!
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant max-w-md mx-auto">
              Your reservation and payment receipt have been securely recorded in our system.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-surface rounded-2xl border border-outline/15 shadow-sm p-6 sm:p-8 mb-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-2">
              Your Booking Reference ID
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-bold text-primary tracking-wider bg-surface-container-low py-3 px-6 rounded-xl border border-outline/10 inline-block mb-3 select-all">
              {ref}
            </div>
            <p className="text-xs text-on-surface-variant">
              Please save this reference code for your records and check-in verification.
            </p>
          </div>

          {/* Status & What Happens Next */}
          <div className="bg-surface rounded-2xl border border-outline/15 shadow-sm p-6 sm:p-8 mb-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-outline/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-primary">Payment Status: Under Verification</h2>
                <span className="text-xs text-on-surface-variant">Our concierge team will review your uploaded receipt shortly.</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-primary">Admin Verification</h3>
                  <p className="text-on-surface-variant mt-0.5">
                    Our reservation manager will verify your payment against our GCash / Bank records.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-primary">Check-in Voucher</h3>
                  <p className="text-on-surface-variant mt-0.5">
                    Once verified, a confirmation SMS or email with your official check-in voucher and gate instructions will be sent.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-primary">Arrival at Cielo Alto</h3>
                  <p className="text-on-surface-variant mt-0.5">
                    Check-in starts at <strong>2:00 PM</strong> at Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal. Free breakfast is included!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 bg-primary text-on-primary font-bold text-sm h-[52px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              Back to Homepage
            </Link>
            <a
              href="tel:+639953855517"
              className="flex-1 border border-outline/25 text-primary bg-surface font-semibold text-sm h-[52px] rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Concierge (+63 995 385 5517)
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="text-on-surface-variant">Loading confirmation details...</p>
        </div>
      }
    >
      <ConfirmationInner />
    </Suspense>
  );
}
