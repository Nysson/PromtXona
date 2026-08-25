"use client";

import { Layers3 } from "lucide-react";
import Link from "next/link";
import type { Prompt } from "@/lib/types";
import { usePrompts } from "./PromptsProvider";

export function RelatedPrompts({ current }: { current: Prompt }) {
  const { prompts } = usePrompts();

  const related = prompts
    .filter((p) => p.id !== current.id)
    .map((p) => {
      let score = 0;
      if (p.filterGroup === current.filterGroup) score += 3;
      else if (p.category === current.category) score += 2;
      score += p.tags.filter((t) => current.tags.includes(t)).length;
      return { prompt: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.prompt.upvotes - a.prompt.upvotes)
    .slice(0, 3)
    .map((x) => x.prompt);

  if (related.length === 0) return null;

  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        <Layers3 className="h-5 w-5 text-accent-blue" />
        O&apos;xshash promptlar
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {related.map((prompt) => (
          <Link
            key={prompt.id}
            href={`/prompts/${prompt.id}`}
            className="group glass-panel rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-blue">
              {prompt.subcategory}
            </span>
            <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug text-neutral-900 dark:text-white">
              {prompt.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {prompt.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
