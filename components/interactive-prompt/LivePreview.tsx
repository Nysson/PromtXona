"use client";

import type { TemplateSegment, TemplateValues } from "@/lib/prompt-template";

interface LivePreviewProps {
  segments: TemplateSegment[];
  values: TemplateValues;
}

/**
 * Shablonni jonli ko'rsatadi: to'ldirilgan joylar ko'k, bo'sh joylar
 * to'q sariq rangda ajratiladi — talaba nima qolganini darhol ko'radi.
 */
export function LivePreview({ segments, values }: LivePreviewProps) {
  return (
    <pre
      aria-live="polite"
      className="glass-panel max-h-[520px] overflow-y-auto whitespace-pre-wrap break-words rounded-3xl p-5 font-mono text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-200"
    >
      {segments.map((segment, index) => {
        if (segment.type === "text") return segment.value;

        const value = values[segment.key];
        if (value && value.trim()) {
          return (
            <mark
              key={index}
              className="rounded bg-accent-blue/10 px-0.5 text-accent-blue dark:bg-accent-blue/20"
            >
              {value}
            </mark>
          );
        }
        return (
          <mark
            key={index}
            className="rounded border border-dashed border-accent-orange/50 bg-accent-orange/10 px-1 text-accent-orange"
          >
            {segment.raw}
          </mark>
        );
      })}
    </pre>
  );
}
