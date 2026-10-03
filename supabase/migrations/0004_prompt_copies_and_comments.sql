-- PromptXona — nusxalash soni va izohlar.
--
--   prompt_stats.copy_count     — increment_prompt_copy() orqali (hamma uchun).
--   prompt_stats.comment_count  — prompt_comments triggerlari yuritadi.
--   prompt_comments             — faqat tizimga kirganlar yozadi; muallif ismi
--                                 serverda (trigger) aniqlanadi, soxtalashtirib
--                                 bo'lmaydi; oddiy spam cheklovi bor.

alter table public.prompt_stats
  add column if not exists copy_count    integer not null default 0 check (copy_count >= 0),
  add column if not exists comment_count integer not null default 0 check (comment_count >= 0);

-- ── Nusxalash ───────────────────────────────────────────────────────────
-- Anonim foydalanuvchilar ham nusxalaydi, shuning uchun anon'ga ham ochiq.
-- Bu "yumshoq" ko'rsatkich: mijoz bitta sessiyada har promptni bir marta
-- yuboradi (PromptsProvider), lekin qat'iy himoya kafolatlanmaydi.
create or replace function public.increment_prompt_copy(p_prompt_id text)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_count integer;
begin
  if p_prompt_id is null or p_prompt_id !~ '^[a-z0-9-]{1,100}$' then
    raise exception 'invalid_prompt_id' using errcode = '22023';
  end if;

  insert into public.prompt_stats as s (prompt_id, copy_count)
  values (p_prompt_id, 1)
  on conflict (prompt_id) do update
    set copy_count = s.copy_count + 1,
        updated_at = now()
  returning s.copy_count into v_count;

  return v_count;
end;
$$;

revoke all on function public.increment_prompt_copy(text) from public;
grant execute on function public.increment_prompt_copy(text) to anon, authenticated;

-- ── Izohlar ─────────────────────────────────────────────────────────────
create table if not exists public.prompt_comments (
  id           uuid        primary key default gen_random_uuid(),
  prompt_id    text        not null check (prompt_id ~ '^[a-z0-9-]{1,100}$'),
  user_id      uuid        not null references auth.users (id) on delete cascade,
  author_name  text        not null default '',
  content      text        not null check (char_length(content) between 2 and 2000),
  -- Admin moderatsiyasi uchun (admin panel bosqichida ishlatiladi).
  is_hidden    boolean     not null default false,
  created_at   timestamptz not null default now()
);

create index if not exists prompt_comments_prompt_idx
  on public.prompt_comments (prompt_id, created_at desc);
create index if not exists prompt_comments_user_idx
  on public.prompt_comments (user_id, created_at desc);

alter table public.prompt_comments enable row level security;

drop policy if exists "Izohlarni o'qish" on public.prompt_comments;
create policy "Izohlarni o'qish" on public.prompt_comments
  for select using (not is_hidden or auth.uid() = user_id);

drop policy if exists "O'z izohini qo'shish" on public.prompt_comments;
create policy "O'z izohini qo'shish" on public.prompt_comments
  for insert with check (auth.uid() = user_id and not is_hidden);

drop policy if exists "O'z izohini o'chirish" on public.prompt_comments;
create policy "O'z izohini o'chirish" on public.prompt_comments
  for delete using (auth.uid() = user_id);
-- UPDATE siyosati yo'q: izohni tahrirlab bo'lmaydi, faqat o'chirish mumkin.

-- Qo'shishdan oldin: muallifni sessiyadan olamiz, matnni tozalaymiz va
-- spamni cheklaymiz (10 daqiqada 5 tadan ko'p emas).
create or replace function public.prompt_comments_before_insert()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_meta  jsonb;
  v_email text;
  v_name  text;
  v_recent integer;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated' using errcode = '28000';
  end if;
  new.user_id := auth.uid();
  new.is_hidden := false;
  new.content := btrim(new.content);

  select count(*) into v_recent
  from public.prompt_comments c
  where c.user_id = new.user_id
    and c.created_at > now() - interval '10 minutes';
  if v_recent >= 5 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  select u.raw_user_meta_data, u.email into v_meta, v_email
  from auth.users u where u.id = new.user_id;

  v_name := nullif(btrim(coalesce(v_meta ->> 'full_name', v_meta ->> 'name', '')), '');
  if v_name is null then
    -- Ism yo'q (magic link): emailni oshkor qilmaslik uchun niqoblaymiz.
    v_name := coalesce(left(split_part(v_email, '@', 1), 2), 'O''') || '***';
  end if;
  new.author_name := left(v_name, 60);

  return new;
end;
$$;

drop trigger if exists prompt_comments_before_insert on public.prompt_comments;
create trigger prompt_comments_before_insert
  before insert on public.prompt_comments
  for each row execute function public.prompt_comments_before_insert();

-- Ko'rinadigan izohlar sonini prompt_stats da yuritamiz.
create or replace function public.prompt_comments_sync_count()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_prompt_id text;
  v_delta     integer := 0;
begin
  if tg_op = 'INSERT' then
    v_prompt_id := new.prompt_id;
    v_delta := case when new.is_hidden then 0 else 1 end;
  elsif tg_op = 'DELETE' then
    v_prompt_id := old.prompt_id;
    v_delta := case when old.is_hidden then 0 else -1 end;
  else -- UPDATE (is_hidden o'zgarganda)
    v_prompt_id := new.prompt_id;
    v_delta := (case when new.is_hidden then 0 else 1 end)
             - (case when old.is_hidden then 0 else 1 end);
  end if;

  if v_delta <> 0 then
    insert into public.prompt_stats as s (prompt_id, comment_count)
    values (v_prompt_id, greatest(v_delta, 0))
    on conflict (prompt_id) do update
      set comment_count = greatest(s.comment_count + v_delta, 0),
          updated_at    = now();
  end if;

  return null;
end;
$$;

drop trigger if exists prompt_comments_sync_count on public.prompt_comments;
create trigger prompt_comments_sync_count
  after insert or delete or update of is_hidden on public.prompt_comments
  for each row execute function public.prompt_comments_sync_count();
