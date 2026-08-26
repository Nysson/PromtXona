import { ArrowRight, PenLine, Sparkles } from "lucide-react";
import Link from "next/link";
import { PROMPTS } from "@/data/prompts";
import { CATEGORY_META, SITE } from "@/lib/constants";
import { AmbientBackground } from "./AmbientBackground";
import { Logo } from "./Logo";
import { SubmitLink } from "./SubmitLink";

export function Hero() {
  const promptCount = PROMPTS.length;
  const categoryCount = Object.keys(CATEGORY_META).length;

  return (
    <section className="relative overflow-hidden pb-20 pt-20 sm:pb-28 sm:pt-28">
      <AmbientBackground />
      <div className="container-page relative flex flex-col items-center text-center">
        <Logo className="mb-7 h-24 w-24 drop-shadow-[0_12px_28px_rgba(16,60,120,0.28)] sm:h-28 sm:w-28" />

        <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
          100% ochiq kodli · ChatGPT, Claude va Gemini uchun sinovdan o&apos;tgan
        </span>

        <h1 className="mt-7 text-balance text-5xl font-semibold tracking-tighter text-neutral-900 sm:text-7xl dark:text-white">
          {SITE.name}
        </h1>

        <p className="mt-5 max-w-2xl text-balance text-lg leading-relaxed text-neutral-500 sm:text-xl dark:text-neutral-400">
          DTM, IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun
          o&apos;quvchilar jamiyati yaratgan AI promptlari kutubxonasi.
        </p>
        <p className="mt-2 max-w-2xl text-balance text-sm leading-relaxed text-neutral-400 dark:text-neutral-500">
          A free, open-source prompt library built for Uzbek students —
          test-ready prompts for DTM, IELTS, SAT, and native-language essays.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/prompts"
            className="pill-button justify-center bg-neutral-900 px-6 py-3 text-[15px] text-white shadow-glow transition hover:-translate-y-0.5 dark:bg-white dark:text-neutral-900"
          >
            Promptlarni ko&apos;rish
            <ArrowRight className="h-4 w-4" />
          </Link>
          <SubmitLink className="pill-button justify-center border border-black/10 bg-white/70 px-6 py-3 text-[15px] text-neutral-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-100">
            <PenLine className="h-4 w-4" />
            O&apos;z promptingizni yuboring
          </SubmitLink>
        </div>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              {promptCount}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Sinovdan o&apos;tgan prompt
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              {categoryCount}
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Yo&apos;nalish: DTM, IELTS, SAT, Ona tili
            </p>
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              100%
            </p>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Bepul va ochiq kodli
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
