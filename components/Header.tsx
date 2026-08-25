"use client";

import {
  BookMarked,
  Bookmark,
  Menu,
  Moon,
  PenLine,
  Search,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "./CommandPalette";
import { usePrompts } from "./PromptsProvider";
import { SubmitLink } from "./SubmitLink";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/prompts", label: "Promptlar katalogi" },
  { href: "/saved", label: "Saqlanganlar" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { openPalette } = useCommandPalette();
  const { savedIds } = usePrompts();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-black/5 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-black/60">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-indigo text-white shadow-glow">
              <BookMarked className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="text-lg tracking-tight text-neutral-900 dark:text-white">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              const isSaved = link.href === "/saved";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-neutral-900/[0.06] text-neutral-900 dark:bg-white/10 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {isSaved && <Bookmark className="h-3.5 w-3.5" />}
                  {link.label}
                  {isSaved && savedIds.length > 0 && (
                    <span className="rounded-full bg-accent-blue px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                      {savedIds.length}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openPalette}
              aria-label="Qidirish"
              className="hidden items-center gap-2 rounded-full border border-black/5 bg-white/60 py-1.5 pl-3 pr-2 text-sm text-neutral-400 transition hover:border-black/10 hover:text-neutral-600 sm:flex dark:border-white/10 dark:bg-white/[0.04] dark:hover:text-neutral-200"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-xs">Qidirish</span>
              <kbd className="rounded border border-black/10 bg-white/80 px-1.5 py-0.5 font-sans text-[10px] font-medium text-neutral-400 dark:border-white/10 dark:bg-white/10">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-900/[0.05] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-[18px] w-[18px]" />
              ) : (
                <Moon className="h-[18px] w-[18px]" />
              )}
            </button>

            <SubmitLink className="pill-button hidden bg-neutral-900 text-white shadow-soft hover:opacity-90 sm:inline-flex dark:bg-white dark:text-neutral-900">
              <PenLine className="h-4 w-4" />
              Prompt yuborish
            </SubmitLink>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-900/[0.05] hover:text-neutral-900 md:hidden dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-b border-black/5 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-black/95">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-900/[0.05] dark:text-neutral-200 dark:hover:bg-white/10"
              >
                {link.label}
                {link.href === "/saved" && savedIds.length > 0 && (
                  <span className="rounded-full bg-accent-blue px-1.5 py-0.5 text-[10px] font-semibold text-white">
                    {savedIds.length}
                  </span>
                )}
              </Link>
            ))}
            <SubmitLink
              onNavigate={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900 px-3 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
            >
              <PenLine className="h-4 w-4" />
              Prompt yuborish
            </SubmitLink>
          </div>
        </div>
      )}
    </header>
  );
}
