# PromptXona 📚

**PromptXona** — O'zbekistonlik o'quvchilar uchun yaratilgan, ochiq kodli AI prompt
kutubxonasi. DTM, IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun
sinovdan o'tgan, tayyor promptlarni toping, nusxalang va ChatGPT/Claude/Gemini'da
bir zumda ishlating.

> An open-source, Apple-inspired prompt library built for Uzbek students preparing
> for DTM (national exam), IELTS, SAT, and native-language essays.

---

## ✨ Features

- **4 kategoriya:** DTM (Matematika, Ona tili, Tarix), IELTS (Writing,
  Speaking), SAT (Math, Reading), Ona tili va Adabiyot — 25 ta to'liq
  yozilgan, production-sifatli prompt.
- **Dinamik o'zgaruvchilar** — shablondagi `{{essay_text}}`, `{{target_score}}`
  kabi o'zgaruvchilar uchun avtomatik forma (text / textarea / number / select).
  Prompt jonli yangilanadi, bo'sh maydonlar ajratib ko'rsatiladi, qiymatlar
  brauzerda saqlanadi.
- **Quick-Run** — to'ldirilgan promptni nusxalab, ChatGPT, Claude yoki
  DeepSeek'da bir bosishda ochish (prefill qo'llanmasa yoki prompt juda uzun
  bo'lsa — clipboard orqali).
- **Namuna AI javobi** — yig'iladigan/ochiladigan "Example AI Response" bloki.
- **Multi-page Next.js App Router** — Bosh sahifa, Promptlar katalogi va har bir
  prompt uchun alohida detal sahifa (`/prompts/[id]`).
- **Apple-uslubidagi UI** — glassmorphism kartalar, ambient gradient orqa fon,
  yumshoq soyalar, to'liq dark/light mode.
- **Interaktiv prompt kartalari:**
  - 📋 Bir bosishda nusxalash (toast bildirishnoma bilan)
  - 👍 Upvote — Supabase'da, faqat tizimga kirganlar uchun (1 foydalanuvchi =
    1 ovoz); Supabase sozlanmagan bo'lsa brauzerda
  - 🔖 Saqlash (bookmark) — `/saved` sahifasida to'planadi
  - 💬 To'liq izoh (comment) tizimi — yangi izoh qoldirish, real-time yangilanish
- **⌘K / Ctrl+K buyruq palitrasi** — istalgan joydan tez qidirish, klaviatura
  bilan boshqarish (↑↓ tanlash, ↵ ochish, Esc yopish).
- **Qidiruv va filtrlash** — kategoriya bo'yicha pill-filtrlar, mashhurlik/vaqt
  bo'yicha saralash.
- **Prompt yuborish sahifasi (`/submit`)** — to'liq forma, validatsiya va
  to'ldirilganlik ko'rsatkichi bilan; yuborish uchun ikki yo'l: oldindan
  to'ldirilgan GitHub issue yoki matnni nusxalash.
- **O'xshash promptlar** — detal sahifada kategoriya va teglar bo'yicha tavsiya.
- **Prompt zanjirlari** — promptlarni ketma-ket bosqichlarga bog'lash
  (`chainId` + `stepOrder`). Detal sahifada "N-qadam / M" ko'rsatkichi,
  bosqichlar ro'yxati va "Keyingi qadam" tugmasi chiqadi. Tayyor zanjir:
  IELTS Writing Task 2 — savol tahlili → reja → qoralama → baholash →
  qayta yozish.
- **Progress tracker** — promptni «Bajarildi» deb belgilash va `/profile`
  sahifasida umumiy, kategoriya hamda zanjir bo'yicha progressni ko'rish.
  Diqqat: «Bajarildi» ≠ «Saqlangan» — birinchisi amalda mashq qilinganini,
  ikkinchisi keyinroq o'qish ro'yxatini bildiradi.
- **Kirish (ixtiyoriy)** — Supabase Auth orqali Google yoki email magic link.
  Kirilgan bo'lsa progress bulutga saqlanadi va qurilmalar aro sinxronlanadi;
  kirilmagan bo'lsa brauzerda saqlanadi va birinchi kirishda bulutga ko'chadi.
- **LocalStorage** — nusxalash soni, saqlanganlar, izohlar va o'zgaruvchi
  qiymatlari brauzer xotirasida saqlanadi, sahifani yangilaganda ham yo'qolmaydi.

## 🧱 Tech Stack

| Texnologiya | Maqsad |
| --- | --- |
| [Next.js 14 (App Router)](https://nextjs.org) | Framework, routing, TypeScript |
| [Tailwind CSS](https://tailwindcss.com) | Apple-uslubidagi styling |
| [Lucide React](https://lucide.dev) | Ikonalar |
| React `useState`/`useContext` | Mahalliy holat boshqaruvi (upvote, comment, copy) |
| [Supabase](https://supabase.com) | Auth (Google / magic link), progress va upvote uchun Postgres |
| `localStorage` | Mock backend — foydalanuvchi harakatlarini saqlash |

## 📁 Loyiha tuzilmasi

```
promptxona/
├── app/
│   ├── layout.tsx                 # Root layout (Header, Footer, Providers)
│   ├── page.tsx                   # Bosh sahifa (Hero, Categories, Featured)
│   ├── globals.css
│   ├── not-found.tsx
│   ├── actions/
│   │   └── upvote.ts              # Server Action: setPromptUpvote() → RPC
│   └── prompts/
│       ├── page.tsx               # Promptlar katalogi (server wrapper)
│       ├── PromptsCatalog.tsx     # Qidiruv/filtr mantig'i (client)
│       └── [id]/
│           ├── page.tsx           # Detail sahifa (server wrapper + metadata)
│           └── PromptDetail.tsx   # Detail UI (client)
├── components/
│   ├── Header.tsx, Footer.tsx
│   ├── Hero.tsx, AmbientBackground.tsx
│   ├── CategoryCard.tsx, PromptCard.tsx, ModelBadge.tsx
│   ├── SearchBar.tsx, FilterTabs.tsx, FeaturedPrompts.tsx
│   ├── CommentSection.tsx
│   ├── PromptWorkbench.tsx        # Forma + jonli prompt + Quick-Run (detal sahifa)
│   ├── PromptVariableForm.tsx     # {{key}} → input maydonlari
│   ├── FilledPromptPreview.tsx    # To'ldirilgan/bo'sh o'zgaruvchilarni ajratib ko'rsatish
│   ├── QuickRunBar.tsx            # Nusxalash + ChatGPT / Claude / DeepSeek
│   ├── ExampleResponse.tsx        # Yig'iladigan "Namuna AI javobi"
│   ├── ThemeProvider.tsx          # Dark/Light mode context
│   ├── ToastProvider.tsx          # Toast bildirishnomalar
│   └── PromptsProvider.tsx        # Prompt holati (upvote/copy/comment) + Supabase/localStorage
├── data/
│   ├── prompts.ts                 # 22 ta asosiy prompt (DTM/IELTS/SAT/Ona tili)
│   ├── academic-prompts.ts        # Akademik paket: IELTS xatolar tahlili, SAT R&W, mumtoz adabiyot
│   └── chains.ts                  # Prompt zanjirlari + navigatsiya yordamchilari
├── supabase/
│   └── migrations/
│       ├── 0001_prompt_completions.sql   # Progress jadvali + RLS siyosatlari
│       ├── 0002_prompt_library_schema.sql # Kategoriya, prompt, teg, o'zgaruvchi jadvallari
│       └── 0003_prompt_upvotes.sql        # Upvote jadvallari + set_prompt_upvote() RPC
├── middleware.ts                  # Supabase sessiyasini yangilab turadi
├── lib/
│   ├── types.ts                   # TypeScript interfeyslar
│   ├── constants.ts               # Sayt konfiguratsiyasi, filtr guruhlari, AI_PROVIDERS
│   ├── variables.ts               # {{key}} parser: extract / fill / split
│   ├── usePromptVariables.ts      # Forma holati + localStorage
│   ├── safe-redirect.ts           # Login'dan keyin xavfsiz qaytish yo'li
│   └── utils.ts                   # cn(), formatDate(), timeAgo(), va h.k.
├── tailwind.config.ts
└── package.json
```

## 🚀 Lokal ishga tushirish (Getting Started)

### 1. Talablar

- Node.js **18.18+** (tavsiya etiladi: 20 LTS)
- npm, pnpm yoki yarn

### 2. O'rnatish

```bash
git clone <repo-url>
cd promptxona
npm install
```

### 3. Dasturni ishga tushirish

```bash
npm run dev
```

Brauzeringizda [http://localhost:3000](http://localhost:3000) manzilini oching.

### 4. Production build

```bash
npm run build
npm run start
```

### Boshqa buyruqlar

```bash
npm run lint     # ESLint orqali kod sifatini tekshirish
```

## ⚙️ Konfiguratsiya

### "Prompt yuborish" tugmasi

Sukut bo'yicha tugma ilova ichidagi **`/submit`** sahifasini ochadi — hech qanday
tashqi xizmat kerak emas va havola hech qachon buzilmaydi. U yerdan foydalanuvchi
promptni ikki yo'l bilan yuborishi mumkin:

1. **GitHub'da yuborish** — forma avtomatik to'ldirilgan issue ochadi
   (`prompt-submission` yorlig'i bilan).
2. **Matnni nusxalash** — tayyor Markdown matnni olib, Telegram/email orqali
   yuborish.

Agar Google Form ishlatmoqchi bo'lsangiz, `.env.local` fayl yarating:

```bash
NEXT_PUBLIC_SUBMIT_FORM_URL=https://forms.gle/SIZNING-HAQIQIY-HAVOLANGIZ
```

O'zgaruvchi belgilangach, header va hero tugmalari o'sha formani yangi oynada
ochadi; `/submit` sahifasida esa qo'shimcha "Google Form orqali" tugmasi paydo
bo'ladi.

### Kirish va progressni sozlash (Supabase)

Supabase **ixtiyoriy**: kalitlarsiz ham sayt to'liq ishlaydi — kirish
o'chgan bo'ladi va progress faqat brauzerda saqlanadi. Bulutga sinxronlash
uchun:

**1. Supabase loyihasi yarating** — [supabase.com](https://supabase.com) da
bepul loyiha oching.

**2. Jadvallarni yarating** — Supabase panelidagi *SQL Editor* ni oching va
`supabase/migrations/` dagi fayllarni **tartib bilan** ishga tushiring
(har biri qayta ishga tushirishga xavfsiz):

| Fayl | Nima yaratadi |
| --- | --- |
| `0001_prompt_completions.sql` | Progress jadvali + RLS |
| `0002_prompt_library_schema.sql` | `categories`, `filter_groups`, `prompts`, `tags`, `prompt_tags`, `prompt_variables` (kelajakdagi admin panel uchun; hozircha ilova promptlarni `data/` dan o'qiydi) |
| `0003_prompt_upvotes.sql` | `prompt_upvotes`, `prompt_stats` + `set_prompt_upvote()` RPC |

Supabase CLI ishlatsangiz: `supabase db push`.

**3. Kalitlarni qo'shing** — *Project Settings → API* dan olib, `.env.local`
fayliga yozing (namuna uchun `.env.example` ga qarang):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

**4. Kirish usullarini yoqing** — *Authentication → Providers*:
- **Email** — sukut bo'yicha yoqilgan (magic link uchun shu kifoya).
- **Google** — yoqing va Google Cloud Console'dan Client ID/Secret kiriting.

**5. Redirect URL larni qo'shing** — *Authentication → URL Configuration*:
- Site URL: `https://sizning-saytingiz.vercel.app`
- Redirect URLs: `https://sizning-saytingiz.vercel.app/auth/callback**`
  va lokal ish uchun `http://localhost:3000/auth/callback**` — oxiridagi `**`
  shart: login'dan keyin foydalanuvchi `?next=/prompts/...` orqali ovoz
  bermoqchi bo'lgan sahifasiga qaytadi.

**Upvote qanday ishlaydi:** tugma bosilganda UI darhol yangilanadi
(optimistik), so'ng `app/actions/upvote.ts` dagi Server Action bitta RPC
chaqiradi. `set_prompt_upvote(prompt_id, upvoted)` "toggle" emas, kerakli
holatni qabul qiladi — shuning uchun ikki marta bosish yoki qayta urinish
hisobni buzmaydi. Xato bo'lsa UI avvalgi holatga qaytadi. Ko'rsatiladigan son =
`data/prompts.ts` dagi boshlang'ich `upvotes` + bazadagi haqiqiy ovozlar.

Vercel'ga deploy qilganda o'sha ikki `NEXT_PUBLIC_*` o'zgaruvchini loyiha
sozlamalariga ham qo'shishni unutmang.

### Logo va brend belgisi

Logo ikki joyda saqlanadi va ikkalasi bir xil bo'lishi kerak:

| Fayl | Nima uchun |
| --- | --- |
| `app/icon.svg` | Favicon (brauzer tabi) + OG va Apple ikonkalari uchun manba |
| `components/Logo.tsx` | Sayt ichida (header, footer, hero) ishlatiladigan komponent |

`app/apple-icon.tsx` va `app/opengraph-image.tsx` logoni avtomatik ravishda
`app/icon.svg` faylidan o'qib PNG'ga aylantiradi — ularni qo'lda yangilash
shart emas.

**Logoni almashtirish:** yangi SVG'ni `app/icon.svg` ga yozing, keyin
`components/Logo.tsx` ichidagi shakllarni ham xuddi shunday yangilang.

### Boshqa sozlamalar

`lib/constants.ts` faylida:

- `SITE.repoOwner` / `SITE.repoName` — GitHub issue havolalari shu asosda
  quriladi.
- `chatGptUrl()` / `claudeUrl()` — "Try in ChatGPT/Claude" tugmalari qanday URL
  formatida ochilishini boshqaradi.

## 📝 Yangi prompt qo'shish

Yangi promptni qo'lda qo'shish uchun `data/prompts.ts` (yoki
`data/academic-prompts.ts`) massiviga `Prompt` interfeysiga mos yangi obyekt
qo'shing (`lib/types.ts`dagi tuzilmaga qarang: `role`, `task`, `context`,
`template`, `variables`, `exampleInput`, `exampleOutput`, `testedModels`,
`tags` va h.k.). Ilova qayta ishga tushirilganda yangi prompt avtomatik
ravishda katalogda va bosh sahifada paydo bo'ladi.

### O'zgaruvchilar (`{{key}}`)

Shablonda foydalanuvchi to'ldiradigan joyni `{{snake_case_kalit}}` bilan
belgilang va `variables` massivida uning formasini sozlang:

```ts
template: `My essay:\n"""\n{{essay_text}}\n"""\nMy target band: {{target_score}}`,
variables: [
  { key: "essay_text", label: "Insho matningiz", type: "textarea",
    helpText: "Kamida 250 so'z." },
  { key: "target_score", label: "Maqsad band", type: "select",
    options: ["6.0", "6.5", "7.0", "7.5"], defaultValue: "7.0" },
  { key: "strong_topics", label: "Kuchli mavzular", type: "text",
    required: false }, // bo'sh qolsa → "(ko'rsatilmagan)"
],
```

- Kalit faqat kichik lotin harflari, raqam va `_` dan iborat bo'lishi kerak
  (`{{Paste here}}` kabi erkin matn o'zgaruvchi hisoblanmaydi).
- Bitta kalit shablonda bir necha marta ishlatilishi mumkin.
- `variables` berilmasa ham ishlaydi — har bir `{{key}}` uchun oddiy textarea
  chiqadi; lekin yaxshi `label` va `placeholder` talabalar uchun ancha qulay.
- `testedModels` ni faqat promptni haqiqatan sinab ko'rgandan keyin to'ldiring.

Jamiyat a'zolari esa header'dagi **"Prompt yuborish"** tugmasi orqali Google
Form'ga o'z promptlarini yuborishlari mumkin — bu promptlar admin tomonidan
ko'rib chiqilib, `data/prompts.ts`ga qo'lda qo'shiladi.

## 🤝 Hissa qo'shish (Contributing)

PromptXona — ochiq kodli loyiha. Pull request'lar, yangi prompt takliflari va
UI yaxshilanishlari uchun mamnuniyat bilan kutamiz!

## 📄 Litsenziya

MIT — bepul foydalanish, o'zgartirish va tarqatish mumkin.

---

O'zbekiston talabalari uchun ❤️ bilan yaratildi.
