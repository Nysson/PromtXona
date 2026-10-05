"use client";

import {
  ArrowLeft,
  Bookmark,
  Layers,
  Link2,
  ListChecks,
  MessageSquareQuote,
  PencilLine,
  Sparkles,
  Tag,
  Target,
  ThumbsUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { ChainNavigator } from "@/components/ChainNavigator";
import { CompleteButton } from "@/components/CompleteButton";
import { CommentSection } from "@/components/CommentSection";
import { InteractivePromptViewer } from "@/components/interactive-prompt/InteractivePromptViewer";
import { ModelBadge } from "@/components/ModelBadge";
import { usePrompts } from "@/components/PromptsProvider";
import { RelatedPrompts } from "@/components/RelatedPrompts";
import { useToast } from "@/components/ToastProvider";
import type { Prompt } from "@/lib/types";
import { cn, formatCompactNumber, formatDate } from "@/lib/utils";

export function PromptDetail({ initialPrompt }: { initialPrompt: Prompt }) {
  const {
    getPromptById,
    toggleUpvote,
    isUpvoted,
    incrementCopyCount,
    isSaved,
    toggleSaved,
  } = usePrompts();
  const { showToast } = useToast();

  const prompt = getPromptById(initialPrompt.id) ?? initialPrompt;
  const upvoted = isUpvoted(prompt.id);
  const saved = isSaved(prompt.id);

  async function handleShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: prompt.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      showToast("Havola nusxalandi!");
    } catch {
      // foydalanuvchi ulashishni bekor qildi — xabar kerak emas
    }
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <Link
        href="/prompts"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Barcha promptlarga qaytish
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-blue/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-blue">
              {prompt.category}
            </span>
            <span className="rounded-full bg-neutral-900/[0.05] px-3 py-1 text-xs font-medium text-neutral-500 dark:bg-white/10 dark:text-neutral-300">
              {prompt.subcategory}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            {prompt.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
            {prompt.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-neutral-400">
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {prompt.author}
            </span>
            <span>{formatDate(prompt.createdAt)}</span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => toggleUpvote(prompt.id)}
              className={cn(
                "pill-button border",
                upvoted
                  ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                  : "border-black/10 bg-white/70 text-neutral-700 hover:border-accent-blue/30 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
              )}
            >
              <ThumbsUp
                className={cn("h-4 w-4", upvoted && "animate-pop fill-accent-blue")}
              />
              {formatCompactNumber(prompt.upvotes)} Upvote
            </button>
            <a
              href="#prompt-builder"
              className="pill-button bg-neutral-900 text-white shadow-soft transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
            >
              <PencilLine className="h-4 w-4" />
              To&apos;ldirish va nusxalash
            </a>
            <button
              onClick={() => {
                toggleSaved(prompt.id);
                showToast(
                  saved
                    ? "Saqlanganlardan olib tashlandi."
                    : "Promptga saqlandi!"
                );
              }}
              className={cn(
                "pill-button border",
                saved
                  ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                  : "border-black/10 bg-white/70 text-neutral-700 hover:border-accent-blue/40 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
              )}
            >
              <Bookmark
                className={cn("h-4 w-4", saved && "fill-accent-blue")}
              />
              {saved ? "Saqlangan" : "Saqlash"}
            </button>
            <CompleteButton promptId={prompt.id} variant="full" />
            <button
              onClick={handleShare}
              className="pill-button border border-black/10 bg-white/70 text-neutral-700 transition hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
            >
              <Link2 className="h-4 w-4" />
              Ulashish
            </button>
          </div>

          <ChainNavigator prompt={prompt} />

          {/* Role / Task / Context */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoBlock icon={User} label="Role" text={prompt.role} />
            <InfoBlock icon={Target} label="Task" text={prompt.task} />
            <InfoBlock icon={Layers} label="Context" text={prompt.context} />
          </div>

          {/* Template — bo'sh joylarni to'ldirib nusxalash */}
          <div id="prompt-builder" className="mt-8 scroll-mt-24">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white">
              <ListChecks className="h-5 w-5 text-accent-blue" />
              To&apos;liq Prompt Shabloni
            </h2>
            <InteractivePromptViewer
              template={prompt.template}
              storageKey={prompt.id}
              onCopy={() => incrementCopyCount(prompt.id)}
            />
          </div>

          {/* Example input/output */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                <MessageSquareQuote className="h-4 w-4" />
                Namuna kirish (Input)
              </h3>
              <div className="glass-panel whitespace-pre-wrap rounded-3xl p-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                {prompt.exampleInput}
              </div>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                <Sparkles className="h-4 w-4" />
                Namuna natija (Output)
              </h3>
              <div className="glass-panel max-h-[420px] overflow-y-auto whitespace-pre-wrap rounded-3xl p-5 text-sm leading-relaxed text-neutral-700 dark:text-neutral-200">
                {prompt.exampleOutput}
              </div>
            </div>
          </div>

          <RelatedPrompts current={prompt} />

          <div className="mt-10">
            <CommentSection promptId={prompt.id} comments={prompt.comments} />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="glass-panel rounded-4xl p-5">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Statistika
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500 dark:text-neutral-400">Upvotelar</dt>
                <dd className="font-semibold text-neutral-900 dark:text-white">
                  {formatCompactNumber(prompt.upvotes)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500 dark:text-neutral-400">Nusxalangan</dt>
                <dd className="font-semibold text-neutral-900 dark:text-white">
                  {formatCompactNumber(prompt.copyCount)}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-neutral-500 dark:text-neutral-400">Izohlar</dt>
                <dd className="font-semibold text-neutral-900 dark:text-white">
                  {prompt.comments.length}
                </dd>
              </div>
            </dl>
          </div>

          <div className="glass-panel rounded-4xl p-5">
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Sinovdan o&apos;tgan modellar
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {prompt.testedModels.map((model) => (
                <ModelBadge key={model} model={model} />
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-4xl p-5">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold text-neutral-900 dark:text-white">
              <Tag className="h-4 w-4" />
              Teglar
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-900/[0.04] px-2.5 py-1 text-xs font-medium text-neutral-500 dark:bg-white/[0.06] dark:text-neutral-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoBlock({
  icon: Icon,
  label,
  text,
}: {
  icon: React.ElementType;
  label: string;
  text: string;
}) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent-blue">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {text}
      </p>
    </div>
  );
}
