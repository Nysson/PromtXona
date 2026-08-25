"use client";

import { BookMarked, Menu, Moon, PenLine, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/prompts", label: "Promptlar katalogi" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
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
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-neutral-900/[0.06] text-neutral-900 dark:bg-white/10 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
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

            <a
              href={SITE.submitFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button hidden bg-neutral-900 text-white shadow-soft hover:opacity-90 sm:inline-flex dark:bg-white dark:text-neutral-900"
            >
              <PenLine className="h-4 w-4" />
              Prompt yuborish
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-900/[0.05] hover:text-neutral-900 md:hidden dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
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
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-900/[0.05] dark:text-neutral-200 dark:hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.submitFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-neutral-900 px-3 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
            >
              <PenLine className="h-4 w-4" />
              Prompt yuborish
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
