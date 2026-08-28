"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { resort } from "@/data/resort";

const navLinks = [
  { label: "Accommodations", href: "/rooms" },
  { label: "Dining", href: "/dining" },
  { label: "Activities", href: "/activities" },
  { label: "About", href: "/about" },
  { label: "Contact & Location", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-outline/10 shadow-sm py-4"
            : "bg-gradient-to-b from-black/60 via-black/25 to-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Cielo Alto Place Logo"
              width={48}
              height={48}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span
              className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-primary" : "text-white drop-shadow-sm"
              }`}
            >
              Cielo Alto Place
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] font-semibold tracking-wide transition-all duration-200 ${
                    scrolled
                      ? isActive
                        ? "text-primary border-b-2 border-primary pb-0.5"
                        : "text-on-surface-variant hover:text-primary"
                      : isActive
                      ? "text-white border-b-2 border-white pb-0.5"
                      : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/reserve"
              className={`text-[14px] font-semibold tracking-wide h-[46px] px-5 rounded-lg flex items-center justify-center transition-all duration-300 active:scale-95 ${
                scrolled
                  ? "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-sm"
                  : "border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary shadow-md"
              }`}
            >
              Book Your Escape
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-primary hover:bg-surface-container"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden flex justify-end animate-fadeIn">
          <div className="w-4/5 max-w-sm bg-surface h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6 pt-16">
              <div className="flex items-center gap-3 pb-6 border-b border-outline/10">
                <Image
                  src="/images/logo.png"
                  alt="Cielo Alto Place"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="font-serif text-lg font-bold text-primary block">
                    Cielo Alto Place
                  </span>
                  <span className="text-[11px] text-tertiary font-bold tracking-widest uppercase">
                    Tanay, Rizal
                  </span>
                </div>
              </div>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-serif font-bold py-2 transition-colors flex items-center justify-between ${
                        isActive
                          ? "text-primary border-l-4 border-primary pl-3"
                          : "text-on-surface-variant hover:text-primary pl-3"
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="material-symbols-outlined text-[20px] text-outline">
                        chevron_right
                      </span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-8 border-t border-outline/10 space-y-4">
              <Link
                href="/reserve"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-primary text-on-primary font-bold text-sm h-[52px] rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md active:scale-95"
              >
                Reserve Your Stay
              </Link>
              <div className="text-center">
                <a
                  href={`tel:${resort.phone.replace(/\s/g, "")}`}
                  className="text-xs font-semibold text-primary inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  {resort.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
