import { ArrowLeft, SearchX } from "lucide-react";
import Link from "next/link";
import { AmbientBackground } from "@/components/AmbientBackground";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <AmbientBackground />
      <div className="glass-panel relative mx-4 flex max-w-md flex-col items-center rounded-4xl p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
          <SearchX className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Sahifa topilmadi
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Siz qidirayotgan prompt yoki sahifa mavjud emas, ehtimol
          o&apos;chirilgan yoki manzil noto&apos;g&apos;ri kiritilgan.
        </p>
        <Link
          href="/prompts"
          className="pill-button mt-6 bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Promptlarga qaytish
        </Link>
      </div>
    </div>
  );
}
