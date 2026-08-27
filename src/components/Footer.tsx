import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { resort } from "@/data/resort";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Cielo Alto Place"
                width={48}
                height={48}
                className="w-11 h-11 object-contain rounded-lg bg-white p-1"
              />
              <div>
                <p className="font-bold text-white text-base">Cielo Alto Place</p>
                <p className="text-[11px] text-[#c0392b] font-semibold tracking-widest uppercase">Hotel & Restaurant</p>
              </div>
            </div>
            <p className="text-gray-400 text-[15px] leading-relaxed">
              A highland mountain escape in Tanay, Rizal. A-frame cabins, panoramic views, free breakfast, and warm Filipino hospitality.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/rooms", label: "Our Rooms" },
                { href: "/activities", label: "Activities" },
                { href: "/dining", label: "Dining & Restaurant" },
                { href: "/contact", label: "Contact & Location" },
                { href: "/reserve", label: "Book a Room" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href={`tel:${resort.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 text-[15px] text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-[#2d6a2d]" />
                  {resort.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${resort.email}`} className="flex items-start gap-3 text-[15px] text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[#2d6a2d]" />
                  {resort.email}
                </a>
              </li>
              <li>
                <a href={resort.facebook} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[15px] text-gray-300 hover:text-white transition-colors">
                  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#2d6a2d]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/>
                  </svg>
                  Facebook Page
                </a>
              </li>
              <li>
                <a href={resort.googleMaps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-[15px] text-gray-300 hover:text-white transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#2d6a2d]" />
                  <span>{resort.address}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + policy row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Cielo Alto Place. All rights reserved.</p>
          <div className="flex items-center gap-1 text-gray-600">
            <span>Check-in {resort.checkIn}</span>
            <span className="mx-2 text-gray-700">·</span>
            <span>Check-out {resort.checkOut}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
