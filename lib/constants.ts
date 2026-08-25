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
    "O'zbekistonlik o'quvchilar uchun ochiq kodli prompt kutubxonasi: IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun sinovdan o'tgan AI promptlari.",
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

export const CATEGORY_META: Record<
  PromptCategory,
  { label: string; sublabel: string; color: string; icon: string }
> = {
  IELTS: {
    label: "IELTS",
    sublabel: "Writing, Speaking, Vocabulary",
    color: "from-accent-blue to-accent-indigo",
    icon: "GraduationCap",
  },
  SAT: {
    label: "SAT",
    sublabel: "Math, Reading, Grammar",
    color: "from-accent-teal to-accent-blue",
    icon: "Calculator",
  },
  "Ona tili va Adabiyot": {
    label: "Ona tili va Adabiyot",
    sublabel: "Insho, adabiy tahlil",
    color: "from-accent-pink to-accent-orange",
    icon: "BookOpenText",
  },
};

export const FILTER_GROUPS: FilterGroup[] = [
  "IELTS Writing",
  "IELTS Speaking",
  "SAT Math",
  "SAT Reading",
  "Ona tili / Adabiyot",
];

export function chatGptUrl(promptText: string): string {
  return `https://chatgpt.com/?model=gpt-4o&q=${encodeURIComponent(promptText)}`;
}

export function claudeUrl(promptText: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(promptText)}`;
}

export function geminiUrl(): string {
  return `https://gemini.google.com/app`;
}
