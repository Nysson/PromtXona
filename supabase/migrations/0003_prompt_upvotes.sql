-- PromptXona — upvote tizimi (faqat tizimga kirgan foydalanuvchilar).
--
-- Dizayn:
--   prompt_upvotes — kim qaysi promptga ovoz bergani (bitta foydalanuvchi =
--                    bitta ovoz, PRIMARY KEY bilan kafolatlanadi).
--   prompt_stats   — denormallashtirilgan hisoblagich. Sahifa har safar
--                    COUNT(*) qilmasdan bitta qatorni o'qiydi.
--   set_prompt_upvote() — yagona yozish yo'li. Atomik va idempotent:
--                    bir xil so'rov ikki marta kelsa ham hisob buzilmaydi.
--
-- `prompt_id` hozircha `prompts` jadvaliga FK emas, chunki promptlar
-- `data/prompts.ts` da yashaydi. Promptlar bazaga ko'chirilgach, oxirdagi
-- izohdagi FK'larni qo'shing.

create table if not exists public.prompt_upvotes (
  prompt_id   text        not null check (prompt_id ~ '^[a-z0-9-]{1,100}$'),
  user_id     uuid        not null references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (prompt_id, user_id)
);

-- "Men ovoz bergan promptlar" so'rovi uchun.
create index if not exists prompt_upvotes_user_idx on public.prompt_upvotes (user_id);

create table if not exists public.prompt_stats (
  prompt_id     text        primary key check (prompt_id ~ '^[a-z0-9-]{1,100}$'),
  upvote_count  integer     not null default 0 check (upvote_count >= 0),
  updated_at    timestamptz not null default now()
);

alter table public.prompt_upvotes enable row level security;
alter table public.prompt_stats   enable row level security;

-- Foydalanuvchi faqat o'z ovozlarini ko'radi (qaysi tugma "bosilgan"ligini
-- bilish uchun). To'g'ridan-to'g'ri INSERT/DELETE siyosati yo'q — faqat RPC.
drop policy if exists "O'z ovozlarini o'qish" on public.prompt_upvotes;
create policy "O'z ovozlarini o'qish" on public.prompt_upvotes
  for select using (auth.uid() = user_id);

-- Hisoblagichlarni hamma o'qiy oladi.
drop policy if exists "Statistikani o'qish" on public.prompt_stats;
create policy "Statistikani o'qish" on public.prompt_stats
  for select using (true);

-- ── Ovoz berish / qaytarib olish ────────────────────────────────────────
-- p_upvoted = true  → ovoz qo'shish (allaqachon bo'lsa, hech narsa o'zgarmaydi)
-- p_upvoted = false → ovozni olib tashlash (yo'q bo'lsa, hech narsa o'zgarmaydi)
-- Qaytaradi: foydalanuvchining joriy holati va yangi umumiy son.
create or replace function public.set_prompt_upvote(
  p_prompt_id text,
  p_upvoted   boolean
)
returns table (upvoted boolean, upvote_count integer)
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_user_id uuid := auth.uid();
  v_changed integer;
begin
  if v_user_id is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;

  if p_prompt_id is null or p_prompt_id !~ '^[a-z0-9-]{1,100}$' then
    raise exception 'invalid_prompt_id' using errcode = '22023';
  end if;

  if p_upvoted then
    insert into public.prompt_upvotes (prompt_id, user_id)
    values (p_prompt_id, v_user_id)
    on conflict do nothing;
    get diagnostics v_changed = row_count;

    if v_changed > 0 then
      insert into public.prompt_stats as s (prompt_id, upvote_count)
      values (p_prompt_id, 1)
      on conflict (prompt_id) do update
        set upvote_count = s.upvote_count + 1,
            updated_at   = now();
    end if;
  else
    delete from public.prompt_upvotes
    where prompt_id = p_prompt_id and user_id = v_user_id;
    get diagnostics v_changed = row_count;

    if v_changed > 0 then
      update public.prompt_stats as s
      set upvote_count = greatest(s.upvote_count - 1, 0),
          updated_at   = now()
      where s.prompt_id = p_prompt_id;
    end if;
  end if;

  return query
    select p_upvoted,
           coalesce((select s.upvote_count from public.prompt_stats s
                     where s.prompt_id = p_prompt_id), 0);
end;
$$;

revoke all on function public.set_prompt_upvote(text, boolean) from public, anon;
grant execute on function public.set_prompt_upvote(text, boolean) to authenticated;

-- ── Promptlar bazaga ko'chirilgandan keyin (0002 dagi `prompts` to'lganda) ─
-- alter table public.prompt_upvotes
--   add constraint prompt_upvotes_prompt_fk
--   foreign key (prompt_id) references public.prompts (id) on delete cascade;
-- alter table public.prompt_stats
--   add constraint prompt_stats_prompt_fk
--   foreign key (prompt_id) references public.prompts (id) on delete cascade;
