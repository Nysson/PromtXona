"use client";

import { Check } from "lucide-react";
import { forwardRef } from "react";
import type { TemplateVariable } from "@/lib/prompt-template";
import { cn } from "@/lib/utils";

/** Insho / parcha uchun balandroq maydon, savol uchun — ixchamroq. */
const ESSAY_LIKE = /\b(essay|passage|insho|outline|feedback|description)\b/i;

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition focus:border-accent-blue/50 focus:outline-none focus:ring-4 focus:ring-accent-blue/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500";

interface PromptVariableFieldProps {
  id: string;
  variable: TemplateVariable;
  value: string;
  invalid?: boolean;
  onChange: (key: string, value: string) => void;
}

export const PromptVariableField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  PromptVariableFieldProps
>(function PromptVariableField({ id, variable, value, invalid, onChange }, ref) {
  const filled = value.trim().length > 0;
  const placeholder = variable.hint
    ? `Masalan: ${variable.hint}`
    : variable.kind === "long"
      ? "Shu yerga joylashtiring…"
      : "Shu yerga yozing…";
  const wordCount = filled ? value.trim().split(/\s+/).length : 0;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-200"
      >
        <span
          className={cn(
            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition",
            filled
              ? "border-accent-green bg-accent-green text-white"
              : "border-neutral-300 dark:border-neutral-600"
          )}
          aria-hidden
        >
          {filled && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
        <span className="min-w-0">{variable.label}</span>
        {variable.occurrences > 1 && (
          <span className="shrink-0 text-xs font-normal text-neutral-400">
            ×{variable.occurrences}
          </span>
        )}
      </label>

      {variable.kind === "long" ? (
        <>
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            value={value}
            onChange={(e) => onChange(variable.key, e.target.value)}
            placeholder={placeholder}
            rows={ESSAY_LIKE.test(variable.label) ? 8 : 4}
            aria-invalid={invalid || undefined}
            className={cn(
              fieldClass,
              "resize-y leading-relaxed",
              invalid && "border-accent-orange/60"
            )}
          />
          <p className="mt-1 text-right text-xs tabular-nums text-neutral-400">
            {wordCount} so&apos;z
          </p>
        </>
      ) : (
        <input
          id={id}
          ref={ref as React.Ref<HTMLInputElement>}
          type="text"
          value={value}
          onChange={(e) => onChange(variable.key, e.target.value)}
          placeholder={placeholder}
          aria-invalid={invalid || undefined}
          className={cn(fieldClass, invalid && "border-accent-orange/60")}
        />
      )}
    </div>
  );
});
