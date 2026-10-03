import type { Prompt } from "@/lib/types";

const FEEDBACK_LANGUAGES = [
  "O'zbekcha + inglizcha atamalar",
  "O'zbekcha",
  "English",
];

/**
 * Akademik paket: o'zgaruvchilar formasi bilan ishlaydigan, chuqur tahlil
 * beruvchi promptlar. Bu promptlar hali tashqi modellarda rasmiy sinovdan
 * o'tkazilmagani uchun `testedModels` bo'sh — sinovdan so'ng to'ldiring.
 */
export const ACADEMIC_PROMPTS: Prompt[] = [
  // ─────────────────────────────────────────────────────────────────────
  // IELTS Writing Task 2 — Examiner & Error Analyzer
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ielts-writing-task2-error-analyzer",
    title: "IELTS Writing Task 2 — Examiner & Error Analyzer (o'zbek o'quvchilari uchun)",
    category: "IELTS",
    filterGroup: "IELTS Writing",
    subcategory: "Writing Task 2",
    description:
      "4 mezon bo'yicha band score, iqtiboslar bilan xatolar jadvali, o'zbek tilidan o'tgan (L1) xatolar tahlili va maqsad bandgacha aniq yo'l xaritasi.",
    role: "You are a senior IELTS Writing examiner trained on the public Task 2 band descriptors who specialises in Uzbek-speaking learners and their typical L1-transfer errors.",
    task: "Score the essay on all four criteria with quoted evidence, build a prioritised error log that links each error to its cause, and show the exact changes needed to reach the student's target band.",
    context:
      "O'zbek o'quvchilarining ko'p xatolari tasodifiy emas — ular o'zbek tilidan o'tadi: artikl yo'qligi (\"investment to future\"), son so'zdan keyin birlik ot (\"many student\"), \"-ga\" kelishigini doim \"to\" deb tarjima qilish, \"according to my opinion\" kabi kalkalar. Oddiy checker bularni alohida-alohida tuzatadi, lekin naqshni ko'rsatmaydi. Bu prompt xatolarni turlarga ajratadi, eng ko'p takrorlanadigan 3 ta naqshni topadi va maqsad bandgacha qaysi o'zgarish eng ko'p ball berishini tartiblab beradi.",
    template: `You are a senior IELTS Writing examiner (10+ years, trained on the official public Task 2 band descriptors) who specialises in teaching Uzbek-speaking learners. You know the typical L1-transfer errors of Uzbek (and Russian) speakers.

INPUT
Task 2 question:
"""
{{essay_question}}
"""

My essay:
"""
{{essay_text}}
"""

My target band: {{target_score}}
Write all explanations in: {{feedback_language}} (keep IELTS terms such as "Task Response" in English).

RULES
- Be strict and calibrated. Do not inflate scores to encourage me. If I sit between two bands, name both and say what tips it.
- Quote my exact words for every criticism. Never invent text I did not write.
- Do not rewrite my whole essay.
- State once, briefly, that this is an estimate based on the public descriptors, not an official score.

STEP 0 — Pre-check
- Approximate word count. If under 250, flag it: it limits Task Response.
- Are all parts of the question answered? Is my position clear and consistent? Any off-topic or memorised-sounding sentences?

STEP 1 — Band score breakdown (table)
| Criterion | Band | Key evidence (quote) | What stops the next band |
Rows: Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.
Then: Overall = mean of the four, rounded the IELTS way (x.25 rounds up to x.5, x.75 rounds up to the next whole band). Show the calculation.

STEP 2 — Error log (table, the 15 most important errors, highest impact first)
| # | Quote | Error type | Correction | Rule | Uzbek L1 link |
Error types: Article, Subject–verb agreement, Tense, Preposition, Collocation / word choice, Word form, Countable / plural, Sentence structure (run-on, fragment, comma splice), Punctuation, Spelling, Register.
"Uzbek L1 link": one short line if the error comes from Uzbek/Russian transfer (no articles in Uzbek; noun stays singular after numbers and "ko'p"; "-ga" mapped to "to"; literal calques such as "according to my opinion", "make a conclusion"; Uzbek SOV word order). Write "—" if it is not L1-related.

STEP 3 — Repeating patterns
The 3 error patterns that repeat most, with counts. One fix-rule per pattern that I can memorise.

STEP 4 — Gap to target ({{target_score}})
For each criterion below the target: the 1–2 concrete changes that would raise it, ordered by score gain per effort.

STEP 5 — Model paragraph
Rewrite only my weakest body paragraph at band {{target_score}}, keeping my ideas. **Bold** every change and add a 3-bullet "What changed" list.

STEP 6 — Upgrade bank
5 upgrades taken from my own essay: my phrase → better phrase → example sentence on the same topic.

STEP 7 — 7-day micro-plan
3 short daily drills (10–15 minutes) that target my top error patterns.`,
    variables: [
      {
        key: "essay_question",
        label: "Task 2 savoli",
        type: "textarea",
        placeholder:
          "Some people believe that university education should be free for everyone…",
      },
      {
        key: "essay_text",
        label: "Insho matningiz",
        type: "textarea",
        placeholder: "Inshoingizni to'liq shu yerga joylashtiring…",
        helpText: "Kamida 250 so'z. Hech narsani tuzatmasdan, yozganingizdek joylashtiring.",
      },
      {
        key: "target_score",
        label: "Maqsad band",
        type: "select",
        options: ["6.0", "6.5", "7.0", "7.5", "8.0", "8.5"],
        defaultValue: "7.0",
      },
      {
        key: "feedback_language",
        label: "Izoh tili",
        type: "select",
        options: FEEDBACK_LANGUAGES,
        defaultValue: FEEDBACK_LANGUAGES[0],
      },
    ],
    exampleInput:
      "Savol: Some people believe that university education should be free for everyone, while others think students should pay for it. Discuss both views and give your opinion.\n\nInsho (parcha, jami ~270 so'z): \"Nowadays, education is very important for every people. Some people think that university must be free, but others think students should pay. In this essay I will discuss both side and give my opinion. Firstly, if university is free, more young people from regions can study. For example in Uzbekistan many talented student from villages can not pay contract, so they go to work to Russia… In conclusion, according to my opinion, government should pay for education because it is investment to future.\"\n\nMaqsad band: 7.0 · Izoh tili: O'zbekcha + inglizcha atamalar",
    exampleOutput:
      "ℹ️ Bu rasmiy emas — ochiq band descriptorlarga asoslangan taxminiy baho.\n\n**0. Dastlabki tekshiruv**\n- So'z soni: ~270 ✅\n- Ikkala fikr va o'z pozitsiyangiz bor ✅, lekin \"students should pay\" tomoni bitta jumla bilan cheklangan — Task Response uchun asosiy xavf.\n\n**1. Band score breakdown**\n| Criterion | Band | Dalil | Keyingi bandga to'siq |\n|---|---|---|---|\n| Task Response | 6.0 | \"so they go to work to Russia\" — aniq, mahalliy misol ✅ | Qarshi fikr rivojlantirilmagan |\n| Coherence & Cohesion | 6.0 | \"Firstly… For example… In conclusion\" | Linkerlar mexanik, paragraf ichida fikr rivoji sust |\n| Lexical Resource | 6.0 | \"investment to future\" | Collocation xatolari, \"important\" takrori |\n| Grammatical Range & Accuracy | 5.5 | \"every people\", \"both side\" | Son/artikl xatolari ko'p, murakkab gaplar kam |\n\nOverall: (6.0 + 6.0 + 6.0 + 5.5) / 4 = 5.875 → **6.0**\n\n**2. Error log** (birinchi 6 tasi)\n| # | Iqtibos | Turi | To'g'risi | O'zbek L1 bog'liqligi |\n|---|---|---|---|---|\n| 1 | \"every people\" | Countable | every person / all people | \"har bir\" + ot aralashmasi |\n| 2 | \"both side\" | Plural | both sides | O'zbekchada son so'zdan keyin ot birlikda: \"ikki tomon\" |\n| 3 | \"many talented student\" | Plural | many talented students | \"ko'p talaba\" — xuddi shu qoida |\n| 4 | \"can not pay contract\" | Collocation | cannot afford tuition fees | \"kontrakt to'lash\" so'zma-so'z tarjimasi |\n| 5 | \"according to my opinion\" | Collocation | in my opinion | \"fikrimga ko'ra\" kalkasi |\n| 6 | \"investment to future\" | Preposition + Article | an investment in the future | Artikl yo'q + \"-ga\" → \"to\" |\n\n**3. Takrorlanuvchi naqshlar**\n1. Ko'plik/birlik — 3 marta. Qoida: *many / both / two + doim -s.*\n2. Predloglar — 2 marta. Qoida: *\"-ga\" ≠ har doim \"to\": invest IN, go TO a place.*\n3. Artikllar — 2 marta. Qoida: *birlik, sanaladigan ot yolg'iz turmaydi: a/an/the.*\n\n**4. 7.0 gacha masofa**\n- GRA 5.5 → 7.0: yuqoridagi 3 naqshni tuzatish + har paragrafda 1 ta \"although / which\" li murakkab gap.\n- TR 6.0 → 7.0: \"students should pay\" tomoniga to'liq paragraf (sabab + misol + natija).\n\n**5. Model paragraph (Band 7.0)**\n\"Firstly, **free tuition would widen access to higher education for talented students from rural areas**. In Uzbekistan, **many capable school leavers cannot afford tuition fees** and **migrate abroad for low-paid work instead**, **which means** the country loses **potential engineers and doctors**.\"\n\n…(Upgrade bank va 7 kunlik reja davom etadi)",
    testedModels: [],
    tags: ["Writing Task 2", "Band score", "Xatolar tahlili", "L1 xatolar"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T08:00:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Digital SAT — Reading & Writing passage logic
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "sat-rw-passage-logic-deconstructor",
    title: "Digital SAT Reading & Writing — Passage Logic Deconstructor",
    category: "SAT",
    filterGroup: "SAT Reading",
    subcategory: "Reading & Writing",
    description:
      "Qisqa Digital SAT passage'ini jumlama-jumla mantiqiy skeletga ajratadi, javobni oldindan bashorat qildiradi, har bir variantdagi tuzoq turini ko'rsatadi va yangi mashq savolini tuzadi.",
    role: "You are a Digital SAT Reading & Writing coach who teaches through passage logic and prediction, not guessing.",
    task: "Classify the question, map the role of each sentence in the passage, predict the answer before looking at the choices, audit every choice with a named trap type, then give a reusable rule, a speed tactic and one new practice question.",
    context:
      "Digital SAT'da passage'lar qisqa (25–150 so'z), har biriga bitta savol beriladi va har savolga o'rtacha ~71 soniya to'g'ri keladi. O'quvchilar ko'pincha variantlarni birma-bir o'qib \"to'g'riga o'xshaganini\" tanlaydi va tuzoqqa tushadi. Bu prompt avval passage'ning mantiqiy skeletini (claim, evidence, pivot) chizdiradi, javobni variantlarga qaramasdan bashorat qildiradi, keyin har bir noto'g'ri variant qaysi tuzoq turiga kirishini ko'rsatadi — shu bilan o'quvchi bitta savolni emas, butun savol turini o'rganadi.",
    template: `You are a Digital SAT Reading & Writing coach who teaches through logic and prediction, not guessing. Digital SAT R&W uses short passages (25–150 words) with one question each, across four domains: Information and Ideas, Craft and Structure, Expression of Ideas, Standard English Conventions.

INPUT
Passage:
"""
{{passage_text}}
"""

Question and answer choices:
"""
{{question_text}}
"""

Question type (my guess): {{question_type}}
Explain in: {{explanation_language}} (keep official SAT terms in English).

Do NOT reveal the answer until step 5. Work in this order:

1. CLASSIFY — Domain + exact question type (Words in Context, Text Structure and Purpose, Cross-Text Connections, Central Ideas and Details, Command of Evidence — Textual, Command of Evidence — Quantitative, Inferences, Boundaries, Form, Structure, and Sense, Transitions, Rhetorical Synthesis). If my guess is wrong, correct it and say why.

2. PASSAGE SKELETON — One line per sentence: S1 = [role: background / claim / evidence / counterpoint / concession / conclusion] + a paraphrase of at most 8 words. Then state the main claim in 15 words or fewer. Mark every pivot word (however, yet, thus, although…) and what it does to the logic.

3. PREDICT — Before looking at the choices, say in your own words what the correct answer must say or do.

4. CHOICE AUDIT — Table:
| Choice | Verdict | Exact reason (quote the passage) | Trap type |
Trap types: Too extreme, Out of scope, Half-right, Opposite, True but irrelevant, Wrong part of passage, Grammatical but illogical.

5. ANSWER — The correct letter + one sentence of proof quoted from the passage.

6. TRANSFERABLE RULE — One rule (max 2 sentences) I can reuse for every question of this type.

7. SPEED TACTIC — How to solve this type in under 70 seconds: what to read first, what to skip.

8. PRACTICE — Write ONE new, original question of the same type: a new passage of about 80 words, 4 choices (A–D). Put the answer and a short explanation at the very end under the heading "ANSWER KEY" so I can try it first.

RULES
- Judge every choice using the passage only, not outside knowledge.
- If the question seems ambiguous or two choices look defensible, say so honestly instead of forcing certainty.`,
    variables: [
      {
        key: "passage_text",
        label: "Passage matni",
        type: "textarea",
        placeholder: "Passage'ni (25–150 so'z) shu yerga joylashtiring…",
        helpText: "Cross-Text savol bo'lsa, Text 1 va Text 2 ni ham shu yerga yozing.",
      },
      {
        key: "question_text",
        label: "Savol va A–D variantlar",
        type: "textarea",
        placeholder: "Which choice most logically completes the text?\nA) …\nB) …",
      },
      {
        key: "question_type",
        label: "Savol turi",
        type: "select",
        options: [
          "Bilmayman — aniqlab ber",
          "Words in Context",
          "Text Structure and Purpose",
          "Cross-Text Connections",
          "Central Ideas and Details",
          "Command of Evidence — Textual",
          "Command of Evidence — Quantitative",
          "Inferences",
          "Boundaries",
          "Form, Structure, and Sense",
          "Transitions",
          "Rhetorical Synthesis",
        ],
        defaultValue: "Bilmayman — aniqlab ber",
      },
      {
        key: "explanation_language",
        label: "Tushuntirish tili",
        type: "select",
        options: FEEDBACK_LANGUAGES,
        defaultValue: FEEDBACK_LANGUAGES[0],
      },
    ],
    exampleInput:
      "Passage: \"For decades, ecologists assumed that the saiga antelope's dramatic population crashes on the Central Asian steppe were caused mainly by hunting. In 2015, however, roughly 200,000 saigas died within three weeks in Kazakhstan, far too quickly for hunting to explain. Researchers later linked the die-off to a bacterium, Pasteurella multocida, that normally lives harmlessly in the animals but became lethal during an unusually hot and humid period. This finding suggests that ______\"\n\nWhich choice most logically completes the text?\nA) hunting has never significantly affected saiga populations.\nB) climate conditions can turn an otherwise harmless microbe into a serious threat to saigas.\nC) Pasteurella multocida is found only in saiga antelopes.\nD) saiga populations always recover fully within a few years of a die-off.\n\nSavol turi: Bilmayman — aniqlab ber",
    exampleOutput:
      "**1. CLASSIFY**\nDomain: Information and Ideas → **Inferences** (\"most logically completes the text\").\n\n**2. PASSAGE SKELETON**\n- S1 = *background / old view*: olimlar ovchilikni asosiy sabab deb hisoblagan.\n- S2 = *counterpoint*: 3 haftada 200 ming — ovchilik bilan tushuntirib bo'lmaydi.\n- S3 = *evidence*: zararsiz bakteriya issiq-nam havoda halokatli bo'lgan.\n- S4 = *conclusion (bo'sh joy)*: S3 dan kelib chiqadigan xulosa.\nAsosiy g'oya: **Iqlim sharoiti oddiy bakteriyani saygalar uchun halokatli qildi.**\nPivot: **\"however\"** — eski qarashdan yangi dalilga burilish.\n\n**3. PREDICT**\nJavob S3 ni umumlashtirishi kerak: *ob-havo/iqlim + odatda zararsiz mikrob → xavf.*\n\n**4. CHOICE AUDIT**\n| Choice | Verdict | Sabab | Trap type |\n|---|---|---|---|\n| A | ❌ | Passage faqat 2015 holatini ovchilik tushuntirmasligini aytadi, \"never\" emas | Too extreme |\n| B | ✅ | \"normally lives harmlessly… became lethal during an unusually hot and humid period\" | — |\n| C | ❌ | Bakteriya boshqa hayvonlarda bormi — passage aytmaydi | Out of scope |\n| D | ❌ | Tiklanish haqida umuman gap yo'q | Out of scope |\n\n**5. ANSWER — B.** Isbot: \"…lives harmlessly in the animals but became lethal during an unusually hot and humid period.\"\n\n**6. TRANSFERABLE RULE**\nInference savolida javob oxirgi dalil jumlasidan *bir qadam* nariga boradi, lekin \"never / always / only\" kabi passage'da yo'q mutlaq so'zlar bilan emas.\n\n**7. SPEED TACTIC**\nBo'sh joydan oldingi 1–2 jumlani o'qing → javobni o'zingiz ayting → mutlaq so'zli va yangi mavzuli variantlarni darhol o'chiring.\n\n**8. PRACTICE**\n…(yangi passage, A–D variantlar va oxirida ANSWER KEY)",
    testedModels: [],
    tags: ["Digital SAT", "Reading & Writing", "Passage logic", "Tuzoq variantlar"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T08:10:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Mumtoz adabiyot — Navoiy, Bobur va boshqalar
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "uz-mumtoz-sheriyat-tahlili",
    title: "Mumtoz She'riyat Tahlili — Navoiy, Bobur va boshqalar (zamonaviy talqin bilan)",
    category: "Ona tili va Adabiyot",
    filterGroup: "Ona tili / Adabiyot",
    subcategory: "Mumtoz adabiyot",
    description:
      "Eski o'zbek tilidagi bayt, ruboiy yoki g'azalni lug'at, nasriy bayon, badiiy san'atlar, aruz vazni va bugungi hayotga bog'langan zamonaviy talqin bilan tahlil qiladi.",
    role: "Siz o'zbek mumtoz adabiyoti bo'yicha mutaxassis — aruz va mumtoz poetikani chuqur biladigan, murakkab matnni bugungi o'quvchiga sodda tilda tushuntira oladigan tajribali o'qituvchisiz.",
    task: "Berilgan mumtoz matnni so'zma-so'z lug'at, nasriy bayon, zohiriy va botiniy ma'no, badiiy san'atlar, vazn, tarixiy kontekst va zamonaviy talqin orqali tahlil qiling hamda tanlangan maqsadga (DTM, insho, dars) mos qo'shimcha material tayyorlang.",
    context:
      "Navoiy yoki Bobur matnini o'qiganda o'quvchining birinchi to'sig'i — til: \"ersang\", \"demagil\", \"onikim\" kabi so'zlar. Ikkinchi to'siq — ramzlar: \"may\", \"soqiy\", \"yor\" so'zlarining tasavvufiy ma'nosini bilmasdan baytni noto'g'ri tushunish oson. Umumiy AI chatlar esa ko'pincha mavjud bo'lmagan misralarni yoki noto'g'ri asar nomlarini \"o'ylab topadi\". Bu prompt modelni faqat berilgan matn bilan ishlashga, ishonchsiz faktlarni belgilashga majbur qiladi va tahlilni lug'atdan boshlab zamonaviy hayotgacha bosqichma-bosqich olib boradi.",
    template: `Siz o'zbek mumtoz adabiyoti bo'yicha mutaxassis va tajribali o'qituvchisiz. Alisher Navoiy, Zahiriddin Muhammad Bobur, Lutfiy, Atoyi, Mashrab, Ogahiy, Uvaysiy, Nodira, Furqat ijodini, aruz tizimini va mumtoz poetika (badiiy san'atlar) ilmini chuqur bilasiz. Murakkab eski o'zbek tilidagi matnni bugungi o'quvchiga sodda va zamonaviy tilda tushuntira olasiz.

KIRISH MA'LUMOTLARI
- Shoir: {{shoir}}
- Matn (bayt, ruboiy, g'azal yoki parcha):
"""
{{asar_matni}}
"""
- Tahlil maqsadi: {{tahlil_maqsadi}}
- O'quvchi darajasi: {{sinf_darajasi}}

QAT'IY QOIDALAR
- Faqat men bergan matnni tahlil qiling. Matnda yo'q misralarni o'ylab topmang va iqtibos keltirmang.
- Asar nomi, devon yoki doston nomi, yozilgan yili kabi faktlarni faqat ishonchingiz komil bo'lsa ayting; aks holda "(aniqlashtirish kerak)" deb belgilang.
- Aruz vaznini aniq aytish qiyin bo'lsa, "taxminiy" deb yozing va taqti'ni (bo'g'inlarga ajratishni) ko'rsating.
- Matnda imlo yoki ko'chirish xatosi bo'lishi mumkin bo'lsa, alohida qayd eting, lekin jimgina tuzatib yubormang.

TAHLIL TUZILMASI
1. **Matn haqida qisqacha** — janri (g'azal, ruboiy, tuyuq, fard, doston parchasi…), qofiya va radif (bo'lsa), mavzusi bir jumlada.
2. **Lug'at** — jadval: | So'z | Kelib chiqishi (turkiy / arabcha / forscha) | Ma'nosi | Bugungi sinonimi |. Barcha eskirgan va qiyin so'zlar.
3. **Nasriy bayon (tabdil)** — har bir misrani bugungi o'zbek adabiy tilida, so'zma-so'z emas, ma'no bo'yicha qayta ayting.
4. **Ma'no qatlamlari** — zohiriy (tashqi) va botiniy (ichki: tasavvufiy, falsafiy, axloqiy) ma'no. Tasavvufiy ramzlar (may, soqiy, yor, vasl, hijron, oshiq…) bo'lsa, ularning mumtoz adabiyotdagi ramziy ma'nosini tushuntiring.
5. **Badiiy san'atlar** — har bir san'at uchun: nomi, matndan aniq iqtibos va u qanday ta'sir yaratishi (tashbeh, istiora, tashxis, mubolag'a, tazod, tanosub, tajnis, ishtiqoq, iyhom, talmeh, takrir, husni ta'lil…). Faqat matnda haqiqatda bor san'atlarni ko'rsating.
6. **Vazn** — aruz bahri va taqti'.
7. **Tarixiy va biografik kontekst** — shoir hayoti yoki davridan aynan shu matnni tushunishga yordam beradigan 2–3 ta fakt.
8. **Zamonaviy talqin** — bu g'oya bugungi o'zbek yoshining hayotida qanday ko'rinadi: maktab, oila, ijtimoiy tarmoqlar, kasb tanlash, do'stlik. 2–3 ta aniq misol, matn g'oyasini buzmasdan.
9. **Maqsadga mos qism** ({{tahlil_maqsadi}}):
   - "DTM / test tayyorgarligi" bo'lsa: A–D variantli 5 ta test savoli; javoblar va qisqa izoh eng oxirida.
   - "Insho yoki referat" bo'lsa: tezis jumla + 3 bandli reja + inshoga tayyor 2 ta xulosa jumlasi.
   - "Dars / taqdimot" bo'lsa: 5 daqiqalik og'zaki taqdimot rejasi va sinf uchun 3 ta munozara savoli.
   - "Shaxsiy qiziqish" bo'lsa: shu shoirning o'xshash mavzudagi, aniq mavjud bo'lgan 2–3 asari.
10. **Yodda tut** — yodlash uchun 3 bandli qisqa xulosa.

Javobni "{{sinf_darajasi}}" darajasidagi o'quvchi tushunadigan tilda yozing; har bir ilmiy atamani birinchi marta ishlatganda qavs ichida sodda izohlang.`,
    variables: [
      {
        key: "shoir",
        label: "Shoir",
        type: "text",
        placeholder: "Alisher Navoiy",
      },
      {
        key: "asar_matni",
        label: "Matn (bayt, ruboiy, g'azal)",
        type: "textarea",
        placeholder: "Odamiy ersang, demagil odami,\nOnikim yo'q xalq g'amidin g'ami.",
        helpText: "Har bir misrani alohida qatorga yozing. Asar nomini bilsangiz, matndan keyin qavs ichida qo'shing.",
      },
      {
        key: "tahlil_maqsadi",
        label: "Tahlil maqsadi",
        type: "select",
        options: [
          "DTM / test tayyorgarligi",
          "Insho yoki referat",
          "Dars / taqdimot",
          "Shaxsiy qiziqish",
        ],
        defaultValue: "DTM / test tayyorgarligi",
      },
      {
        key: "sinf_darajasi",
        label: "O'quvchi darajasi",
        type: "select",
        options: [
          "7–9-sinf",
          "10–11-sinf / litsey",
          "Abituriyent",
          "Talaba (filologiya)",
        ],
        defaultValue: "Abituriyent",
      },
    ],
    exampleInput:
      "Shoir: Alisher Navoiy\nMatn:\nOdamiy ersang, demagil odami,\nOnikim yo'q xalq g'amidin g'ami.\nTahlil maqsadi: DTM / test tayyorgarligi · Daraja: Abituriyent",
    exampleOutput:
      "**1. Matn haqida qisqacha**\nJanr: masnaviy usulidagi bayt (ikki misra o'zaro qofiyalangan: odami – g'ami). Mavzu: haqiqiy insonlik — xalq dardiga befarq bo'lmaslik. Bayt odatda \"Hayrat ul-abror\" dostoniga nisbat beriladi (darslik bilan aniqlashtiring).\n\n**2. Lug'at**\n| So'z | Kelib chiqishi | Ma'nosi | Bugungi sinonimi |\n|---|---|---|---|\n| odamiy | arabcha (odam + -iy) | insoniylik fazilatiga ega | chin inson, insonparvar |\n| ersang | turkiy (er- fe'li) | bo'lsang | bo'lsang |\n| demagil | turkiy (de- + -ma + -gil) | dema (buyruq) | aytma, hisoblama |\n| onikim | turkiy (ani + kim) | shunday kishiki | u odamki |\n| g'am | arabcha | qayg'u, dard | tashvish |\n| -din | turkiy qo'shimcha | -dan | -dan |\n\n**3. Nasriy bayon**\n\"Agar o'zing chinakam inson bo'lsang, xalqning qayg'usidan qayg'urmaydigan kishini inson deb atama.\"\n\n**4. Ma'no qatlamlari**\n- *Zohiriy:* befarq odam inson nomiga loyiq emas.\n- *Botiniy:* insonlik — biologik emas, axloqiy maqom; u boshqalarning dardini o'z dardi deb bilish bilan qo'lga kiritiladi.\n\n**5. Badiiy san'atlar**\n- *Ishtiqoq* — bir o'zakdan yasalgan so'zlar: \"odamiy – odami\", \"g'amidin – g'ami\". Fikrni so'z o'yini bilan yodda qoladigan qiladi.\n- *Takrir* — \"odam\" va \"g'am\" o'zaklarining takrori asosiy tushunchalarni urg'ulaydi.\n\n**6. Vazn** (taxminiy)\nBirinchi misra taqti'i: O-da-mi-yer | sang-de-ma-gil | o-da-mi → – ∪ ∪ – | – ∪ ∪ – | – ∪ – (sari' bahri). Ikkinchi misrani ustoz bilan tekshiring.\n\n**8. Zamonaviy talqin**\n- Ijtimoiy tarmoqda birovning muammosini \"layk\" bilan o'tkazib yuborish emas, real yordam berish.\n- Volontyorlik, mahalladagi keksalarga yordam — Navoiy ta'rifidagi \"odamiy\"lik.\n\n**9. DTM uchun test** (1-savol)\n\"Odamiy ersang, demagil odami\" misrasida qaysi san'at bor?\nA) tazod B) ishtiqoq C) talmeh D) iyhom\n…(yana 4 ta savol va javoblar oxirida)\n\n**10. Yodda tut**\n1. Insonlik — xalq dardiga sherik bo'lish.\n2. Asosiy san'at — ishtiqoq.\n3. Kalit so'zlar: ersang = bo'lsang, demagil = dema.",
    testedModels: [],
    tags: ["Mumtoz adabiyot", "Navoiy", "Bobur", "Aruz", "Badiiy san'atlar"],
    upvotes: 0,
    copyCount: 0,
    author: "PromptXona jamoasi",
    createdAt: "2026-10-03T08:20:00.000Z",
    comments: [],
  },
];
