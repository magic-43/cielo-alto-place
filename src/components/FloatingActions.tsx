"use client";

import { resort } from "@/data/resort";
import { ChatbotWidget } from "@/components/ChatbotWidget";

function FacebookIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Official Facebook Button */}
      <a
        href={resort.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1877F2] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group"
        aria-label="Visit Cielo Alto Place on Facebook"
      >
        <FacebookIcon className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="sr-only">Facebook</span>
      </a>

      {/* Concierge Interactive Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
