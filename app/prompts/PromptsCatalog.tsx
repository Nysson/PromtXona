"use client";

import { LayoutGrid } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { FilterTabs } from "@/components/FilterTabs";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts } from "@/components/PromptsProvider";
import { SearchBar } from "@/components/SearchBar";
import { FILTER_GROUPS } from "@/lib/constants";
import { byPopularity } from "@/lib/utils";

const FILTERS = ["Barchasi", ...FILTER_GROUPS];

export function PromptsCatalog() {
  const { prompts } = usePrompts();
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get("category") ?? "Barchasi";

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>(
    FILTERS.includes(initialFilter) ? initialFilter : "Barchasi"
  );
  const [sort, setSort] = useState<"popular" | "newest">("popular");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = prompts
      .filter((p) => filter === "Barchasi" || p.filterGroup === filter)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.subcategory.toLowerCase().includes(q)
      );

    return [...list].sort((a, b) =>
      sort === "popular"
        ? byPopularity(a, b)
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [prompts, query, filter, sort]);

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <AmbientBackground />
        <div className="container-page relative text-center">
          <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <LayoutGrid className="h-3.5 w-3.5 text-accent-blue" />
            {prompts.length} ta sinovdan o&apos;tgan prompt
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-white">
            Promptlar katalogi
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-500 dark:text-neutral-400">
            DTM, IELTS, SAT va Ona tili/Adabiyot uchun barcha promptlarni qidiring,
            filtrlang va bir zumda nusxa oling.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="glass-panel sticky top-[73px] z-30 flex flex-col gap-4 rounded-4xl p-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={query} onChange={setQuery} className="sm:max-w-sm" />
          <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {filtered.length} ta natija topildi
          </p>
          <div className="flex items-center gap-1 rounded-full border border-black/5 bg-white/60 p-1 text-xs font-medium dark:border-white/10 dark:bg-white/[0.04]">
            <button
              onClick={() => setSort("popular")}
              className={`rounded-full px-3 py-1.5 transition ${
                sort === "popular"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              Mashhur
            </button>
            <button
              onClick={() => setSort("newest")}
              className={`rounded-full px-3 py-1.5 transition ${
                sort === "newest"
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              Eng yangi
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="glass-panel mt-8 rounded-4xl p-10 text-center text-neutral-500 dark:text-neutral-400">
            Hech qanday mos prompt topilmadi. Filtrni o&apos;zgartirib
            ko&apos;ring.
          </div>
        )}
      </section>
    </div>
  );
}
