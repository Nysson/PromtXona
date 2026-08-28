"use client";

import { CircleCheck, CircleDashed } from "lucide-react";
import { useProgress } from "./ProgressProvider";
import { useToast } from "./ToastProvider";
import { cn } from "@/lib/utils";

/**
 * "Mashq qildim" tugmasi — promptni amalda sinab ko'rganini belgilaydi.
 * Bu "Saqlash" (keyinroq o'qish uchun) dan farq qiladi: rangi yashil,
 * belgisi doira-galochka.
 */
export function CompleteButton({
  promptId,
  variant = "icon",
}: {
  promptId: string;
  variant?: "icon" | "full";
}) {
  const { isCompleted, toggleCompleted } = useProgress();
  const { showToast } = useToast();
  const done = isCompleted(promptId);

  async function handleClick() {
    await toggleCompleted(promptId);
    showToast(
      done
        ? "Ro'yxatdan olib tashlandi."
        : "Mashq qilingan deb belgilandi!"
    );
  }

  if (variant === "full") {
    return (
      <button
        onClick={handleClick}
        aria-pressed={done}
        className={cn(
          "pill-button border",
          done
            ? "border-accent-green/30 bg-accent-green/10 text-accent-green"
            : "border-black/10 bg-white/70 text-neutral-700 hover:border-accent-green/40 hover:text-accent-green dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
        )}
      >
        {done ? (
          <CircleCheck className="h-4 w-4 animate-pop" />
        ) : (
          <CircleDashed className="h-4 w-4" />
        )}
        {done ? "Mashq qilindi" : "Mashq qildim"}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={done}
      title={done ? "Belgini olib tashlash" : "Mashq qildim deb belgilash"}
      aria-label={done ? "Belgini olib tashlash" : "Mashq qildim deb belgilash"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full transition",
        done
          ? "text-accent-green"
          : "text-neutral-500 hover:bg-neutral-900/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-white"
      )}
    >
      {done ? (
        <CircleCheck className="h-4 w-4 animate-pop" />
      ) : (
        <CircleDashed className="h-4 w-4" />
      )}
    </button>
  );
}
