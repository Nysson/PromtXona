"use server";

import { getPromptById } from "@/data/prompts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Nusxalash sonini bittaga oshiradi. Login shart emas. */
export async function recordPromptCopy(promptId: string): Promise<void> {
  if (typeof promptId !== "string" || !getPromptById(promptId)) return;
  const supabase = createSupabaseServerClient();
  if (!supabase) return;

  const { error } = await supabase.rpc("increment_prompt_copy", {
    p_prompt_id: promptId,
  });
  if (error) console.error("increment_prompt_copy failed", error);
}
