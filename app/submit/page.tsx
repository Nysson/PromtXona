import type { Metadata } from "next";
import { SubmitForm } from "./SubmitForm";

export const metadata: Metadata = {
  title: "Prompt yuborish",
  description:
    "O'zingiz sinab ko'rgan foydali AI promptini PromptXona kutubxonasiga yuboring.",
};

export default function SubmitPage() {
  return <SubmitForm />;
}
