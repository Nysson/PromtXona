"use client";

import {
  AlertCircle,
  CheckCircle2,
  ClipboardCopy,
  Github,
  Send,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useToast } from "@/components/ToastProvider";
import { FILTER_GROUPS, githubIssueUrl, SITE } from "@/lib/constants";
import type { FilterGroup } from "@/lib/types";
import { cn } from "@/lib/utils";

const MODEL_OPTIONS = [
  "ChatGPT-4o",
  "Claude 3.5 Sonnet",
  "Gemini 1.5 Pro",
  "Boshqa",
];

interface FormState {
  author: string;
  title: string;
  filterGroup: FilterGroup | "";
  description: string;
  role: string;
  task: string;
  context: string;
  template: string;
  exampleInput: string;
  exampleOutput: string;
  testedModels: string[];
  tags: string;
}

const EMPTY_FORM: FormState = {
  author: "",
  title: "",
  filterGroup: "",
  description: "",
  role: "",
  task: "",
  context: "",
  template: "",
  exampleInput: "",
  exampleOutput: "",
  testedModels: [],
  tags: "",
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "title",
  "filterGroup",
  "description",
  "template",
];

export function SubmitForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleModel(model: string) {
    setForm((prev) => ({
      ...prev,
      testedModels: prev.testedModels.includes(model)
        ? prev.testedModels.filter((m) => m !== model)
        : [...prev.testedModels, model],
    }));
  }

  const missing = REQUIRED_FIELDS.filter((key) => {
    const value = form[key];
    return typeof value === "string" && value.trim() === "";
  });
  const isValid = missing.length === 0;

  const completion = useMemo(() => {
    const all = Object.entries(form);
    const filled = all.filter(([, v]) =>
      Array.isArray(v) ? v.length > 0 : String(v).trim() !== ""
    ).length;
    return Math.round((filled / all.length) * 100);
  }, [form]);

  const markdown = useMemo(() => {
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    return [
      `## 📝 Yangi prompt taklifi: ${form.title || "(sarlavhasiz)"}`,
      "",
      `- **Kategoriya:** ${form.filterGroup || "-"}`,
      `- **Muallif:** ${form.author.trim() || "Anonim"}`,
      `- **Sinovdan o'tgan modellar:** ${
        form.testedModels.length ? form.testedModels.join(", ") : "-"
      }`,
      `- **Teglar:** ${tags.length ? tags.map((t) => `\`${t}\``).join(", ") : "-"}`,
      "",
      "### Qisqacha tavsif",
      form.description || "-",
      "",
      "### AI qanday rolda (Role)",
      form.role || "-",
      "",
      "### Prompt nima qiladi (Task)",
      form.task || "-",
      "",
      "### Nega kerak (Context)",
      form.context || "-",
      "",
      "### Prompt shabloni",
      "```text",
      form.template || "-",
      "```",
      "",
      "### Siz shunday yozasiz (Input)",
      form.exampleInput || "-",
      "",
      "### AI shunday javob beradi (Output)",
      form.exampleOutput || "-",
      "",
      "---",
      `_${SITE.name} /submit sahifasi orqali yuborildi._`,
    ].join("\n");
  }, [form]);

  function guard(): boolean {
    setTouched(true);
    if (!isValid) {
      showToast("Iltimos, shart bo'lgan joylarni to'ldiring.");
      return false;
    }
    return true;
  }

  function handleGithub() {
    if (!guard()) return;
    const url = githubIssueUrl({
      title: `[Prompt] ${form.title}`,
      body: markdown,
    });
    window.open(url, "_blank", "noopener,noreferrer");
    showToast("GitHub issue oynasi ochildi.");
  }

  async function handleCopy() {
    if (!guard()) return;
    try {
      await navigator.clipboard.writeText(markdown);
      showToast("Prompt matni nusxalandi! Endi uni bizga yuboring.");
    } catch {
      showToast("Nusxalashda xatolik yuz berdi.");
    }
  }

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <AmbientBackground />
        <div className="container-page relative text-center">
          <span className="glass-panel inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-300">
            <Sparkles className="h-3.5 w-3.5 text-accent-blue" />
            Jamiyatga hissa qo&apos;shing
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tighter text-neutral-900 sm:text-5xl dark:text-white">
            Prompt yuborish
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-balance text-neutral-500 dark:text-neutral-400">
            O&apos;zingiz sinab ko&apos;rgan foydali promptni ulashing. Uni
            ko&apos;rib chiqib, PromptXona kutubxonasiga qo&apos;shamiz — sizning
            ismingiz muallif sifatida ko&apos;rsatiladi.
          </p>
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-6">
            {/* Asosiy ma'lumot */}
            <FormSection
              step={1}
              title="Asosiy ma'lumot"
              hint="Prompt nima qilishini qisqacha tushuntiring."
            >
              <Field label="Prompt sarlavhasi" required>
                <input
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="Masalan: IELTS Writing Task 2 — Band Score Feedback"
                  className={inputClass(touched && form.title.trim() === "")}
                />
              </Field>

              <Field label="Kategoriya" required>
                <div className="flex flex-wrap gap-2">
                  {FILTER_GROUPS.map((group) => (
                    <button
                      key={group}
                      type="button"
                      onClick={() => update("filterGroup", group)}
                      className={cn(
                        "pill-button border text-sm",
                        form.filterGroup === group
                          ? "border-transparent bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                          : "border-black/10 bg-white/60 text-neutral-600 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
                      )}
                    >
                      {group}
                    </button>
                  ))}
                </div>
                {touched && form.filterGroup === "" && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-accent-pink">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Kategoriyani tanlang
                  </p>
                )}
              </Field>

              <Field label="Qisqacha tavsif" required>
                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  rows={2}
                  placeholder="Bu prompt nima qiladi va kimga foydali?"
                  className={inputClass(
                    touched && form.description.trim() === "",
                    "resize-none"
                  )}
                />
              </Field>

              <Field label="Ismingiz" hint="Muallif sifatida ko'rsatiladi">
                <input
                  value={form.author}
                  onChange={(e) => update("author", e.target.value)}
                  placeholder="Masalan: Aziz Rahimov (ixtiyoriy)"
                  className={inputClass(false)}
                />
              </Field>
            </FormSection>

            {/* Prompt tuzilmasi */}
            <FormSection
              step={2}
              title="Prompt qismlari"
              hint="Bu qismlar prompt sahifasida alohida kartalar sifatida ko'rinadi."
            >
              <Field label="AI qanday rolda javob beradi?">
                <textarea
                  value={form.role}
                  onChange={(e) => update("role", e.target.value)}
                  rows={2}
                  placeholder="Masalan: You are a certified IELTS examiner with 12 years of experience..."
                  className={inputClass(false, "resize-none")}
                />
              </Field>
              <Field label="Prompt aniq nima qiladi?">
                <textarea
                  value={form.task}
                  onChange={(e) => update("task", e.target.value)}
                  rows={2}
                  placeholder="Masalan: Assess the essay using the official band descriptors..."
                  className={inputClass(false, "resize-none")}
                />
              </Field>
              <Field label="Nega bu prompt kerak?">
                <textarea
                  value={form.context}
                  onChange={(e) => update("context", e.target.value)}
                  rows={3}
                  placeholder="Talabalar qanday muammoga duch keladi va bu prompt uni qanday hal qiladi?"
                  className={inputClass(false, "resize-none")}
                />
              </Field>
            </FormSection>

            {/* Shablon */}
            <FormSection
              step={3}
              title="Prompt shabloni"
              hint="O'zgaradigan joylarni {{ikki qavs}} ichida yozing."
            >
              <Field label="To'liq prompt matni" required>
                <textarea
                  value={form.template}
                  onChange={(e) => update("template", e.target.value)}
                  rows={10}
                  placeholder={
                    "Act as a ...\n\n1. ...\n2. ...\n\nMy text:\n\"\"\"\n{{Matningizni shu yerga joylashtiring}}\n\"\"\""
                  }
                  className={inputClass(
                    touched && form.template.trim() === "",
                    "font-mono text-[13px] leading-relaxed"
                  )}
                />
              </Field>
            </FormSection>

            {/* Namunalar */}
            <FormSection
              step={4}
              title="Namuna va modellar"
              hint="Ixtiyoriy, lekin promptning sifatini ko'rsatadi."
            >
              <Field label="Siz shunday yozasiz">
                <textarea
                  value={form.exampleInput}
                  onChange={(e) => update("exampleInput", e.target.value)}
                  rows={3}
                  placeholder="Promptga bergan misol matningiz"
                  className={inputClass(false, "resize-none")}
                />
              </Field>
              <Field label="AI shunday javob beradi">
                <textarea
                  value={form.exampleOutput}
                  onChange={(e) => update("exampleOutput", e.target.value)}
                  rows={4}
                  placeholder="AI qaytargan natija"
                  className={inputClass(false, "resize-none")}
                />
              </Field>

              <Field label="Qaysi modellarda sinab ko'rdingiz?">
                <div className="flex flex-wrap gap-2">
                  {MODEL_OPTIONS.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => toggleModel(model)}
                      className={cn(
                        "pill-button border text-sm",
                        form.testedModels.includes(model)
                          ? "border-accent-blue/30 bg-accent-blue/10 text-accent-blue"
                          : "border-black/10 bg-white/60 text-neutral-600 hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-300"
                      )}
                    >
                      {form.testedModels.includes(model) && (
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      )}
                      {model}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Teglar" hint="Vergul bilan ajrating">
                <input
                  value={form.tags}
                  onChange={(e) => update("tags", e.target.value)}
                  placeholder="Writing Task 2, Band 7+, Grammar"
                  className={inputClass(false)}
                />
              </Field>
            </FormSection>
          </div>

          {/* Yuborish paneli */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="glass-panel rounded-4xl p-6">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Yuborishga tayyormi?
              </h2>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>To&apos;ldirilgan</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {completion}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-900/10 dark:bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-blue to-accent-indigo transition-all duration-500"
                    style={{ width: `${completion}%` }}
                  />
                </div>
              </div>

              {touched && !isValid && (
                <p className="mt-4 flex items-start gap-1.5 rounded-xl bg-accent-pink/10 p-3 text-xs text-accent-pink">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    To&apos;ldirilishi shart: sarlavha, kategoriya, tavsif
                    va prompt matni.
                  </span>
                </p>
              )}

              <div className="mt-5 space-y-2.5">
                <button
                  onClick={handleGithub}
                  className="pill-button w-full justify-center bg-neutral-900 py-2.5 text-white shadow-soft transition hover:opacity-90 dark:bg-white dark:text-neutral-900"
                >
                  <Github className="h-4 w-4" />
                  GitHub&apos;da yuborish
                </button>
                <button
                  onClick={handleCopy}
                  className="pill-button w-full justify-center border border-black/10 bg-white/60 py-2.5 text-neutral-700 transition hover:border-accent-blue/40 hover:text-accent-blue dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
                >
                  <ClipboardCopy className="h-4 w-4" />
                  Matnni nusxalash
                </button>
                {SITE.hasExternalForm && (
                  <a
                    href={SITE.submitFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button w-full justify-center border border-black/10 bg-white/60 py-2.5 text-neutral-700 transition hover:text-neutral-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
                  >
                    <Send className="h-4 w-4" />
                    Google Form orqali
                  </a>
                )}
              </div>

              <p className="mt-4 text-xs leading-relaxed text-neutral-400 dark:text-neutral-500">
                <strong className="font-semibold text-neutral-500 dark:text-neutral-400">
                  GitHub&apos;da yuborish
                </strong>{" "}
                — forma avtomatik to&apos;ldirilgan issue ochadi (GitHub akkaunti
                kerak).{" "}
                <strong className="font-semibold text-neutral-500 dark:text-neutral-400">
                  Nusxalash
                </strong>{" "}
                — matnni olib, Telegram yoki email orqali yuborishingiz mumkin.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function inputClass(hasError: boolean, extra = ""): string {
  return cn(
    "w-full rounded-xl border bg-white/70 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-accent-blue/40 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500",
    hasError
      ? "border-accent-pink/50"
      : "border-black/5 dark:border-white/10",
    extra
  );
}

function FormSection({
  step,
  title,
  hint,
  children,
}: {
  step: number;
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-panel rounded-4xl p-6 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-blue/10 text-xs font-semibold text-accent-blue">
          {step}
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
            {hint}
          </p>
        </div>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-200">
        {label}
        {required && <span className="text-accent-pink">*</span>}
        {hint && (
          <span className="text-xs font-normal text-neutral-400">
            · {hint}
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
