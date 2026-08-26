"use client";

import {
  ArrowRight,
  Bookmark,
  Bot,
  Copy,
  ListOrdered,
  MessageCircle,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { getChainContext } from "@/data/chains";
import { chatGptUrl, claudeUrl } from "@/lib/constants";
import type { Prompt } from "@/lib/types";
import { cn, formatCompactNumber } from "@/lib/utils";
import { CompleteButton } from "./CompleteButton";
import { usePrompts } from "./PromptsProvider";
import { useToast } from "./ToastProvider";

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  IELTS: "bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15",
  SAT: "bg-accent-teal/10 text-accent-teal dark:bg-accent-teal/15",
  "Ona tili va Adabiyot":
    "bg-accent-pink/10 text-accent-pink dark:bg-accent-pink/15",
  DTM: "bg-accent-green/10 text-accent-green dark:bg-accent-green/15",
};

/**
 * Karta "stretched link" naqshidan foydalanadi: butun kartani qoplaydigan
 * ko'rinmas <Link> qatlami + ustidagi interaktiv tugmalar. Bu <a> ichida <a>
 * joylashuvining oldini oladi (u noto'g'ri HTML bo'lib, hydration'ni buzadi).
 */
export function PromptCard({ prompt }: { prompt: Prompt }) {
  const { toggleUpvote, isUpvoted, incrementCopyCount, isSaved, toggleSaved } =
    usePrompts();
  const { showToast } = useToast();
  const upvoted = isUpvoted(prompt.id);
  const saved = isSaved(prompt.id);
  const chain = getChainContext(prompt);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.template);
      incrementCopyCount(prompt.id);
      showToast("Prompt nusxalandi! Endi uni AI chatiga joylashtiring.");
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.");
    }
  }

  function handleUpvote() {
    toggleUpvote(prompt.id);
    if (!upvoted) showToast("Ovoz berganingiz uchun rahmat!");
  }

  function handleSave() {
    toggleSaved(prompt.id);
    showToast(saved ? "Saqlanganlardan olib tashlandi." : "Promptga saqlandi!");
  }

  return (
    <article className="group glass-panel relative flex h-full flex-col rounded-4xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      {/* Butun kartani bosish mumkin qiladigan qatlam */}
      <Link
        href={`/prompts/${prompt.id}`}
        aria-label={prompt.title}
        className="absolute inset-0 rounded-4xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
      />

      <div className="relative flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            CATEGORY_BADGE_STYLES[prompt.category]
          )}
        >
          {prompt.subcategory}
        </span>
        <button
          onClick={handleUpvote}
          aria-pressed={upvoted}
          aria-label="Upvote this prompt"
          className={cn(
            "relative flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition",
            upvoted
              ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
              : "border-black/5 bg-white/40 text-neutral-500 hover:border-accent-blue/30 hover:text-accent-blue dark:border-white/10 dark:bg-transparent dark:text-neutral-400"
          )}
        >
          <ThumbsUp
            className={cn(
              "h-3.5 w-3.5",
              upvoted && "animate-pop fill-accent-blue"
            )}
          />
          {formatCompactNumber(prompt.upvotes)}
        </button>
      </div>

      <h3 className="pointer-events-none relative mt-4 text-lg font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
        {prompt.title}
      </h3>
      <p className="pointer-events-none relative mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {prompt.description}
      </p>

      <div className="pointer-events-none relative mt-4 flex flex-wrap gap-1.5">
        {chain && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-indigo/10 px-2.5 py-1 text-[11px] font-semibold text-accent-indigo">
            <ListOrdered className="h-3 w-3" />
            {chain.stepNumber}/{chain.totalSteps}-qadam
          </span>
        )}
        {prompt.tags.slice(0, chain ? 2 : 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-neutral-900/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
        <div className="flex items-center gap-0.5">
          <button
            onClick={handleCopy}
            title="Prompt nusxalash"
            aria-label="Copy prompt to clipboard"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Copy className="h-4 w-4" />
          </button>
          <a
            href={chatGptUrl(prompt.template)}
            target="_blank"
            rel="noopener noreferrer"
            title="ChatGPT'da sinash"
            aria-label="Try this prompt in ChatGPT"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-accent-green/10 hover:text-accent-green dark:text-neutral-400"
          >
            <Bot className="h-4 w-4" />
          </a>
          <a
            href={claudeUrl(prompt.template)}
            target="_blank"
            rel="noopener noreferrer"
            title="Claude'da sinash"
            aria-label="Try this prompt in Claude"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-accent-orange/10 hover:text-accent-orange dark:text-neutral-400"
          >
            <Sparkles className="h-4 w-4" />
          </a>
          <button
            onClick={handleSave}
            aria-pressed={saved}
            title={saved ? "Saqlanganlardan olib tashlash" : "Saqlash"}
            aria-label="Save this prompt"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition",
              saved
                ? "text-accent-blue"
                : "text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            )}
          >
            <Bookmark
              className={cn("h-4 w-4", saved && "animate-pop fill-accent-blue")}
            />
          </button>
          <CompleteButton promptId={prompt.id} />
          <span
            title={`${prompt.comments.length} izoh`}
            className="pointer-events-none flex items-center gap-1 px-1.5 text-xs text-neutral-400"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {prompt.comments.length}
          </span>
        </div>

        <span className="pointer-events-none flex items-center gap-1 text-sm font-medium text-neutral-400 transition group-hover:text-accent-blue">
          Batafsil
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
