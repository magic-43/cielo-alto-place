import Link from "next/link";
import Image from "next/image";
import { resort } from "@/data/resort";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-on-primary border-t border-outline/20">
      {/* Location / Times Banner */}
      <div className="bg-primary-container/60 border-b border-outline/10 text-on-primary-container">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wider uppercase font-medium">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal
          </span>
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            Check-in 2:00 PM · Check-out 12:00 Noon
          </span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Cielo Alto Place"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block">
                  Cielo Alto Place
                </span>
                <span className="text-[11px] tracking-[0.25em] uppercase text-primary-fixed block">
                  Hotel & Restaurant · Tanay, Rizal
                </span>
              </div>
            </div>
            <p className="text-surface-variant text-sm leading-relaxed max-w-md pt-2">
              A mountain sanctuary nestled along the scenic ridges of Tanay, Rizal.
              A-frame cabins, crisp highland breeze, free breakfast for all guests,
              home-style dining, and peaceful star-lit bonfire nights.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider text-primary-fixed">
              <a
                href={resort.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-on-primary inline-flex items-center gap-1.5 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12z"/>
                </svg>
                Facebook Page
              </a>
              <a
                href={`tel:${resort.phone.replace(/\s/g, "")}`}
                className="hover:text-on-primary inline-flex items-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                {resort.phone}
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-primary-fixed">Explore</h4>
            <ul className="space-y-2.5 text-sm text-surface-variant">
              <li>
                <Link href="/rooms" className="hover:text-on-primary transition-colors">
                  All Accommodations
                </Link>
              </li>
              <li>
                <Link href="/rooms/loft-cabin" className="hover:text-on-primary transition-colors">
                  Loft Cabin (A-Frame)
                </Link>
              </li>
              <li>
                <Link href="/rooms/family-cabin" className="hover:text-on-primary transition-colors">
                  Family Cabin
                </Link>
              </li>
              <li>
                <Link href="/dining" className="hover:text-on-primary transition-colors">
                  Dining & Restaurant
                </Link>
              </li>
              <li>
                <Link href="/activities" className="hover:text-on-primary transition-colors">
                  Activities & Grounds
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-on-primary transition-colors">
                  Our Story & Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-primary-fixed">Visit Us</h4>
            <div className="space-y-3 text-sm text-surface-variant">
              <p>Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal, Philippines</p>
              <p>
                <strong>Phone:</strong> {resort.phone}
              </p>
              <p>
                <strong>Email:</strong> {resort.email}
              </p>
              <div className="pt-2">
                <Link
                  href="/reserve"
                  className="inline-block bg-surface-container-high text-primary font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-white transition-colors"
                >
                  Reserve Online →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-outline/20 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-surface-variant">
          <p>© {new Date().getFullYear()} Cielo Alto Place. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-on-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-on-primary transition-colors">
              Contact
            </Link>
            <Link href="/terms" className="hover:text-on-primary transition-colors">
              Terms &amp; Conditions
            </Link>
            <Link href="/privacy" className="hover:text-on-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
