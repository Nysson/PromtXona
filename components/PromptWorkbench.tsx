"use client";

import { Copy, ListChecks, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { FilledPromptPreview } from "@/components/FilledPromptPreview";
import {
  PromptVariableForm,
  variableFieldId,
} from "@/components/PromptVariableForm";
import { QuickRunBar } from "@/components/QuickRunBar";
import { useToast } from "@/components/ToastProvider";
import type { Prompt } from "@/lib/types";
import { usePromptVariables } from "@/lib/usePromptVariables";

/**
 * Promptni ishlatish paneli: o'zgaruvchilar formasi → jonli to'ldirilgan
 * prompt → nusxalash yoki AI chatida ochish.
 */
export function PromptWorkbench({
  prompt,
  onCopied,
}: {
  prompt: Prompt;
  onCopied: () => void;
}) {
  const { showToast } = useToast();
  const { variables, values, setValue, reset, filledText, missing, filledCount } =
    usePromptVariables(prompt);
  // Bo'sh maydonlar faqat nusxalashga urinilgandan keyin ajratib ko'rsatiladi.
  const [showMissing, setShowMissing] = useState(false);
  const missingKeys = useMemo(
    () => new Set(showMissing ? missing.map((v) => v.key) : []),
    [missing, showMissing]
  );

  function focusVariable(key: string) {
    const el = document.getElementById(variableFieldId(prompt.id, key));
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus({ preventScroll: true });
  }

  async function copyRawTemplate() {
    try {
      await navigator.clipboard.writeText(prompt.template);
      onCopied();
      showToast("Bo'sh shablon nusxalandi.");
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.");
    }
  }

  const hasVariables = variables.length > 0;

  return (
    <section
      id="ishlatish"
      className="glass-panel mt-10 scroll-mt-24 rounded-4xl p-5 sm:p-6"
    >
      {hasVariables && (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
              <SlidersHorizontal className="h-5 w-5 text-accent-blue" />
              Promptni moslang
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                {filledCount}/{variables.length} to&apos;ldirildi
              </span>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Tozalash
              </button>
            </div>
          </div>
          <div
            className="mb-6 h-1 overflow-hidden rounded-full bg-neutral-900/[0.06] dark:bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={variables.length}
            aria-valuenow={filledCount}
            aria-label="To'ldirilgan maydonlar"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo transition-all duration-300"
              style={{ width: `${(filledCount / variables.length) * 100}%` }}
            />
          </div>
          <PromptVariableForm
            promptId={prompt.id}
            variables={variables}
            values={values}
            missingKeys={missingKeys}
            onChange={setValue}
          />
        </>
      )}

      <div className={hasVariables ? "mt-8" : undefined}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
            <ListChecks className="h-5 w-5 text-accent-blue" />
            {hasVariables ? "Tayyor prompt (jonli)" : "To'liq Prompt Shabloni"}
          </h2>
          {hasVariables && (
            <button
              type="button"
              onClick={copyRawTemplate}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Copy className="h-3.5 w-3.5" />
              Bo&apos;sh shablon
            </button>
          )}
        </div>
        <FilledPromptPreview
          template={prompt.template}
          values={values}
          variables={variables}
          onFocusVariable={focusVariable}
        />
      </div>

      <div className="mt-5">
        <QuickRunBar
          text={filledText}
          missing={missing}
          onMissing={() => {
            setShowMissing(true);
            if (missing[0]) focusVariable(missing[0].key);
          }}
          onCopied={onCopied}
        />
      </div>
    </section>
  );
}
