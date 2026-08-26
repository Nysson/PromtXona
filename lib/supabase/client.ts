"use client";

import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Brauzer tomonidagi Supabase mijozi. Sozlamalar bo'lmasa `null` qaytaradi —
 * chaqiruvchi tomon buni tekshirishi shart.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
