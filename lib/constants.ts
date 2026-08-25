import type { FilterGroup, PromptCategory } from "./types";

export const SITE = {
  name: "PromptXona",
  tagline: "Prompt kutubxonasi — IELTS, SAT va Ona tili uchun",
  description:
    "O'zbekistonlik o'quvchilar uchun ochiq kodli prompt kutubxonasi: IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun sinovdan o'tgan AI promptlari.",
  url: "https://promptxona.vercel.app",
  githubUrl: "https://github.com/promptxona/promptxona",
  // Replace with your real Google Form link for community prompt submissions.
  submitFormUrl: "https://forms.gle/PromptXonaSubmitYourPrompt",
  twitterUrl: "https://twitter.com/promptxona",
};

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
