import type { Prompt, PromptVariable } from "./types";

/**
 * `{{key}}` ko'rinishidagi o'zgaruvchi. Kalit snake_case bo'lishi shart —
 * shu sababli `{{Paste your essay here}}` kabi erkin matnli eski placeholderlar
 * o'zgaruvchi hisoblanmaydi va shablonda o'zgarmay qoladi.
 */
const VARIABLE_PATTERN = /\{\{\s*([a-z][a-z0-9_]*)\s*\}\}/g;

export type VariableValues = Record<string, string>;

/** Shablonda uchragan o'zgaruvchi kalitlari (birinchi uchrash tartibida, takrorsiz). */
export function extractVariableKeys(template: string): string[] {
  const keys = new Set<string>();
  for (const match of Array.from(template.matchAll(VARIABLE_PATTERN))) {
    keys.add(match[1]);
  }
  return Array.from(keys);
}

function humanizeKey(key: string): string {
  const text = key.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Prompt uchun forma maydonlari. `prompt.variables` dagi sozlamalar ustun;
 * shablonda bor-u sozlanmagan kalitlar uchun oddiy textarea qo'shiladi,
 * shablonda yo'q sozlamalar esa tashlab yuboriladi.
 */
export function resolveVariables(prompt: Prompt): PromptVariable[] {
  const keys = extractVariableKeys(prompt.template);
  const configured = new Map(prompt.variables?.map((v) => [v.key, v]));
  return keys.map(
    (key) =>
      configured.get(key) ?? {
        key,
        label: humanizeKey(key),
        type: "textarea",
      }
  );
}

export function initialValues(variables: PromptVariable[]): VariableValues {
  return Object.fromEntries(variables.map((v) => [v.key, v.defaultValue ?? ""]));
}

/** Ixtiyoriy maydon bo'sh qolganda shablonga yoziladigan matn. */
export const EMPTY_OPTIONAL_VALUE = "(ko'rsatilmagan)";

/**
 * O'zgaruvchilarni qiymatlar bilan almashtiradi. Bo'sh majburiy o'zgaruvchilar
 * `{{key}}` holicha qoladi; `optionalKeys` dagi bo'shlari esa
 * `EMPTY_OPTIONAL_VALUE` bilan almashtiriladi.
 */
export function fillTemplate(
  template: string,
  values: VariableValues,
  optionalKeys: ReadonlySet<string> = new Set()
): string {
  return template.replace(VARIABLE_PATTERN, (whole, key: string) => {
    const value = values[key]?.trim();
    if (value) return value;
    return optionalKeys.has(key) ? EMPTY_OPTIONAL_VALUE : whole;
  });
}

export function missingRequired(
  variables: PromptVariable[],
  values: VariableValues
): PromptVariable[] {
  return variables.filter(
    (v) => v.required !== false && !values[v.key]?.trim()
  );
}

export type TemplateSegment =
  | { kind: "text"; text: string }
  | { kind: "variable"; key: string; value: string };

/** Jonli ko'rinish uchun shablonni matn va o'zgaruvchi bo'laklariga ajratadi. */
export function splitTemplate(
  template: string,
  values: VariableValues
): TemplateSegment[] {
  const segments: TemplateSegment[] = [];
  let last = 0;
  for (const match of Array.from(template.matchAll(VARIABLE_PATTERN))) {
    const index = match.index ?? 0;
    if (index > last) {
      segments.push({ kind: "text", text: template.slice(last, index) });
    }
    segments.push({
      kind: "variable",
      key: match[1],
      value: values[match[1]]?.trim() ?? "",
    });
    last = index + match[0].length;
  }
  if (last < template.length) {
    segments.push({ kind: "text", text: template.slice(last) });
  }
  return segments;
}
