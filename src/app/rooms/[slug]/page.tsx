import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { rooms } from "@/data/resort";
import { getDynamicRoomBySlug } from "@/lib/resort-data";
import { RoomDetailClient } from "./RoomDetailClient";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return rooms.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = await getDynamicRoomBySlug(slug);
  if (!room) return { title: "Room Not Found" };
  return {
    title: `${room.name} – Accommodations`,
    description: room.shortDescription,
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getDynamicRoomBySlug(slug);

  if (!room) notFound();

  return (
    <div className="bg-background min-h-screen pb-28 md:pb-20">
      {/* ─────────────────────── BREADCRUMB / BACK ─────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-2">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to all accommodations
        </Link>
      </div>

      {/* ─────────────────────── INTERACTIVE HERO & INLINE GALLERY ─────────────────────── */}
      <RoomDetailClient room={room} />
    </div>
  );
}
