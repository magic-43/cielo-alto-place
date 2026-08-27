import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cielo Alto Place – Hotel & Restaurant | Tanay, Rizal",
    template: "%s | Cielo Alto Place",
  },
  description:
    "Experience mountain serenity at Cielo Alto Place in Tanay, Rizal. A-frame cabins, panoramic highland views, free breakfast, restaurant & activities. Book your stay today.",
  keywords: [
    "Cielo Alto Place",
    "Tanay Rizal resort",
    "mountain resort Philippines",
    "Tanay mountain hotel",
    "cabin hotel Rizal",
    "A-frame cabin Philippines",
    "Ceilo Alto",
  ],
  metadataBase: new URL("https://cieloaltoplace.org"),
  openGraph: {
    siteName: "Cielo Alto Place",
    locale: "en_PH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="min-h-dvh flex flex-col antialiased bg-white text-[#1a1a1a]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
