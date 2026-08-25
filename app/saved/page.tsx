import type { Metadata } from "next";
import { SavedPrompts } from "./SavedPrompts";

export const metadata: Metadata = {
  title: "Saqlanganlar",
  description: "O'zingiz saqlab qo'ygan PromptXona promptlari.",
};

export default function SavedPage() {
  return <SavedPrompts />;
}
