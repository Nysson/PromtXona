"use client";

import { AlertCircle, Chrome, Mail, Send, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { useAuth } from "@/components/AuthProvider";
import { Logo } from "@/components/Logo";
import { useToast } from "@/components/ToastProvider";
import { safeNextPath } from "@/lib/safe-redirect";

export function LoginForm() {
  const { supabase, user, isConfigured, loading } = useAuth();
  const { showToast } = useToast();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const next = safeNextPath(params.get("next"));

  function callbackUrl() {
    return `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
  }

  useEffect(() => {
    if (params.get("error")) {
      showToast("Kirishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    }
  }, [params, showToast]);

  async function signInWithGoogle() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl() },
    });
    if (error) {
      setBusy(false);
      showToast("Google orqali kirib bo'lmadi.");
    }
  }

  async function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase || !email.trim()) return;
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: callbackUrl() },
    });
    setBusy(false);
    if (error) {
      showToast("Havola yuborilmadi. Emailni tekshirib qaytadan urining.");
      return;
    }
    setSent(true);
  }

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
        <AmbientBackground />
        <div className="container-page relative flex flex-col items-center">
          <Logo className="h-16 w-16" />
          <h1 className="mt-6 text-center text-3xl font-semibold tracking-tighter text-neutral-900 sm:text-4xl dark:text-white">
            Hisobingizga kiring
          </h1>
          <p className="mt-3 max-w-md text-balance text-center text-neutral-500 dark:text-neutral-400">
            Kirsangiz, bajargan promptlaringiz saqlanadi va barcha
            qurilmalaringizda ko&apos;rinadi.
          </p>

          <div className="glass-panel mt-9 w-full max-w-md rounded-4xl p-6 sm:p-8">
            {!isConfigured ? (
              <div className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-orange/10 text-accent-orange">
                  <AlertCircle className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                  Kirish hozircha sozlanmagan
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Sayt egasi Supabase kalitlarini qo&apos;shmagan. Shunga
                  qaramay progressingiz shu brauzerda saqlanadi — promptlarni
                  bemalol &laquo;bajarildi&raquo; deb belgilashingiz mumkin.
                </p>
                <Link
                  href="/profile"
                  className="pill-button mt-6 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  Progressimni ko&apos;rish
                </Link>
              </div>
            ) : user ? (
              <div className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-green/10 text-accent-green">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                  Siz allaqachon kirgansiz
                </h2>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {user.email}
                </p>
                <Link
                  href="/profile"
                  className="pill-button mt-6 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  Profilga o&apos;tish
                </Link>
              </div>
            ) : sent ? (
              <div className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-blue/10 text-accent-blue">
                  <Mail className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-white">
                  Havola yuborildi
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  <strong className="font-medium text-neutral-700 dark:text-neutral-200">
                    {email}
                  </strong>{" "}
                  manziliga kirish havolasi yubordik. Pochtangizni oching va
                  havolani bosing.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-medium text-accent-blue hover:underline"
                >
                  Boshqa email kiritish
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={signInWithGoogle}
                  disabled={busy || loading}
                  className="pill-button w-full justify-center border border-black/10 bg-white/70 py-2.5 text-neutral-700 transition hover:border-accent-blue/40 disabled:opacity-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200"
                >
                  <Chrome className="h-4 w-4" />
                  Google orqali kirish
                </button>

                <div className="my-5 flex items-center gap-3">
                  <span className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                  <span className="text-xs text-neutral-400">yoki</span>
                  <span className="h-px flex-1 bg-black/5 dark:bg-white/10" />
                </div>

                <form onSubmit={signInWithEmail} className="space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@misol.uz"
                    className="w-full rounded-xl border border-black/5 bg-white/70 px-4 py-2.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-accent-blue/40 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-neutral-500"
                  />
                  <button
                    type="submit"
                    disabled={busy || !email.trim()}
                    className="pill-button w-full justify-center bg-neutral-900 py-2.5 text-white shadow-soft transition hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-neutral-900"
                  >
                    <Send className="h-4 w-4" />
                    Kirish havolasini yuborish
                  </button>
                </form>

                <p className="mt-5 text-center text-xs leading-relaxed text-neutral-400">
                  Parol kerak emas — emailingizga bir martalik havola yuboramiz.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
