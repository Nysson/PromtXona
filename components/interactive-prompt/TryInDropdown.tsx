"use client";

import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { chatGptUrl, claudeUrl, geminiUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AiTarget {
  id: "chatgpt" | "claude" | "gemini";
  name: string;
  /** Matnni URL orqali oldindan to'ldira oladimi. */
  prefills: boolean;
  href: (prompt: string) => string;
  dot: string;
}

const TARGETS: AiTarget[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    prefills: true,
    href: chatGptUrl,
    dot: "bg-accent-green",
  },
  {
    id: "claude",
    name: "Claude",
    prefills: true,
    href: claudeUrl,
    dot: "bg-accent-orange",
  },
  {
    id: "gemini",
    name: "Gemini",
    prefills: false,
    href: () => geminiUrl(),
    dot: "bg-accent-blue",
  },
];

interface TryInDropdownProps {
  prompt: string;
  /** Har bir havola ochilishidan oldin chaqiriladi (masalan, nusxalash uchun). */
  onSelect: (target: { name: string; prefills: boolean }) => void;
}

export function TryInDropdown({ prompt, onSelect }: TryInDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();

    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function onMenuKeyDown(e: React.KeyboardEvent) {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      rootRef.current?.querySelector("button")?.focus();
    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      items[(current + step + items.length) % items.length]?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className="pill-button border border-black/10 bg-white/70 text-neutral-700 hover:border-accent-blue/30 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
      >
        Sinash
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          onKeyDown={onMenuKeyDown}
          className="animate-toast-in absolute right-0 z-30 mt-2 w-64 origin-top-right rounded-2xl border border-black/5 bg-white/95 p-1.5 shadow-soft backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/95 dark:shadow-soft-dark"
        >
          {TARGETS.map((target, index) => (
            <a
              key={target.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="menuitem"
              href={target.href(prompt)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                onSelect({ name: target.name, prefills: target.prefills });
                setOpen(false);
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 outline-none transition hover:bg-neutral-900/5 focus:bg-neutral-900/5 dark:text-neutral-200 dark:hover:bg-white/10 dark:focus:bg-white/10"
            >
              <span className={cn("h-2 w-2 shrink-0 rounded-full", target.dot)} />
              <span className="flex-1">
                <span className="block font-medium">{target.name}</span>
                {!target.prefills && (
                  <span className="block text-xs text-neutral-400">
                    Nusxalanadi — chatga joylashtiring
                  </span>
                )}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
