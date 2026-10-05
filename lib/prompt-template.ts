/**
 * Prompt shablonlaridagi `{{...}}` bo'sh joylarni tahlil qilish va to'ldirish.
 *
 * Shablondagi har bir `{{Matn}}` — bitta o'zgaruvchi. Bir xil matnli teglar
 * (masalan, ikki marta `{{Paste your full essay here}}`) bitta maydon sifatida
 * qaraladi, shunda talaba bir narsani ikki marta yozmaydi.
 */

/** `{{ ... }}` — ichida `{` yoki `}` bo'lmagan har qanday matn. */
const PLACEHOLDER_PATTERN = /\{\{\s*([^{}]+?)\s*\}\}/g;

export type FieldKind = "short" | "long";

export interface TemplateVariable {
  /** Normallashtirilgan kalit — qiymatlar shu kalit bo'yicha saqlanadi. */
  key: string;
  /** Maydon sarlavhasi (misol qismi olib tashlangan). */
  label: string;
  /** Inputdagi kulrang yordamchi matn, masalan "a memorable trip". */
  hint?: string;
  kind: FieldKind;
  /** Shablonda necha marta uchraydi. */
  occurrences: number;
}

export type TemplateSegment =
  | { type: "text"; value: string }
  | { type: "variable"; key: string; raw: string };

export interface ParsedTemplate {
  segments: TemplateSegment[];
  variables: TemplateVariable[];
}

export type TemplateValues = Record<string, string>;

/** Uzun matn (insho, parcha, ro'yxat) kutilayotganini bildiruvchi so'zlar. */
const LONG_HINTS =
  /\b(paste|essay|passage|paragraph|description|feedback|outline|insho|joylashtiring|ro'yxat|xatolar)/i;

/** Qisqa javob (mavzu, nom, son) kutilayotganini bildiruvchi so'zlar — ustun turadi. */
const SHORT_HINTS =
  /\b(topic|title|name|position|mavzu|nomi|soat|masalan|e\.g\.)/i;

/** Misol qismini ajratadi: `topic, e.g. "a trip"` → label "topic", hint "a trip". */
const EXAMPLE_SPLIT = /^(.*?)\s*\b(?:e\.g\.|masalan),?\s*(.+)$/i;

function normalizeKey(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").toLowerCase();
}

function stripQuotes(value: string): string {
  return value.trim().replace(/^["'“”]+|["'“”]+$/g, "");
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function inferFieldKind(raw: string): FieldKind {
  // "Insho mavzusini..." — mavzu qisqa, garchi "insho" so'zi bo'lsa ham.
  if (SHORT_HINTS.test(raw) && !/\b(essay|passage|paragraph)\b/i.test(raw)) {
    return "short";
  }
  return LONG_HINTS.test(raw) ? "long" : "short";
}

/**
 * Teg turgan qatordagi undan oldingi matn, masalan
 * `- Kuniga ajrata oladigan vaqtim: {{masalan, 4 soat}}` → "Kuniga ajrata oladigan vaqtim".
 */
function lineLeadBefore(template: string, index: number): string {
  const lineStart = template.lastIndexOf("\n", index - 1) + 1;
  return template
    .slice(lineStart, index)
    .replace(/^[\s\-*•\d.)]+/, "")
    .replace(/[\s:—–-]+$/, "")
    .trim();
}

function describe(
  raw: string,
  fallbackLabel: string
): Pick<TemplateVariable, "label" | "hint"> {
  const text = raw.trim().replace(/\s+/g, " ");
  const match = text.match(EXAMPLE_SPLIT);
  if (!match) return { label: capitalize(text) };

  let label = match[1].trim();
  let hint = match[2].trim();
  // `(e.g. ...)` ko'rinishidagi qavslarni olib tashlaymiz.
  if (label.endsWith("(") && hint.endsWith(")")) hint = hint.slice(0, -1);
  label = label.replace(/[\s,(]+$/, "");
  hint = stripQuotes(hint);

  // Teg faqat misoldan iborat bo'lsa (`{{masalan, 30}}`) — qatordagi matnni olamiz.
  return {
    label: capitalize(label || fallbackLabel || "Qiymat"),
    hint: hint || undefined,
  };
}

export function parseTemplate(template: string): ParsedTemplate {
  const segments: TemplateSegment[] = [];
  const byKey = new Map<string, TemplateVariable>();
  let cursor = 0;

  for (const match of template.matchAll(PLACEHOLDER_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      segments.push({ type: "text", value: template.slice(cursor, start) });
    }

    const inner = match[1];
    const key = normalizeKey(inner);
    segments.push({ type: "variable", key, raw: match[0] });

    const existing = byKey.get(key);
    if (existing) {
      existing.occurrences += 1;
    } else {
      byKey.set(key, {
        key,
        ...describe(inner, lineLeadBefore(template, start)),
        kind: inferFieldKind(inner),
        occurrences: 1,
      });
    }
    cursor = start + match[0].length;
  }

  if (cursor < template.length) {
    segments.push({ type: "text", value: template.slice(cursor) });
  }

  return { segments, variables: Array.from(byKey.values()) };
}

/**
 * Shablonni qiymatlar bilan to'ldiradi. To'ldirilmagan maydonlar asl
 * `{{...}}` ko'rinishida qoladi — AI nima yetishmayotganini ko'radi.
 */
export function renderTemplate(
  segments: TemplateSegment[],
  values: TemplateValues
): string {
  return segments
    .map((segment) => {
      if (segment.type === "text") return segment.value;
      const value = values[segment.key];
      return value && value.trim() ? value : segment.raw;
    })
    .join("");
}

export function getMissingVariables(
  variables: TemplateVariable[],
  values: TemplateValues
): TemplateVariable[] {
  return variables.filter((v) => !values[v.key]?.trim());
}
