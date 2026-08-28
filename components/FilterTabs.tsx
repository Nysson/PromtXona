"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  /** Ko'rsatiladigan nom, agar u qiymatning o'zidan farq qilsa. */
  labels?: Record<string, string>;
  /**
   * "primary" — yo'nalishlar (asosiy qator), "secondary" — yo'nalish ichidagi
   * kichik bo'limlar. Ikkinchisi ataylab yengilroq, chunki u tanlovni
   * toraytiradi, boshidan boshlamaydi.
   */
  variant?: "primary" | "secondary";
  className?: string;
}

export function FilterTabs({
  options,
  active,
  onChange,
  labels,
  variant = "primary",
  className,
}: FilterTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Tanlangan bo'lim ekrandan chiqib qolmasin. Telefonda qator gorizontal
   * siljiydi, shuning uchun havola orqali kelganda ("?category=DTM") faol
   * tugma ko'rinmay qolishi mumkin edi. Sahifa vertikal siljimasligi uchun
   * scrollIntoView emas, faqat gorizontal scrollTo ishlatiladi.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || container.scrollWidth <= container.clientWidth) return;
    const activeEl = container.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeEl) return;
    container.scrollTo({
      left: Math.max(
        0,
        activeEl.offsetLeft - (container.clientWidth - activeEl.clientWidth) / 2
      ),
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scrollbar-none flex w-full gap-2 overflow-x-auto pb-1",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            data-active={isActive}
            className={cn(
              "pill-button shrink-0",
              variant === "primary"
                ? cn(
                    "border",
                    isActive
                      ? "border-transparent bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
                      : "border-black/5 bg-white/60 text-neutral-600 hover:border-black/10 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:text-white"
                  )
                : cn(
                    "px-3 py-1 text-xs",
                    isActive
                      ? "bg-accent-blue/10 text-accent-blue"
                      : "text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/5 dark:hover:text-white"
                  )
            )}
          >
            {labels?.[option] ?? option}
          </button>
        );
      })}
    </div>
  );
}
