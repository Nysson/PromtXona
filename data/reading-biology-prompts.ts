import type { Prompt } from "@/lib/types";

const LANGUAGES = ["O'zbekcha + inglizcha atamalar", "O'zbekcha", "English"];

/**
 * IELTS Reading va DTM Biologiya paketi. Hali tashqi modellarda sinovdan
 * o'tkazilmagan — `testedModels` sinovdan keyin to'ldiriladi.
 */
export const READING_BIOLOGY_PROMPTS: Prompt[] = [
  // ─────────────────────────────────────────────────────────────────────
  // IELTS Reading — True / False / Not Given
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ielts-reading-tfng-logic-trainer",
    title: "IELTS Reading — True / False / Not Given Mantiq Treneri",
    category: "IELTS",
    filterGroup: "IELTS Reading",
    subcategory: "Reading",
    description:
      "TFNG va YNNG savollarida \"False\" bilan \"Not Given\"ni farqlashni o'rgatadi: har bir gapni matndagi aniq joy bilan solishtiradi va xatoingiz qayerdan kelganini ko'rsatadi.",
    role: "You are an IELTS Academic Reading specialist who teaches True/False/Not Given through strict statement-to-text matching rather than intuition.",
    task: "For each statement, locate the matching part of the passage, compare meaning and qualifiers precisely, decide True/False/Not Given (or Yes/No/Not Given), and diagnose the student's wrong answers by error type.",
    context:
      "TFNG — o'zbek o'quvchilari eng ko'p ball yo'qotadigan savol turi. Asosiy muammo: \"False\" va \"Not Given\" chalkashadi, yoki talaba matnda yo'q, lekin hayotda to'g'ri bo'lgan bilimiga tayanadi. Bu prompt har bir gapni matndagi aniq jumla bilan yonma-yon qo'yadi, \"some / all / usually / only\" kabi kvantor so'zlarni tekshiradi va har bir xatoni turiga ko'ra tasniflaydi — shunda talaba bitta testni emas, qaror qabul qilish algoritmini o'rganadi.",
    template: `You are an IELTS Academic Reading specialist. You teach True/False/Not Given by strict matching, never by intuition or outside knowledge.

PASSAGE
"""
{{passage_text}}
"""

STATEMENTS
"""
{{statements}}
"""

Question format: {{question_format}}
My answers (may be empty): {{my_answers}}
Explain in: {{explanation_language}}

For EACH statement, use this exact block:
**Statement N:** (repeat it)
- **Locate:** quote the exact sentence(s) from the passage that this statement is about. If no sentence deals with it, write "No matching sentence".
- **Compare:** list the key parts of the statement (subject, action, quantity/qualifier, time) and check each one against the quote. Pay special attention to qualifiers: all / some / most / only / always / usually / never, comparatives, dates and numbers.
- **Decision:** TRUE / FALSE / NOT GIVEN (or YES / NO / NOT GIVEN) with a one-line reason.
  - TRUE = the text says the same thing (paraphrase is fine).
  - FALSE = the text says the OPPOSITE or something incompatible.
  - NOT GIVEN = the text says nothing that confirms or contradicts it.
- **Paraphrase map:** the statement's words → the passage's words (e.g. "rose sharply" → "increased dramatically").

If I gave my answers, then after all statements:
**Error diagnosis** — table: | Statement | My answer | Correct | Error type | What to do differently |
Error types: Outside knowledge, Keyword match without meaning, Missed qualifier, False vs Not Given confusion, Wrong location, Missed paraphrase.

Finish with:
**My decision algorithm** — a 4-step checklist I can follow under time pressure.
**One-line rule** for the error type I made most.

Never use knowledge from outside the passage. If a statement is genuinely ambiguous, say so.`,
    variables: [
      {
        key: "passage_text",
        label: "Passage (matn)",
        type: "textarea",
        placeholder: "Reading matnini yoki tegishli paragraflarni joylashtiring…",
      },
      {
        key: "statements",
        label: "Gaplar (statements)",
        type: "textarea",
        placeholder: "1. The Aral Sea is currently…\n2. …",
      },
      {
        key: "question_format",
        label: "Savol turi",
        type: "select",
        options: [
          "True / False / Not Given (fakt)",
          "Yes / No / Not Given (muallif fikri)",
        ],
        defaultValue: "True / False / Not Given (fakt)",
      },
      {
        key: "my_answers",
        label: "Mening javoblarim",
        type: "text",
        placeholder: "1-F, 2-T, 3-T, 4-NG",
        helpText: "Ixtiyoriy. Yozsangiz, xatolaringiz turiga ko'ra tahlil qilinadi.",
        required: false,
      },
      {
        key: "explanation_language",
        label: "Tushuntirish tili",
        type: "select",
        options: LANGUAGES,
        defaultValue: LANGUAGES[0],
      },
    ],
    exampleInput:
      "Passage: \"The Aral Sea, once the fourth-largest lake in the world, began to shrink in the 1960s after Soviet irrigation projects diverted the Amu Darya and Syr Darya rivers to grow cotton. By 2007 it had declined to about 10% of its original size. A dam completed in 2005 has helped the northern part of the sea recover, while the southern part has continued to shrink.\"\n\nStatements:\n1. The Aral Sea is currently the fourth-largest lake in the world.\n2. Water from the rivers feeding the sea was used for cotton farming.\n3. The dam completed in 2005 was funded by the World Bank.\n4. The southern part of the sea has recovered as well as the northern part.\n\nMening javoblarim: 1-F, 2-T, 3-T, 4-NG",
    exampleOutput:
      "**Statement 1:** The Aral Sea is currently the fourth-largest lake in the world.\n- **Locate:** \"The Aral Sea, once the fourth-largest lake in the world…\"\n- **Compare:** *currently* ↔ *once* — \"once\" o'tmishni bildiradi; keyingi gaplar dengiz 10% gacha qisqarganini aytadi.\n- **Decision:** **FALSE** — matn hozirgi holatga zid.\n- **Paraphrase map:** fourth-largest → fourth-largest (aynan), currently ↔ once (zid).\n\n**Statement 2:** Water from the rivers feeding the sea was used for cotton farming.\n- **Locate:** \"…diverted the Amu Darya and Syr Darya rivers to grow cotton.\"\n- **Decision:** **TRUE**\n- **Paraphrase map:** used for cotton farming → to grow cotton; rivers feeding the sea → Amu Darya and Syr Darya.\n\n**Statement 3:** The dam completed in 2005 was funded by the World Bank.\n- **Locate:** \"A dam completed in 2005 has helped the northern part…\"\n- **Compare:** to'g'on va yili bor ✅, lekin *kim moliyalashtirgani* haqida hech narsa yo'q.\n- **Decision:** **NOT GIVEN** — matn buni tasdiqlamaydi ham, inkor ham etmaydi.\n\n**Statement 4:** The southern part of the sea has recovered as well as the northern part.\n- **Locate:** \"…while the southern part has continued to shrink.\"\n- **Decision:** **FALSE** — \"continued to shrink\" ↔ \"recovered\" — qarama-qarshi.\n\n**Error diagnosis**\n| Statement | Mening javobim | To'g'ri | Xato turi | Keyingi safar |\n|---|---|---|---|---|\n| 3 | T | NG | Outside knowledge | Hayotda to'g'ri bo'lishi mumkin, lekin matnda yo'q bo'lsa — NG |\n| 4 | NG | F | False vs Not Given | Matnda shu mavzuda gap bormi? Bor va zid bo'lsa — FALSE |\n\n**My decision algorithm**\n1. Gapdagi kalit so'z orqali matnda joyni toping.\n2. Kvantor va sanalarni alohida tekshiring.\n3. Zid bo'lsa → FALSE. Bir xil bo'lsa → TRUE.\n4. Mavzu matnda umuman yoritilmagan bo'lsa → NOT GIVEN.\n\n**One-line rule:** \"Men buni bilaman\" — bu dalil emas; faqat matn dalil.",
    testedModels: [],
    tags: ["IELTS Reading", "TFNG", "Not Given", "Paraphrase"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T09:00:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // IELTS Reading — Matching Headings
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ielts-reading-matching-headings",
    title: "IELTS Reading — Matching Headings Strategiyasi",
    category: "IELTS",
    filterGroup: "IELTS Reading",
    subcategory: "Reading",
    description:
      "Har bir paragrafning asosiy g'oyasini bir jumlada aniqlatadi, so'ng sarlavhalarni solishtirib, tuzoq sarlavhalar nima uchun noto'g'ri ekanini ko'rsatadi.",
    role: "You are an IELTS Academic Reading coach who teaches Matching Headings by identifying each paragraph's main idea before reading the heading list.",
    task: "Summarise each paragraph's main idea, match it to the correct heading with evidence, explain why the closest distractor headings fail, and diagnose the student's mistakes.",
    context:
      "Matching Headings'da talabalar odatda paragrafdagi bitta tanish so'zga qarab sarlavha tanlaydi — tuzuvchilar esa aynan shu so'zni tuzoq sarlavhaga qo'yadi. To'g'ri yo'l: avval paragrafning asosiy g'oyasini (ko'pincha birinchi yoki oxirgi jumlada) o'z so'zingiz bilan aytish, keyin sarlavha bilan solishtirish. Bu prompt shu ketma-ketlikni majburiy qiladi va har bir tuzoq sarlavhaning nima uchun \"yaqin, lekin noto'g'ri\" ekanini tushuntiradi.",
    template: `You are an IELTS Academic Reading coach. Teach me Matching Headings using the "main idea first" method.

PARAGRAPHS
"""
{{paragraphs_text}}
"""

LIST OF HEADINGS
"""
{{headings_list}}
"""

My answers (may be empty): {{my_answers}}
Explain in: {{explanation_language}}

STEP 1 — Main idea first (do NOT look at the headings yet)
For each paragraph: the sentence that carries the main idea (quote it), then the main idea in max 10 of your own words. Mark whether the paragraph's function is: describing a problem, giving a cause, giving a solution, comparing, giving an example, or describing a change over time.

STEP 2 — Match
Table: | Paragraph | Correct heading | Evidence (quote) | Closest distractor | Why the distractor fails |
Explain each distractor precisely: too narrow (covers only one detail), too broad, wrong function (e.g. "causes" vs "effects"), or keyword trap (shares a word but not the idea).

STEP 3 — If I gave answers
| Paragraph | My answer | Correct | Why I was tempted | Rule to avoid it |

STEP 4 — Strategy card
- The 5-step routine for Matching Headings under time pressure (about 1 minute per paragraph).
- 3 signal words that usually introduce a paragraph's main idea, and 3 that usually introduce only an example.

Use only the passage. If a heading could fit two paragraphs, say so and explain which fits better.`,
    variables: [
      {
        key: "paragraphs_text",
        label: "Paragraflar",
        type: "textarea",
        placeholder: "A. …\n\nB. …\n\nC. …",
        helpText: "Har bir paragrafni harfi (A, B, C…) bilan yozing.",
      },
      {
        key: "headings_list",
        label: "Sarlavhalar ro'yxati",
        type: "textarea",
        placeholder: "i. …\nii. …\niii. …",
      },
      {
        key: "my_answers",
        label: "Mening javoblarim",
        type: "text",
        placeholder: "A-iii, B-i, C-v",
        required: false,
      },
      {
        key: "explanation_language",
        label: "Tushuntirish tili",
        type: "select",
        options: LANGUAGES,
        defaultValue: LANGUAGES[0],
      },
    ],
    exampleInput:
      "A. Many cities once treated rainwater purely as waste, channelling it into drains as quickly as possible. As urban areas expanded, however, these drains were increasingly overwhelmed, and flooding after heavy storms became common.\n\nB. In response, planners in several countries have begun designing \"sponge\" neighbourhoods. Parks are lowered so that they can temporarily hold water, and pavements are made from porous materials that let rain soak into the ground.\n\nHeadings:\ni. The rising cost of urban drainage\nii. Turning city surfaces into water stores\niii. How an old approach stopped working\niv. Why parks are popular with residents\n\nMening javoblarim: A-i, B-ii",
    exampleOutput:
      "**STEP 1 — Main idea first**\n- **A:** \"As urban areas expanded, however, these drains were increasingly overwhelmed…\" → *Eski usul (yomg'irni tez oqizish) shahar o'sishi bilan ishlamay qoldi.* Funksiya: **muammo / o'zgarish.**\n- **B:** \"…planners… have begun designing 'sponge' neighbourhoods.\" → *Shahar yuzalari suvni ushlab qoladigan qilib loyihalanmoqda.* Funksiya: **yechim.**\n\n**STEP 2 — Match**\n| Paragraf | To'g'ri | Dalil | Eng yaqin tuzoq | Nima uchun noto'g'ri |\n|---|---|---|---|---|\n| A | **iii** | \"drains were increasingly overwhelmed\" | i | Keyword trap: \"drainage\" bor, lekin xarajat (cost) haqida gap yo'q |\n| B | **ii** | \"hold water… soak into the ground\" | iv | Too narrow + wrong idea: parklar misol sifatida, aholiga yoqishi aytilmagan |\n\n**STEP 3 — Sizning javoblaringiz**\n| Paragraf | Sizniki | To'g'ri | Nega aldandingiz | Qoida |\n|---|---|---|---|---|\n| A | i | iii | \"drains\" ↔ \"drainage\" so'z mosligi | So'z emas, g'oya mos kelishi kerak |\n\n**STEP 4 — Strategy card**\n1. Sarlavhalarni hali o'qimang.\n2. Paragrafning 1- va oxirgi jumlasini o'qing, \"however / but\" dan keyingi gapga e'tibor bering.\n3. G'oyani 10 so'zda ayting.\n4. Sarlavhalardan g'oyaga mosini tanlang, so'z mosini emas.\n5. Shubhali bo'lsa — o'tkazib yuboring, oxirida qayting.\n\nAsosiy g'oya signallari: *however, in response, the main reason*. Misol signallari: *for example, such as, in one case*.",
    testedModels: [],
    tags: ["IELTS Reading", "Matching Headings", "Main idea", "Strategiya"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T09:10:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DTM Biologiya — mavzu tushuntirish
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "dtm-biologiya-mavzu-tushuntirish",
    title: "DTM Biologiya — Mavzuni Noldan Tushuntirish va Test Tuzoqlari",
    category: "DTM",
    filterGroup: "DTM — Biologiya",
    subcategory: "Biologiya",
    description:
      "Biologiya mavzusini sodda tildan ilmiy darajagacha bosqichma-bosqich tushuntiradi, atamalar jadvali, DTM'dagi tipik tuzoqlar va 10 ta test bilan mustahkamlaydi.",
    role: "Siz DTM biologiya blokiga abituriyentlar tayyorlaydigan, murakkab jarayonlarni hayotiy o'xshatishlar bilan tushuntiradigan tajribali biologiya o'qituvchisisiz.",
    task: "Berilgan biologiya mavzusini sodda o'xshatishdan boshlab ilmiy aniqlikkacha tushuntiring, atamalar jadvalini tuzing, DTM testlarida uchraydigan tuzoqlarni ko'rsating va 10 ta test bilan bilimni tekshiring.",
    context:
      "Biologiyada abituriyentlar ko'pincha atamalarni yodlaydi, lekin jarayonni tushunmaydi — natijada savol biroz boshqacha qo'yilsa, adashadi (masalan, fotosintezda kislorod suvdan ajralishini emas, CO₂ dan deb o'ylash). Bu prompt mavzuni avval o'xshatish bilan tushuntiradi, keyin ilmiy tilga o'tadi, eng ko'p chalkashtiriladigan juftliklarni alohida ajratadi va testlarni aynan shu tuzoqlar asosida tuzadi.",
    template: `Siz DTM biologiya blokiga tayyorlaydigan tajribali o'qituvchisiz. Darslik bilan mos, ilmiy jihatdan aniq tushuntirasiz.

Mavzu: {{mavzu}}
Darslik sinfi: {{sinf}}
Mening hozirgi darajam: {{bilim_darajasi}}

Quyidagi tuzilmada tushuntiring:

1. **Bir jumlada** — mavzuning mohiyati.
2. **Hayotiy o'xshatish** — jarayonni kundalik hayotdagi narsa bilan solishtiring (masalan, hujayra — zavod). O'xshatish qayerda noto'g'ri bo'lib qolishini ham ayting.
3. **Ilmiy tushuntirish** — bosqichma-bosqich, raqamlangan. Har bir bosqichda: qayerda sodir bo'ladi, nima kiradi, nima chiqadi.
4. **Sxema (matn ko'rinishida)** — jarayonni strelkalar bilan: A → B → C.
5. **Atamalar jadvali** — | Atama | Ta'rifi | Eslab qolish usuli |. Kamida 8 ta.
6. **DTM tuzoqlari** — ko'p chalkashtiriladigan 4–5 juftlik yoki noto'g'ri tushuncha: "Ko'pchilik X deb o'ylaydi, aslida Y, chunki…".
7. **Raqamlar va formulalar** — mavzuga oid yodlanishi kerak bo'lgan sonlar, formulalar, nisbatlar (bo'lsa).
8. **10 ta test** — A–D variantli, DTM uslubida, 6-bo'limdagi tuzoqlardan foydalaning. Javoblar va har biriga bir qatorli izohni ENG OXIRIDA "JAVOBLAR" sarlavhasi ostida bering.
9. **Bog'liq mavzular** — DTM'da shu mavzu bilan birga keladigan 3 ta mavzu.

Qoidalar: faktlarni faqat ishonchingiz komil bo'lsa yozing; darsliklarda turlicha berilgan joyni (masalan, atama yoki son) alohida belgilang. Javobni "{{bilim_darajasi}}" darajasiga moslang.`,
    variables: [
      {
        key: "mavzu",
        label: "Mavzu",
        type: "text",
        placeholder: "Fotosintez",
      },
      {
        key: "sinf",
        label: "Darslik sinfi",
        type: "select",
        options: ["6-sinf", "7-sinf", "8-sinf", "9-sinf", "10-sinf", "11-sinf", "Bilmayman"],
        defaultValue: "Bilmayman",
      },
      {
        key: "bilim_darajasi",
        label: "Hozirgi darajangiz",
        type: "select",
        options: [
          "Noldan boshlayapman",
          "Asoslarni bilaman, chuqurlashtirmoqchiman",
          "Yaxshi bilaman, faqat test mashqi kerak",
        ],
        defaultValue: "Asoslarni bilaman, chuqurlashtirmoqchiman",
      },
    ],
    exampleInput:
      "Mavzu: Fotosintez · Darslik sinfi: Bilmayman · Daraja: Asoslarni bilaman, chuqurlashtirmoqchiman",
    exampleOutput:
      "**1. Bir jumlada**\nFotosintez — yashil o'simliklar yorug'lik energiyasi yordamida CO₂ va suvdan organik modda (glyukoza) hosil qilib, kislorod ajratadigan jarayon.\n\n**2. Hayotiy o'xshatish**\nXloroplast — quyosh paneli bor non zavodi: panel (tilakoid) elektr (ATF, NADF·H₂) ishlab chiqaradi, sex (stroma) shu energiya bilan xomashyodan (CO₂) non (glyukoza) yopadi.\n*O'xshatish chegarasi:* zavodda chiqindi bo'lmaydi deb o'ylamang — kislorod aynan \"chiqindi\" sifatida ajraladi.\n\n**3. Ilmiy tushuntirish**\n1. *Yorug'lik fazasi* — tilakoid membranasida. Xlorofill yorug'likni yutadi → suv parchalanadi (fotoliz) → O₂ ajraladi, ATF va NADF·H₂ hosil bo'ladi.\n2. *Qorong'ilik fazasi (Kalvin sikli)* — stromada. ATF va NADF·H₂ energiyasi hisobiga CO₂ biriktiriladi → glyukoza hosil bo'ladi. Bu faza yorug'likni bevosita talab qilmaydi, lekin yorug'lik fazasi mahsulotlariga bog'liq.\n\n**4. Sxema**\nYorug'lik + H₂O → (tilakoid) → O₂↑ + ATF + NADF·H₂ → (stroma) + CO₂ → C₆H₁₂O₆\n\n**5. Atamalar jadvali** (birinchi 4 tasi)\n| Atama | Ta'rifi | Eslab qolish |\n|---|---|---|\n| Xloroplast | Fotosintez sodir bo'ladigan organoid | \"xloro\" = yashil |\n| Tilakoid | Xloroplast ichidagi membrana pufakchalari | Tanga ustunlari (grana) |\n| Stroma | Xloroplastning suyuq ichki muhiti | \"Sex zali\" |\n| Fotoliz | Suvning yorug'lik ta'sirida parchalanishi | foto = yorug'lik, liz = parchalash |\n\n**6. DTM tuzoqlari**\n- Ko'pchilik O₂ CO₂ dan ajraladi deb o'ylaydi, aslida **suvdan** (fotoliz).\n- \"Qorong'ilik fazasi faqat kechasi bo'ladi\" — noto'g'ri, u kunduzi ham boradi.\n- Yorug'lik fazasi — *tilakoidda*, qorong'ilik fazasi — *stromada*; joylarini almashtirib beradigan variantlar ko'p.\n\n**7. Formula**\n6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (yorug'lik, xlorofill)\n\n**8. Test** (1-savol)\nFotosintezda ajraladigan kislorodning manbai nima?\nA) CO₂ B) H₂O C) glyukoza D) xlorofill\n…(yana 9 ta test, JAVOBLAR oxirida)",
    testedModels: [],
    tags: ["DTM", "Biologiya", "Mavzu tushuntirish", "Test"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T09:20:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // DTM Biologiya — genetika masalalari
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "dtm-biologiya-genetika-masala",
    title: "DTM Biologiya — Genetika Masalalarini Bosqichma-bosqich Yechish",
    category: "DTM",
    filterGroup: "DTM — Biologiya",
    subcategory: "Genetika",
    description:
      "Mendel qonunlari, qon guruhlari, jinsga bog'liq irsiylanish masalalarini belgilash → gametalar → Pennet katagi → nisbat tartibida yechadi va xatongizni topadi.",
    role: "Siz genetika masalalarini DTM uchun aniq algoritm bilan yechishni o'rgatadigan biologiya o'qituvchisisiz.",
    task: "Genetika masalasini belgilar jadvali, ota-ona genotiplari, gametalar, Pennet katagi va genotip/fenotip nisbati orqali yeching, javobni tekshiring, talabaning javobidagi xatoni toping va o'xshash masala tuzing.",
    context:
      "Genetika masalalari — DTM biologiya blokida eng ko'p ball keltiradigan, lekin eng ko'p xato qilinadigan qism. Xatolarning ko'pi tushunchada emas, tartibda: gametalar noto'g'ri yoziladi, dominant/retsessiv chalkashadi yoki genotip nisbati fenotip nisbati bilan almashtiriladi. Bu prompt har bir masalani bir xil 7 qadamli algoritm bilan yechadi, shunda talaba algoritmni yodlab, istalgan masalaga qo'llay oladi.",
    template: `Siz DTM biologiya blokiga tayyorlaydigan genetika o'qituvchisisiz. Masalani quyidagi qat'iy algoritm bilan yeching — qadamlarni o'tkazib yubormang.

Masala:
"""
{{masala_matni}}
"""
Mening javobim (bo'sh bo'lishi mumkin): {{my_answer}}

ALGORITM
1. **Masala turi** — monoduragay, diduragay, chala dominantlik, qon guruhlari (ko'p allellik), jinsga bog'liq irsiylanish, genlar o'zaro ta'siri yoki boshqa. Qaysi qonun qo'llanadi?
2. **Belgilash jadvali** — | Belgi | Gen | Dominant / retsessiv |. Masalada berilmagan bo'lsa, qanday aniqlaganingizni ayting.
3. **Ota-ona genotiplari** — matndagi qaysi ma'lumotdan aniqlandi (masalan, "retsessiv belgili farzand bor → ikkala ota-ona ham geterozigota").
4. **Gametalar** — har bir ota-onaning barcha gameta turlari.
5. **Pennet katagi** — jadval ko'rinishida.
6. **Natija** — genotip nisbati va fenotip nisbati ALOHIDA; so'ralgan ehtimollikni foiz va kasr ko'rinishida.
7. **Tekshirish** — nisbatlar yig'indisi 100% ekanini va javob savolga mosligini tekshiring.

Agar javobim berilgan bo'lsa: **Xato tahlili** — qaysi qadamda adashganimni va to'g'ri fikrlashni ko'rsating.

Oxirida:
- **Yodda tut** — shu turdagi masalalar uchun 3 ta qoida.
- **O'xshash masala** — raqamlari yoki belgilari boshqacha 1 ta yangi masala; javobini eng oxirida "JAVOB" sarlavhasi ostida bering.

Agar masala shartida ma'lumot yetishmasa yoki ikki xil talqin qilinsa, buni ochiq ayting.`,
    variables: [
      {
        key: "masala_matni",
        label: "Masala sharti",
        type: "textarea",
        placeholder:
          "Onasi II qon guruhli (geterozigota), otasi III qon guruhli (geterozigota). Farzandlarda qanday qon guruhlari…",
        helpText: "Test bo'lsa, A–D variantlarni ham yozing.",
      },
      {
        key: "my_answer",
        label: "Mening javobim",
        type: "text",
        placeholder: "Masalan: faqat IV guruh, 50%",
        required: false,
      },
    ],
    exampleInput:
      "Masala: Onasi II qon guruhli (geterozigota), otasi III qon guruhli (geterozigota). Farzandlarda qanday qon guruhlari va qanday ehtimollik bilan uchraydi?\nMening javobim: II va III guruh, 50% dan",
    exampleOutput:
      "**1. Masala turi**\nQon guruhlari — ko'p allellik (Iᴬ, Iᴮ, i) va kodominantlik (Iᴬ va Iᴮ birga bo'lsa, ikkalasi ham namoyon bo'ladi).\n\n**2. Belgilash jadvali**\n| Belgi | Gen | Munosabat |\n|---|---|---|\n| A antigen | Iᴬ | i ga nisbatan dominant |\n| B antigen | Iᴮ | i ga nisbatan dominant |\n| Antigen yo'q | i | retsessiv |\nIᴬ va Iᴮ o'zaro kodominant.\n\n**3. Ota-ona genotiplari**\nOna: II guruh, geterozigota → **Iᴬi**\nOta: III guruh, geterozigota → **Iᴮi**\n\n**4. Gametalar**\nOna: Iᴬ, i · Ota: Iᴮ, i\n\n**5. Pennet katagi**\n| | Iᴮ | i |\n|---|---|---|\n| **Iᴬ** | IᴬIᴮ | Iᴬi |\n| **i** | Iᴮi | ii |\n\n**6. Natija**\n- IᴬIᴮ — IV guruh — 1/4 (25%)\n- Iᴬi — II guruh — 1/4 (25%)\n- Iᴮi — III guruh — 1/4 (25%)\n- ii — I guruh — 1/4 (25%)\nGenotip ham, fenotip ham 1 : 1 : 1 : 1.\n\n**7. Tekshirish:** 25% × 4 = 100% ✅\n\n**Xato tahlili**\nSiz faqat II va III guruhni yozgansiz — ya'ni ota-onaning o'z guruhlarini takrorlagansiz. Xato 4-qadamda: har bir ota-ona **i** genini ham o'tkaza olishini hisobga olmagansiz. Ikkalasidan i kelsa — I guruh, Iᴬ va Iᴮ uchrashsa — IV guruh.\n\n**Yodda tut**\n1. Geterozigota ota-onada har doim 2 xil gameta bor.\n2. Iᴬ va Iᴮ kodominant → IV guruh.\n3. Ikki geterozigota (II × III) barcha 4 guruhni beradi.\n\n**O'xshash masala**\nOnasi IV guruhli, otasi I guruhli. Farzandlarda qaysi guruhlar bo'lishi mumkin?\n…(JAVOB oxirida)",
    testedModels: [],
    tags: ["DTM", "Biologiya", "Genetika", "Masala yechish"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T09:30:00.000Z",
    comments: [],
  },
];
