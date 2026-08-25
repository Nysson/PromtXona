"use client";

import {
  ArrowRight,
  Bot,
  Copy,
  MessageCircle,
  Sparkles,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { chatGptUrl, claudeUrl } from "@/lib/constants";
import type { Prompt } from "@/lib/types";
import { cn, formatCompactNumber } from "@/lib/utils";
import { usePrompts } from "./PromptsProvider";
import { useToast } from "./ToastProvider";

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  IELTS: "bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15",
  SAT: "bg-accent-teal/10 text-accent-teal dark:bg-accent-teal/15",
  "Ona tili va Adabiyot":
    "bg-accent-pink/10 text-accent-pink dark:bg-accent-pink/15",
};

export function PromptCard({ prompt }: { prompt: Prompt }) {
  const { toggleUpvote, isUpvoted, incrementCopyCount } = usePrompts();
  const { showToast } = useToast();
  const upvoted = isUpvoted(prompt.id);

  async function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.template);
      incrementCopyCount(prompt.id);
      showToast("Prompt nusxalandi! Endi uni AI chatiga joylashtiring.");
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.");
    }
  }

  function handleUpvote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleUpvote(prompt.id);
    if (!upvoted) showToast("Ovoz berganingiz uchun rahmat!");
  }

  return (
    <Link
      href={`/prompts/${prompt.id}`}
      className="group glass-panel flex h-full flex-col rounded-4xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-center justify-between gap-2">
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
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition",
            upvoted
              ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
              : "border-black/5 text-neutral-500 hover:border-accent-blue/30 hover:text-accent-blue dark:border-white/10 dark:text-neutral-400"
          )}
        >
          <ThumbsUp
            className={cn("h-3.5 w-3.5", upvoted && "animate-pop fill-accent-blue")}
          />
          {formatCompactNumber(prompt.upvotes)}
        </button>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
        {prompt.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {prompt.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-neutral-900/[0.04] px-2.5 py-1 text-[11px] font-medium text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            title="Copy prompt"
            aria-label="Copy prompt to clipboard"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Copy className="h-4 w-4" />
          </button>
          <a
            href={chatGptUrl(prompt.template)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Try in ChatGPT"
            aria-label="Try this prompt in ChatGPT"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-accent-green/10 hover:text-accent-green dark:text-neutral-400"
          >
            <Bot className="h-4 w-4" />
          </a>
          <a
            href={claudeUrl(prompt.template)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Try in Claude"
            aria-label="Try this prompt in Claude"
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-accent-orange/10 hover:text-accent-orange dark:text-neutral-400"
          >
            <Sparkles className="h-4 w-4" />
          </a>
          <span
            title={`${prompt.comments.length} comments`}
            className="flex items-center gap-1 px-1.5 text-xs text-neutral-400"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {prompt.comments.length}
          </span>
        </div>

        <span className="flex items-center gap-1 text-sm font-medium text-neutral-400 transition group-hover:text-accent-blue">
          Batafsil
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
