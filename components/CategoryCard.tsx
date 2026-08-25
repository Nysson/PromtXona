import { BookOpenText, Calculator, GraduationCap, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PromptCategory } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Calculator,
  BookOpenText,
};

interface CategoryCardProps {
  category: PromptCategory;
  label: string;
  sublabel: string;
  color: string;
  icon: string;
  count: number;
  href: string;
}

export function CategoryCard({
  label,
  sublabel,
  color,
  icon,
  count,
  href,
}: CategoryCardProps) {
  const Icon = ICONS[icon] ?? GraduationCap;

  return (
    <Link
      href={href}
      className="group glass-panel relative flex flex-col justify-between overflow-hidden rounded-4xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-7"
    >
      <div
        className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
      />
      <div className="relative flex items-center justify-between">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-glow`}
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </span>
        <ArrowUpRight className="h-5 w-5 text-neutral-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-500 dark:text-neutral-600 dark:group-hover:text-neutral-300" />
      </div>

      <div className="relative mt-6">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
          {label}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          {sublabel}
        </p>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          {count} ta prompt
        </p>
      </div>
    </Link>
  );
}
