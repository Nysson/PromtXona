# PromptXona — UX / clutter audit

**Scope:** every screen in `app/` plus the shared components in `components/`.
**Lens:** an average-tech-literacy student on a phone, first visit, wants one prompt.
**Status:** audit only — no code changed.

---

## 0. The one-paragraph summary

The app is well built, but it is designed like a *product for prompt engineers* rather
than a *library for students*. Three structural things create most of the perceived
clutter:

1. **Every surface looks identical.** `glass-panel rounded-4xl` (`app/globals.css:41`) is
   used for prompt cards, sidebar boxes, form sections, the sticky filter bar, empty
   states and the chain navigator. There is exactly **one** surface level in the entire
   design system, so nothing can visually recede — the eye has no place to rest.
2. **Every action is offered everywhere.** Copy / ChatGPT / Claude / Save / Complete /
   Upvote appear on *every card* on *four different screens*, as five unlabeled grey
   icons. The same six actions reappear as seven pills on the detail page.
3. **There are two of several things.** Two search systems (page search + ⌘K palette),
   two taxonomies (`CATEGORY_META` vs `FILTER_GROUPS`), two "I like this prompt"
   concepts (Saqlash vs Bajarildi), two copy buttons on the detail page.

Fixing 1–3 removes more perceived clutter than any amount of spacing/typography work.

---

## 1. Global chrome (on every screen)

### Header — `components/Header.tsx`

| Element | Line | Verdict |
|---|---|---|
| Logo mark + wordmark | 42–47 | **Essential** |
| 4 nav links (Bosh sahifa / Katalog / Saqlanganlar / Progressim) | 49–79 | 2 essential, 2 demotable |
| Bookmark icon + count badge on "Saqlanganlar" | 68, 71–75 | **Noise** |
| Trophy icon on "Progressim" | 69 | **Noise** |
| Search button + `⌘K` kbd hint | 82–92 | **Demote / rethink** |
| Theme toggle (sun/moon) | 94–104 | Move to a menu |
| "Prompt yuborish" dark pill | 106–109 | **Demote** — wrong prominence |
| Mobile hamburger | 111–117 | Essential |

**On desktop the header carries 9 interactive targets.** Observations:

- **"Prompt yuborish" is a dark, filled, highest-contrast button in the global header.**
  It is the single rarest action on the site (most students will never submit a prompt)
  and it is styled as the most important thing on every screen. Make it a plain nav link
  or push it into the footer/menu only.
- The icons on nav links (`Bookmark` 3.5px, `Trophy` 3.5px) add colour and shape noise
  without helping — the labels already say what they are. Drop both; keep the count badge
  only if you keep the item.
- The `⌘K` hint (line 90) is meaningless to the target user and **wrong on Windows**
  (should be Ctrl). See §9 on the palette generally.
- Theme toggle is a personal setting shown at the same level as navigation. Candidate to
  move into the mobile menu / a small "⋯" menu.

**Suggested target: logo + 3 links + search icon + hamburger.**

### Footer — `components/Footer.tsx`

Two link columns (5 + 2 links) that fully duplicate the header nav, plus a description
paragraph that repeats the hero paragraph almost verbatim
(`Footer.tsx:19–24` ≈ `Hero.tsx:28–31`), plus an MIT licence line and a "made with ❤"
line. For a 4-page site this is over-built. Collapse to: logo + one line + GitHub link +
copyright. **Effort: trivial. Clutter removed: a whole screen of it on mobile.**

### AmbientBackground — `components/AmbientBackground.tsx`

Three animated blurred blobs + aurora gradient + grain, used on home, catalog, saved,
profile, login, submit and 404 — but **not** on the prompt detail page. So the one screen
users spend the most time on looks different from every other screen. Either add it there
or (better, for a clutter reduction) restrict it to the home hero only. The
`animate-float` blobs also cost battery/paint on low-end phones.

---

## 2. Home `/` — `app/page.tsx`, `components/Hero.tsx`, `components/FeaturedPrompts.tsx`

### Currently visible, top to bottom

1. Big logo, 96–112px (`Hero.tsx:17`) — **duplicate**, the header shows the same logo 40px above it
2. Glass badge: "100% ochiq kodli · ChatGPT, Claude va Gemini uchun sinovdan o'tgan" (`Hero.tsx:19–22`)
3. H1 "PromptXona" (`Hero.tsx:24–26`)
4. Uzbek description paragraph (`Hero.tsx:28–31`)
5. **English description paragraph** (`Hero.tsx:32–35`)
6. Two CTAs: "Promptlarni ko'rish" + "O'z promptingizni yuboring" (`Hero.tsx:37–49`)
7. Three big stat numbers (`Hero.tsx:51–76`)
8. Section heading + subheading "Kategoriya bo'yicha tanlang" (`app/page.tsx:26–34`)
9. 4 category cards (`app/page.tsx:35–51`)
10. Section heading + subheading "Tanlangan promptlar" (`app/page.tsx:54–62`)
11. **A second search bar + the full 10-pill filter row** (`FeaturedPrompts.tsx:36–39`)
12. 6 prompt cards (~13 elements each — see §4)
13. "Barcha promptlarni ko'rish" button (`FeaturedPrompts.tsx:54–62`)

**That is 11 blocks before the user sees a single prompt.**

### Essential vs noise

| Element | Keep? | Why |
|---|---|---|
| Hero logo (96–112px) | **Remove** | Already in the sticky header; pure duplication |
| Glass badge line 19–22 | Merge | Its "100% ochiq kodli" claim is repeated verbatim in stat #3 (line 70–74) |
| English paragraph 32–35 | **Remove** | Your user is an Uzbek student. This is for GitHub/HN visitors — put it in the README, not the hero |
| 3-stat row 51–76 | **Cut to one line or remove** | "13 prompt" is not an impressive number and it sits in `text-3xl`, competing with your CTAs. Stat #2's label ("Yo'nalish: DTM, IELTS, SAT, Ona tili") duplicates the category cards immediately below |
| Search + FilterTabs in FeaturedPrompts | **Remove entirely** | See below — this is the biggest structural problem on the page |
| Category cards | Keep | Best element on the page |
| 6 featured cards | Keep (maybe 3) | |

### The home-page search/filter is a trap

`FeaturedPrompts.tsx:19–32` renders a **second, subtly different** search+filter system:
it has no result count, no sort control, and silently `slice(0, 6)`. So a student who
types "speaking" here sees at most 6 results with no indication that more exist, and the
filter pills they just learned behave differently from the identical-looking pills on
`/prompts`. **Delete the search bar and filter row from the home page**; let the category
cards be the only way in. This alone removes 11 controls from the home screen.

### Hierarchy problem

Between the badge, H1, two paragraphs, two buttons and three 3xl numbers there are five
competing focal points above the fold. The `text-3xl` stat numbers are visually *heavier*
than the primary CTA text (`text-[15px]`), so the eye lands on "13" instead of
"Promptlarni ko'rish".

### Functional bug worth noting

`app/page.tsx:8–13` maps the **IELTS** category card to `?category=IELTS Writing`. Clicking
the card labelled "IELTS · Writing, Speaking, Vocabulary" lands on a filter that hides
IELTS Speaking and Vocabulary prompts. Same for SAT → `SAT Math` and DTM →
`DTM — Matematika`. This is a direct consequence of the two-taxonomy problem (§10.6).

---

## 3. Catalog `/prompts` — `app/prompts/PromptsCatalog.tsx`

### Currently visible

1. Glass badge "N ta sinovdan o'tgan prompt" (`:51–54`)
2. H1 "Promptlar katalogi" (`:55–57`)
3. Description paragraph (`:58–61`)
4. Sticky glass bar: search input + **10 filter pills**, horizontally scrolling (`:66–69`)
5. "N ta natija topildi" (`:72–74`)
6. Sort segmented control: Mashhur / Eng yangi (`:75–96`)
7. Card grid

### Findings

- **Three stacked control rows** (search+filters, then count+sort) before any content. Put
  the result count *inside* the sticky bar and you save a whole row.
- **10 filter pills is too many** (`lib/constants.ts:67–77` + "Barchasi"). On a phone they
  scroll horizontally with no affordance that they scroll, and four of them start with
  "DTM — ", so the distinguishing word is off-screen. Recommended: **4 top-level pills
  matching the home cards** (IELTS / SAT / Ona tili / DTM) and reveal sub-filters only
  after one is chosen — or hide sub-filters behind a "Filtr" sheet.
- The **sticky bar is `glass-panel`, and so are the cards** — the controls compete with
  the content they control. Give the sticky bar a flatter/solid treatment.
- `sticky top-[73px]` (`:66`) is a magic number tied to the header's `h-16` + border. Fine
  today, fragile later.
- The hero block here (badge + H1 + paragraph, `:48–63`) pushes content down ~200px on a
  screen the user reached *deliberately*. Shrink to a single H1 line.
- Sort defaults to "popular" but there's no visual indication that "Mashhur" is a *sort*
  and not a *filter* — it sits in the same pill shape as the filters directly above it.

---

## 4. PromptCard — `components/PromptCard.tsx` (used on 4 screens)

**This is the single densest element in the app and it is repeated 6–13 times per screen.**

### Currently visible per card (13 items)

| # | Element | Line |
|---|---|---|
| 1 | Subcategory badge (coloured) | 73–80 |
| 2 | Upvote button + count | 81–99 |
| 3 | Title | 102–104 |
| 4 | Description (2 lines) | 105–107 |
| 5 | Chain step badge "2/5-qadam" | 110–115 |
| 6–8 | Up to 3 `#tag` chips | 116–123 |
| 9 | Copy icon button | 128–135 |
| 10 | ChatGPT icon (Bot) | 136–145 |
| 11 | Claude icon (Sparkles) | 146–155 |
| 12 | Save icon (Bookmark) | 156–171 |
| 13 | Complete icon (CircleDashed) | 172 (`CompleteButton`) |
| 14 | Comment count | 173–179 |
| 15 | "Batafsil →" | 182–185 |

### Problems

- **Five identical grey 36px circular icon buttons in a row** (items 9–13). They are
  `text-neutral-500`, same size, no labels, and two of them use icons the audience cannot
  decode: a robot for ChatGPT, sparkles for Claude, a dashed circle for "mark as done".
  An average student cannot tell these apart, and there is no text anywhere to teach them.
- **Hierarchy is inverted.** The action a user actually wants — *open the prompt* — is
  rendered as `text-neutral-400` "Batafsil" (`:182`), the **lowest-contrast element on the
  card**. Meanwhile the upvote button gets a border, a colour and a number in the top
  right. The whole card is clickable (stretched link, `:66–70`) but nothing communicates
  that.
- The tag chips (`#Writing Task 1`, `#Band 7+`) mostly restate the subcategory badge
  already shown at the top of the same card.

### Recommendation

Reduce to: subcategory badge · title · description · **one text button "Nusxalash"** ·
bookmark icon · "Batafsil →" promoted to a real link colour. Move **ChatGPT / Claude /
Bajarildi / upvote** to the detail page only. That takes the card from 15 elements to 6
and, on the catalog page, removes **~54 controls** from a single screen.

---

## 5. Prompt detail `/prompts/[id]` — `app/prompts/[id]/PromptDetail.tsx`

### Currently visible

1. "Barcha promptlarga qaytish" back link (`:71–77`)
2. Category badge + subcategory badge (`:81–88`)
3. H1 (`:90–92`)
4. Description (`:93–95`)
5. Author + date (`:97–103`)
6. **Seven action pills** (`:105–174`)
7. ChainNavigator — a whole panel with badge, title, description, step counter, progress bars, step list, next-step button (`:176`, `components/ChainNavigator.tsx`)
8. Three cards: **Role / Task / Context** (`:179–183`)
9. "To'liq Prompt Shabloni" heading + **a second copy button** + `<pre>` block (`:186–203`)
10. Two cards: "Namuna kirish (Input)" / "Namuna natija (Output)" (`:206–225`)
11. RelatedPrompts — 3 more cards (`:227`)
12. CommentSection — heading, name input, textarea, submit, comment list (`:229–231`)
13. Sidebar: **three separate glass panels** — Statistika, Sinovdan o'tgan modellar, Teglar (`:235–289`)

### The action row is the worst offender

Seven `pill-button`s in one flex-wrap row: Upvote, Prompt nusxalash, ChatGPT'da sinash,
Claude'da sinash, Saqlash, Bajarildi deb belgilash, Ulashish. Six of the seven are the
*same* outlined white pill; only "Prompt nusxalash" is filled. On a 390px phone this wraps
to **four rows of buttons** before the user has seen the prompt itself.

Recommended: **"Nusxalash" (primary, filled) + "Saqlash" (secondary)**, then a single
"Yana ⌄" that reveals ChatGPT / Claude / Ulashish / Bajarildi / Upvote.

### Redundancy inside this one page

| Duplicated thing | Where |
|---|---|
| Copy button | `:120–126` **and** `:192–198` (~300px apart) |
| Upvote count | in the button `:118` **and** in the sidebar `:242–246` |
| Comment count | sidebar `:254–257` **and** the `Izohlar (N)` heading in `CommentSection.tsx:32–35` |
| Tags | sidebar `:273–288` — the only place, fine, but the panel wrapper is heavier than the content |
| Category/subcategory | badges `:81–88` **and** the sidebar's implicit context |

The sidebar's **three panels hold six data points**. Merge into one panel (or delete
Statistika entirely — copy counts are vanity metrics for a student).

### Role / Task / Context is jargon-as-UI

`:179–183` renders three prominent cards labelled with the untranslated English words
**Role**, **Task**, **Context**. These are prompt-engineering terms. To an average student
they are three mystery boxes above the thing they actually came for (the template). Their
content is also largely restated inside the template itself. Options, best first:

1. Collapse into one collapsible block: **"Bu prompt qanday ishlaydi?"** (closed by default).
2. Keep three but rename to Uzbek: **"AI qanday rolda"**, **"Nima qiladi"**, **"Nega kerak"**.

### Hierarchy

The `<pre>` template block (`:200–202`) is *the product*, and it is styled the same as
every other glass panel with no heading emphasis beyond `text-lg`. It should be the most
prominent thing on the page. Meanwhile section headings switch between two ranks with no
logic: `text-lg font-semibold` ("To'liq Prompt Shabloni") vs
`text-sm uppercase tracking-wide` ("Namuna kirish") vs `text-xl` ("Izohlar",
"O'xshash promptlar") — three heading styles for the same level.

---

## 6. Saqlanganlar `/saved` — `app/saved/SavedPrompts.tsx`

Clean screen; two notes.

- **Microcopy bug**, `:48`: *"Katalogdagi istalgan promptda **zakladka** belgisini bosing"*.
  "Zakladka" is a Russian loanword, and it does not match the button's own label, which
  says **"Saqlash"**. A student is told to press a thing that is never called that.
  → *"Katalogdagi promptda **saqlash belgisini** (🔖) bosing"*.
- Hero block (badge + H1 + paragraph, `:15–30`) is ~180px of chrome above what is often an
  empty list. Reduce to an H1.

---

## 7. Progressim `/profile` — `app/profile/ProfileView.tsx`

### Currently visible

Badge, H1, explainer paragraph, then **five stacked identical glass panels**: account
status, Umumiy progress, Kategoriyalar bo'yicha (4 bars), Zanjirlar (1 bar), Bajarilgan
promptlar.

### Findings

- **The explainer paragraph is a red flag**, `:96–100`:
  *"Bu «Saqlanganlar»dan farq qiladi — u keyinroq o'qish uchun ro'yxat."*
  You are explaining your information architecture in body copy. That's the strongest
  evidence that **Saqlash and Bajarildi are too similar to coexist** as two nav items, two
  card icons and two pages. Consider merging: one saved list where an item can be ticked
  off, or drop "Bajarildi" for v1.
- **Five panels, one treatment.** Only "Umumiy progress" (`:154–175`) has a strong element
  (the 4xl number). The other four are visually interchangeable. Make Umumiy progress a
  hero stat and flatten the rest.
- The "Zanjirlar" panel (`:208–235`) shows a single chain (`data/chains.ts:10–18`) — a
  whole titled panel for one progress bar. Fold it into the category list until there are
  ≥3 chains.
- Cloud / CloudOff icons (`:118`, `:123`) with the text "Progress hisobingizga
  saqlanmoqda" / "Faqat shu brauzerda saqlanmoqda" — the concept of sync is developer
  framing. See §8 for wording.
- "Bajarilgan promptlar" heading (`:239–241`) but the code shows only the last 5
  (`:78–82`). Heading over-promises.

---

## 8. Kirish `/login` — `app/login/LoginForm.tsx`

Genuinely the cleanest screen in the app — one card, one decision. Two issues:

- **`:79` leaks developer language to students:** *"Sayt egasi **Supabase kalitlarini**
  qo'shmagan."* Supabase means nothing to your user. →
  *"Hisobga kirish hozircha ishlamaydi. Xavotir olmang — natijalaringiz shu qurilmada saqlanadi."*
- `:137` uses the `Chrome` icon for **Google** sign-in. Different products; a "G" or a
  generic icon is safer.

---

## 9. ⌘K Command palette — `components/CommandPalette.tsx`

This is a **power-user pattern in an app explicitly for non-power-users**, and it is the
site's *third* search affordance (page search bars + header search button + this).

- The footer hints "↑↓ tanlash · ↵ ochish" (`:177–178`) assume a physical keyboard and
  arrow-key navigation literacy.
- The header's `⌘K` badge (`Header.tsx:89–91`) is Mac-only notation shown to everyone.
- `:165` prints `"{subcategory} · {upvotes} upvote"` — raw English "upvote", no pluralisation.
- `:180–186` adds *yet another* "Prompt yuborish" entry point (the fifth — see §10.1).

**Recommendation:** keep the ⌘K shortcut (it costs nothing), but **remove the visible
`⌘K` badge from the header** and make the header search button open a plain full-screen
search on mobile. Then delete the per-page search bar on home (§2) so there is exactly one
search UI.

---

## 10. Cross-page inconsistencies

1. **"Prompt yuborish" has five entry points, four different styles:** dark pill in the
   header (`Header.tsx:106`), outlined pill in the hero (`Hero.tsx:45`), plain text link
   in the footer (`Footer.tsx:53`), tiny link in the command palette (`CommandPalette.tsx:180`),
   and a full mobile-menu button (`Header.tsx:140`). One rare action, five placements.
2. **The same action is styled differently by screen:** Save is an unlabeled icon on the
   card (`PromptCard.tsx:156`) but a labeled pill on detail (`PromptDetail.tsx:145`).
   Copy is an icon on the card, a filled pill *and* a ghost text button on detail.
   Bajarildi is a dashed-circle icon on the card, a full pill on detail
   (`CompleteButton.tsx:31–51` vs `:53–72`).
3. **Five different labels for "go to the catalog":**
   "Katalogni ko'rish" (`SavedPrompts.tsx:56`), "Promptlarni ko'rish" (`ProfileView.tsx:272`),
   "Promptlar katalogiga qaytish" (`not-found.tsx:25`), "Barcha promptlarni ko'rish"
   (`FeaturedPrompts.tsx:59`), "Barcha promptlarga qaytish" (`PromptDetail.tsx:77`).
   Pick one: **"Promptlarni ko'rish"**.
4. **The catalog is named three ways:** "Katalog" (`Header.tsx:26`), "Promptlar katalogi"
   (`Footer.tsx:39`, page H1), "Promptlar" (everywhere else).
5. **Progress page is named three ways:** "Progressim" (`Header.tsx:28`),
   "Mening progressim" (`Footer.tsx:50`, H1), "Umumiy progress" (`ProfileView.tsx:158`).
6. **Two taxonomies.** `CATEGORY_META` (4 broad categories, `lib/constants.ts:37–65`) drives
   the home cards and the profile bars; `FILTER_GROUPS` (9 narrow groups, `:67–77`) drives
   the catalog filters and the submit form. Users see two different vocabularies for the
   same content, and it causes the broken home-card links noted in §2.
7. **The `Sparkles` icon means four different things:** the hero badge (`Hero.tsx:20`),
   "Claude" (`PromptCard.tsx:154`, `PromptDetail.tsx:142`), a generic prompt result icon
   (`CommandPalette.tsx:158`), and "Namuna natija (Output)" (`PromptDetail.tsx:219`).
8. **Heading scale is inconsistent:** catalog/saved/profile H1 = `text-4xl sm:text-5xl
   tracking-tighter`; detail H1 = `text-3xl sm:text-4xl tracking-tight`; home section
   headings = `text-2xl sm:text-3xl`. The detail page — the most important screen — has
   the smallest H1.
9. **AmbientBackground on 7 screens but not the detail page** (§1).
10. **aria-labels are in English on an Uzbek site,** and inconsistently so. English:
    `PromptCard.tsx:84` "Upvote this prompt", `:131` "Copy prompt to clipboard",
    `:141`/`:151` "Try this prompt in ChatGPT/Claude", `:160` "Save this prompt";
    `CompleteButton.tsx:58` "Mark this prompt as completed"; `Header.tsx:96` "Toggle color
    theme", `:113` "Toggle menu"; `ToastProvider.tsx:59` "Dismiss notification".
    Uzbek: `Header.tsx:84` "Qidirish", `SearchBar.tsx:31` "Qidiruvni tozalash".
    Screen-reader users hear a mix of two languages.

---

## 11. Microcopy: jargon → plain Uzbek

| Current | Where | Suggested |
|---|---|---|
| `{N} Upvote` | `PromptDetail.tsx:118` | **`Foydali ({N})`** |
| `Upvotelar` | `PromptDetail.tsx:242` | **`Foydali topganlar`** |
| `{N} upvote` | `CommandPalette.tsx:165` | **`{N} kishiga foydali`** |
| `Role` / `Task` / `Context` | `PromptDetail.tsx:180–182` | **`AI qanday rolda`** / **`Nima qiladi`** / **`Nega kerak`** |
| `Namuna kirish (Input)` | `PromptDetail.tsx:210`, `SubmitForm.tsx:317` | **`Siz shunday yozasiz`** |
| `Namuna natija (Output)` | `PromptDetail.tsx:219`, `SubmitForm.tsx:326` | **`AI shunday javob beradi`** |
| `To'liq Prompt Shabloni` | `PromptDetail.tsx:191` | **`Tayyor matn — nusxalab oling`** |
| `zakladka belgisini bosing` | `SavedPrompts.tsx:48` | **`saqlash belgisini bosing`** |
| `Promptga saqlandi!` | `PromptCard.tsx:60`, `PromptDetail.tsx:151` | **`Saqlanganlarga qo'shildi`** (current phrasing is ungrammatical) |
| `Bajarildi deb belgilash` | `CompleteButton.tsx:48` | **`Mashq qildim`** |
| `Progressim` / `Mening progressim` / `Umumiy progress` | `Header.tsx:28`, `ProfileView.tsx:94,158` | **`Natijalarim`** / **`Umumiy natija`** |
| `Kirish va sinxronlash` | `ProfileView.tsx:147` | **`Kirish — natijalar saqlanadi`** |
| `Progress hisobingizga saqlanmoqda` | `ProfileView.tsx:120` | **`Natijalaringiz hisobingizda saqlanmoqda`** |
| `Faqat shu brauzerda saqlanmoqda` | `ProfileView.tsx:124` | **`Faqat shu qurilmada saqlanmoqda`** |
| `Sayt egasi Supabase kalitlarini qo'shmagan` | `LoginForm.tsx:79` | **`Kirish hozircha ishlamaydi — natijalaringiz shu qurilmada saqlanadi`** |
| `Filtrni o'zgartirib ko'ring` | `PromptsCatalog.tsx:107` | **`Boshqa bo'limni tanlab ko'ring`** |
| `Prompt tuzilmasi` | `SubmitForm.tsx:257` | **`Prompt qismlari`** |
| `To'ldiriladigan joylarni {{shu tarzda}} belgilang` | `SubmitForm.tsx:293` | **`O'zgaradigan joylarni {{ikki qavs}} ichida yozing`** |
| `Majburiy maydonlar` | `SubmitForm.tsx:141,396` | **`To'ldirilishi shart bo'lgan joylar`** |
| `⌘K` | `Header.tsx:90` | remove |
| English aria-labels | §10.10 | translate all |

**Loanwords worth keeping:** *prompt* (it's the brand), *IELTS/SAT/DTM*, *AI*, *email*,
*GitHub*. **Worth replacing:** *upvote*, *zakladka*, *progress*, *sinxronlash*, *Role/Task/Context*,
*Input/Output*, *Supabase*.

---

## 12. Submit `/submit` — `app/submit/SubmitForm.tsx`

Not a student's daily screen, so lower priority — but two things stand out:

- **The primary (dark, filled) button is "GitHub'da yuborish"** (`:403–409`), which
  requires a GitHub account. The easy path for your actual audience — "Matnni nusxalash",
  then send via Telegram — is the secondary outlined button (`:410–416`), and the
  explanation of the difference is in 12px grey text *below both* (`:430–440`). **Swap the
  emphasis.**
- 4 sections × ~3 fields = 12 inputs, all expanded, on one page. Only 4 are required
  (`:55–60`). Consider collapsing sections 2 and 4 ("Prompt tuzilmasi", "Namuna va
  modellar") behind "Qo'shimcha ma'lumot (ixtiyoriy)".
- The "To'ldirilgan %" meter (`:377–390`) counts *all* fields, so a valid submission shows
  ~40% and reads as failure.

---

## 13. 404 — `app/not-found.tsx`

Fine. One card, one action. No changes needed beyond the label harmonisation in §10.3.

---

## 14. Top 5 changes — most clutter removed per unit of effort

### 1. Strip the PromptCard footer — *~1h, affects 4 screens*
`components/PromptCard.tsx:126–186`. Five unlabeled grey icons + comment count → **one
"Nusxalash" text button + one bookmark icon + a real "Batafsil →" link**. Move ChatGPT /
Claude / Bajarildi / Upvote to the detail page. On the catalog this removes **~54 controls
from one screen**, and it fixes the inverted hierarchy (§4).

### 2. Delete the search bar + filter row from the home page — *~15 min*
`components/FeaturedPrompts.tsx:36–39`. Removes 11 controls, eliminates the duplicate
search system, and stops the silent `slice(0,6)` truncation. Category cards become the
single, obvious entry point.

### 3. Trim the hero — *~20 min*
`components/Hero.tsx`: remove the 112px logo (`:17`, duplicated in the header), remove the
English paragraph (`:32–35`), and collapse the three stat blocks (`:51–76`) into one small
line or delete them. Gets the user to the category cards roughly one screen-height sooner.

### 4. Collapse the detail-page action row from 7 to 2 — *~1h*
`app/prompts/[id]/PromptDetail.tsx:105–174`: **"Nusxalash" (filled) + "Saqlash"**, with
ChatGPT / Claude / Ulashish / Bajarildi / Foydali behind a "Yana ⌄". Delete the duplicate
copy button at `:192–198`. Merge the three sidebar panels (`:235–289`) into one. On mobile
this removes three full rows of buttons above the prompt itself.

### 5. Ship the microcopy pass — *~45 min, strings only*
The table in §11. Zero layout risk, and it is the change that most directly serves
"average tech literacy": *Upvote → Foydali*, *Role/Task/Context → Rol/Vazifa/Nega kerak*,
*Input/Output → Siz yozasiz / AI javob beradi*, *zakladka → saqlash*, *progress →
natijalar*, plus translating the English aria-labels.

### Runners-up (high value, more effort)
6. **Introduce a second surface level.** Everything is `glass-panel`; add a flat/quiet
   variant for sidebars, tags, filter bars and empty states so cards can lead (§0.1).
7. **Reduce the catalog to 4 filter pills**, with sub-filters revealed after selection
   (§3) — and unify `CATEGORY_META` / `FILTER_GROUPS` (§10.6), which also fixes the broken
   home-card links (§2).
8. **Decide whether "Saqlash" and "Bajarildi" should both exist.** Merging them removes a
   nav item, a card icon, a detail-page pill, and an explanatory paragraph (§7).
