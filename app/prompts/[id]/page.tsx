import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptById, PROMPTS } from "@/data/prompts";
import { PromptDetail } from "./PromptDetail";

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return PROMPTS.map((prompt) => ({ id: prompt.id }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const prompt = getPromptById(params.id);
  if (!prompt) return { title: "Prompt topilmadi" };
  return {
    title: prompt.title,
    description: prompt.description,
  };
}

export default function PromptDetailPage({ params }: PageProps) {
  const prompt = getPromptById(params.id);
  if (!prompt) notFound();

  return <PromptDetail initialPrompt={prompt} />;
}
