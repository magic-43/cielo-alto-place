"use client";

import { MessageCircle, Phone } from "lucide-react";
import { resort } from "@/data/resort";
import { ChatbotWidget } from "@/components/ChatbotWidget";

export function FloatingActions() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Direct Facebook Messenger / Phone Call Action */}
      <a
        href={resort.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#0084FF] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group"
        aria-label="Message on Facebook Messenger"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="sr-only">Message on Facebook</span>
      </a>

      {/* Concierge Interactive Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}
