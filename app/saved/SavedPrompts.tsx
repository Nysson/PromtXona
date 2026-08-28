"use client";

import { Bookmark, Compass } from "lucide-react";
import Link from "next/link";
import { AmbientBackground } from "@/components/AmbientBackground";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts } from "@/components/PromptsProvider";

export function SavedPrompts() {
  const { prompts, savedIds } = usePrompts();
  const saved = prompts.filter((p) => savedIds.includes(p.id));

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <AmbientBackground />
        <div className="container-page relative text-center">
          <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <Bookmark className="h-3.5 w-3.5 text-accent-blue" />
            {saved.length} ta saqlangan prompt
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-white">
            Saqlanganlar
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-500 dark:text-neutral-400">
            O&apos;zingizga yoqqan promptlarni saqlab qo&apos;ying — ular shu
            yerda, brauzeringizda saqlanadi.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        {saved.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="glass-panel mx-auto flex max-w-md flex-col items-center rounded-4xl p-10 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
              <Bookmark className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Hozircha bo&apos;sh
            </h2>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Istalgan promptda saqlash belgisini bosing — u shu yerda paydo
              bo&apos;ladi.
            </p>
            <Link
              href="/prompts"
              className="pill-button mt-6 bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
            >
              <Compass className="h-4 w-4" />
              Promptlarni ko&apos;rish
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
