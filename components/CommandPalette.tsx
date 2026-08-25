"use client";

import { CornerDownLeft, PenLine, Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePrompts } from "./PromptsProvider";

interface CommandPaletteContextValue {
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<
  CommandPaletteContextValue | undefined
>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { prompts } = usePrompts();
  const router = useRouter();

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? prompts.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q) ||
            p.tags.some((t) => t.toLowerCase().includes(q))
        )
      : [...prompts].sort((a, b) => b.upvotes - a.upvotes);
    return list.slice(0, 7);
  }, [prompts, query]);

  // ⌘K / Ctrl+K ochish, Esc yopish
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery("");
            setActiveIndex(0);
          }
          return !prev;
        });
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Ochiq bo'lganda sahifa scroll qilinmasin
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function navigate(id: string) {
    setOpen(false);
    router.push(`/prompts/${id}`);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (i) => (i - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1)
      );
    } else if (e.key === "Enter" && results[activeIndex]) {
      e.preventDefault();
      navigate(results[activeIndex].id);
    }
  }

  return (
    <CommandPaletteContext.Provider value={{ openPalette, closePalette }}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closePalette}
          />

          <div className="animate-toast-in relative w-full max-w-xl overflow-hidden rounded-3xl border border-black/5 bg-white/90 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-900/90">
            <div className="flex items-center gap-3 border-b border-black/5 px-5 dark:border-white/10">
              <Search className="h-4 w-4 shrink-0 text-neutral-400" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Prompt qidirish..."
                className="h-14 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white"
              />
              <kbd className="hidden rounded border border-black/10 px-1.5 py-0.5 text-[10px] text-neutral-400 sm:block dark:border-white/10">
                Esc
              </kbd>
            </div>

            <div className="max-h-[320px] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-4 py-8 text-center text-sm text-neutral-400">
                  Hech narsa topilmadi.
                </p>
              )}

              {results.map((prompt, index) => (
                <button
                  key={prompt.id}
                  onClick={() => navigate(prompt.id)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition",
                    index === activeIndex
                      ? "bg-neutral-900/[0.06] dark:bg-white/10"
                      : "hover:bg-neutral-900/[0.03] dark:hover:bg-white/5"
                  )}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-blue/10 text-accent-blue">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-neutral-900 dark:text-white">
                      {prompt.title}
                    </span>
                    <span className="block truncate text-xs text-neutral-400">
                      {prompt.subcategory} · {prompt.upvotes} upvote
                    </span>
                  </span>
                  {index === activeIndex && (
                    <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-black/5 px-5 py-3 text-xs text-neutral-400 dark:border-white/10">
              <span className="flex items-center gap-3">
                <span>↑↓ tanlash</span>
                <span>↵ ochish</span>
              </span>
              <a
                href={SITE.hasExternalForm ? SITE.submitFormUrl : "/submit"}
                className="flex items-center gap-1.5 transition hover:text-accent-blue"
              >
                <PenLine className="h-3 w-3" />
                Prompt yuborish
              </a>
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx)
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider"
    );
  return ctx;
}
