-- PromptXona — prompt kutubxonasi sxemasi (kategoriyalar, teglar, promptlar,
-- o'zgaruvchilar).
--
-- HOZIRCHA ilova promptlarni `data/prompts.ts` dan o'qiydi; bu jadvallar
-- kelajakdagi admin panel / jamiyat yuborgan promptlar uchun tayyor turadi.
-- `prompts.id` — `data/prompts.ts` dagi slug bilan aynan bir xil, shuning
-- uchun ko'chirish paytida upvotelar yo'qolmaydi (0003 ga qarang).
--
-- Upvote soni bu yerda emas, `prompt_stats` jadvalida (0003) saqlanadi:
-- tez-tez yoziladigan hisoblagichni kontent qatoridan ajratish qator
-- qulflanishini kamaytiradi va `updated_at` ni har ovozda o'zgartirmaydi.

-- ── Umumiy: updated_at ni avtomatik yangilash ────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ── Kategoriyalar ───────────────────────────────────────────────────────
create table if not exists public.categories (
  id          smallint generated always as identity primary key,
  slug        text     not null unique check (slug ~ '^[a-z0-9-]+$'),
  name        text     not null,          -- "IELTS", "Ona tili va Adabiyot"
  sublabel    text,
  sort_order  smallint not null default 0
);

-- Filtr guruhlari ("IELTS Writing", "DTM — Tarix") kategoriya ichida.
create table if not exists public.filter_groups (
  id           smallint generated always as identity primary key,
  category_id  smallint not null references public.categories (id) on delete cascade,
  name         text     not null,
  sort_order   smallint not null default 0,
  unique (category_id, name)
);

-- ── Promptlar ───────────────────────────────────────────────────────────
create table if not exists public.prompts (
  id               text primary key check (id ~ '^[a-z0-9-]{1,100}$'),
  category_id      smallint not null references public.categories (id) on delete restrict,
  filter_group_id  smallint references public.filter_groups (id) on delete set null,
  subcategory      text,
  title            text not null check (char_length(title) between 5 and 200),
  description      text not null,
  role             text,
  task             text,
  context          text,
  template         text not null,
  example_input    text,
  example_output   text,
  tested_models    text[] not null default '{}',
  author_name      text not null default 'PromptXona jamoasi',
  author_id        uuid references auth.users (id) on delete set null,
  chain_id         text,
  step_order       smallint check (step_order > 0),
  status           text not null default 'draft'
                     check (status in ('draft', 'pending', 'published', 'archived')),
  search           tsvector generated always as (
                     setweight(to_tsvector('simple', coalesce(title, '')), 'A') ||
                     setweight(to_tsvector('simple', coalesce(description, '')), 'B')
                   ) stored,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  -- zanjirdagi qadam faqat zanjir bilan birga keladi
  check ((chain_id is null) = (step_order is null))
);

create index if not exists prompts_category_idx on public.prompts (category_id) where status = 'published';
create index if not exists prompts_chain_idx on public.prompts (chain_id, step_order) where chain_id is not null;
create index if not exists prompts_search_idx on public.prompts using gin (search);

drop trigger if exists prompts_set_updated_at on public.prompts;
create trigger prompts_set_updated_at
  before update on public.prompts
  for each row execute function public.set_updated_at();

-- ── Teglar (ko'pga-ko'p) ────────────────────────────────────────────────
create table if not exists public.tags (
  id    integer generated always as identity primary key,
  slug  text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name  text not null
);

create table if not exists public.prompt_tags (
  prompt_id  text    not null references public.prompts (id) on delete cascade,
  tag_id     integer not null references public.tags (id) on delete cascade,
  primary key (prompt_id, tag_id)
);

-- Teg bo'yicha promptlarni topish uchun (PK faqat prompt_id bilan boshlanadi).
create index if not exists prompt_tags_tag_idx on public.prompt_tags (tag_id);

-- ── O'zgaruvchilar konfiguratsiyasi ({{key}} → forma maydoni) ───────────
-- lib/types.ts dagi `PromptVariable` interfeysi bilan bir xil.
create table if not exists public.prompt_variables (
  prompt_id      text     not null references public.prompts (id) on delete cascade,
  key            text     not null check (key ~ '^[a-z][a-z0-9_]*$'),
  label          text     not null,
  input_type     text     not null default 'textarea'
                   check (input_type in ('text', 'textarea', 'number', 'select')),
  placeholder    text,
  help_text      text,
  options        text[],
  default_value  text,
  required       boolean  not null default true,
  sort_order     smallint not null default 0,
  primary key (prompt_id, key),
  check (input_type <> 'select' or coalesce(cardinality(options), 0) > 0)
);

-- ── RLS: hamma faqat nashr qilinganlarni o'qiydi; yozish faqat service role ─
alter table public.categories       enable row level security;
alter table public.filter_groups    enable row level security;
alter table public.prompts          enable row level security;
alter table public.tags             enable row level security;
alter table public.prompt_tags      enable row level security;
alter table public.prompt_variables enable row level security;

drop policy if exists "Kategoriyalarni o'qish" on public.categories;
create policy "Kategoriyalarni o'qish" on public.categories
  for select using (true);

drop policy if exists "Filtr guruhlarini o'qish" on public.filter_groups;
create policy "Filtr guruhlarini o'qish" on public.filter_groups
  for select using (true);

drop policy if exists "Teglarni o'qish" on public.tags;
create policy "Teglarni o'qish" on public.tags
  for select using (true);

drop policy if exists "Nashr qilingan promptlarni o'qish" on public.prompts;
create policy "Nashr qilingan promptlarni o'qish" on public.prompts
  for select using (status = 'published');

drop policy if exists "Prompt teglarini o'qish" on public.prompt_tags;
create policy "Prompt teglarini o'qish" on public.prompt_tags
  for select using (
    exists (select 1 from public.prompts p
            where p.id = prompt_id and p.status = 'published')
  );

drop policy if exists "Prompt o'zgaruvchilarini o'qish" on public.prompt_variables;
create policy "Prompt o'zgaruvchilarini o'qish" on public.prompt_variables
  for select using (
    exists (select 1 from public.prompts p
            where p.id = prompt_id and p.status = 'published')
  );
-- INSERT/UPDATE/DELETE siyosatlari ataylab yo'q: kontentni faqat
-- service role (admin skript yoki Supabase paneli) o'zgartiradi.
