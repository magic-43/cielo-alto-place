import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { resort } from "@/data/resort";

export const metadata: Metadata = {
  title: "Contact & Location",
  description:
    "Find Cielo Alto Place at Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal. Call +63 995 385 5517 or email cieloaltoplaceph@gmail.com.",
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page header */}
      <section className="bg-[#faf7f2] border-b border-gray-100 py-12 sm:py-16 px-4 text-center">
        <p className="text-[12px] font-bold text-[#2d6a2d] uppercase tracking-widest mb-2">Find Us</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Contact & Location</h1>
        <p className="text-lg text-gray-600 mt-3">We'd love to hear from you</p>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        {/* Contact cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href={`tel:${resort.phone.replace(/\s/g, "")}`}
            className="flex items-start gap-4 bg-[#faf7f2] p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow"
          >
            <div className="w-12 h-12 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-[#2d6a2d]" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phone / Viber</p>
              <p className="text-xl font-bold text-gray-900">{resort.phone}</p>
              <p className="text-[14px] text-[#2d6a2d] mt-1">Tap to call</p>
            </div>
          </a>

          <a
            href={`mailto:${resort.email}`}
            className="flex items-start gap-4 bg-[#faf7f2] p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow"
          >
            <div className="w-12 h-12 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-[#2d6a2d]" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
              <p className="text-lg font-bold text-gray-900 break-all">{resort.email}</p>
              <p className="text-[14px] text-[#2d6a2d] mt-1">Tap to email</p>
            </div>
          </a>

          <a
            href={resort.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 bg-[#faf7f2] p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow"
          >
            <div className="w-12 h-12 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-[#2d6a2d]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/>
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Facebook</p>
              <p className="text-lg font-bold text-gray-900">Cielo Alto Place</p>
              <p className="text-[14px] text-[#2d6a2d] mt-1">Message us on Facebook</p>
            </div>
          </a>

          <div className="flex items-start gap-4 bg-[#faf7f2] p-6 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#2d6a2d]" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-in / Check-out</p>
              <p className="text-lg font-bold text-gray-900">Check-in: {resort.checkIn}</p>
              <p className="text-lg font-bold text-gray-900">Check-out: {resort.checkOut}</p>
            </div>
          </div>
        </section>

        {/* Address + Map */}
        <section className="bg-[#faf7f2] rounded-2xl p-6 sm:p-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#2d6a2d]/10 rounded-xl flex items-center justify-center shrink-0 mt-1">
              <MapPin className="w-6 h-6 text-[#2d6a2d]" />
            </div>
            <div>
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">Address</p>
              <h2 className="text-xl font-bold text-gray-900">{resort.address}</h2>
              <p className="text-[15px] text-gray-600 mt-1">Along Marcos Highway heading towards Tanay, Rizal</p>
            </div>
          </div>

          {/* Google Maps embed */}
          <div className="relative w-full h-72 rounded-xl overflow-hidden border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Cielo+Alto+Place+Tanay+Rizal&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cielo Alto Place location"
            />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <a
              href={resort.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-[#2d6a2d] text-white py-3.5 rounded-xl text-[15px] font-bold hover:bg-[#1a4a1a] transition-colors"
            >
              Open in Google Maps
            </a>
            <a
              href={`https://waze.com/ul?ll=14.4988,121.4075&navigate=yes`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl text-[15px] font-bold hover:border-[#2d6a2d] hover:text-[#2d6a2d] transition-colors"
            >
              Open in Waze
            </a>
          </div>
        </section>

        {/* How to get there */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Get Here</h2>
          <div className="space-y-4 text-[16px] text-gray-700 leading-relaxed">
            <p>🚗 <strong>By private car:</strong> From Masinag (Antipolo), take Marcos Highway (Manila East Road) towards Tanay. Cielo Alto Place is at Km 57, Sitio Mayagay, on the right side of the highway.</p>
            <p>🚌 <strong>By bus:</strong> Ride a Tanay-bound bus from Cubao (EDSA) or Masinag. Tell the driver to drop you off at Km 57 / Cielo Alto Place.</p>
            <p>📞 <strong>Need directions?</strong> Call us at <a href="tel:+639953855517" className="text-[#2d6a2d] font-bold hover:underline">{resort.phone}</a> and we'll guide you in.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
