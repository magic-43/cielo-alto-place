"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on reserve pages if desired, or keep to easily navigate
  const isReserve = pathname === "/reserve";

  const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Rooms", href: "/rooms", icon: "bed" },
    { label: "Dining", href: "/dining", icon: "restaurant" },
    { label: "Reserve", href: "/reserve", icon: "calendar_month", isAction: true },
    { label: "Location", href: "/contact", icon: "location_on" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 pb-safe bg-surface/85 backdrop-blur-xl border-t border-outline/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        if (item.isAction) {
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center rounded-full px-3 py-1 transition-all active:scale-95 ${
                isActive
                  ? "bg-primary text-on-primary"
                  : "bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary"
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase mt-0.5">
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all active:scale-95 ${
              isActive
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-medium tracking-wider mt-0.5">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
