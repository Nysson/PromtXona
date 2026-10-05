"use client";

import {
  ArrowUpRight,
  Bookmark,
  CircleCheck,
  Copy,
  ListOrdered,
  PencilLine,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { getChainContext } from "@/data/chains";
import { parseTemplate } from "@/lib/prompt-template";
import type { Prompt, PromptCategory } from "@/lib/types";
import { cn, formatCompactNumber } from "@/lib/utils";
import { TryInDropdown } from "./interactive-prompt/TryInDropdown";
import { useProgress } from "./ProgressProvider";
import { usePrompts } from "./PromptsProvider";
import { useToast } from "./ToastProvider";

const EXAM_BADGE: Record<PromptCategory, { label: string; className: string }> =
  {
    IELTS: {
      label: "IELTS",
      className: "bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15",
    },
    SAT: {
      label: "SAT",
      className: "bg-accent-teal/10 text-accent-teal dark:bg-accent-teal/15",
    },
    "Ona tili va Adabiyot": {
      label: "Ona tili",
      className: "bg-accent-pink/10 text-accent-pink dark:bg-accent-pink/15",
    },
    DTM: {
      label: "DTM",
      className: "bg-accent-green/10 text-accent-green dark:bg-accent-green/15",
    },
  };

/**
 * Karta "stretched link" naqshidan foydalanadi: butun kartani qoplaydigan
 * ko'rinmas <Link> qatlami + ustidagi interaktiv tugmalar. Bu <a> ichida <a>
 * joylashuvining oldini oladi (u noto'g'ri HTML bo'lib, hydration'ni buzadi).
 */
export function PromptCard({ prompt }: { prompt: Prompt }) {
  const { incrementCopyCount, isSaved, toggleSaved } = usePrompts();
  const { isCompleted } = useProgress();
  const { showToast } = useToast();
  const saved = isSaved(prompt.id);
  const done = isCompleted(prompt.id);
  const chain = getChainContext(prompt);
  const exam = EXAM_BADGE[prompt.category];
  const blanks = useMemo(
    () => parseTemplate(prompt.template).variables.length,
    [prompt.template]
  );

  async function copyTemplate(): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(prompt.template);
      incrementCopyCount(prompt.id);
      return true;
    } catch {
      showToast("Nusxalab bo'lmadi. Qaytadan urinib ko'ring.", "warning");
      return false;
    }
  }

  async function handleCopy() {
    if (!(await copyTemplate())) return;
    showToast(
      blanks > 0
        ? `Nusxalandi! Chatda ${blanks} ta {{…}} joyni to'ldirishni unutmang.`
        : "Nusxalandi! Endi AI chatiga joylashtiring."
    );
  }

  async function handleTry(target: { name: string; prefills: boolean }) {
    if (!(await copyTemplate())) return;
    showToast(
      target.prefills
        ? `${target.name} ochilmoqda — prompt nusxalandi ham.`
        : `Nusxalandi — ${target.name}'ga joylashtiring (Ctrl+V).`
    );
  }

  function handleSave() {
    toggleSaved(prompt.id);
    showToast(saved ? "Saqlanganlardan olib tashlandi." : "Saqlandi!");
  }

  return (
    // focus-within: ochiq "Sinash" menyusi qo'shni kartalar ostida qolmasin.
    <article className="group glass-panel relative flex h-full flex-col rounded-4xl p-5 transition-all duration-300 focus-within:z-20 hover:-translate-y-1 hover:shadow-glow sm:p-6">
      {/* Butun kartani bosish mumkin qiladigan qatlam */}
      <Link
        href={`/prompts/${prompt.id}`}
        aria-label={`${prompt.title} — batafsil`}
        className="absolute inset-0 rounded-4xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
      />

      {/* Imtihon + ko'nikma */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="pointer-events-none flex min-w-0 flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
              exam.className
            )}
          >
            {exam.label}
          </span>
          <span className="truncate rounded-full bg-neutral-900/[0.05] px-2.5 py-1 text-[11px] font-medium text-neutral-600 dark:bg-white/[0.08] dark:text-neutral-300">
            {prompt.subcategory}
          </span>
        </div>
        <button
          type="button"
          onClick={handleSave}
          aria-pressed={saved}
          aria-label={saved ? "Saqlanganlardan olib tashlash" : "Saqlash"}
          title={saved ? "Saqlanganlardan olib tashlash" : "Saqlash"}
          className={cn(
            "-mr-1.5 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
            saved
              ? "text-accent-blue"
              : "text-neutral-300 hover:bg-neutral-900/5 hover:text-neutral-700 dark:text-neutral-600 dark:hover:bg-white/10 dark:hover:text-neutral-200"
          )}
        >
          <Bookmark
            className={cn("h-4 w-4", saved && "animate-pop fill-accent-blue")}
          />
        </button>
      </div>

      {/* Sarlavha + kutilgan natija */}
      <h3 className="pointer-events-none relative mt-4 line-clamp-2 text-[17px] font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
        {prompt.title}
      </h3>
      <p className="pointer-events-none relative mt-2 flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
        <ArrowUpRight
          className="h-3.5 w-3.5 shrink-0 text-accent-green"
          aria-hidden
        />
        <span className="sr-only">Natija: </span>
        <span className="truncate">{prompt.outcome ?? prompt.description}</span>
      </p>

      {/* Qisqa ma'lumot */}
      <div className="pointer-events-none relative mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-400">
        <span className="inline-flex items-center gap-1" title="Ovozlar">
          <ThumbsUp className="h-3.5 w-3.5" aria-hidden />
          {formatCompactNumber(prompt.upvotes)}
        </span>
        <span title="Nusxalanganlar soni">
          {formatCompactNumber(prompt.copyCount)} nusxa
        </span>
        {chain && (
          <span className="inline-flex items-center gap-1 font-medium text-accent-indigo">
            <ListOrdered className="h-3.5 w-3.5" aria-hidden />
            {chain.stepNumber}/{chain.totalSteps}-qadam
          </span>
        )}
        {blanks > 0 && (
          <span className="inline-flex items-center gap-1">
            <PencilLine className="h-3.5 w-3.5" aria-hidden />
            {blanks} ta bo&apos;sh joy
          </span>
        )}
        {done && (
          <span className="inline-flex items-center gap-1 font-medium text-accent-green">
            <CircleCheck className="h-3.5 w-3.5" aria-hidden />
            Bajarilgan
          </span>
        )}
      </div>

      {/* Amallar */}
      <div className="relative mt-auto flex items-center gap-2 pt-5">
        <button
          type="button"
          onClick={handleCopy}
          className="pill-button flex-1 justify-center bg-neutral-900 text-white shadow-soft hover:opacity-90 dark:bg-white dark:text-neutral-900"
        >
          <Copy className="h-4 w-4" aria-hidden />
          Nusxalash
        </button>
        <TryInDropdown prompt={prompt.template} onSelect={handleTry} />
      </div>
    </article>
  );
}
