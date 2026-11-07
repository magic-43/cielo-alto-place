import { rooms as fallbackRooms, type RoomType } from "@/data/resort";

export type RoomRecord = {
  id?: string;
  slug?: string;
  name?: string;
  category?: string;
  description?: string;
  short_description?: string;
  image?: string;
  gallery?: string[] | null;
  beds?: string;
  standard_guests?: number;
  max_extra_guests?: number;
  breakfast_guests?: number;
  capacity_label?: string;
  amenities?: string[] | null;
  size?: string;
  view?: string;
  regular_rate?: number;
  discounted_rate?: number;
  is_active?: boolean;
  property_id?: string;
  has_fan?: boolean;
  has_ac?: boolean;
  ac_surcharge?: number;
};

export function mergeRoomsWithFallback(roomsData?: RoomRecord[] | null): RoomType[] {
  if (!roomsData || roomsData.length === 0) {
    return [...fallbackRooms];
  }

  return fallbackRooms.flatMap((fallbackRoom) => {
    const dbRoom = roomsData.find(
      (room) => room.slug === fallbackRoom.slug || room.id === fallbackRoom.slug
    );

    if (!dbRoom) {
      return [fallbackRoom];
    }

    if (dbRoom.is_active === false) {
      return [];
    }

    const standardGuests =
      typeof dbRoom.standard_guests === "number" && Number.isFinite(dbRoom.standard_guests)
        ? dbRoom.standard_guests
        : fallbackRoom.standardGuests;

    const maxExtraGuests =
      typeof dbRoom.max_extra_guests === "number" && Number.isFinite(dbRoom.max_extra_guests)
        ? dbRoom.max_extra_guests
        : fallbackRoom.maxExtraGuests;

    const basePaxRate =
      typeof dbRoom.regular_rate === "number" && Number.isFinite(dbRoom.regular_rate) && dbRoom.regular_rate > 0
        ? dbRoom.regular_rate
        : fallbackRoom.basePaxRate;

    const acSurcharge =
      typeof dbRoom.ac_surcharge === "number" && Number.isFinite(dbRoom.ac_surcharge) && dbRoom.ac_surcharge > 0
        ? dbRoom.ac_surcharge
        : fallbackRoom.acSurcharge;

    return [
      {
        ...fallbackRoom,
        name: dbRoom.name || fallbackRoom.name,
        description: dbRoom.description || fallbackRoom.description,
        shortDescription: dbRoom.short_description || fallbackRoom.shortDescription,
        basePaxRate,
        acSurcharge,
        standardGuests,
        maxExtraGuests,
        beds: dbRoom.beds || fallbackRoom.beds,
        amenities:
          dbRoom.amenities && dbRoom.amenities.length > 0
            ? dbRoom.amenities
            : fallbackRoom.amenities,
      },
    ];
  });
}
