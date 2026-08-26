import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured, SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Server komponentlari uchun Supabase mijozi (cookie asosidagi sessiya).
 * Sozlamalar bo'lmasa `null`.
 */
export function createSupabaseServerClient() {
  if (!isSupabaseConfigured) return null;
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component ichidan cookie yozib bo'lmaydi — sessiyani
          // middleware yangilab turadi, shuning uchun bu xavfsiz.
        }
      },
    },
  });
}
