/**
 * Supabase sozlamalari. Kalitlar `.env.local` da bo'lmasa ilova ishlashda
 * davom etadi — shunchaki autentifikatsiya o'chirilgan holatga tushadi va
 * progress faqat brauzer xotirasida saqlanadi. Shu sababli hech bir joyda
 * bu qiymatlarni tekshirmasdan ishlatmang.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
