import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Mountain Stay - Reservation",
  description: "Reserve your mountain cabin, room, or group loft at Cielo Alto Place in Tanay, Rizal.",
};

export default function ReserveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

