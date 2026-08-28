import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/constants";
import { Logo } from "./Logo";
import { SubmitLink } from "./SubmitLink";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white/60 dark:border-white/10 dark:bg-black/40">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <Logo className="h-8 w-8" />
              <span className="text-base text-neutral-900 dark:text-white">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              O&apos;zbekistonlik o&apos;quvchilar uchun ochiq kodli prompt
              kutubxonasi — DTM, IELTS, SAT tayyorgarligi va Ona
              tili/Adabiyot inshosi uchun sinovdan o&apos;tgan AI promptlari,
              hammaga bepul va ochiq.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Havolalar
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <Link href="/" className="hover:text-accent-blue">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-accent-blue">
                  Promptlar
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-accent-blue">
                  Saqlanganlar
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-accent-blue">
                  Natijalarim
                </Link>
              </li>
              <li>
                <SubmitLink className="hover:text-accent-blue">
                  Prompt yuborish
                </SubmitLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Jamiyat
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              <li>
                <a
                  href={SITE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent-blue"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub&apos;da ochiq manba
                </a>
              </li>
              <li>
                <a
                  href={`${SITE.githubUrl}/issues/new?labels=prompt-submission`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-blue"
                >
                  Xato yoki taklif bildirish
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-neutral-400 sm:flex-row dark:border-white/10">
          <span>
            © {new Date().getFullYear()} {SITE.name}. MIT litsenziyasi ostida
            ochiq kodli loyiha.
          </span>
          <span className="inline-flex items-center gap-1">
            O&apos;zbekiston talabalari uchun{" "}
            <Heart className="h-3.5 w-3.5 fill-accent-pink text-accent-pink" />{" "}
            bilan yaratildi
          </span>
        </div>
      </div>
    </footer>
  );
}
