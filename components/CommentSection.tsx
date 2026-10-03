"use client";

import { LogIn, MessageCircle, Send, Trash2, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addPromptComment,
  deletePromptComment,
} from "@/app/actions/comments";
import { COMMENT_MAX_LENGTH, COMMENT_MIN_LENGTH } from "@/lib/comments";
import type { PromptComment } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { useAuth } from "./AuthProvider";
import { usePrompts } from "./PromptsProvider";
import { useToast } from "./ToastProvider";

const PAGE_SIZE = 50;

const fieldClass =
  "w-full rounded-xl border border-black/5 bg-white/70 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent-blue/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500";

/**
 * Supabase sozlangan bo'lsa izohlar bazadan o'qiladi va faqat tizimga
 * kirganlar yozadi; aks holda avvalgidek brauzerda saqlanadi.
 */
export function CommentSection({
  promptId,
  comments,
}: {
  promptId: string;
  /** Lokal rejimdagi izohlar (Supabase rejimida e'tiborga olinmaydi). */
  comments: PromptComment[];
}) {
  const { isRemote } = usePrompts();
  return isRemote ? (
    <RemoteComments promptId={promptId} />
  ) : (
    <LocalComments promptId={promptId} comments={comments} />
  );
}

function RemoteComments({ promptId }: { promptId: string }) {
  const { supabase, user, loading: authLoading } = useAuth();
  const { adjustCommentCount, getPromptById } = usePrompts();
  const { showToast } = useToast();
  const pathname = usePathname();
  const [comments, setComments] = useState<PromptComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    setLoading(true);
    supabase
      .from("prompt_comments")
      .select("id, user_id, author_name, content, created_at")
      .eq("prompt_id", promptId)
      .order("created_at", { ascending: false })
      .limit(PAGE_SIZE)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) console.error("Izohlar yuklanmadi", error);
        setComments(
          (data ?? []).map((row) => ({
            id: row.id as string,
            userId: row.user_id as string,
            author: row.author_name as string,
            content: row.content as string,
            createdAt: row.created_at as string,
          }))
        );
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [supabase, promptId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy || content.trim().length < COMMENT_MIN_LENGTH) return;
    setBusy(true);
    const result = await addPromptComment(promptId, content);
    setBusy(false);

    if (!result.ok) {
      showToast(
        result.error === "rate_limited"
          ? "Juda tez yozyapsiz — bir necha daqiqadan keyin urinib ko'ring."
          : result.error === "unauthenticated"
            ? "Sessiya tugagan — qaytadan kiring."
            : "Izoh saqlanmadi. Qayta urinib ko'ring."
      );
      return;
    }
    setComments((prev) => [result.comment, ...prev]);
    adjustCommentCount(promptId, 1);
    setContent("");
    showToast("Izohingiz qo'shildi. Rahmat!");
  }

  async function handleDelete(comment: PromptComment) {
    if (!window.confirm("Izohni o'chirasizmi?")) return;
    const previous = comments;
    setComments((prev) => prev.filter((c) => c.id !== comment.id));
    const { ok } = await deletePromptComment(comment.id);
    if (ok) {
      adjustCommentCount(promptId, -1);
      showToast("Izoh o'chirildi.");
    } else {
      setComments(previous);
      showToast("Izohni o'chirib bo'lmadi.");
    }
  }

  return (
    <CommentsShell
      // Ro'yxat oxirgi PAGE_SIZE tasini ko'rsatadi; umumiy son statistikadan.
      count={Math.max(
        getPromptById(promptId)?.commentCount ?? 0,
        comments.length
      )}
      loading={loading}
    >
      {authLoading ? null : user ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={COMMENT_MAX_LENGTH}
            placeholder="Bu prompt sizga qanday natija berdi? Qaysi modelda sinadingiz?"
            rows={3}
            className={`${fieldClass} resize-none`}
          />
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-neutral-400">
              {content.length}/{COMMENT_MAX_LENGTH}
            </span>
            <button
              type="submit"
              disabled={busy || content.trim().length < COMMENT_MIN_LENGTH}
              className="pill-button bg-neutral-900 text-white shadow-soft transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-neutral-900"
            >
              <Send className="h-3.5 w-3.5" />
              {busy ? "Yuborilmoqda…" : "Izoh qoldirish"}
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-black/10 px-4 py-3 dark:border-white/10">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Izoh qoldirish uchun tizimga kiring.
          </p>
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className="pill-button border border-black/10 bg-white/70 text-neutral-700 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
          >
            <LogIn className="h-4 w-4" />
            Kirish
          </Link>
        </div>
      )}

      <CommentList
        comments={comments}
        canDelete={(c) => Boolean(user && c.userId === user.id)}
        onDelete={handleDelete}
      />
    </CommentsShell>
  );
}

function LocalComments({
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

  const sorted = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <CommentsShell count={comments.length}>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ismingiz (ixtiyoriy)"
          className={fieldClass}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ushbu prompt haqida fikringizni yozing..."
          rows={3}
          className={`${fieldClass} resize-none`}
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
      <CommentList comments={sorted} />
    </CommentsShell>
  );
}

function CommentsShell({
  count,
  loading = false,
  children,
}: {
  count: number;
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-panel rounded-4xl p-6 sm:p-8" aria-busy={loading}>
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        <MessageCircle className="h-5 w-5 text-accent-blue" />
        Izohlar {loading ? "" : `(${count})`}
      </h2>
      {children}
    </section>
  );
}

function CommentList({
  comments,
  canDelete,
  onDelete,
}: {
  comments: PromptComment[];
  canDelete?: (comment: PromptComment) => boolean;
  onDelete?: (comment: PromptComment) => void;
}) {
  return (
    <div className="mt-8 space-y-5">
      {comments.length === 0 && (
        <p className="text-sm text-neutral-400">
          Hozircha izohlar yo&apos;q. Birinchi bo&apos;lib fikringizni
          bildiring!
        </p>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="group flex gap-3">
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
              {canDelete?.(comment) && onDelete && (
                <button
                  type="button"
                  onClick={() => onDelete(comment)}
                  aria-label="Izohni o'chirish"
                  className="ml-auto rounded-full p-1 text-neutral-400 opacity-60 transition hover:bg-accent-pink/10 hover:text-accent-pink group-hover:opacity-100"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <p className="mt-0.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
