import Link from "next/link";
import { SITE } from "@/lib/constants";

/**
 * "Prompt yuborish" havolasi. Agar tashqi Google Form sozlangan bo'lsa —
 * yangi oynada o'sha ochiladi, aks holda ilova ichidagi /submit sahifasi.
 */
export function SubmitLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  if (SITE.hasExternalForm) {
    return (
      <a
        href={SITE.submitFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href="/submit" className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}
