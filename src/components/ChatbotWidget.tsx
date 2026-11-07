"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, X, Send, Phone, MessageCircle } from "lucide-react";
import { resort, rooms as fallbackRooms, type RoomType } from "@/data/resort";
import { useCieloRooms } from "@/hooks/useCieloRooms";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  button?: { text: string; link: string; external?: boolean };
};

const QUICK_REPLIES = [
  { id: "cabins", text: "Cabins & Rates" },
  { id: "book", text: "How to Book" },
  { id: "checkin", text: "Check-in Times" },
  { id: "activities", text: "Activities & Go-Karts" },
  { id: "dining", text: "Restaurant & Acoustic" },
  { id: "pets", text: "Pet Policy" },
  { id: "directions", text: "Location & Directions" },
  { id: "payment", text: "Payment Methods" },
  { id: "facebook", text: "Facebook Page" },
];

function formatRoomsSummary(roomsList: RoomType[]) {
  const list = roomsList && roomsList.length > 0 ? roomsList : fallbackRooms;
  const lines = list.map(
    (r) =>
      `• ${r.name} (${r.standardGuests}${r.maxExtraGuests > 0 ? `-${r.standardGuests + r.maxExtraGuests}` : ""} pax): ₱${r.basePaxRate.toLocaleString()}/night`
  );
  return `We offer cozy mountain accommodations:\n${lines.join("\n")}\n\nAll rates include complimentary breakfast! Optional AC upgrade is available for +₱500/night.`;
}

function getBotAnswer(query: string, roomsList: RoomType[] = fallbackRooms): { text: string; button?: { text: string; link: string; external?: boolean } } {
  const q = query.toLowerCase();

  if (q.includes("room") || q.includes("cabin") || q.includes("rate") || q.includes("price") || q.includes("cost") || q.includes("how much")) {
    return {
      text: formatRoomsSummary(roomsList),
      button: { text: "View All Cabins", link: "/rooms" },
    };
  }

  if (q.includes("book") || q.includes("reserve") || q.includes("availability") || q.includes("how to")) {
    return {
      text: "You can easily reserve your stay online! Choose your dates, pick your preferred cabin and cooling options, fill in your guest details, and submit your reservation.",
      button: { text: "Book Your Stay Now", link: "/reserve" },
    };
  }

  if (q.includes("check") || q.includes("time") || q.includes("in") || q.includes("out") || q.includes("hours")) {
    return {
      text: `Standard check-in is at ${resort.checkIn} and check-out is at ${resort.checkOut} the next day. Complimentary daily breakfast is served from 7:00 AM to 10:00 AM.`,
    };
  }

  if (q.includes("food") || q.includes("menu") || q.includes("dining") || q.includes("eat") || q.includes("restaurant") || q.includes("breakfast") || q.includes("acoustic") || q.includes("music")) {
    return {
      text: "Our on-site restaurant is open daily from 7:00 AM to 9:00 PM (walk-ins welcome!). We serve all-day breakfast, inihaw/grilled seafood & meats, pizzas, fiesta platters, artisan coffee, and frappes. Enjoy live acoustic sessions every evening (6-9 PM) and weekend lunch!",
      button: { text: "View Full Menu", link: "/dining" },
    };
  }

  if (q.includes("activit") || q.includes("kart") || q.includes("gokart") || q.includes("bump") || q.includes("bonfire") || q.includes("game") || q.includes("play")) {
    return {
      text: "Cielo Alto offers bump cars, go-karts, nightly mountain campfires under the stars, carnival games, fish scooping, massage chairs, and scenic photo spots overlooking the Sierra Madre range.",
      button: { text: "Explore Activities", link: "/activities" },
    };
  }

  if (q.includes("pet") || q.includes("dog") || q.includes("cat") || q.includes("animal")) {
    return {
      text: "Yes, Cielo Alto Place is proud to be pet-friendly! We welcome your furry family members to enjoy the spacious mountain turf and fresh breeze.",
    };
  }

  if (q.includes("where") || q.includes("locate") || q.includes("direction") || q.includes("map") || q.includes("waze") || q.includes("address") || q.includes("how to get")) {
    return {
      text: `We are located at ${resort.address}, Tanay, Rizal (~1.5 to 2 hours from Metro Manila via Marcos Highway / Antipolo). Search "Cielo Alto Place" on Google Maps or Waze.`,
      button: { text: "Open Google Maps", link: "https://maps.google.com/?q=Cielo+Alto+Place+Tanay+Rizal", external: true },
    };
  }

  if (q.includes("pay") || q.includes("gcash") || q.includes("bank") || q.includes("card") || q.includes("cash")) {
    return {
      text: "We accept cashless payments via GCash and Bank Transfer. Payment details and receipt upload are provided during the reservation process.",
      button: { text: "Reserve & Pay", link: "/reserve" },
    };
  }

  if (q.includes("contact") || q.includes("phone") || q.includes("viber") || q.includes("call") || q.includes("number") || q.includes("messenger") || q.includes("facebook") || q.includes("email")) {
    return {
      text: `You can reach our concierge directly at ${resort.phone} (Call / Viber), message us on our official Facebook page, or email ${resort.email}.`,
      button: { text: "Message on Facebook", link: resort.facebook, external: true },
    };
  }

  return {
    text: "Thank you for reaching out! For instant personal assistance with room availability, custom events, or day trips, feel free to chat with our front desk team on Messenger or call us.",
    button: { text: "Chat on Messenger", link: resort.facebook, external: true },
  };
}

export function ChatbotWidget() {
  const { rooms: dynamicRooms } = useCieloRooms();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Mabuhay! Welcome to Cielo Alto Place, Tanay. How can we help you plan your highland escape today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleQuickReply = (id: string, text: string) => {
    if (id === "facebook" || id === "messenger") {
      window.open(resort.facebook, "_blank");
      return;
    }

    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text }]);

    setTimeout(() => {
      let botResponse: Message;

      switch (id) {
        case "cabins":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: formatRoomsSummary(dynamicRooms),
            button: { text: "View Accommodations", link: "/rooms" },
          };
          break;
        case "book":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "You can book directly on our website in 4 quick steps: choose your dates, pick your cabin & cooling, enter guest details, and upload your payment proof.",
            button: { text: "Reserve Now", link: "/reserve" },
          };
          break;
        case "checkin":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: `Standard check-in is at ${resort.checkIn} and check-out is at ${resort.checkOut} the following day. Complimentary daily breakfast is served from 7:00 AM to 10:00 AM.`,
          };
          break;
        case "activities":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Enjoy bump cars, go-karts, night bonfires, carnival game booths, fish scooping, massage chairs, and scenic sunset photo spots!",
            button: { text: "Explore Activities", link: "/activities" },
          };
          break;
        case "dining":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Our restaurant is open daily from 7:00 AM to 9:00 PM. Serving all-day silog breakfasts, inihaw grill specialties, pizza, and coffee. Live acoustic music plays daily from 6:00 PM – 9:00 PM!",
            button: { text: "Explore Dining", link: "/dining" },
          };
          break;
        case "pets":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Cielo Alto Place is pet-friendly! We welcome well-behaved pets on our outdoor grounds.",
          };
          break;
        case "directions":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "We are at Km 57 Marcos Highway, Sitio Mayagay, Tanay, Rizal. Search 'Cielo Alto Place' on Google Maps or Waze.",
            button: { text: "Open Google Maps", link: "https://maps.google.com/?q=Cielo+Alto+Place+Tanay+Rizal", external: true },
          };
          break;
        case "payment":
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "We accept GCash and Bank Transfer payments. Payment instructions and reference verification are presented during booking.",
            button: { text: "Reserve a Cabin", link: "/reserve" },
          };
          break;
        default:
          botResponse = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "How else can we help you?",
          };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 400);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      const answer = getBotAnswer(userText, dynamicRooms);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: answer.text,
          button: answer.button,
        },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`w-12 h-12 sm:w-14 sm:h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-xl hover:bg-primary-container hover:text-on-primary-container hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer ${
          isOpen ? "hidden" : "flex"
        }`}
        aria-label="Open Concierge Chat"
      >
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Floating Chat Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[390px] h-[560px] max-h-[82vh] bg-surface rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-outline/15 z-[90] animate-fadeIn">
          {/* Header */}
          <div className="bg-primary text-on-primary p-4 sm:p-4.5 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20 p-1">
                <Image
                  src="/images/logo.png"
                  alt="Cielo Alto"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold leading-tight">
                  Cielo Concierge
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-[11px] text-primary-fixed font-medium uppercase tracking-wider">
                    Online · Tanay, Rizal
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white focus:outline-none p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Concierge Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-surface-container-lowest">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-sm shadow-sm ${
                    msg.sender === "user"
                      ? "bg-primary text-on-primary rounded-tr-xs"
                      : "bg-surface-container-low text-on-surface rounded-tl-xs border border-outline/10"
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm font-normal">
                    {msg.text}
                  </p>

                  {msg.button && (
                    <div className="mt-3 pt-2 border-t border-outline/10">
                      {msg.button.external ? (
                        <a
                          href={msg.button.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xs"
                        >
                          {msg.button.text}
                          <span className="material-symbols-outlined text-[14px] ml-1.5">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <Link
                          href={msg.button.link}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-xs"
                        >
                          {msg.button.text}
                          <span className="material-symbols-outlined text-[14px] ml-1.5">
                            arrow_forward
                          </span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Chips */}
          <div className="bg-surface-container-low px-3 py-2 border-t border-outline/10">
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant font-bold block mb-1.5 px-1">
              Suggested Questions
            </span>
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply.id, reply.text)}
                  className="whitespace-nowrap px-3 py-1.5 bg-surface hover:bg-primary-container hover:text-on-primary-container text-primary border border-outline/15 rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {reply.text}
                </button>
              ))}
            </div>
          </div>

          {/* Form Input Area */}
          <div className="p-3 bg-surface border-t border-outline/10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about rooms, food, rates..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-outline/20 bg-surface-container-low text-on-surface text-base placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
