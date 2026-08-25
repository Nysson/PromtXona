"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FILTER_GROUPS } from "@/lib/constants";
import { usePrompts } from "./PromptsProvider";
import { PromptCard } from "./PromptCard";
import { SearchBar } from "./SearchBar";
import { FilterTabs } from "./FilterTabs";

const FILTERS = ["Barchasi", ...FILTER_GROUPS];

export function FeaturedPrompts() {
  const { prompts } = usePrompts();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("Barchasi");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return prompts
      .filter((p) => filter === "Barchasi" || p.filterGroup === filter)
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
      .sort((a, b) => b.upvotes - a.upvotes)
      .slice(0, 6);
  }, [prompts, query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={query} onChange={setQuery} className="sm:max-w-md" />
        <FilterTabs options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass-panel mt-8 rounded-4xl p-10 text-center text-neutral-500 dark:text-neutral-400">
          Hech qanday mos prompt topilmadi. Boshqa kalit so&apos;z bilan
          urinib ko&apos;ring.
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/prompts"
          className="pill-button border border-black/5 bg-white/70 text-neutral-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
        >
          Barcha promptlarni ko&apos;rish
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
