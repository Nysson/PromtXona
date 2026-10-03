"use client";

import { useMemo } from "react";
import type { PromptVariable } from "@/lib/types";
import { splitTemplate, type VariableValues } from "@/lib/variables";

/**
 * Shablonni jonli ko'rsatadi: to'ldirilgan o'zgaruvchilar ko'k rangda,
 * bo'shlari esa bosiladigan "chip" ko'rinishida (bosilsa maydonga o'tadi).
 */
export function FilledPromptPreview({
  template,
  values,
  variables,
  onFocusVariable,
}: {
  template: string;
  values: VariableValues;
  variables: PromptVariable[];
  onFocusVariable: (key: string) => void;
}) {
  const segments = useMemo(
    () => splitTemplate(template, values),
    [template, values]
  );
  const labels = useMemo(
    () => new Map(variables.map((v) => [v.key, v.label])),
    [variables]
  );

  return (
    <pre className="max-h-[520px] overflow-y-auto whitespace-pre-wrap break-words rounded-3xl border border-black/5 bg-white/60 p-5 font-mono text-[13px] leading-relaxed text-neutral-700 dark:border-white/10 dark:bg-black/20 dark:text-neutral-200">
      {segments.map((segment, i) => {
        if (segment.kind === "text") return segment.text;
        if (segment.value) {
          return (
            <mark
              key={i}
              className="rounded-md bg-accent-blue/10 px-1 text-accent-blue dark:bg-accent-blue/20 dark:text-[#64b5ff]"
            >
              {segment.value}
            </mark>
          );
        }
        return (
          <button
            key={i}
            type="button"
            onClick={() => onFocusVariable(segment.key)}
            className="mx-0.5 inline-flex items-center rounded-md border border-dashed border-accent-orange/60 bg-accent-orange/10 px-1.5 font-sans text-xs font-medium text-[#b86e00] transition hover:bg-accent-orange/20 dark:text-accent-orange"
          >
            {labels.get(segment.key) ?? segment.key}
          </button>
        );
      })}
    </pre>
  );
}
