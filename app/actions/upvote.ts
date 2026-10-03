"use server";

import { getPromptById } from "@/data/prompts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UpvoteResult =
  | { ok: true; upvoted: boolean; count: number }
  | {
      ok: false;
      error: "not_configured" | "unauthenticated" | "invalid_prompt" | "server_error";
    };

/**
 * Promptga ovoz berish yoki ovozni qaytarib olish.
 *
 * Mijoz "toggle" emas, kerakli holatni (`upvoted`) yuboradi — shuning uchun
 * ikki marta bosish yoki tarmoq qayta urinishi hisobni buzmaydi. Barcha
 * yozish bitta atomik RPC (`set_prompt_upvote`) ichida, bitta so'rovda.
 */
export async function setPromptUpvote(
  promptId: string,
  upvoted: boolean
): Promise<UpvoteResult> {
  if (typeof promptId !== "string" || !getPromptById(promptId)) {
    return { ok: false, error: "invalid_prompt" };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "not_configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "unauthenticated" };

  const { data, error } = await supabase
    .rpc("set_prompt_upvote", {
      p_prompt_id: promptId,
      p_upvoted: Boolean(upvoted),
    })
    .single<{ upvoted: boolean; upvote_count: number }>();

  if (error || !data) {
    console.error("set_prompt_upvote failed", error);
    return { ok: false, error: "server_error" };
  }

  return { ok: true, upvoted: data.upvoted, count: data.upvote_count };
}
