"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { recordPromptCopy } from "@/app/actions/copy";
import { setPromptUpvote } from "@/app/actions/upvote";
import { useAuth } from "@/components/AuthProvider";
import { useToast } from "@/components/ToastProvider";
import { PROMPTS } from "@/data/prompts";
import type { Prompt, PromptComment, PromptOverride } from "@/lib/types";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "promptxona-overrides-v1";
const SAVED_KEY = "promptxona-saved-v1";
const COPIED_SESSION_KEY = "promptxona-copied-session-v1";

/** Bitta sessiyada har prompt nusxasini bir marta hisoblaymiz. */
function markCopiedThisSession(id: string): boolean {
  try {
    const raw = window.sessionStorage.getItem(COPIED_SESSION_KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    if (ids.includes(id)) return false;
    ids.push(id);
    window.sessionStorage.setItem(COPIED_SESSION_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return true;
  }
}

type OverrideMap = Record<string, PromptOverride>;

interface PromptsContextValue {
  prompts: Prompt[];
  isUpvoted: (id: string) => boolean;
  toggleUpvote: (id: string) => Promise<void>;
  incrementCopyCount: (id: string) => void;
  addComment: (id: string, author: string, content: string) => void;
  /** Supabase rejimida izohlar soni bazada — UI'ni darhol moslash uchun. */
  adjustCommentCount: (id: string, delta: number) => void;
  /** true — upvote, nusxalash va izohlar Supabase'da. */
  isRemote: boolean;
  getPromptById: (id: string) => Prompt | undefined;
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
}

const PromptsContext = createContext<PromptsContextValue | undefined>(
  undefined
);

function loadOverrides(): OverrideMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as OverrideMap) : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides: OverrideMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    // ignore write errors (e.g. private browsing storage limits)
  }
}

/**
 * Upvote, nusxalash soni va izohlar ikki rejimda ishlaydi:
 * - Supabase sozlangan bo'lsa — hammasi bazada (ovoz va izoh faqat tizimga
 *   kirganlar uchun). `data/` dagi namuna izohlar bu rejimda ko'rsatilmaydi.
 * - Sozlanmagan bo'lsa (lokal ishlab chiqish) — avvalgidek localStorage'da.
 */
export function PromptsProvider({ children }: { children: ReactNode }) {
  const { supabase, user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const isRemote = Boolean(supabase);
  const [remoteCounts, setRemoteCounts] = useState<Record<string, number>>({});
  const [remoteCopies, setRemoteCopies] = useState<Record<string, number>>({});
  const [remoteComments, setRemoteComments] = useState<Record<string, number>>(
    {}
  );
  const [myUpvotes, setMyUpvotes] = useState<Set<string>>(() => new Set());
  const pendingUpvotes = useRef<Set<string>>(new Set());
  const [overrides, setOverrides] = useState<OverrideMap>({});
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setOverrides(loadOverrides());
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      if (raw) setSavedIds(JSON.parse(raw) as string[]);
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveOverrides(overrides);
  }, [overrides, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore write errors
    }
  }, [savedIds, hydrated]);

  // Barcha promptlarning statistikasi — bitta kichik so'rov (har prompt uchun
  // bitta qator), shuning uchun sahifalash shart emas.
  useEffect(() => {
    if (!supabase) return;
    let active = true;
    supabase
      .from("prompt_stats")
      .select("prompt_id, upvote_count, copy_count, comment_count")
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          console.error("prompt_stats yuklanmadi", error);
          return;
        }
        const rows = (data ?? []) as {
          prompt_id: string;
          upvote_count: number;
          copy_count: number;
          comment_count: number;
        }[];
        const pick = (key: "upvote_count" | "copy_count" | "comment_count") =>
          Object.fromEntries(rows.map((row) => [row.prompt_id, row[key]]));
        setRemoteCounts(pick("upvote_count"));
        setRemoteCopies(pick("copy_count"));
        setRemoteComments(pick("comment_count"));
      });
    return () => {
      active = false;
    };
  }, [supabase]);

  // Joriy foydalanuvchi qaysi promptlarga ovoz bergan (RLS faqat o'zinikini qaytaradi).
  useEffect(() => {
    if (!supabase || !user) {
      setMyUpvotes(new Set());
      return;
    }
    let active = true;
    supabase
      .from("prompt_upvotes")
      .select("prompt_id")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!active || error) return;
        setMyUpvotes(new Set((data ?? []).map((row) => row.prompt_id as string)));
      });
    return () => {
      active = false;
    };
  }, [supabase, user]);

  const prompts = useMemo<Prompt[]>(() => {
    return PROMPTS.map((base) => {
      if (isRemote) {
        return {
          ...base,
          upvotes: base.upvotes + (remoteCounts[base.id] ?? 0),
          copyCount: base.copyCount + (remoteCopies[base.id] ?? 0),
          comments: [],
          commentCount: remoteComments[base.id] ?? 0,
        };
      }
      const o = overrides[base.id];
      if (!o) return base;
      return {
        ...base,
        upvotes: o.upvotes ?? base.upvotes,
        copyCount: o.copyCount ?? base.copyCount,
        comments: o.comments ?? base.comments,
      };
    });
  }, [overrides, isRemote, remoteCounts, remoteCopies, remoteComments]);

  const isUpvoted = useCallback(
    (id: string) =>
      isRemote ? myUpvotes.has(id) : Boolean(overrides[id]?.upvoted),
    [isRemote, myUpvotes, overrides]
  );

  const toggleLocalUpvote = useCallback((id: string) => {
    setOverrides((prev) => {
      const base = PROMPTS.find((p) => p.id === id);
      if (!base) return prev;
      const current = prev[id] ?? {};
      const wasUpvoted = Boolean(current.upvoted);
      const currentUpvotes = current.upvotes ?? base.upvotes;
      return {
        ...prev,
        [id]: {
          ...current,
          upvoted: !wasUpvoted,
          upvotes: wasUpvoted ? currentUpvotes - 1 : currentUpvotes + 1,
        },
      };
    });
  }, []);

  const toggleUpvote = useCallback(
    async (id: string) => {
      if (!isRemote) {
        const wasUpvoted = Boolean(overrides[id]?.upvoted);
        toggleLocalUpvote(id);
        if (!wasUpvoted) showToast("Ovoz berganingiz uchun rahmat!");
        return;
      }

      if (!user) {
        showToast("Ovoz berish uchun avval tizimga kiring.");
        router.push(`/login?next=${encodeURIComponent(pathname)}`);
        return;
      }

      // Bir prompt uchun bir vaqtda faqat bitta so'rov.
      if (pendingUpvotes.current.has(id)) return;
      pendingUpvotes.current.add(id);

      const nextUpvoted = !myUpvotes.has(id);
      const delta = nextUpvoted ? 1 : -1;

      // Optimistik yangilash — tugma darhol javob beradi.
      const applyLocal = (upvoted: boolean, count?: number, diff = 0) => {
        setMyUpvotes((prev) => {
          const next = new Set(prev);
          if (upvoted) next.add(id);
          else next.delete(id);
          return next;
        });
        setRemoteCounts((prev) => ({
          ...prev,
          [id]: count ?? Math.max((prev[id] ?? 0) + diff, 0),
        }));
      };
      applyLocal(nextUpvoted, undefined, delta);

      try {
        const result = await setPromptUpvote(id, nextUpvoted);
        if (result.ok) {
          applyLocal(result.upvoted, result.count);
          if (result.upvoted) showToast("Ovoz berganingiz uchun rahmat!");
          return;
        }
        applyLocal(!nextUpvoted, undefined, -delta);
        showToast(
          result.error === "unauthenticated"
            ? "Sessiya tugagan — qaytadan kiring."
            : "Ovoz saqlanmadi. Birozdan keyin qayta urinib ko'ring."
        );
      } catch {
        applyLocal(!nextUpvoted, undefined, -delta);
        showToast("Tarmoq xatosi — ovoz saqlanmadi.");
      } finally {
        pendingUpvotes.current.delete(id);
      }
    },
    [
      isRemote,
      overrides,
      toggleLocalUpvote,
      user,
      myUpvotes,
      showToast,
      router,
      pathname,
    ]
  );

  const incrementLocalCopyCount = useCallback((id: string) => {
    setOverrides((prev) => {
      const base = PROMPTS.find((p) => p.id === id);
      if (!base) return prev;
      const current = prev[id] ?? {};
      const currentCount = current.copyCount ?? base.copyCount;
      return {
        ...prev,
        [id]: { ...current, copyCount: currentCount + 1 },
      };
    });
  }, []);

  const incrementCopyCount = useCallback(
    (id: string) => {
      if (isRemote) {
        if (!markCopiedThisSession(id)) return;
        setRemoteCopies((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
        // Fon rejimida: xato bo'lsa ham foydalanuvchini bezovta qilmaymiz.
        void recordPromptCopy(id).catch(() => undefined);
        return;
      }
      incrementLocalCopyCount(id);
    },
    [isRemote, incrementLocalCopyCount]
  );

  const adjustCommentCount = useCallback((id: string, delta: number) => {
    setRemoteComments((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] ?? 0) + delta, 0),
    }));
  }, []);


  const addComment = useCallback(
    (id: string, author: string, content: string) => {
      setOverrides((prev) => {
        const base = PROMPTS.find((p) => p.id === id);
        if (!base) return prev;
        const current = prev[id] ?? {};
        const currentComments = current.comments ?? base.comments;
        const newComment: PromptComment = {
          id: generateId("comment"),
          author: author.trim() || "Mehmon",
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };
        return {
          ...prev,
          [id]: { ...current, comments: [...currentComments, newComment] },
        };
      });
    },
    []
  );

  const getPromptById = useCallback(
    (id: string) => prompts.find((p) => p.id === id),
    [prompts]
  );

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const value: PromptsContextValue = {
    prompts,
    isUpvoted,
    toggleUpvote,
    incrementCopyCount,
    addComment,
    adjustCommentCount,
    isRemote,
    getPromptById,
    savedIds,
    isSaved,
    toggleSaved,
  };

  return (
    <PromptsContext.Provider value={value}>
      {children}
    </PromptsContext.Provider>
  );
}

export function usePrompts() {
  const ctx = useContext(PromptsContext);
  if (!ctx) throw new Error("usePrompts must be used within PromptsProvider");
  return ctx;
}
