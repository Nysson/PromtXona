"use client";

import { MessageCircle, Send, UserCircle2 } from "lucide-react";
import { useState } from "react";
import type { PromptComment } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { usePrompts } from "./PromptsProvider";
import { useToast } from "./ToastProvider";

export function CommentSection({
  promptId,
  comments,
}: {
  promptId: string;
  comments: PromptComment[];
}) {
  const { addComment } = usePrompts();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    addComment(promptId, name, content);
    setContent("");
    showToast("Izohingiz qo'shildi. Rahmat!");
  }

  return (
    <section className="glass-panel rounded-4xl p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        <MessageCircle className="h-5 w-5 text-accent-blue" />
        Izohlar ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingiz (ixtiyoriy)"
          className="w-full rounded-xl border border-black/5 bg-white/70 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent-blue/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ushbu prompt haqida fikringizni yozing..."
          rows={3}
          className="w-full resize-none rounded-xl border border-black/5 bg-white/70 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent-blue/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!content.trim()}
            className="pill-button bg-neutral-900 text-white shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900"
          >
            <Send className="h-3.5 w-3.5" />
            Izoh qoldirish
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-5">
        {comments.length === 0 && (
          <p className="text-sm text-neutral-400">
            Hozircha izohlar yo&apos;q. Birinchi bo&apos;lib fikringizni
            bildiring!
          </p>
        )}
        {[...comments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-900/5 text-neutral-400 dark:bg-white/10">
                <UserCircle2 className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {comment.author}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-0.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
