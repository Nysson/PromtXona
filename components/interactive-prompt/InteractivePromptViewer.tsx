"use client";

import { Copy, Eye, PencilLine, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useToast } from "@/components/ToastProvider";
import {
  getMissingVariables,
  parseTemplate,
  renderTemplate,
  type TemplateValues,
} from "@/lib/prompt-template";
import { cn } from "@/lib/utils";
import { LivePreview } from "./LivePreview";
import { PromptVariableField } from "./PromptVariableField";
import { TryInDropdown } from "./TryInDropdown";

const DRAFT_PREFIX = "promptxona:draft:";

interface InteractivePromptViewerProps {
  template: string;
  /**
   * Berilsa, kiritilgan qiymatlar shu kalit bilan brauzerda saqlanadi —
   * talaba sahifani yangilasa ham inshosi yo'qolmaydi.
   */
  storageKey?: string;
  /** Prompt muvaffaqiyatli nusxalanganda chaqiriladi (statistika uchun). */
  onCopy?: (renderedPrompt: string) => void;
  className?: string;
}

function readDraft(storageKey: string): TemplateValues {
  try {
    const raw = window.localStorage.getItem(DRAFT_PREFIX + storageKey);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return Object.fromEntries(
        Object.entries(parsed).filter(
          (entry): entry is [string, string] => typeof entry[1] === "string"
        )
      );
    }
  } catch {
    // shaxsiy rejim yoki buzilgan ma'lumot — qoralamasiz davom etamiz
  }
  return {};
}

function writeDraft(storageKey: string, values: TemplateValues) {
  try {
    const hasContent = Object.values(values).some((v) => v.trim());
    if (hasContent) {
      window.localStorage.setItem(
        DRAFT_PREFIX + storageKey,
        JSON.stringify(values)
      );
    } else {
      window.localStorage.removeItem(DRAFT_PREFIX + storageKey);
    }
  } catch {
    // saqlash imkoni yo'q — muhim emas
  }
}

export function InteractivePromptViewer({
  template,
  storageKey,
  onCopy,
  className,
}: InteractivePromptViewerProps) {
  const { showToast } = useToast();
  const formId = useId();
  const { segments, variables } = useMemo(
    () => parseTemplate(template),
    [template]
  );

  const [values, setValues] = useState<TemplateValues>({});
  const [draftLoaded, setDraftLoaded] = useState(!storageKey);
  /** Bo'sh maydonlar haqida ogohlantirildi — keyingi bosish baribir nusxalaydi. */
  const [incompleteWarned, setIncompleteWarned] = useState(false);
  const fieldRefs = useRef(
    new Map<string, HTMLInputElement | HTMLTextAreaElement>()
  );

  // Qoralama faqat mijozda o'qiladi (SSR bilan mos kelishi uchun).
  useEffect(() => {
    if (!storageKey) return;
    setValues(readDraft(storageKey));
    setDraftLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (storageKey && draftLoaded) writeDraft(storageKey, values);
  }, [storageKey, draftLoaded, values]);

  const rendered = useMemo(
    () => renderTemplate(segments, values),
    [segments, values]
  );
  const missing = useMemo(
    () => getMissingVariables(variables, values),
    [variables, values]
  );
  const filledCount = variables.length - missing.length;
  const isComplete = missing.length === 0;

  const handleChange = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setIncompleteWarned(false);
  }, []);

  const copyRendered = useCallback(async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(rendered);
      onCopy?.(rendered);
      return true;
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.", "warning");
      return false;
    }
  }, [rendered, onCopy, showToast]);

  async function handleCopy() {
    if (!isComplete && !incompleteWarned) {
      setIncompleteWarned(true);
      fieldRefs.current.get(missing[0].key)?.focus();
      showToast(
        `${missing.length} ta maydon bo'sh. Baribir nusxalash uchun yana bosing.`,
        "warning"
      );
      return;
    }
    if (await copyRendered()) {
      showToast(
        isComplete
          ? "Prompt nusxalandi!"
          : "Prompt to'liq bo'lmagan holda nusxalandi."
      );
    }
  }

  async function handleTry(target: { name: string; prefills: boolean }) {
    // Har doim nusxalaymiz: Gemini URL orqali matn olmaydi, uzun insholar
    // esa URL chegarasidan oshib ketishi mumkin.
    if (await copyRendered()) {
      showToast(
        target.prefills
          ? `${target.name} ochilmoqda — prompt nusxalandi ham.`
          : `Prompt nusxalandi — ${target.name}'ga joylashtiring (Ctrl+V).`
      );
    }
  }

  function handleReset() {
    setValues({});
    setIncompleteWarned(false);
    showToast("Maydonlar tozalandi.");
  }

  const hasVariables = variables.length > 0;

  return (
    <section className={cn("space-y-6", className)}>
      {hasVariables && (
        <div className="glass-panel rounded-3xl p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <PencilLine className="h-4 w-4 text-accent-blue" />
              Bo&apos;sh joylarni to&apos;ldiring
            </h3>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "text-xs font-medium tabular-nums",
                  isComplete ? "text-accent-green" : "text-neutral-400"
                )}
              >
                {filledCount}/{variables.length} to&apos;ldirildi
              </span>
              {filledCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-neutral-500 transition hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <RotateCcw className="h-3 w-3" />
                  Tozalash
                </button>
              )}
            </div>
          </div>

          <div
            className="mb-5 h-1 overflow-hidden rounded-full bg-neutral-900/5 dark:bg-white/10"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={variables.length}
            aria-valuenow={filledCount}
            aria-label="To'ldirilgan maydonlar"
          >
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                isComplete ? "bg-accent-green" : "bg-accent-blue"
              )}
              style={{ width: `${(filledCount / variables.length) * 100}%` }}
            />
          </div>

          <div className="space-y-5">
            {variables.map((variable, index) => (
              <PromptVariableField
                key={variable.key}
                id={`${formId}-${index}`}
                variable={variable}
                value={values[variable.key] ?? ""}
                invalid={incompleteWarned && !values[variable.key]?.trim()}
                onChange={handleChange}
                ref={(el) => {
                  if (el) fieldRefs.current.set(variable.key, el);
                  else fieldRefs.current.delete(variable.key);
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <Eye className="h-4 w-4 text-accent-blue" />
            {hasVariables ? "Jonli ko'rinish" : "Prompt"}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "pill-button shadow-soft hover:opacity-90",
                incompleteWarned
                  ? "bg-accent-orange text-white"
                  : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
              )}
            >
              <Copy className="h-4 w-4" />
              {incompleteWarned ? "Baribir nusxalash" : "Nusxalash"}
            </button>
            <TryInDropdown prompt={rendered} onSelect={handleTry} />
          </div>
        </div>
        <LivePreview segments={segments} values={values} />
      </div>
    </section>
  );
}
