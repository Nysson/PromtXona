"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROMPTS } from "@/data/prompts";
import type { Prompt, PromptComment, PromptOverride } from "@/lib/types";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "promptxona-overrides-v1";
const SAVED_KEY = "promptxona-saved-v1";

type OverrideMap = Record<string, PromptOverride>;

interface PromptsContextValue {
  prompts: Prompt[];
  isUpvoted: (id: string) => boolean;
  toggleUpvote: (id: string) => void;
  incrementCopyCount: (id: string) => void;
  addComment: (id: string, author: string, content: string) => void;
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

export function PromptsProvider({ children }: { children: ReactNode }) {
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

  const prompts = useMemo<Prompt[]>(() => {
    return PROMPTS.map((base) => {
      const o = overrides[base.id];
      if (!o) return base;
      return {
        ...base,
        upvotes: o.upvotes ?? base.upvotes,
        copyCount: o.copyCount ?? base.copyCount,
        comments: o.comments ?? base.comments,
      };
    });
  }, [overrides]);

  const isUpvoted = useCallback(
    (id: string) => Boolean(overrides[id]?.upvoted),
    [overrides]
  );

  const toggleUpvote = useCallback((id: string) => {
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

  const incrementCopyCount = useCallback((id: string) => {
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
