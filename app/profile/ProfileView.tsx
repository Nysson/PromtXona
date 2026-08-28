"use client";

import {
  CircleCheck,
  Cloud,
  CloudOff,
  Compass,
  ListOrdered,
  LogIn,
  LogOut,
  Trophy,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useAuth } from "@/components/AuthProvider";
import { useProgress } from "@/components/ProgressProvider";
import { CHAINS, getChainSteps } from "@/data/chains";
import { PROMPTS } from "@/data/prompts";
import { CATEGORIES, CATEGORY_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CATEGORY_BAR: Record<string, string> = {
  IELTS: "bg-accent-blue",
  SAT: "bg-accent-teal",
  "Ona tili va Adabiyot": "bg-accent-pink",
  DTM: "bg-accent-green",
};

export function ProfileView() {
  const { user, isConfigured, signOut, loading: authLoading } = useAuth();
  const { completedIds, loading, isSynced } = useProgress();

  const stats = useMemo(() => {
    const total = PROMPTS.length;
    const done = PROMPTS.filter((p) => completedIds.includes(p.id)).length;

    const byCategory = CATEGORIES.map((category) => {
      const inCat = PROMPTS.filter((p) => p.category === category);
      const doneInCat = inCat.filter((p) => completedIds.includes(p.id));
      return {
        category,
        label: CATEGORY_META[category].label,
        done: doneInCat.length,
        total: inCat.length,
        percent: inCat.length
          ? Math.round((doneInCat.length / inCat.length) * 100)
          : 0,
      };
    });

    const chains = CHAINS.map((chain) => {
      const steps = getChainSteps(chain.id);
      const doneSteps = steps.filter((s) => completedIds.includes(s.id));
      return {
        chain,
        done: doneSteps.length,
        total: steps.length,
        percent: steps.length
          ? Math.round((doneSteps.length / steps.length) * 100)
          : 0,
      };
    });

    return {
      total,
      done,
      percent: total ? Math.round((done / total) * 100) : 0,
      byCategory,
      chains,
    };
  }, [completedIds]);

  const recent = useMemo(
    () =>
      PROMPTS.filter((p) => completedIds.includes(p.id)).slice(-5).reverse(),
    [completedIds]
  );

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <AmbientBackground />
        <div className="container-page relative text-center">
          <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <Trophy className="h-3.5 w-3.5 text-accent-green" />
            {loading
              ? "Yuklanmoqda..."
              : `${stats.done} / ${stats.total} mashq qilindi`}
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-white">
            Natijalarim
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-500 dark:text-neutral-400">
            Amalda sinab ko&apos;rgan promptlaringiz shu yerda hisoblanadi.
            &laquo;Saqlanganlar&raquo; esa keyinroq o&apos;qish uchun
            ro&apos;yxat.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        {/* Hisob holati */}
        <div className="glass-panel flex flex-col items-start justify-between gap-4 rounded-4xl p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-900/[0.05] text-neutral-400 dark:bg-white/10">
              <UserCircle2 className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
                {user ? user.email : "Mehmon rejimi"}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                {isSynced ? (
                  <>
                    <Cloud className="h-3.5 w-3.5 text-accent-green" />
                    Natijalaringiz hisobingizda saqlanmoqda
                  </>
                ) : (
                  <>
                    <CloudOff className="h-3.5 w-3.5" />
                    Faqat shu qurilmada saqlanmoqda
                  </>
                )}
              </p>
            </div>
          </div>

          {user ? (
            <button
              onClick={signOut}
              className="pill-button border border-black/10 bg-white/70 text-neutral-700 transition hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
            >
              <LogOut className="h-4 w-4" />
              Chiqish
            </button>
          ) : (
            isConfigured &&
            !authLoading && (
              <Link
                href="/login"
                className="pill-button bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
              >
                <LogIn className="h-4 w-4" />
                Kirish — natijalar saqlanadi
              </Link>
            )
          )}
        </div>

        {/* Umumiy progress */}
        <div className="glass-panel mt-5 rounded-4xl p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Umumiy natija
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {stats.done}
                <span className="text-2xl text-neutral-400"> / {stats.total}</span>
              </p>
            </div>
            <span className="text-3xl font-semibold tracking-tight text-accent-green">
              {stats.percent}%
            </span>
          </div>
          <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-green to-accent-teal transition-all duration-700"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
        </div>

        {/* Kategoriyalar bo'yicha */}
        <div className="glass-panel mt-5 rounded-4xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Kategoriyalar bo&apos;yicha
          </h2>
          <div className="mt-5 space-y-5">
            {stats.byCategory.map((c) => (
              <div key={c.category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-neutral-900 dark:text-white">
                    {c.label}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    {c.done}/{c.total} mashq qilindi
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700",
                      CATEGORY_BAR[c.category]
                    )}
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zanjirlar bo'yicha */}
        {stats.chains.length > 0 && (
          <div className="glass-panel mt-5 rounded-4xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              <ListOrdered className="h-4 w-4" />
              Zanjirlar
            </h2>
            <div className="mt-5 space-y-5">
              {stats.chains.map((c) => (
                <div key={c.chain.id}>
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                    <span className="min-w-0 truncate font-medium text-neutral-900 dark:text-white">
                      {c.chain.title}
                    </span>
                    <span className="shrink-0 text-neutral-500 dark:text-neutral-400">
                      {c.done}/{c.total} qadam
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
                    <div
                      className="h-full rounded-full bg-accent-indigo transition-all duration-700"
                      style={{ width: `${c.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Oxirgi bajarilganlar */}
        <div className="glass-panel mt-5 rounded-4xl p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Mashq qilgan promptlaringiz
          </h2>
          {recent.length > 0 ? (
            <ul className="mt-4 space-y-1">
              {recent.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/prompts/${p.id}`}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition hover:bg-neutral-900/[0.04] dark:hover:bg-white/5"
                  >
                    <CircleCheck className="h-4 w-4 shrink-0 text-accent-green" />
                    <span className="min-w-0 flex-1 truncate text-sm text-neutral-700 dark:text-neutral-200">
                      {p.title}
                    </span>
                    <span className="shrink-0 text-xs text-neutral-400">
                      {p.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 flex flex-col items-start gap-4">
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Hozircha bironta prompt belgilanmagan. Istalgan promptda
                &laquo;Mashq qildim&raquo; tugmasini bosing.
              </p>
              <Link
                href="/prompts"
                className="pill-button bg-neutral-900 text-white shadow-soft dark:bg-white dark:text-neutral-900"
              >
                <Compass className="h-4 w-4" />
                Promptlarni ko&apos;rish
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
