import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PromptsProvider } from "@/components/PromptsProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ToastProvider";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — Ochiq kodli Prompt Kutubxonasi`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: {
    title: `${SITE.name} — Ochiq kodli Prompt Kutubxonasi`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "uz_UZ",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider>
          <ToastProvider>
            <PromptsProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </PromptsProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
