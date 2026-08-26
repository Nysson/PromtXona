"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";

const LOCAL_KEY = "promptxona-completed-v1";

interface ProgressContextValue {
  /** Bajarilgan promptlar id'lari. */
  completedIds: string[];
  isCompleted: (promptId: string) => boolean;
  toggleCompleted: (promptId: string) => Promise<void>;
  /** Boshlang'ich yuklash tugadimi. */
  loading: boolean;
  /** Progress bulutga saqlanyaptimi (tizimga kirilgan) yoki faqat brauzerdami. */
  isSynced: boolean;
}

const ProgressContext = createContext<ProgressContextValue | undefined>(
  undefined
);

function readLocal(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(ids: string[]) {
  try {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
  } catch {
    // xotira to'lgan yoki maxfiy rejim — jim o'tamiz
  }
}

/**
 * "Bajarildi" belgilarini boshqaradi. Tizimga kirilmagan bo'lsa localStorage'da,
 * kirilgan bo'lsa Supabase'da saqlanadi. Birinchi marta kirganda mahalliy
 * belgilar bulutga ko'chiriladi, shunda foydalanuvchi progressini yo'qotmaydi.
 */
export function ProgressProvider({ children }: { children: ReactNode }) {
  const { supabase, user, loading: authLoading } = useAuth();
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const mergedForUser = useRef<string | null>(null);

  const isSynced = Boolean(supabase && user);

  // Mahalliy belgilarni darhol o'qiymiz, shunda UI kutib turmaydi.
  useEffect(() => {
    setCompletedIds(readLocal());
  }, []);

  // Sessiya aniqlangach, bulutdagi progressni yuklaymiz.
  useEffect(() => {
    if (authLoading) return;

    if (!supabase || !user) {
      setCompletedIds(readLocal());
      setLoading(false);
      return;
    }

    let active = true;

    (async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("prompt_completions")
        .select("prompt_id")
        .eq("user_id", user.id);

      if (!active) return;

      if (error) {
        // Jadval yaratilmagan yoki tarmoq xatosi — mahalliy holatda qolamiz.
        setCompletedIds(readLocal());
        setLoading(false);
        return;
      }

      const remote = (data ?? []).map((r: { prompt_id: string }) => r.prompt_id);

      // Birinchi kirishda mahalliy belgilarni bulutga ko'chiramiz.
      const local = readLocal();
      const toUpload = local.filter((id) => !remote.includes(id));

      if (toUpload.length > 0 && mergedForUser.current !== user.id) {
        mergedForUser.current = user.id;
        const { error: upErr } = await supabase
          .from("prompt_completions")
          .upsert(
            toUpload.map((prompt_id) => ({ user_id: user.id, prompt_id })),
            { onConflict: "user_id,prompt_id" }
          );
        if (!upErr) remote.push(...toUpload);
      }

      if (!active) return;
      setCompletedIds(remote);
      writeLocal(remote);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [supabase, user, authLoading]);

  const isCompleted = useCallback(
    (promptId: string) => completedIds.includes(promptId),
    [completedIds]
  );

  const toggleCompleted = useCallback(
    async (promptId: string) => {
      const wasCompleted = completedIds.includes(promptId);
      const next = wasCompleted
        ? completedIds.filter((id) => id !== promptId)
        : [...completedIds, promptId];

      // Optimistik yangilash — UI darhol javob beradi.
      setCompletedIds(next);
      writeLocal(next);

      if (!supabase || !user) return;

      const { error } = wasCompleted
        ? await supabase
            .from("prompt_completions")
            .delete()
            .eq("user_id", user.id)
            .eq("prompt_id", promptId)
        : await supabase
            .from("prompt_completions")
            .upsert(
              { user_id: user.id, prompt_id: promptId },
              { onConflict: "user_id,prompt_id" }
            );

      if (error) {
        // Saqlanmadi — oldingi holatga qaytaramiz.
        setCompletedIds(completedIds);
        writeLocal(completedIds);
      }
    },
    [completedIds, supabase, user]
  );

  return (
    <ProgressContext.Provider
      value={{ completedIds, isCompleted, toggleCompleted, loading, isSynced }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
