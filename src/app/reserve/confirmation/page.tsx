"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Phone, Upload } from "lucide-react";
import { resort } from "@/data/resort";

function ConfirmationInner() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "CA-XXXXXXXX";

  return (
    <div className="min-h-screen bg-[#faf7f2] py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Success icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-[#2d6a2d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[#2d6a2d]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Received!</h1>
          <p className="text-[16px] text-gray-600">Thank you for choosing Cielo Alto Place.</p>
        </div>

        {/* Reference card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 text-center">
          <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2">Your Booking Reference</p>
          <p className="text-4xl font-bold text-[#2d6a2d] font-mono tracking-wider">{ref}</p>
          <p className="text-[14px] text-gray-500 mt-2">Screenshot or write this down — you'll need it for payment</p>
        </div>

        {/* Next steps */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Next Steps</h2>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0 text-[#2d6a2d] font-bold text-[16px]">1</div>
            <div>
              <h3 className="font-bold text-gray-900">Send your payment</h3>
              <p className="text-[15px] text-gray-600 mt-1">
                Pay via <strong>GCash</strong> or <strong>Bank Transfer</strong> to the details provided by the resort. Contact us below to get the payment details.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0 text-[#2d6a2d] font-bold text-[16px]">2</div>
            <div>
              <h3 className="font-bold text-gray-900">Upload your proof of payment</h3>
              <div className="flex items-center gap-2 mt-1">
                <Upload className="w-4 h-4 text-gray-400" />
                <p className="text-[15px] text-gray-600">
                  Send a screenshot of your payment to our Facebook page or Viber, along with your booking reference <strong>{ref}</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0 text-[#2d6a2d] font-bold text-[16px]">3</div>
            <div>
              <h3 className="font-bold text-gray-900">Wait for confirmation</h3>
              <p className="text-[15px] text-gray-600 mt-1">
                We will confirm your booking via email or phone once payment is verified. See you at Cielo Alto! 🏔️
              </p>
            </div>
          </div>
        </div>

        {/* Contact to get payment details */}
        <div className="bg-[#faf7f2] rounded-2xl border border-[#2d6a2d]/10 p-5 mb-6">
          <h3 className="font-bold text-gray-900 mb-3">Get Payment Details</h3>
          <div className="space-y-3">
            <a
              href={`tel:${resort.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-[15px] text-gray-700 hover:text-[#2d6a2d] transition-colors"
            >
              <Phone className="w-5 h-5 text-[#2d6a2d]" />
              Call or Viber: <strong>{resort.phone}</strong>
            </a>
            <a
              href={resort.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[15px] text-gray-700 hover:text-[#2d6a2d] transition-colors"
            >
              <span className="text-[#2d6a2d] font-bold text-[18px]">f</span>
              Message us on <strong>Facebook</strong>
            </a>
          </div>
        </div>

        <div className="text-center space-y-3">
          <Link
            href="/"
            className="block bg-[#2d6a2d] text-white py-4 rounded-xl text-[16px] font-bold hover:bg-[#1a4a1a] transition-colors"
          >
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="block border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl text-[15px] font-semibold hover:border-[#2d6a2d] hover:text-[#2d6a2d] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p>Loading…</p></div>}>
      <ConfirmationInner />
    </Suspense>
  );
}
