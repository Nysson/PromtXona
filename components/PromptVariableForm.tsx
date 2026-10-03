"use client";

import type { PromptVariable } from "@/lib/types";
import type { VariableValues } from "@/lib/variables";
import { cn } from "@/lib/utils";

export function variableFieldId(promptId: string, key: string) {
  return `var-${promptId}-${key}`;
}

const fieldClass =
  "w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-accent-blue/50 focus:ring-4 focus:ring-accent-blue/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white";

/** Har bir `{{key}}` uchun mos input chizadi (text, textarea, number, select). */
export function PromptVariableForm({
  promptId,
  variables,
  values,
  missingKeys,
  onChange,
}: {
  promptId: string;
  variables: PromptVariable[];
  values: VariableValues;
  /** Ajratib ko'rsatiladigan bo'sh majburiy maydonlar. */
  missingKeys: Set<string>;
  onChange: (key: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {variables.map((variable) => {
        const id = variableFieldId(promptId, variable.key);
        const value = values[variable.key] ?? "";
        const invalid = missingKeys.has(variable.key);
        const required = variable.required !== false;
        const describedBy = variable.helpText ? `${id}-help` : undefined;
        const common = {
          id,
          value,
          "aria-invalid": invalid || undefined,
          "aria-describedby": describedBy,
          className: cn(
            fieldClass,
            invalid && "border-accent-orange/60 ring-4 ring-accent-orange/10"
          ),
        };

        return (
          <div
            key={variable.key}
            className={cn(variable.type === "textarea" && "sm:col-span-2")}
          >
            <label
              htmlFor={id}
              className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-100"
            >
              <span>
                {variable.label}
                {required && <span className="ml-0.5 text-accent-pink">*</span>}
              </span>
              <code className="font-mono text-[11px] font-normal text-neutral-400">
                {`{{${variable.key}}}`}
              </code>
            </label>

            {variable.type === "textarea" ? (
              <textarea
                {...common}
                rows={value.length > 400 ? 10 : 4}
                placeholder={variable.placeholder}
                onChange={(e) => onChange(variable.key, e.target.value)}
                className={cn(common.className, "resize-y leading-relaxed")}
              />
            ) : variable.type === "select" ? (
              <select
                {...common}
                onChange={(e) => onChange(variable.key, e.target.value)}
              >
                <option value="">Tanlang…</option>
                {variable.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...common}
                type={variable.type === "number" ? "number" : "text"}
                inputMode={variable.type === "number" ? "numeric" : undefined}
                placeholder={variable.placeholder}
                onChange={(e) => onChange(variable.key, e.target.value)}
              />
            )}

            {variable.helpText && (
              <p
                id={describedBy}
                className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400"
              >
                {variable.helpText}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
