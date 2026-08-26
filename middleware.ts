import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import {
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from "@/lib/supabase/config";

/**
 * Supabase sessiya cookie'sini yangilab turadi. Sozlamalar bo'lmasa
 * hech narsa qilmaydi — sayt avvalgidek ishlaydi.
 */
export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Sessiyani yangilaydi (tokenni muddati tugagan bo'lsa qayta oladi).
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    /*
     * Statik fayllar va rasmlardan tashqari barcha yo'llar:
     * _next/static, _next/image, favicon va ikonka fayllari.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon|opengraph-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
