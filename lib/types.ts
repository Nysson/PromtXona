export type PromptCategory = "IELTS" | "SAT" | "Ona tili va Adabiyot" | "DTM";

export type FilterGroup =
  | "IELTS Writing"
  | "IELTS Speaking"
  | "SAT Math"
  | "SAT Reading"
  | "Ona tili / Adabiyot"
  | "DTM — Matematika"
  | "DTM — Ona tili"
  | "DTM — Tarix"
  | "DTM — Umumiy";

export interface PromptComment {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO date string
}

/** O'zgaruvchi uchun forma maydoni turi. */
export type VariableInputType = "text" | "textarea" | "number" | "select";

/**
 * Prompt shablonidagi `{{key}}` o'zgaruvchisining sozlamasi. `key` shablondagi
 * nom bilan aynan bir xil bo'lishi kerak (snake_case, faqat lotin harflari).
 */
export interface PromptVariable {
  key: string;
  /** Forma ustida ko'rinadigan nom. */
  label: string;
  type: VariableInputType;
  placeholder?: string;
  /** Maydon ostidagi qisqa izoh. */
  helpText?: string;
  /** Faqat `select` uchun. */
  options?: string[];
  defaultValue?: string;
  /** Sukut bo'yicha `true`. */
  required?: boolean;
}

export interface Prompt {
  id: string;
  title: string;
  category: PromptCategory;
  filterGroup: FilterGroup;
  subcategory: string;
  description: string;
  role: string;
  task: string;
  context: string;
  template: string;
  /**
   * Shablondagi `{{key}}` o'zgaruvchilari uchun forma sozlamalari. Berilmasa,
   * o'zgaruvchilar shablondan avtomatik aniqlanadi (`lib/variables.ts`).
   */
  variables?: PromptVariable[];
  exampleInput: string;
  exampleOutput: string;
  testedModels: string[];
  tags: string[];
  upvotes: number;
  copyCount: number;
  author: string;
  createdAt: string; // ISO date string
  comments: PromptComment[];
  /**
   * Ixtiyoriy: prompt biror bosqichma-bosqich ketma-ketlikka (zanjirga)
   * tegishli bo'lsa, uning identifikatori. `data/chains.ts` ga qarang.
   */
  chainId?: string;
  /** Zanjirdagi tartib raqami, 1 dan boshlanadi. `chainId` bilan birga keladi. */
  stepOrder?: number;
}

/** Bosqichma-bosqich prompt ketma-ketligi (masalan, insho yozish jarayoni). */
export interface PromptChain {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
}

export interface PromptOverride {
  upvotes?: number;
  copyCount?: number;
  comments?: PromptComment[];
  upvoted?: boolean;
}
