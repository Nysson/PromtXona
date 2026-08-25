import { Bot, Gem, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function iconFor(model: string): LucideIcon {
  const lower = model.toLowerCase();
  if (lower.includes("claude")) return Sparkles;
  if (lower.includes("gemini")) return Gem;
  return Bot;
}

function colorFor(model: string): string {
  const lower = model.toLowerCase();
  if (lower.includes("claude"))
    return "bg-accent-orange/10 text-accent-orange dark:bg-accent-orange/15";
  if (lower.includes("gemini"))
    return "bg-accent-blue/10 text-accent-blue dark:bg-accent-blue/15";
  return "bg-accent-green/10 text-accent-green dark:bg-accent-green/15";
}

export function ModelBadge({
  model,
  className,
}: {
  model: string;
  className?: string;
}) {
  const Icon = iconFor(model);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        colorFor(model),
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
      {model}
    </span>
  );
}
