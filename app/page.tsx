import { CategoryCard } from "@/components/CategoryCard";
import { FeaturedPrompts } from "@/components/FeaturedPrompts";
import { Hero } from "@/components/Hero";
import { PROMPTS } from "@/data/prompts";
import { CATEGORY_META } from "@/lib/constants";
import type { PromptCategory } from "@/lib/types";

const CATEGORY_HREF: Record<PromptCategory, string> = {
  IELTS: "/prompts?category=IELTS Writing",
  SAT: "/prompts?category=SAT Math",
  "Ona tili va Adabiyot": "/prompts?category=Ona tili / Adabiyot",
  DTM: "/prompts?category=DTM — Matematika",
};

export default function HomePage() {
  const counts = PROMPTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Hero />

      <section className="container-page py-4 sm:py-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            Kategoriya bo&apos;yicha tanlang
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Har bir yo&apos;nalish uchun maxsus tayyorlangan prompt
            to&apos;plamlari
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(CATEGORY_META) as PromptCategory[]).map((key) => {
            const meta = CATEGORY_META[key];
            return (
              <CategoryCard
                key={key}
                category={key}
                label={meta.label}
                sublabel={meta.sublabel}
                color={meta.color}
                icon={meta.icon}
                count={counts[key] ?? 0}
                href={CATEGORY_HREF[key]}
              />
            );
          })}
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            Tanlangan promptlar
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Jamiyat tomonidan eng ko&apos;p yoqtirilgan promptlar
          </p>
        </div>
        <FeaturedPrompts />
      </section>
    </>
  );
}
