import type { FilterGroup, PromptCategory } from "./types";

/**
 * Ixtiyoriy: agar siz haqiqiy Google Form yaratsangiz, uni `.env.local` faylida
 * NEXT_PUBLIC_SUBMIT_FORM_URL sifatida qo'shing. Bo'sh bo'lsa, ilova o'zining
 * ichki /submit sahifasidan foydalanadi (hech qanday buzilgan havola yo'q).
 */
const EXTERNAL_FORM_URL = process.env.NEXT_PUBLIC_SUBMIT_FORM_URL?.trim() || "";

export const SITE = {
  name: "PromptXona",
  tagline: "Prompt kutubxonasi — IELTS, SAT va Ona tili uchun",
  description:
    "O'zbekistonlik o'quvchilar uchun ochiq kodli prompt kutubxonasi: DTM, IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun sinovdan o'tgan AI promptlari.",
  url: "https://promptxona.vercel.app",
  repoOwner: "Nysson",
  repoName: "PromtXona",
  githubUrl: "https://github.com/Nysson/PromtXona",
  /** Tashqi forma bo'lsa — o'sha, bo'lmasa ichki sahifa. */
  submitFormUrl: EXTERNAL_FORM_URL || "/submit",
  hasExternalForm: Boolean(EXTERNAL_FORM_URL),
};

/** Prompt taklifini GitHub issue sifatida oldindan to'ldirib ochadi. */
export function githubIssueUrl(params: {
  title: string;
  body: string;
}): string {
  const search = new URLSearchParams({
    title: params.title,
    body: params.body,
    labels: "prompt-submission",
  });
  return `${SITE.githubUrl}/issues/new?${search.toString()}`;
}

export interface CategoryMeta {
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  /**
   * Shu yo'nalish ichidagi kichik bo'limlar. Katalogdagi ikkinchi qator
   * filtrlar shu ro'yxatdan chiziladi.
   */
  groups: FilterGroup[];
}

/**
 * Yo'nalishlar — saytdagi yagona tasnif manbasi. Bosh sahifadagi kartalar,
 * katalogdagi filtrlar va "Natijalarim" sahifasidagi progress shu obyektdan
 * kelib chiqadi, shuning uchun ular hech qachon bir-biridan farq qilmaydi.
 */
export const CATEGORY_META: Record<PromptCategory, CategoryMeta> = {
  IELTS: {
    label: "IELTS",
    sublabel: "Writing, Speaking, Vocabulary",
    color: "from-accent-blue to-accent-indigo",
    icon: "GraduationCap",
    groups: ["IELTS Writing", "IELTS Speaking"],
  },
  SAT: {
    label: "SAT",
    sublabel: "Math, Reading, Grammar",
    color: "from-accent-teal to-accent-blue",
    icon: "Calculator",
    groups: ["SAT Math", "SAT Reading"],
  },
  "Ona tili va Adabiyot": {
    label: "Ona tili va Adabiyot",
    sublabel: "Insho, adabiy tahlil",
    color: "from-accent-pink to-accent-orange",
    icon: "BookOpenText",
    groups: ["Ona tili / Adabiyot"],
  },
  DTM: {
    label: "DTM",
    sublabel: "Matematika, Ona tili, Tarix",
    color: "from-accent-green to-accent-teal",
    icon: "ClipboardCheck",
    groups: ["DTM — Matematika", "DTM — Ona tili", "DTM — Tarix", "DTM — Umumiy"],
  },
};

export const CATEGORIES = Object.keys(CATEGORY_META) as PromptCategory[];

/** Barcha kichik bo'limlar — CATEGORY_META dan kelib chiqadi. */
export const FILTER_GROUPS: FilterGroup[] = CATEGORIES.flatMap(
  (category) => CATEGORY_META[category].groups
);

const GROUP_TO_CATEGORY = Object.fromEntries(
  CATEGORIES.flatMap((category) =>
    CATEGORY_META[category].groups.map((group) => [group, category])
  )
) as Record<FilterGroup, PromptCategory>;

export function isCategory(value: string): value is PromptCategory {
  return (CATEGORIES as string[]).includes(value);
}

export function isFilterGroup(value: string): value is FilterGroup {
  return (FILTER_GROUPS as string[]).includes(value);
}

/** Kichik bo'lim qaysi yo'nalishga tegishli. Noma'lum bo'lsa — null. */
export function categoryOfGroup(group: string): PromptCategory | null {
  return isFilterGroup(group) ? GROUP_TO_CATEGORY[group] : null;
}

/**
 * Yo'nalish ichida ko'rsatiladigan qisqa nom: "DTM — Matematika" -> "Matematika".
 * Yo'nalish nomi allaqachon yuqoridagi qatorda turgani uchun uni takrorlamaymiz.
 */
export function shortGroupLabel(group: FilterGroup): string {
  const category = GROUP_TO_CATEGORY[group];
  for (const prefix of [`${category} — `, `${category} `]) {
    if (group.startsWith(prefix)) return group.slice(prefix.length);
  }
  return group;
}

export function chatGptUrl(promptText: string): string {
  return `https://chatgpt.com/?model=gpt-4o&q=${encodeURIComponent(promptText)}`;
}

export function claudeUrl(promptText: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
}

export function geminiUrl(): string {
  return `https://gemini.google.com/app`;
}
