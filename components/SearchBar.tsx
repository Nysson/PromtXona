"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Prompt qidirish... (masalan: IELTS Writing, SAT Math)",
  className,
}: SearchBarProps) {
  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-2xl border border-black/5 bg-white/70 py-3.5 pl-11 pr-11 text-sm text-neutral-900 outline-none ring-0 transition placeholder:text-neutral-400 focus:border-accent-blue/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Qidiruvni tozalash"
          className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-900/5 hover:text-neutral-700 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
