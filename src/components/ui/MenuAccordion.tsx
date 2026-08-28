"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MenuItem {
  name: string;
  price: number;
  description?: string;
}

interface MenuCategory {
  category: string;
  note?: string;
  items: MenuItem[];
}

export function MenuAccordion({ menu }: { menu: MenuCategory[] }) {
  // Collapsed by default
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    menu.forEach((c) => (allOpen[c.category] = true));
    setOpenCategories(allOpen);
  };

  const collapseAll = () => {
    setOpenCategories({});
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Editorial Header Controls */}
      <div className="flex items-center justify-between text-xs tracking-wider uppercase text-on-surface-variant/80 px-2 pb-4 border-b border-outline/15">
        <span className="font-semibold text-primary/80">
          Curated Menu Sections ({menu.length})
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={expandAll}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-outline/40">/</span>
          <button
            type="button"
            onClick={collapseAll}
            className="hover:text-primary transition-colors cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Accordion Categories */}
      <div className="divide-y divide-outline/15">
        {menu.map((cat, idx) => {
          const isOpen = Boolean(openCategories[cat.category]);

          return (
            <div
              key={cat.category}
              className="py-5 sm:py-6 transition-colors group"
            >
              {/* Accordion Trigger Header */}
              <button
                type="button"
                onClick={() => toggleCategory(cat.category)}
                className="w-full flex items-center justify-between gap-6 text-left group-hover:opacity-90 select-none cursor-pointer py-1"
                aria-expanded={isOpen}
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-serif text-sm sm:text-base text-tertiary/70 font-medium">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary tracking-tight transition-colors">
                      {cat.category}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-on-surface-variant font-medium tracking-wide uppercase">
                        {cat.items.length} {cat.items.length === 1 ? "Option" : "Options"}
                      </span>
                      {cat.note && (
                        <>
                          <span className="text-outline/50 text-xs">·</span>
                          <span className="text-xs text-tertiary font-medium italic">
                            {cat.note}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Minimalist Accordion Chevron Indicator */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 flex items-center justify-center shrink-0 ${
                    isOpen
                      ? "bg-primary text-on-primary border-primary shadow-sm rotate-180"
                      : "bg-surface text-primary border-outline/25 group-hover:border-primary/50 group-hover:bg-surface-container-low"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="pt-6 pb-2 pl-0 sm:pl-12 pr-0 sm:pr-4 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="py-2.5 border-b border-outline/10 group/item flex flex-col justify-between"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="font-medium text-base sm:text-lg text-primary tracking-tight">
                            {item.name}
                          </span>
                          <strong className="font-serif text-base sm:text-lg font-bold text-primary/90 shrink-0">
                            ₱{item.price.toLocaleString()}
                          </strong>
                        </div>
                        {item.description && (
                          <p className="text-xs text-on-surface-variant/85 mt-1 leading-relaxed pr-6">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
