import type { Metadata } from "next";
import { Suspense } from "react";
import { PromptsCatalog } from "./PromptsCatalog";

export const metadata: Metadata = {
  title: "Promptlar katalogi",
  description:
    "IELTS, SAT va Ona tili/Adabiyot uchun barcha AI promptlarini qidiring va filtrlang.",
};

export default function PromptsPage() {
  return (
    <Suspense fallback={null}>
      <PromptsCatalog />
    </Suspense>
  );
}
