"use server";

import { getPromptById } from "@/data/prompts";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from "@/lib/comments";
import type { PromptComment } from "@/lib/types";

type CommentError =
  | "not_configured"
  | "unauthenticated"
  | "invalid"
  | "rate_limited"
  | "server_error";

export type AddCommentResult =
  | { ok: true; comment: PromptComment }
  | { ok: false; error: CommentError };

interface CommentRow {
  id: string;
  user_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

function toComment(row: CommentRow): PromptComment {
  return {
    id: row.id,
    userId: row.user_id,
    author: row.author_name,
    content: row.content,
    createdAt: row.created_at,
  };
}

/**
 * Izoh qo'shadi. Muallif ismi va `user_id` ni baza triggeri sessiyadan
 * oladi — mijoz ularni soxtalashtira olmaydi.
 */
export async function addPromptComment(
  promptId: string,
  content: string
): Promise<AddCommentResult> {
  const text = typeof content === "string" ? content.trim() : "";
  if (
    typeof promptId !== "string" ||
    !getPromptById(promptId) ||
    text.length < COMMENT_MIN_LENGTH ||
    text.length > COMMENT_MAX_LENGTH
  ) {
    return { ok: false, error: "invalid" };
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) return { ok: false, error: "not_configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "unauthenticated" };

  const { data, error } = await supabase
    .from("prompt_comments")
    .insert({ prompt_id: promptId, user_id: user.id, content: text })
    .select("id, user_id, author_name, content, created_at")
    .single<CommentRow>();

  if (error || !data) {
    if (error?.message?.includes("rate_limited")) {
      return { ok: false, error: "rate_limited" };
    }
    console.error("addPromptComment failed", error);
    return { ok: false, error: "server_error" };
  }

  return { ok: true, comment: toComment(data) };
}

/** Foydalanuvchi faqat o'z izohini o'chira oladi (RLS kafolatlaydi). */
export async function deletePromptComment(
  commentId: string
): Promise<{ ok: boolean }> {
  const supabase = createSupabaseServerClient();
  if (!supabase || typeof commentId !== "string") return { ok: false };

  const { data, error } = await supabase
    .from("prompt_comments")
    .delete()
    .eq("id", commentId)
    .select("id");

  return { ok: !error && (data?.length ?? 0) > 0 };
}
