export type PromptCategory = "IELTS" | "SAT" | "Ona tili va Adabiyot";

export type FilterGroup =
  | "IELTS Writing"
  | "IELTS Speaking"
  | "SAT Math"
  | "SAT Reading"
  | "Ona tili / Adabiyot";

export interface PromptComment {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO date string
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
  exampleInput: string;
  exampleOutput: string;
  testedModels: string[];
  tags: string[];
  upvotes: number;
  copyCount: number;
  author: string;
  createdAt: string; // ISO date string
  comments: PromptComment[];
}

export interface PromptOverride {
  upvotes?: number;
  copyCount?: number;
  comments?: PromptComment[];
  upvoted?: boolean;
}
