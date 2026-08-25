# PromptXona 📚

**PromptXona** — O'zbekistonlik o'quvchilar uchun yaratilgan, ochiq kodli AI prompt
kutubxonasi. IELTS, SAT tayyorgarligi va Ona tili/Adabiyot inshosi uchun
sinovdan o'tgan, tayyor promptlarni toping, nusxalang va ChatGPT/Claude/Gemini'da
bir zumda ishlating.

> An open-source, Apple-inspired prompt library built for Uzbek students preparing
> for IELTS, SAT, and native-language (Ona tili va Adabiyot) essays.

---

## ✨ Features

- **3 kategoriya:** IELTS (Writing, Speaking), SAT (Math, Reading), Ona tili va
  Adabiyot — 13 ta to'liq yozilgan, production-sifatli prompt.
- **Multi-page Next.js App Router** — Bosh sahifa, Promptlar katalogi va har bir
  prompt uchun alohida detal sahifa (`/prompts/[id]`).
- **Apple-uslubidagi UI** — glassmorphism kartalar, ambient gradient orqa fon,
  yumshoq soyalar, to'liq dark/light mode.
- **Interaktiv prompt kartalari:**
  - 📋 Bir bosishda nusxalash (toast bildirishnoma bilan)
  - 👍 Real-time upvote hisoblagichi
  - 🤖 "Try in ChatGPT" / ✨ "Try in Claude" — tashqi havolalar orqali
    to'g'ridan-to'g'ri promptni AI chatga yuborish
  - 💬 To'liq izoh (comment) tizimi — yangi izoh qoldirish, real-time yangilanish
- **Qidiruv va filtrlash** — kategoriya bo'yicha pill-filtrlar, mashhurlik/vaqt
  bo'yicha saralash.
- **"Submit Prompt" tugmasi** — navigatsiya headerida, tashqi Google Form
  havolasini ochadi.
- **LocalStorage orqali mock backend** — upvote, nusxalash soni va izohlar
  brauzer xotirasida saqlanadi, sahifani yangilaganda ham yo'qolmaydi.

## 🧱 Tech Stack

| Texnologiya | Maqsad |
| --- | --- |
| [Next.js 14 (App Router)](https://nextjs.org) | Framework, routing, TypeScript |
| [Tailwind CSS](https://tailwindcss.com) | Apple-uslubidagi styling |
| [Lucide React](https://lucide.dev) | Ikonalar |
| React `useState`/`useContext` | Mahalliy holat boshqaruvi (upvote, comment, copy) |
| `localStorage` | Mock backend — foydalanuvchi harakatlarini saqlash |

## 📁 Loyiha tuzilmasi

```
promptxona/
├── app/
│   ├── layout.tsx                 # Root layout (Header, Footer, Providers)
│   ├── page.tsx                   # Bosh sahifa (Hero, Categories, Featured)
│   ├── globals.css
│   ├── not-found.tsx
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
│   ├── ThemeProvider.tsx          # Dark/Light mode context
│   ├── ToastProvider.tsx          # Toast bildirishnomalar
│   └── PromptsProvider.tsx        # Prompt holati (upvote/copy/comment) + localStorage
├── data/
│   └── prompts.ts                 # 13 ta to'liq seed prompt (IELTS/SAT/Ona tili)
├── lib/
│   ├── types.ts                   # TypeScript interfeyslar
│   ├── constants.ts               # Sayt konfiguratsiyasi, filtr guruhlari
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

`lib/constants.ts` faylida quyidagilarni o'zgartirishingiz mumkin:

- `SITE.submitFormUrl` — "Prompt yuborish" tugmasi ochadigan Google Form
  havolangizni shu yerga qo'ying.
- `SITE.githubUrl`, `SITE.twitterUrl` — ijtimoiy tarmoq havolalari.
- `chatGptUrl()` / `claudeUrl()` — "Try in ChatGPT/Claude" tugmalari qanday URL
  formatida ochilishini boshqaradi.

## 📝 Yangi prompt qo'shish

Yangi promptni qo'lda qo'shish uchun `data/prompts.ts` faylidagi `PROMPTS`
massiviga `Prompt` interfeysiga mos yangi obyekt qo'shing (`lib/types.ts`dagi
tuzilmaga qarang: `role`, `task`, `context`, `template`, `exampleInput`,
`exampleOutput`, `testedModels`, `tags` va h.k.). Ilova qayta ishga
tushirilganda yangi prompt avtomatik ravishda katalogda va bosh sahifada
paydo bo'ladi.

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
