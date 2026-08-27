"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/activities", label: "Activities" },
  { href: "/dining", label: "Dining" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Cielo Alto Place"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
            <div className="leading-tight">
              <p className="font-bold text-[#2d6a2d] text-base sm:text-lg leading-none">Cielo Alto Place</p>
              <p className="text-[10px] text-[#c0392b] font-semibold tracking-widest uppercase leading-none mt-0.5">Hotel & Restaurant</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-[15px] font-medium text-gray-700 hover:text-[#2d6a2d] hover:bg-[#2d6a2d]/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+639953855517"
              className="flex items-center gap-2 text-[14px] text-gray-600 hover:text-[#2d6a2d] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+63 995 385 5517</span>
            </a>
            <Link
              href="/reserve"
              className="bg-[#2d6a2d] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#1a4a1a] transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3.5 rounded-xl text-[17px] font-medium text-gray-800 hover:bg-[#2d6a2d]/5 hover:text-[#2d6a2d] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 pb-1 space-y-2">
            <a
              href="tel:+639953855517"
              className="flex items-center gap-3 px-4 py-3 text-[16px] text-gray-700 rounded-xl hover:bg-gray-50"
            >
              <Phone className="w-5 h-5 text-[#2d6a2d]" />
              +63 995 385 5517
            </a>
            <Link
              href="/reserve"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-[#2d6a2d] text-white py-4 rounded-xl text-[17px] font-bold hover:bg-[#1a4a1a] transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
