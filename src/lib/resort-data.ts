import { createAdminClient } from "@/lib/supabase/admin";
import { mergeRoomsWithFallback, type RoomRecord } from "@/lib/room-merge";
import { rooms as fallbackRooms, getRoomBySlug as fallbackGetRoomBySlug, type RoomType } from "@/data/resort";

export async function getDynamicRooms(): Promise<RoomType[]> {
  try {
    const supabase = createAdminClient();
    const { data: roomsData, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("property_id", "cielo");

    if (error || !roomsData || roomsData.length === 0) {
      if (error) {
        console.warn("Supabase rooms fetch warning:", error.message);
      }
      return [...fallbackRooms];
    }

    return mergeRoomsWithFallback(roomsData as RoomRecord[]);
  } catch (error) {
    console.warn("Could not load dynamic rooms from Supabase, using fallback:", error);
    return [...fallbackRooms];
  }
}

export async function getDynamicRoomBySlug(slug: string): Promise<RoomType | null> {
  try {
    const allRooms = await getDynamicRooms();
    const matched = allRooms.find((r) => r.slug === slug);
    if (matched) return matched;
  } catch (error) {
    console.warn("Error getting dynamic room by slug:", error);
  }
  return fallbackGetRoomBySlug(slug) || null;
}
