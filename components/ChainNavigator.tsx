"use client";

import { ArrowRight, Check, ListOrdered } from "lucide-react";
import Link from "next/link";
import { getChainContext } from "@/data/chains";
import type { Prompt } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Prompt zanjirga tegishli bo'lsa, uning qaysi qadam ekanini, boshqa
 * qadamlar ro'yxatini va "Keyingi qadam" tugmasini ko'rsatadi.
 * Zanjirga kirmagan promptlarda hech narsa chizmaydi.
 */
export function ChainNavigator({ prompt }: { prompt: Prompt }) {
  const ctx = getChainContext(prompt);
  if (!ctx) return null;

  const { chain, steps, stepNumber, totalSteps, next } = ctx;

  return (
    <section className="glass-panel mt-8 rounded-4xl p-6 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-indigo/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent-indigo">
            <ListOrdered className="h-3.5 w-3.5" />
            Prompt zanjiri
          </span>
          <h2 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            {chain.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            {chain.description}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-neutral-900/[0.06] px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
          {stepNumber}-qadam / {totalSteps}
        </span>
      </div>

      {/* Bosqich ko'rsatkichi */}
      <div className="mt-5 flex gap-1.5" aria-hidden>
        {steps.map((s, i) => (
          <span
            key={s.id}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < stepNumber
                ? "bg-accent-indigo"
                : "bg-neutral-900/10 dark:bg-white/10"
            )}
          />
        ))}
      </div>

      {/* Qadamlar ro'yxati */}
      <ol className="mt-5 space-y-1">
        {steps.map((s, i) => {
          const isCurrent = s.id === prompt.id;
          const isDone = i < stepNumber - 1;
          return (
            <li key={s.id}>
              {isCurrent ? (
                <div className="flex items-center gap-3 rounded-2xl bg-accent-indigo/10 px-3 py-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-indigo text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-accent-indigo">
                    {s.title}
                  </span>
                  <span className="shrink-0 text-[11px] font-medium uppercase tracking-wide text-accent-indigo">
                    Hozir
                  </span>
                </div>
              ) : (
                <Link
                  href={`/prompts/${s.id}`}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-neutral-900/[0.04] dark:hover:bg-white/5"
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                      isDone
                        ? "bg-accent-indigo/15 text-accent-indigo"
                        : "bg-neutral-900/[0.06] text-neutral-500 dark:bg-white/10 dark:text-neutral-400"
                    )}
                  >
                    {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-neutral-600 dark:text-neutral-300">
                    {s.title}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-5 border-t border-black/5 pt-5 dark:border-white/10">
        {next ? (
          <Link
            href={`/prompts/${next.id}`}
            className="pill-button w-full max-w-full justify-center bg-neutral-900 py-2.5 text-white shadow-soft transition hover:opacity-90 sm:w-auto dark:bg-white dark:text-neutral-900"
          >
            <span className="min-w-0 truncate">
              Keyingi qadam: {next.title}
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <p className="flex items-center gap-2 text-sm font-medium text-accent-green">
            <Check className="h-4 w-4" />
            Bu zanjirning oxirgi qadami — jarayonni to&apos;liq bajardingiz!
          </p>
        )}
      </div>
    </section>
  );
}
