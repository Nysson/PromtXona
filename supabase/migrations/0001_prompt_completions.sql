-- PromptXona — foydalanuvchi progressi
-- Supabase loyihangizning SQL Editor'ida shu faylni bir marta ishga tushiring.

create table if not exists public.prompt_completions (
  user_id      uuid        not null references auth.users (id) on delete cascade,
  prompt_id    text        not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, prompt_id)
);

-- Profil sahifasi foydalanuvchining barcha yozuvlarini o'qiydi.
create index if not exists prompt_completions_user_id_idx
  on public.prompt_completions (user_id);

alter table public.prompt_completions enable row level security;

-- Har bir foydalanuvchi faqat o'z yozuvlarini ko'radi va o'zgartiradi.
drop policy if exists "O'z progressini o'qish" on public.prompt_completions;
create policy "O'z progressini o'qish"
  on public.prompt_completions for select
  using (auth.uid() = user_id);

drop policy if exists "O'z progressini qo'shish" on public.prompt_completions;
create policy "O'z progressini qo'shish"
  on public.prompt_completions for insert
  with check (auth.uid() = user_id);

drop policy if exists "O'z progressini o'chirish" on public.prompt_completions;
create policy "O'z progressini o'chirish"
  on public.prompt_completions for delete
  using (auth.uid() = user_id);
