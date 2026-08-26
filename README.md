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
  Speaking), SAT (Math, Reading), Ona tili va Adabiyot — 22 ta to'liq
  yozilgan, production-sifatli prompt.
- **Multi-page Next.js App Router** — Bosh sahifa, Promptlar katalogi va har bir
  prompt uchun alohida detal sahifa (`/prompts/[id]`).
- **Apple-uslubidagi UI** — glassmorphism kartalar, ambient gradient orqa fon,
  yumshoq soyalar, to'liq dark/light mode.
- **Interaktiv prompt kartalari:**
  - 📋 Bir bosishda nusxalash (toast bildirishnoma bilan)
  - 👍 Real-time upvote hisoblagichi
  - 🔖 Saqlash (bookmark) — `/saved` sahifasida to'planadi
  - 🤖 "Try in ChatGPT" / ✨ "Try in Claude" — tashqi havolalar orqali
    to'g'ridan-to'g'ri promptni AI chatga yuborish
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
- **LocalStorage orqali mock backend** — upvote, nusxalash soni, saqlanganlar va
  izohlar brauzer xotirasida saqlanadi, sahifani yangilaganda ham yo'qolmaydi.

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
│   ├── prompts.ts                 # 22 ta to'liq seed prompt (DTM/IELTS/SAT/Ona tili)
│   └── chains.ts                  # Prompt zanjirlari + navigatsiya yordamchilari
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
