"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Prompt } from "./types";
import {
  fillTemplate,
  initialValues,
  missingRequired,
  resolveVariables,
  type VariableValues,
} from "./variables";

const STORAGE_KEY = "promptxona-variables-v1";

type StoredValues = Record<string, VariableValues>;

function readStored(): StoredValues {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredValues) : {};
  } catch {
    return {};
  }
}

function writeStored(promptId: string, values: VariableValues) {
  try {
    const all = readStored();
    const hasContent = Object.values(values).some((v) => v.trim());
    if (hasContent) all[promptId] = values;
    else delete all[promptId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // xotira to'lgan yoki maxfiy rejim — qiymatlar faqat sahifada qoladi
  }
}

/**
 * Prompt o'zgaruvchilari holati: qiymatlar, to'ldirilgan matn va bo'sh majburiy
 * maydonlar. Qiymatlar brauzerda saqlanadi, shunda talaba sahifani yangilasa
 * ham uzun insho matni yo'qolmaydi.
 */
export function usePromptVariables(prompt: Prompt) {
  const variables = useMemo(() => resolveVariables(prompt), [prompt]);
  const [values, setValues] = useState<VariableValues>(() =>
    initialValues(variables)
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStored()[prompt.id];
    if (stored) setValues((prev) => ({ ...prev, ...stored }));
    setHydrated(true);
  }, [prompt.id]);

  useEffect(() => {
    if (hydrated) writeStored(prompt.id, values);
  }, [hydrated, prompt.id, values]);

  const setValue = useCallback((key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues(variables));
  }, [variables]);

  const filledText = useMemo(() => {
    const optional = new Set(
      variables.filter((v) => v.required === false).map((v) => v.key)
    );
    return fillTemplate(prompt.template, values, optional);
  }, [prompt.template, values, variables]);
  const missing = useMemo(
    () => missingRequired(variables, values),
    [variables, values]
  );
  const filledCount = variables.filter((v) => values[v.key]?.trim()).length;

  return {
    variables,
    values,
    setValue,
    reset,
    filledText,
    missing,
    filledCount,
  };
}
