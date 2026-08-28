"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePrompts } from "./PromptsProvider";
import { PromptCard } from "./PromptCard";

/**
 * Bosh sahifadagi eng mashhur 6 ta prompt. Bu yerda ataylab qidiruv va
 * filtr yo'q — ular katalog sahifasida (/prompts). Bosh sahifada ikkinchi,
 * o'zgacha ishlaydigan qidiruv bo'lishi foydalanuvchini chalg'itardi.
 */
export function FeaturedPrompts() {
  const { prompts } = usePrompts();

  const featured = useMemo(
    () => [...prompts].sort((a, b) => b.upvotes - a.upvotes).slice(0, 6),
    [prompts]
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/prompts"
          className="pill-button border border-black/5 bg-white/70 text-neutral-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
        >
          Promptlarni ko&apos;rish
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
