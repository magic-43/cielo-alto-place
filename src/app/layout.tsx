import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-on-background selection:bg-primary selection:text-on-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
