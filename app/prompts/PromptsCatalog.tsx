"use client";

import { LayoutGrid } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { FilterTabs } from "@/components/FilterTabs";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts } from "@/components/PromptsProvider";
import { SearchBar } from "@/components/SearchBar";
import {
  CATEGORIES,
  CATEGORY_META,
  categoryOfGroup,
  isCategory,
  isFilterGroup,
  shortGroupLabel,
} from "@/lib/constants";
import type { FilterGroup, PromptCategory } from "@/lib/types";

const ALL_CATEGORIES = "Barchasi";
const ALL_GROUPS = "Hammasi";

const CATEGORY_OPTIONS = [ALL_CATEGORIES, ...CATEGORIES];

export function PromptsCatalog() {
  const { prompts } = usePrompts();
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("category") ?? "";
  const rawGroup = searchParams.get("group") ?? "";

  /**
   * URL'dan boshlang'ich holat. `?category=` ga yo'nalish ham ("IELTS"),
   * kichik bo'lim ham ("IELTS Writing") berilishi mumkin — eski havolalar
   * ishlashda davom etsin uchun ikkalasi ham qabul qilinadi.
   */
  const initial = useMemo(() => {
    if (isCategory(rawCategory)) {
      const group =
        isFilterGroup(rawGroup) && categoryOfGroup(rawGroup) === rawCategory
          ? rawGroup
          : null;
      return { category: rawCategory as PromptCategory, group };
    }
    const legacy = categoryOfGroup(rawCategory);
    if (legacy) {
      return { category: legacy, group: rawCategory as FilterGroup };
    }
    return { category: null, group: null };
  }, [rawCategory, rawGroup]);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PromptCategory | null>(
    initial.category
  );
  const [group, setGroup] = useState<FilterGroup | null>(initial.group);
  const [sort, setSort] = useState<"popular" | "newest">("popular");

  // Havola orqali boshqa yo'nalish tanlansa, holat URL bilan mos qolsin.
  useEffect(() => {
    setCategory(initial.category);
    setGroup(initial.group);
  }, [initial]);

  const subGroups = category ? CATEGORY_META[category].groups : [];
  const showSubGroups = subGroups.length > 1;

  const groupOptions = useMemo(
    () => [ALL_GROUPS, ...subGroups],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category]
  );
  const groupLabels = useMemo(
    () =>
      Object.fromEntries(subGroups.map((g) => [g, shortGroupLabel(g)])) as Record<
        string,
        string
      >,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = prompts
      .filter((p) => !category || p.category === category)
      .filter((p) => !group || p.filterGroup === group)
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
        ? b.upvotes - a.upvotes
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [prompts, query, category, group, sort]);

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
            DTM, IELTS, SAT va Ona tili/Adabiyot uchun barcha promptlarni
            qidiring va bir zumda nusxa oling.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        {/* 65px = sarlavha balandligi (h-16) + 1px chegara. Panel unga tegib
            tursin, aks holda oradagi tirqishdan pastdagi kartalar ko'rinib
            qoladi. */}
        <div className="control-bar sticky top-[65px] z-30 flex flex-col gap-3 rounded-4xl p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar value={query} onChange={setQuery} className="sm:max-w-sm" />
            <FilterTabs
              options={CATEGORY_OPTIONS}
              active={category ?? ALL_CATEGORIES}
              onChange={(value) => {
                setCategory(value === ALL_CATEGORIES ? null : (value as PromptCategory));
                setGroup(null);
              }}
            />
          </div>

          {showSubGroups && (
            <FilterTabs
              variant="secondary"
              options={groupOptions}
              labels={groupLabels}
              active={group ?? ALL_GROUPS}
              onChange={(value) =>
                setGroup(value === ALL_GROUPS ? null : (value as FilterGroup))
              }
            />
          )}
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
          <div className="quiet-panel mt-8 rounded-4xl p-10 text-center text-neutral-500 dark:text-neutral-400">
            Hech qanday mos prompt topilmadi. Boshqa bo&apos;limni tanlab
            ko&apos;ring.
          </div>
        )}
      </section>
    </div>
  );
}
