"use client";

import { ArrowRight, Bookmark, Copy, ListOrdered } from "lucide-react";
import Link from "next/link";
import { getChainContext } from "@/data/chains";
import type { Prompt } from "@/lib/types";
import { cn } from "@/lib/utils";
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
 *
 * Kartada faqat ikkita amal qoladi — "Nusxalash" va "Saqlash". Qolgan
 * amallar (ChatGPT/Claude'da sinash, "Mashq qildim", "Foydali") prompt
 * sahifasida. Bu kartani yengil qiladi va asosiy amalni ajratib turadi.
 */
export function PromptCard({ prompt }: { prompt: Prompt }) {
  const { incrementCopyCount, isSaved, toggleSaved } = usePrompts();
  const { showToast } = useToast();
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

  function handleSave() {
    toggleSaved(prompt.id);
    showToast(
      saved ? "Saqlanganlardan olib tashlandi." : "Saqlanganlarga qo'shildi."
    );
  }

  return (
    <article className="group glass-panel relative flex h-full flex-col rounded-4xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      {/* Butun kartani bosish mumkin qiladigan qatlam */}
      <Link
        href={`/prompts/${prompt.id}`}
        aria-label={prompt.title}
        className="absolute inset-0 rounded-4xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
      />

      <div className="pointer-events-none relative flex flex-wrap items-center gap-1.5">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            CATEGORY_BADGE_STYLES[prompt.category]
          )}
        >
          {prompt.subcategory}
        </span>
        {chain && (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-indigo/10 px-2.5 py-1 text-[11px] font-semibold text-accent-indigo">
            <ListOrdered className="h-3 w-3" />
            {chain.stepNumber}/{chain.totalSteps}-qadam
          </span>
        )}
      </div>

      <h3 className="pointer-events-none relative mt-4 text-lg font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
        {prompt.title}
      </h3>
      <p className="pointer-events-none relative mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
        {prompt.description}
      </p>

      <div className="relative mt-auto flex items-center justify-between gap-2 pt-6">
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            aria-label={`${prompt.title} promptini nusxalash`}
            className="pill-button border border-black/10 bg-white/60 px-3 py-1.5 text-xs text-neutral-700 transition hover:border-accent-blue/40 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-200"
          >
            <Copy className="h-3.5 w-3.5" />
            Nusxalash
          </button>
          <button
            onClick={handleSave}
            aria-pressed={saved}
            title={saved ? "Saqlanganlardan olib tashlash" : "Saqlash"}
            aria-label={saved ? "Saqlanganlardan olib tashlash" : "Saqlash"}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition",
              saved
                ? "text-accent-blue"
                : "text-neutral-400 hover:bg-neutral-900/5 hover:text-neutral-900 dark:hover:bg-white/10 dark:hover:text-white"
            )}
          >
            <Bookmark
              className={cn("h-4 w-4", saved && "animate-pop fill-accent-blue")}
            />
          </button>
        </div>

        <span className="pointer-events-none flex items-center gap-1 text-sm font-medium text-accent-blue">
          Batafsil
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
