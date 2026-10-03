"use client";

import { Bot, Copy, ExternalLink, Sparkles, Waves } from "lucide-react";
import { useToast } from "@/components/ToastProvider";
import {
  AI_PROVIDERS,
  MAX_PREFILL_URL_LENGTH,
  type AiProvider,
} from "@/lib/constants";
import type { PromptVariable } from "@/lib/types";
import { cn } from "@/lib/utils";

const PROVIDER_ICONS: Record<AiProvider["id"], React.ElementType> = {
  chatgpt: Bot,
  claude: Sparkles,
  deepseek: Waves,
};

/**
 * "Nusxalash" + "ChatGPT / Claude / DeepSeek'da ochish" tugmalari.
 *
 * Har doim avval promptni clipboard'ga yozamiz (sahifa hali fokusda bo'lganda),
 * keyin yangi oynani ochamiz. URL prefill'ni qo'llamaydigan provayderda yoki
 * prompt URL'ga sig'maydigan darajada uzun bo'lsa, talaba Ctrl+V bilan
 * joylashtiradi.
 */
export function QuickRunBar({
  text,
  missing,
  onMissing,
  onCopied,
}: {
  text: string;
  missing: PromptVariable[];
  /** Bo'sh majburiy maydon bo'lsa chaqiriladi (masalan, unga scroll qilish). */
  onMissing: () => void;
  onCopied: () => void;
}) {
  const { showToast } = useToast();

  function blockIfMissing(): boolean {
    if (missing.length === 0) return false;
    onMissing();
    showToast(
      `Avval to'ldiring: ${missing.map((v) => v.label).join(", ")}`
    );
    return true;
  }

  async function handleCopy() {
    if (blockIfMissing()) return;
    try {
      await navigator.clipboard.writeText(text);
      onCopied();
      showToast("Prompt nusxalandi! Endi uni AI chatiga joylashtiring.");
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.");
    }
  }

  async function handleRun(provider: AiProvider) {
    if (blockIfMissing()) return;

    // Clipboard'ga yozishni oyna ochilishidan OLDIN boshlaymiz: yangi tab
    // ochilgach hujjat fokusni yo'qotadi va writeText rad etiladi.
    const copied = navigator.clipboard.writeText(text).then(
      () => true,
      () => false
    );

    const prefillUrl = provider.supportsPrefill ? provider.buildUrl(text) : "";
    const prefilled =
      Boolean(prefillUrl) && prefillUrl.length <= MAX_PREFILL_URL_LENGTH;
    window.open(
      prefilled ? prefillUrl : provider.homeUrl,
      "_blank",
      "noopener,noreferrer"
    );

    const ok = await copied;
    if (ok) onCopied();

    if (prefilled) {
      showToast(`${provider.name} ochildi — prompt allaqachon kiritilgan.`);
    } else if (ok) {
      showToast(
        `Prompt nusxalandi — ${provider.name} oynasida Ctrl+V bilan joylashtiring.`
      );
    } else {
      showToast(
        "Nusxalab bo'lmadi. Avval \"Nusxalash\" tugmasini bosib ko'ring."
      );
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={handleCopy}
        className="pill-button bg-neutral-900 text-white shadow-soft hover:opacity-90 dark:bg-white dark:text-neutral-900"
      >
        <Copy className="h-4 w-4" />
        Nusxalash
      </button>
      {AI_PROVIDERS.map((provider) => {
        const Icon = PROVIDER_ICONS[provider.id];
        return (
          <button
            key={provider.id}
            type="button"
            onClick={() => handleRun(provider)}
            className={cn(
              "pill-button border border-black/10 bg-white/70 text-neutral-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200",
              provider.accentClass
            )}
          >
            <Icon className="h-4 w-4" />
            {provider.name}&apos;da ochish
            <ExternalLink className="h-3.5 w-3.5 opacity-50" />
          </button>
        );
      })}
    </div>
  );
}
