import type { Prompt, PromptChain } from "@/lib/types";
import { PROMPTS } from "./prompts";

/**
 * Prompt zanjirlari — bir-birini davom ettiruvchi promptlar ketma-ketligi.
 * Prompt zanjirga `chainId` va `stepOrder` maydonlari orqali qo'shiladi
 * (`data/prompts.ts` ga qarang). Ikkala maydon ham ixtiyoriy, shuning uchun
 * zanjirga kirmagan promptlar avvalgidek mustaqil ishlaydi.
 */
export const CHAINS: PromptChain[] = [
  {
    id: "ielts-writing-task2",
    title: "IELTS Writing Task 2 — to'liq yozish jarayoni",
    description:
      "Savolni tahlil qilishdan tortib qayta yozishgacha — insho yozishning besh bosqichi, ketma-ket bajarish uchun.",
    category: "IELTS",
  },
];

export function getChainById(id: string): PromptChain | undefined {
  return CHAINS.find((c) => c.id === id);
}

/** Zanjirdagi barcha promptlar, `stepOrder` bo'yicha tartiblangan. */
export function getChainSteps(chainId: string): Prompt[] {
  return PROMPTS.filter((p) => p.chainId === chainId).sort(
    (a, b) => (a.stepOrder ?? 0) - (b.stepOrder ?? 0)
  );
}

/**
 * Prompt uchun zanjir konteksti: zanjirning o'zi, barcha qadamlar va
 * joriy promptning o'rni. Prompt zanjirga tegishli bo'lmasa — null.
 */
export function getChainContext(prompt: Prompt) {
  if (!prompt.chainId) return null;
  const chain = getChainById(prompt.chainId);
  if (!chain) return null;

  const steps = getChainSteps(prompt.chainId);
  const index = steps.findIndex((s) => s.id === prompt.id);
  if (index === -1) return null;

  return {
    chain,
    steps,
    index,
    stepNumber: index + 1,
    totalSteps: steps.length,
    previous: index > 0 ? steps[index - 1] : null,
    next: index < steps.length - 1 ? steps[index + 1] : null,
  };
}
