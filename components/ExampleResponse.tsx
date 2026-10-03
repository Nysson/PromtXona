"use client";

import { ChevronDown, MessageSquareQuote, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { ModelBadge } from "@/components/ModelBadge";
import { cn } from "@/lib/utils";

/**
 * "Namuna AI javobi" — yig'ilgan holatda javobning boshi va pastga so'nib
 * boruvchi gradient ko'rinadi; tugma bilan to'liq ochiladi. Talaba promptni
 * ishga tushirishdan oldin qanday natija kutishini ko'radi.
 */
export function ExampleResponse({
  input,
  output,
  model,
}: {
  input: string;
  output: string;
  model?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <section className="glass-panel overflow-hidden rounded-4xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
          <Sparkles className="h-5 w-5 text-accent-indigo" />
          Namuna AI javobi
        </h2>
        {model && <ModelBadge model={model} />}
      </div>

      <div className="px-5 pt-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
          <MessageSquareQuote className="h-3.5 w-3.5" />
          Namuna so&apos;rov
        </h3>
        <p className="whitespace-pre-wrap rounded-2xl border-l-4 border-accent-blue/40 bg-accent-blue/[0.04] px-4 py-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
          {input}
        </p>
      </div>

      <div className="relative px-5 pt-4">
        <div
          id={panelId}
          className={cn(
            "whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 transition-[max-height] duration-300 dark:text-neutral-200",
            open ? "max-h-none" : "max-h-48 overflow-hidden"
          )}
        >
          {output}
        </div>
        {!open && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/95 via-white/70 to-transparent dark:from-canvas-dark/95 dark:via-canvas-dark/70"
          />
        )}
      </div>

      <div className="flex justify-center px-5 pb-5 pt-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-accent-blue transition hover:bg-accent-blue/10"
        >
          {open ? "Yig'ish" : "To'liq javobni ko'rish"}
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          />
        </button>
      </div>
    </section>
  );
}
