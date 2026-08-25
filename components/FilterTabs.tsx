"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterTabs({
  options,
  active,
  onChange,
  className,
}: FilterTabsProps) {
  return (
    <div
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
            className={cn(
              "pill-button shrink-0 border",
              isActive
                ? "border-transparent bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
                : "border-black/5 bg-white/60 text-neutral-600 hover:border-black/10 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300 dark:hover:text-white"
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
