"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { rooms as fallbackRooms, type RoomType } from "@/data/resort";
import { mergeRoomsWithFallback, type RoomRecord } from "@/lib/room-merge";

export function useCieloRooms(initialRooms?: RoomType[]) {
  const [rooms, setRooms] = useState<RoomType[]>(initialRooms || fallbackRooms);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRooms() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("rooms")
          .select("*")
          .eq("property_id", "cielo");

        if (data && !error && data.length > 0) {
          setRooms(mergeRoomsWithFallback(data as RoomRecord[]));
        }
      } catch (err) {
        console.warn("Could not fetch dynamic rooms, using fallbacks:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  return { rooms, loading };
}
