"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { resort } from "@/data/resort";

export type ResortSettings = {
  id: number;
  property_id: string;
  bank_transfer_enabled: boolean;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  gcash_enabled: boolean;
  gcash_name: string | null;
  gcash_number: string | null;
  extra_person_fee: number;
  check_in_time: string | null;
  check_out_time: string | null;
  site_phone: string | null;
  site_email: string | null;
  site_facebook: string | null;
};

export function useResortSettings() {
  const [settings, setSettings] = useState<ResortSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        // Fetch settings for Cielo (row id=2 or property_id='cielo')
        const { data, error } = await supabase
          .from("resort_settings")
          .select("*")
          .or("property_id.eq.cielo,id.eq.2")
          .order("id", { ascending: false })
          .limit(1)
          .single();

        if (data && !error) {
          setSettings(data as ResortSettings);
        }
      } catch (err) {
        console.warn("Could not load dynamic resort settings, falling back to defaults:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, []);

  return {
    settings,
    loading,
    // Database-backed payment & site values with graceful defaults
    gcashName: settings?.gcash_name || "Cielo Alto Place",
    gcashNumber: settings?.gcash_number || "0995 385 5517",
    gcashEnabled: settings?.gcash_enabled ?? true,
    bankName: settings?.bank_name || "BDO Unibank",
    bankAccountName: settings?.bank_account_name || "Cielo Alto Place",
    bankAccountNumber: settings?.bank_account_number || "0995-3855-517",
    bankEnabled: settings?.bank_transfer_enabled ?? true,
    extraPaxFee: Number(settings?.extra_person_fee) || 500,
    checkInTime: settings?.check_in_time || resort.checkIn,
    checkOutTime: settings?.check_out_time || resort.checkOut,
    phone: settings?.site_phone || resort.phone,
    email: settings?.site_email || resort.email,
  };
}
