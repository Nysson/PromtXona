import type { Prompt } from "@/lib/types";

/**
 * PromptXona seed data.
 * 13 hand-written, production-quality prompts covering IELTS, SAT and
 * Ona tili va Adabiyot (Uzbek native language & literature) preparation.
 */
export const PROMPTS: Prompt[] = [
  // ─────────────────────────────────────────────────────────────────────
  // IELTS (5)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "ielts-writing-task1-report-analyzer",
    title: "IELTS Writing Task 1 — Academic Report Analyzer",
    category: "IELTS",
    filterGroup: "IELTS Writing",
    subcategory: "Writing Task 1",
    description:
      "Grafik, jadval yoki diagrammani band 7+ darajasidagi Task 1 hisobotiga aylantiradi va tuzilmani tushuntiradi.",
    role: "You are a certified IELTS Academic Writing examiner with 12 years of experience marking Task 1 reports for band scores 6.5–9.0.",
    task: "Turn a raw description of a graph, chart, table, process diagram or map into a fully structured, band 7+ IELTS Writing Task 1 report of 150–190 words, then explain the structural choices you made.",
    context:
      "IELTS talabalari ko'pincha ma'lumotni tasvirlashni biladi, lekin uni akademik uslubda tashkil qila olmaydi: overview yozmaydi, noto'g'ri tense ishlatadi yoki faktlarni tasodifiy tartibda sanaydi. Bu prompt ma'lumotni to'g'ri overview + body paragraph tuzilmasiga soladi va har bir jumlaning nega shu yerda turganini tushuntiradi, shunda talaba naqshni o'rganib, keyingi safar mustaqil yoza oladi.",
    template: `You are a certified IELTS Academic Writing examiner. I will describe a chart/graph/table/process/map in plain language. Your job:

1. Write a complete IELTS Writing Task 1 report (150–190 words) based on my description.
2. Structure it as: (a) one-sentence paraphrase of the task, (b) a 2-sentence overview of the 2-3 biggest trends/features, (c) 2 body paragraphs comparing specific data with accurate figures.
3. Use a wide range of data-description language (rose sharply, fluctuated, plateaued, a significant minority, etc.) and correct tenses for the data given.
4. After the report, add a short "Why this works" section (bullet points) explaining the structural and grammar choices, so I can learn the pattern.
5. Do NOT give opinions or reasons for the data — Task 1 is descriptive only.

Here is my chart description:
"""
{{Paste your chart/graph/table/process/map description here}}
"""`,
    exampleInput:
      "Line graph showing the number of tourists (in millions) visiting Uzbekistan from 2015 to 2024. Numbers rose from 2 million in 2015 to 6.7 million in 2019, dropped sharply to 0.5 million in 2021, then recovered to 8.3 million by 2024.",
    exampleOutput:
      "The line graph illustrates the number of international tourists visiting Uzbekistan between 2015 and 2024, measured in millions.\n\nOverall, tourist numbers rose substantially over the period, with a temporary but severe interruption around 2021, likely linked to travel restrictions. By the end of the period, arrivals had reached a new peak, surpassing pre-disruption levels.\n\nIn 2015, roughly 2 million tourists visited the country, and this figure climbed steadily each year to reach 6.7 million by 2019, an increase of more than three times in just four years. This upward trend, however, was dramatically reversed in 2021, when arrivals plummeted to a mere 0.5 million — the lowest point on the graph.\n\nFollowing this sharp dip, the number of tourists rebounded strongly, climbing back above pre-2021 levels within a few years. By 2024, arrivals had reached an all-time high of 8.3 million, roughly 24% higher than the 2019 peak, indicating a robust recovery in Uzbekistan's tourism sector.\n\nWhy this works:\n- Opens with a paraphrase, not a copy of the prompt.\n- Overview covers the two biggest features (long-term growth + the 2021 anomaly) without listing every number.\n- Body paragraphs group data logically (pre-dip vs. post-dip) rather than just going year by year.\n- Uses varied language: \"climbed steadily\", \"plummeted\", \"rebounded strongly\" instead of repeating \"increased/decreased\".",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Writing Task 1", "Band 7+", "Graphs", "Academic"],
    upvotes: 412,
    copyCount: 1830,
    author: "Dilnoza Karimova",
    createdAt: "2025-11-03T09:15:00.000Z",
    comments: [
      {
        id: "c-wt1-1",
        author: "Sardor A.",
        content:
          "Bu prompt bilan overview yozishni nihoyat o'rgandim, rahmat! Task 1 dan 6.5 emas 7.5 oldim.",
        createdAt: "2025-11-10T14:22:00.000Z",
      },
      {
        id: "c-wt1-2",
        author: "Malika Yusupova",
        content:
          "Process diagram uchun ham juda yaxshi ishladi, faqat tense'larni to'g'irlab berdi.",
        createdAt: "2026-01-05T08:40:00.000Z",
      },
    ],
  },
  {
    id: "ielts-writing-task2-examiner",
    title: "IELTS Writing Task 2 Examiner — Band Score & Feedback",
    category: "IELTS",
    filterGroup: "IELTS Writing",
    subcategory: "Writing Task 2",
    description:
      "Insho matningizni rasmiy IELTS band descriptorlariga ko'ra baholaydi va har bir mezon bo'yicha aniq tuzatish beradi.",
    role: "You are a senior IELTS examiner trained on the official Task 2 Band Descriptors (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy).",
    task: "Assess a student's IELTS Writing Task 2 essay, assign an estimated band score for each of the four marking criteria plus an overall band, and provide specific, quoted corrections.",
    context:
      "Ko'pchilik online IELTS 'checker'lar faqat umumiy 'yaxshi insho' deb qo'ya qoladi. Bu prompt rasmiy 4 ta mezon (Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy) bo'yicha alohida baho beradi, insho ichidan aniq jumlalarni iqtibos qilib ko'rsatadi va qanday qilib bir band ko'tarish mumkinligini aytadi — xuddi haqiqiy examiner kabi.",
    template: `Act as a strict but fair IELTS examiner. I will give you an essay question and my full essay. Evaluate it using the official IELTS Writing Task 2 band descriptors.

Return your response in this exact structure:
1. **Task Response** — band (X.X) + 2-3 sentence justification.
2. **Coherence & Cohesion** — band (X.X) + comment on paragraphing/linking words.
3. **Lexical Resource** — band (X.X) + comment on vocabulary range and precision.
4. **Grammatical Range & Accuracy** — band (X.X) + comment on sentence variety and errors.
5. **Overall Band Score** (average, rounded to nearest 0.5).
6. **Top 5 Corrections** — quote the exact original sentence, then show the corrected/upgraded version, with a one-line reason for each.
7. **One rewritten paragraph** — take my weakest paragraph and rewrite it at band 8 level, so I can compare directly.

Be honest — do not inflate the score. Essay question:
"""
{{Paste the essay question here}}
"""

My essay:
"""
{{Paste your full essay here}}
"""`,
    exampleInput:
      "Question: Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?\n\nEssay: In many countries young people don't want to help other people. Some people think school must force students to do free work in community. I agree with this idea because it have many benefits for students and society.\n\nFirstly, when students do community service they learn how to work with other people. For example if a student help in a hospital, he will understand how doctors and nurses work hard every day. This experience can make student more responsible and hardworking in future life.\n\nSecondly, community service also good for society because there is many old people or poor people who need help but government cannot help everyone. If schools organize this, students can clean parks, teach small kids or help in orphanage, and society become better.\n\nHowever, some people say students already have very busy schedule with exams and homework, so adding community service is not good idea. But I think school can organize it during holidays or weekends so it will not effect study.\n\nIn conclusion, I believe compulsory community service in high school is a good idea because it help students grow and also help society, so government should make this policy in every school.",
    exampleOutput:
      "1. **Task Response — Band 6.0**\nThe essay addresses the question and takes a clear position (agree), with two relevant supporting ideas (personal growth, benefit to society) and one counter-argument. However, ideas remain somewhat general and under-developed — the hospital example is not fully extended with specific consequences.\n\n2. **Coherence & Cohesion — Band 6.0**\nParagraphing is logical (intro, 2 body paragraphs, counter-argument, conclusion), and basic linkers are used (\"Firstly\", \"Secondly\", \"However\", \"In conclusion\"). Cohesion is mechanical rather than fluid — try substituting some linkers with reference words (\"This experience...\", \"Such a policy...\").\n\n3. **Lexical Resource — Band 5.5**\nVocabulary is adequate but repetitive (\"good\", \"help\" used many times) and includes several word-form errors (\"it have\", \"is not effect\"). Wider paraphrasing of the question is needed in the introduction.\n\n4. **Grammatical Range & Accuracy — Band 5.5**\nSentence structures are mostly simple/compound; several agreement errors (\"it have many benefits\", \"become better\", \"student more responsible\"). Complex sentences are attempted but contain errors.\n\n5. **Overall Band Score: 5.5**\n\n6. **Top 5 Corrections**\n- \"it have many benefits\" → \"it has many benefits\" (subject-verb agreement).\n- \"there is many old people\" → \"there are many elderly people\" (agreement + more formal vocabulary).\n- \"it will not effect study\" → \"it will not affect their studies\" (affect vs. effect + article).\n- \"school must force students to do free work\" → \"schools should require students to undertake unpaid work\" (more academic register).\n- \"I agree with this idea because it have many benefits\" → \"I firmly agree with this view, as compulsory service offers substantial benefits\" (adds hedging/stance language expected at higher bands).\n\n7. **Band 8 Rewrite of Paragraph 2:**\n\"One of the clearest advantages of mandatory community service is the interpersonal and professional skills it fosters. A student volunteering in a hospital, for instance, gains first-hand insight into the dedication required of healthcare workers, which can cultivate a stronger sense of responsibility and work ethic that carries into adulthood.\"",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Writing Task 2", "Band Descriptors", "Essay Feedback", "Grammar"],
    upvotes: 587,
    copyCount: 2410,
    author: "Aziz Rahimov",
    createdAt: "2025-09-22T11:00:00.000Z",
    comments: [
      {
        id: "c-wt2-1",
        author: "Nodira",
        content:
          "Bu eng foydali prompt! Har bir mezon bo'yicha alohida baho berishi juda real examiner kabi.",
        createdAt: "2025-10-01T19:12:00.000Z",
      },
      {
        id: "c-wt2-2",
        author: "Jasur T.",
        content: "Band 8 rewrite qismi ayniqsa yordam berdi, farqni ko'rish oson bo'ldi.",
        createdAt: "2025-12-14T07:55:00.000Z",
      },
      {
        id: "c-wt2-3",
        author: "Kamola",
        content: "Claude'da ham sinab ko'rdim, natija deyarli bir xil chiqdi.",
        createdAt: "2026-02-18T16:30:00.000Z",
      },
    ],
  },
  {
    id: "ielts-speaking-part2-partner",
    title: "IELTS Speaking Part 2 — Cue Card Practice Partner",
    category: "IELTS",
    filterGroup: "IELTS Speaking",
    subcategory: "Speaking Part 2",
    description:
      "AI'ni jonli speaking hamkoringizga aylantiradi: cue card beradi, 1 daqiqa tayyorlanish beradi va Part 3 savollari bilan davom ettiradi.",
    role: "You are a friendly, encouraging IELTS Speaking partner and examiner who role-plays the full Part 2 and Part 3 speaking test experience.",
    task: "Simulate a realistic IELTS Speaking Part 2 long turn (cue card) followed by 3 related Part 3 discussion questions, then give feedback on fluency, coherence, vocabulary and pronunciation cues based on the student's written response.",
    context:
      "Ko'p talabalar speaking mashq qilish uchun sherik topa olmaydi. Bu prompt AI'ni to'liq imtihon formatiga o'xshatib ishlaydi: avval cue card beradi, talabaga 1 daqiqa fikrlash vaqtini 'beradi' (matn orqali), keyin talaba javobini yozib yuborgach, uni tinglagandek fikr-mulohaza va tabiiy Part 3 savollarini davom ettiradi.",
    template: `You are my IELTS Speaking practice partner. Simulate a real Speaking test:

Step 1: Give me one realistic IELTS Part 2 cue card on the topic of {{topic, e.g. "a memorable trip"}}, formatted exactly like the real test (Describe a... / You should say: .../ and explain...).

Step 2: Tell me to take 1 minute to prepare and then speak/write for 1-2 minutes.

Step 3: After I reply with my answer (I will type what I would say), evaluate it like an examiner:
- Fluency & Coherence: is it well organized, natural-sounding, with good linking?
- Lexical Resource: any repeated words? Suggest 3 upgraded words/phrases.
- Grammatical Range: point out 1-2 grammar issues and how to fix them.
- Give an estimated band (6.0-9.0) for this response alone.

Step 4: Then ask me 3 natural Part 3 follow-up discussion questions related to the same topic, one at a time, waiting for my answer style — but for now, list all 3 so I can prepare.

Start with Step 1 and Step 2 now.`,
    exampleInput:
      "topic: a piece of technology that has changed your life\n\n(My spoken answer): I want to talk about my smartphone. I got my first smartphone when I was 15 years old, it was a birthday gift from my parents. I use it every day for study, for example I watch English lessons on YouTube and I use apps like Duolingo. I also use it to talk with my friends and family who live far away. I think this technology changed my life because before I didn't have easy access to information, but now I can learn anything anytime. Also it help me prepare for IELTS exam because I listen to podcast every day in bus.",
    exampleOutput:
      "**Cue Card:**\nDescribe a piece of technology that has changed your life.\nYou should say:\n- what it is\n- when you started using it\n- how often you use it\nand explain how it has changed your life.\n\nYou have 1 minute to prepare. Then speak for 1-2 minutes.\n\n---\n**Feedback on your answer:**\n\n**Fluency & Coherence — Band 6.5:** Good natural flow and the answer covers all bullet points. Add more linking phrases like \"What's more\" or \"On top of that\" instead of repeating \"Also\" twice.\n\n**Lexical Resource — Band 6.0:** \"help me prepare\" is a bit basic — try \"has been instrumental in helping me prepare\". Replace \"talk with\" → \"stay in touch with\". Replace \"changed my life\" (used twice) with \"transformed the way I learn\" the second time.\n\n**Grammatical Range — Band 6.0:** \"it help me\" → \"it helps me\" (subject-verb agreement, third person -s). \"I listen to podcast\" → \"I listen to podcasts\" (plural noun needed).\n\n**Estimated Band for this response: 6.5**\n\n---\n**Part 3 Discussion Questions (same topic):**\n1. How has technology changed the way young people in your country communicate?\n2. Do you think older people find it harder to adapt to new technology? Why?\n3. What technology do you think will be common in 20 years that isn't common today?",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Speaking Part 2", "Cue Card", "Roleplay", "Fluency"],
    upvotes: 356,
    copyCount: 1590,
    author: "Shahnoza Islomova",
    createdAt: "2025-12-01T13:45:00.000Z",
    comments: [
      {
        id: "c-sp2-1",
        author: "Otabek",
        content:
          "Har kuni shu prompt bilan 10 daqiqa mashq qilaman, fluency sezilarli yaxshilandi.",
        createdAt: "2026-01-20T10:05:00.000Z",
      },
    ],
  },
  {
    id: "ielts-vocabulary-enhancer",
    title: "IELTS Vocabulary Enhancer — Upgrade Any Sentence",
    category: "IELTS",
    filterGroup: "IELTS Writing",
    subcategory: "Vocabulary",
    description:
      "Oddiy so'zlar bilan yozilgan gapni band 7-9 darajasidagi lug'at boyligi bilan qayta yozadi, sinonimlar va kolokatsiyalarni tushuntiradi.",
    role: "You are an IELTS vocabulary coach specializing in academic collocations and topic-specific lexis for bands 7-9.",
    task: "Take a student's simple sentence or paragraph and rewrite it 3 times at increasing sophistication levels (Band 6, Band 7.5, Band 9), while explaining every upgraded word/collocation used.",
    context:
      "Talabalar ko'pincha 'good', 'bad', 'important', 'many' kabi so'zlarni ortiqcha ishlatadi va bu Lexical Resource bahosini pasaytiradi. Bu prompt bosqichma-bosqich — oddiy darajadan eng yuqori darajagacha — qayta yozib beradi, shunda talaba nafaqat tayyor javob oladi, balki qaysi so'z nima uchun almashtirilganini ham tushunadi va uni boshqa insholarda qayta ishlata oladi.",
    template: `You are my IELTS vocabulary coach. I will give you one simple sentence or short paragraph.

For my text, do the following:
1. Identify every "low-level" word (e.g. good, bad, big, important, many, things, get) and list them.
2. Rewrite the sentence/paragraph at 3 levels:
   - **Band 6 version** (small improvement, still simple)
   - **Band 7.5 version** (natural academic vocabulary, some collocations)
   - **Band 9 version** (precise, sophisticated, idiomatic — but still natural, not overdone)
3. For each Band 9 upgrade, explain in one line WHY that word/collocation works better (meaning, register, or collocation strength) — not just "it sounds better".
4. Give me 3 extra synonyms/collocations for the main topic word in my sentence, that I can reuse in future essays.

My sentence/paragraph:
"""
{{Paste your sentence or paragraph here}}
"""`,
    exampleInput:
      "Many young people spend a lot of time on social media, and this is a big problem because it can be bad for their mental health.",
    exampleOutput:
      "**Low-level words identified:** many, a lot of, big, bad\n\n**Band 6 version:**\nA large number of young people spend a lot of time on social media, and this is a serious problem because it can negatively affect their mental health.\n\n**Band 7.5 version:**\nA significant proportion of young people devote considerable time to social media platforms, which raises concerns as it can have a detrimental impact on their psychological well-being.\n\n**Band 9 version:**\nAn overwhelming majority of adolescents dedicate a disproportionate amount of their day to social media platforms, a trend that has become a pressing concern given its well-documented capacity to undermine mental well-being.\n\n**Why each upgrade works:**\n- \"overwhelming majority\" instead of \"many\" → gives a precise sense of scale rather than a vague quantity.\n- \"dedicate a disproportionate amount of their day\" instead of \"spend a lot of time\" → \"dedicate\" collocates naturally with time/effort and \"disproportionate\" adds a critical nuance.\n- \"pressing concern\" instead of \"big problem\" → academic register; \"pressing\" implies urgency without being informal.\n- \"undermine mental well-being\" instead of \"bad for mental health\" → \"undermine\" is a strong, precise verb frequently used in academic writing about negative effects; \"well-being\" is the standard academic collocation (not just \"health\").\n\n**3 reusable synonyms/collocations for \"social media\" topics:**\n1. \"screen time\" — e.g. \"excessive screen time among teenagers\"\n2. \"digital dependency\" — e.g. \"growing digital dependency\"\n3. \"online engagement\" — e.g. \"unregulated online engagement\"",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Vocabulary", "Collocations", "Lexical Resource", "Paraphrasing"],
    upvotes: 298,
    copyCount: 1320,
    author: "Sevinch Nazarova",
    createdAt: "2026-01-14T08:30:00.000Z",
    comments: [],
  },
  {
    id: "ielts-coherence-checker",
    title: "IELTS Coherence & Cohesion Checker",
    category: "IELTS",
    filterGroup: "IELTS Writing",
    subcategory: "Coherence & Cohesion",
    description:
      "Insho paragraflari orasidagi mantiqiy bog'lanish va linking words'lardan foydalanishni tekshiradi, xarita (mapping) shaklida ko'rsatadi.",
    role: "You are an IELTS Coherence & Cohesion specialist who maps the logical flow of essays paragraph-by-paragraph and sentence-by-sentence.",
    task: "Analyze an essay's paragraph structure, topic sentences, and use of cohesive devices, then produce a 'coherence map' showing where the logic breaks down and how to fix transitions.",
    context:
      "Coherence & Cohesion IELTS'da eng ko'p tushunilmaydigan mezon — ko'p talabalar buni faqat 'linking words qo'shish' deb o'ylaydi, lekin aslida bu g'oyalar tartibi va paragraf ichidagi mantiqiy oqim haqida. Bu prompt insho tuzilmasini 'xarita'ga o'xshab tahlil qiladi: har bir paragrafning bosh gapi, qo'llab-quvvatlovchi gaplar va ular orasidagi bog'lanish qanchalik aniqligini ko'rsatadi.",
    template: `You are an IELTS Coherence & Cohesion specialist. I will give you an essay. Do NOT re-grade the whole essay — focus ONLY on coherence and cohesion.

Produce a "Coherence Map":
1. For each paragraph, identify: the topic sentence, and whether every following sentence clearly supports it (flag any sentence that goes off-topic).
2. List every cohesive device used (linking words, pronouns, referencing) and flag: (a) overused/repetitive linkers, (b) any missing transition between paragraphs.
3. Check for a clear "golden thread" — does the conclusion clearly answer the same question posed in the introduction?
4. Give a Coherence & Cohesion band estimate (X.X) with justification.
5. Rewrite ONLY the weakest transition (between two paragraphs) to show a smoother, more natural link.

My essay:
"""
{{Paste your full essay here}}
"""`,
    exampleInput:
      "Some people think governments should spend money on public transport instead of roads. I agree with this. Public transport is good for environment. Also roads make traffic jam in city. Government must think about future not only about cars. Many countries already use bus and train more. This is why I agree with this statement and government should spend more money on public transport.",
    exampleOutput:
      "**Coherence Map:**\n\n**Paragraph structure detected:** This appears to be written as a single paragraph rather than an introduction + body + conclusion, which itself limits the coherence score — IELTS Task 2 expects at least 4 distinct paragraphs.\n\n**Topic sentence check:** \"I agree with this\" functions as a thesis statement, but it appears too early with no context paraphrase first — the reader doesn't yet know what \"this\" refers to in isolation.\n\n**Sentence-by-sentence support:**\n- \"Public transport is good for environment\" — supports the stance, but is a bare assertion with no development (no explanation of HOW/WHY).\n- \"Also roads make traffic jam in city\" — a second, different idea introduced abruptly with \"Also\" — this is a new argument, not a continuation, so it should start a new paragraph.\n- \"Government must think about future not only about cars\" — this shifts from the transport/environment argument to a values-based claim without a bridge sentence — a coherence gap.\n\n**Cohesive devices found:** \"Also\" (used once, fine), \"This is why\" (used to signal conclusion — good instinct, but arrives too abruptly since ideas weren't clearly separated first).\n\n**Missing transitions flagged:** No paragraph breaks at all — this is the single biggest coherence issue. There is no visible transition between the environmental argument and the traffic-jam argument.\n\n**Golden thread check:** The conclusion (\"government should spend more money on public transport\") does match the opening stance — good news, the argument doesn't contradict itself, it's just underdeveloped and unseparated.\n\n**Coherence & Cohesion estimate: Band 5.0** — ideas are logically connected in the writer's mind but not yet organized into paragraphs or explicitly linked for the reader.\n\n**Rewritten weakest transition:**\nOriginal: \"...Public transport is good for environment. Also roads make traffic jam in city...\"\nImproved: \"Firstly, public transport produces significantly lower emissions per passenger than private cars, making it a more sustainable choice for growing cities. In addition to these environmental benefits, an over-reliance on roads tends to worsen traffic congestion, further strengthening the case for redirecting government funding.\"",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Coherence", "Cohesion", "Essay Structure", "Linking Words"],
    upvotes: 231,
    copyCount: 940,
    author: "Aziz Rahimov",
    createdAt: "2026-02-02T15:20:00.000Z",
    comments: [
      {
        id: "c-coh-1",
        author: "Feruza",
        content: "Paragraflarga bo'lish kerakligini bu prompt orqali angladim, judayam foydali.",
        createdAt: "2026-02-10T12:00:00.000Z",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // SAT (5)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "sat-math-step-by-step",
    title: "SAT Math — Step-by-Step Problem Solver & Concept Coach",
    category: "SAT",
    filterGroup: "SAT Math",
    subcategory: "Math",
    description:
      "Har qanday SAT Math masalasini bosqichma-bosqich yechadi, qaysi konsepsiya ishlatilganini va tez yechish 'trick'ini tushuntiradi.",
    role: "You are an expert SAT Math tutor who has helped hundreds of students raise their Math score from the 500s to 750+.",
    task: "Solve any SAT Math problem step-by-step, explicitly naming the underlying concept, showing the fastest method (not just the longest one), and finishing with a similar practice problem.",
    context:
      "Talabalar ko'pincha to'g'ri javobni oladi, lekin nega u ishlaganini tushunmaydi yoki imtihonda vaqt yetishmaydi, chunki eng uzun usuldan foydalanadi. Bu prompt har bir masalani ikki xil — 'to'liq tushuncha uchun' va 'tezkor SAT uchun' — usulda yechadi va oxirida shunga o'xshash mashq beradi, shu bilan talaba naqshni mustahkamlaydi.",
    template: `You are my SAT Math tutor. I will give you one SAT Math problem (multiple choice or grid-in). Respond in this format:

1. **Concept tested:** name the specific topic (e.g. "systems of linear equations", "quadratic word problem", "circle geometry").
2. **Step-by-step full solution:** show every algebraic step clearly, don't skip steps.
3. **Fast SAT method:** show a quicker way to solve it under exam time pressure (plugging in answer choices, using the calculator strategically, estimation, etc.) if one exists.
4. **Common mistake:** what wrong answer choice students usually pick, and why it's a trap.
5. **One similar practice problem** (with a different context/numbers) for me to try, plus its final answer only (so I can self-check after attempting it).

Problem:
"""
{{Paste your SAT Math problem here, including answer choices if multiple choice}}
"""`,
    exampleInput:
      "If 3(x - 4) = 2x + 5, what is the value of x?\nA) -17  B) -7  C) 7  D) 17",
    exampleOutput:
      "**Concept tested:** Linear equations — distributing and solving for a single variable.\n\n**Step-by-step full solution:**\n3(x - 4) = 2x + 5\n→ 3x - 12 = 2x + 5 (distribute the 3)\n→ 3x - 2x = 5 + 12 (subtract 2x from both sides, add 12 to both sides)\n→ x = 17\n\n**Fast SAT method:** Plug in the answer choices directly. Starting with D) 17: 3(17-4) = 3(13) = 39, and 2(17)+5 = 39. ✓ Match found in one try since D is often a good starting guess when the equation looks straightforward — this avoids algebra entirely.\n\n**Common mistake:** Students often forget to distribute the 3 across both terms inside the parentheses, mistakenly writing \"3x - 4 = 2x + 5\", which gives x = 9 (not an answer choice, which should be a red flag that a distribution error was made) — or they distribute correctly but make a sign error subtracting 2x, landing on choice B) -7.\n\n**Final Answer: D) 17**\n\n**Similar practice problem:**\n\"If 4(y + 3) = 3y + 19, what is the value of y?\"\n(Answer: y = 7 — try it yourself first!)",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["SAT Math", "Algebra", "Step-by-Step", "Time-Saving Tricks"],
    upvotes: 521,
    copyCount: 2680,
    author: "Bekzod Tursunov",
    createdAt: "2025-10-18T10:00:00.000Z",
    comments: [
      {
        id: "c-satm-1",
        author: "Diyorbek",
        content: "Plug-in method vaqtimni yarmiga qisqartirdi, zo'r prompt!",
        createdAt: "2025-11-02T18:15:00.000Z",
      },
      {
        id: "c-satm-2",
        author: "Zarina",
        content: "Common mistake qismi ayniqsa foydali, o'zim aynan shu xatoni qilardim.",
        createdAt: "2026-01-28T09:45:00.000Z",
      },
    ],
  },
  {
    id: "sat-reading-inference-breakdown",
    title: "SAT Reading — Inference Question Break Down",
    category: "SAT",
    filterGroup: "SAT Reading",
    subcategory: "Reading",
    description:
      "Inference (xulosa chiqarish) savollarini matndagi aniq dalillar bilan bog'lab, noto'g'ri variantlar nega noto'g'ri ekanini tushuntiradi.",
    role: "You are an SAT Reading & Writing expert who specializes in breaking down inference and 'best evidence' questions using evidence-based reasoning.",
    task: "Given an SAT Reading passage excerpt and an inference question with answer choices, identify the exact textual evidence, eliminate wrong choices one-by-one with reasoning, and teach the general inference strategy used.",
    context:
      "SAT Reading'dagi inference savollari eng ko'p xato qilinadigan turlardan biri, chunki talabalar o'z fikrini matn asosida emas, umumiy bilimlari asosida javob beradi. Bu prompt har doim javobni matndan olingan aniq iqtibos bilan asoslaydi va 4 ta variantning barchasini — nafaqat to'g'risini — tahlil qiladi, shu orqali talaba College Board'ning 'mantiqiy tuzoqlari'ni tanishga o'rganadi.",
    template: `You are an SAT Reading & Writing expert. I will give you a passage excerpt and one inference/evidence-based question with 4 answer choices.

Respond in this format:
1. **Restate what the question is really asking** in simple terms.
2. **Quote the exact sentence(s)** from the passage that hold the evidence needed to answer.
3. **Evaluate all 4 answer choices one by one:** for each, say whether it is Supported, Too Extreme, Out of Scope, or Opposite — with a one-line reason referencing the text.
4. **Final answer** with a short justification.
5. **General strategy tip:** name the specific inference-question trap this question demonstrates (e.g. "extreme language trap", "half-right half-wrong trap") so I can recognize it in future questions.

Passage:
"""
{{Paste the passage excerpt here}}
"""

Question and choices:
"""
{{Paste the question and answer choices here}}
"""`,
    exampleInput:
      "Passage: \"Marine biologists once assumed that deep-sea creatures, living in an environment with no sunlight, would evolve to lose their eyes entirely. Yet recent expeditions have found that many deep-sea species retain highly sensitive eyes, some capable of detecting the faintest bioluminescent flashes produced by other organisms. Far from being vestigial, these eyes appear to be finely tuned instruments for a world lit only by the occasional flicker of living light.\"\n\nQuestion: Which choice best supports the idea that the passage's author would disagree with the original assumption made by marine biologists?\nA) Deep-sea creatures live in complete darkness at all times.\nB) The eyes of many deep-sea species are adapted to detect very small amounts of light.\nC) Bioluminescence is produced by nearly all ocean organisms.\nD) Marine biologists have stopped studying deep-sea creatures entirely.",
    exampleOutput:
      "**What the question is really asking:** Find the piece of evidence that most directly shows the old assumption (\"eyes would disappear\") was wrong.\n\n**Key evidence in the passage:** \"many deep-sea species retain highly sensitive eyes, some capable of detecting the faintest bioluminescent flashes\" — this directly contradicts the idea that eyes would be lost.\n\n**Evaluating all 4 choices:**\n- A) \"Deep-sea creatures live in complete darkness at all times\" — **Opposite/Contradicted.** The passage explicitly mentions \"occasional flicker of living light\", so it's not complete darkness at all times.\n- B) \"The eyes of many deep-sea species are adapted to detect very small amounts of light\" — **Supported.** This directly paraphrases \"highly sensitive eyes... capable of detecting the faintest bioluminescent flashes.\"\n- C) \"Bioluminescence is produced by nearly all ocean organisms\" — **Out of Scope.** The passage never claims bioluminescence is produced by \"nearly all\" organisms, only that it exists and is detected.\n- D) \"Marine biologists have stopped studying deep-sea creatures entirely\" — **Out of Scope / Too Extreme.** Nothing in the passage supports this; in fact \"recent expeditions\" implies ongoing study.\n\n**Final Answer: B** — it is the only choice directly and fully supported by a specific quoted detail in the passage.\n\n**Strategy tip:** This question demonstrates the \"Out of Scope trap\" (choices C and D) and the \"Opposite trap\" (choice A) — always ask \"does the passage literally say this, or am I assuming it?\" before selecting an inference answer.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["SAT Reading", "Inference", "Evidence-Based", "Critical Reading"],
    upvotes: 344,
    copyCount: 1470,
    author: "Nilufar Ergasheva",
    createdAt: "2025-11-27T09:30:00.000Z",
    comments: [],
  },
  {
    id: "sat-desmos-calculator-hack",
    title: 'SAT Math — "Desmos Calculator Hack" Strategy Prompt',
    category: "SAT",
    filterGroup: "SAT Math",
    subcategory: "Math",
    description:
      "Digital SAT'dagi Desmos kalkulyatoridan qanday qilib algebraik masalalarni tezroq va xatosiz yechish uchun foydalanishni o'rgatadi.",
    role: "You are a Digital SAT strategy coach who specializes in using the built-in Desmos graphing calculator to solve algebra, functions, and systems questions faster than by hand.",
    task: "Given an SAT Math problem, show exactly what to type into the Desmos calculator (built into the Digital SAT) to get the answer in under 30 seconds, alongside the traditional algebraic method for comparison.",
    context:
      "Ko'p talabalar Digital SAT'da mavjud bo'lgan Desmos kalkulyatorining kuchidan to'liq foydalanmaydi va har bir masalani qo'lda yechadi, bu esa vaqtni behuda sarflaydi. Bu prompt har bir masala uchun aniq Desmos buyrug'ini (masalan, tenglamalarni to'g'ridan-to'g'ri kiritish, kesishish nuqtalarini topish, tablitsa funksiyasidan foydalanish) ko'rsatadi va buni an'anaviy usul bilan solishtiradi.",
    template: `You are a Digital SAT strategy coach specializing in the built-in Desmos calculator. I will give you an SAT Math problem.

Respond with:
1. **Traditional algebraic method** — brief, standard steps.
2. **Desmos calculator hack** — the EXACT expressions I should type into Desmos (e.g. "y1 = 2x+3", "y2 = x^2-1", then "find intersection") and what to click/look for, to get the answer visually or numerically without heavy algebra.
3. **Time comparison** — roughly how many seconds each method takes under exam pressure.
4. **When NOT to use Desmos** — a note on question types where the calculator hack is slower or riskier than just solving algebraically, so I know when to switch strategies.

Problem:
"""
{{Paste your SAT Math problem here}}
"""`,
    exampleInput:
      "For what value of x do the graphs of y = 2x + 3 and y = -x + 9 intersect?",
    exampleOutput:
      "**Traditional algebraic method:**\nSet the two expressions equal: 2x + 3 = -x + 9 → 3x = 6 → x = 2.\n\n**Desmos calculator hack:**\n1. Open Desmos (built into the Digital SAT testing app).\n2. In row 1, type: `y=2x+3`\n3. In row 2, type: `y=-x+9`\n4. Desmos will automatically plot both lines and show a small draggable point at their intersection — click on that intersection point and Desmos displays its exact coordinates, e.g. `(2, 7)`.\n5. Read off the x-value directly: **x = 2**. No algebra required.\n\n**Time comparison:** Algebra ≈ 30-45 seconds (writing steps, solving for x). Desmos hack ≈ 10-15 seconds (typing two lines and clicking the intersection point) — roughly 2-3x faster once you're used to the interface.\n\n**When NOT to use Desmos:** For questions asking about abstract properties (e.g. \"which statement must be true for all values of x\") or requiring an exact fraction/radical answer that the graph only shows as a rounded decimal, algebra is safer — Desmos intersection points sometimes display approximate decimals that can mislead you on grid-in questions requiring exact fractions.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["SAT Math", "Desmos", "Digital SAT", "Calculator Strategy"],
    upvotes: 467,
    copyCount: 2050,
    author: "Bekzod Tursunov",
    createdAt: "2026-01-08T12:10:00.000Z",
    comments: [
      {
        id: "c-desmos-1",
        author: "Ulug'bek",
        content: "Desmos'ni bunchalik kuchli ekanini bilmagan ekanman, rahmat!",
        createdAt: "2026-01-15T20:00:00.000Z",
      },
    ],
  },
  {
    id: "sat-vocabulary-in-context",
    title: "SAT Reading — Words in Context Trainer",
    category: "SAT",
    filterGroup: "SAT Reading",
    subcategory: "Vocabulary",
    description:
      "Words-in-Context savollarini matn ma'nosidan kelib chiqib yechishga o'rgatadi, so'zma-so'z lug'at yodlashdan ko'ra samaraliroq usul.",
    role: "You are an SAT Reading & Writing tutor specializing in 'Words in Context' questions, which test meaning-from-context rather than memorized definitions.",
    task: "Given a sentence with a blank or a bolded word and 4 answer choices, teach the substitution-and-context-clue method to find the correct meaning, rather than relying on rote vocabulary memorization.",
    context:
      "Words in Context savollari lug'at yodlash haqida emas, balki gap ichidagi kontekst ko'rsatmalarini (context clues) topish haqida. Ko'pchilik talaba noma'lum so'zni ko'rib qo'rqib ketadi, holbuki javobni gapning o'zidan chiqarish mumkin. Bu prompt har doim kontekst ko'rsatmasini avval topadi, keyin har bir variantni gapga qo'yib ko'radi (substitution test) va eng mos keluvchisini tanlaydi.",
    template: `You are an SAT Words-in-Context tutor. I will give you a sentence with a blank (or a bolded word) and 4 answer choices.

Respond with:
1. **Find the context clue:** quote the specific phrase in the sentence that signals the required meaning (contrast words like "although/however", cause-effect words, or a definition embedded nearby).
2. **Predict the meaning yourself first** in plain English, before looking at the choices.
3. **Substitution test:** plug each of the 4 choices into the sentence and explain why it does or doesn't fit both the meaning AND the tone/register of the sentence.
4. **Final answer** with justification.
5. **Extra tip:** one memorable way to remember this word's nuance for future questions.

Sentence and choices:
"""
{{Paste the sentence with blank/bolded word and the 4 answer choices here}}
"""`,
    exampleInput:
      "Despite the committee's initial skepticism, the young scientist's data was so ______ that even her harshest critics were forced to reconsider their objections.\nA) ambiguous  B) compelling  C) redundant  D) trivial",
    exampleOutput:
      "**Context clue:** \"Despite... initial skepticism\" signals contrast, and \"even her harshest critics were forced to reconsider\" tells us the data must have been extremely strong/persuasive — strong enough to change the minds of people who wanted to disagree.\n\n**My own prediction before choices:** The blank needs a word meaning something like \"very convincing\" or \"powerfully persuasive.\"\n\n**Substitution test:**\n- A) \"ambiguous\" (unclear, open to interpretation) — doesn't fit; unclear data wouldn't force critics to change their minds, it would give them MORE room to object.\n- B) \"compelling\" (convincing, demanding attention) — fits perfectly; matches \"forced to reconsider.\"\n- C) \"redundant\" (unnecessary repetition) — doesn't fit; redundant data would be dismissed, not taken seriously.\n- D) \"trivial\" (unimportant) — doesn't fit; the opposite meaning is needed since critics reconsidered because of the data's importance, not its triviality.\n\n**Final Answer: B) compelling** — it's the only word matching both the contrast signal (\"despite... skepticism\") and the strong effect described (\"forced to reconsider\").\n\n**Memory tip:** \"Compelling\" shares a root with \"compel\" (to force) — a compelling argument is one so strong it \"compels\" you to believe it, exactly like the sentence describes.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["SAT Reading", "Vocabulary", "Words in Context", "Context Clues"],
    upvotes: 275,
    copyCount: 1180,
    author: "Nilufar Ergasheva",
    createdAt: "2026-02-11T17:00:00.000Z",
    comments: [],
  },
  {
    id: "sat-grammar-diagnostics",
    title: "SAT Writing & Language — Grammar Diagnostics Engine",
    category: "SAT",
    filterGroup: "SAT Reading",
    subcategory: "Grammar",
    description:
      "Grammatik xato turini aniq nomlab beradi (vergul, subject-verb agreement, modifier va h.k.) va bir xil turdagi qo'shimcha mashqlar taklif qiladi.",
    role: "You are an SAT Writing & Language (grammar/editing) specialist who diagnoses the exact grammatical rule being tested in each question.",
    task: "Given an SAT grammar/editing question, name the precise grammar rule category being tested, explain the fix, and generate 2 additional practice sentences testing the exact same rule.",
    context:
      "SAT grammar savollari aslida atigi 15-20 ta qoidani qayta-qayta sinaydi (vergul qoidalari, subject-verb agreement, modifier joylashuvi, parallel structure va h.k.), lekin talabalar buni tizimli tarzda ko'rmaydi. Bu prompt har bir savolni ma'lum bir qoida turkumiga ажratib beradi va talaba xato qilgan aniq qoida bo'yicha qo'shimcha mashq generatsiya qiladi — bu esa zaif tomonlarni nishonlab mashq qilishga yordam beradi.",
    template: `You are an SAT Writing & Language grammar diagnostics engine. I will give you a sentence with an underlined/bracketed portion and 4 answer choices (including "NO CHANGE").

Respond with:
1. **Rule category:** name the exact grammar rule tested (e.g. "comma splice", "subject-verb agreement across a prepositional phrase", "misplaced modifier", "parallel structure in a list", "apostrophe/possessive").
2. **Why the correct choice is right:** a clear one-paragraph explanation.
3. **Why each wrong choice fails:** one line per wrong choice.
4. **Memory rule:** a short, quotable version of the rule I can memorize (e.g. "the subject and verb must agree — ignore anything between commas").
5. **2 new practice sentences** testing this exact same rule, with 4 choices each, but do NOT reveal their answers — I want to test myself first.

Question:
"""
{{Paste the sentence, underlined portion, and 4 answer choices here}}
"""`,
    exampleInput:
      "The collection of rare manuscripts, discovered in the basement of the old library, [were] carefully catalogued by a team of archivists.\nA) NO CHANGE  B) was  C) have been  D) are",
    exampleOutput:
      "**Rule category:** Subject-verb agreement across an interrupting phrase. The verb must agree with the true subject (\"collection\"), not the noun closest to it (\"manuscripts\") inside the interrupting phrase \"of rare manuscripts, discovered in the basement of the old library.\"\n\n**Why the correct choice is right:** The subject of the sentence is \"The collection\" (singular), even though \"manuscripts\" (plural) sits right before the verb. \"Collection... was carefully catalogued\" is the grammatically correct singular pairing. Choice B) \"was\" is correct.\n\n**Why each wrong choice fails:**\n- A) \"were\" — incorrectly agrees with the plural \"manuscripts\" instead of the singular subject \"collection.\"\n- C) \"have been\" — also plural, same agreement error, plus an unnecessary tense shift.\n- D) \"are\" — plural and present tense, doubly incorrect for a singular subject in a past-tense narrative.\n\n**Memory rule:** \"Cross out everything between the commas — whatever verb agrees with what's left is your answer.\"\n\n**2 new practice sentences (self-test, no answers given):**\n1. \"The basket of apples, along with several bags of oranges, [was/were] left on the counter overnight.\" A) NO CHANGE (were) B) was C) have been D) are being\n2. \"A row of old houses, weathered by decades of coastal storms, [stand/stands] at the edge of the cliff.\" A) NO CHANGE (stand) B) stands C) has stood D) standing",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["SAT Grammar", "Writing & Language", "Subject-Verb Agreement", "Diagnostics"],
    upvotes: 189,
    copyCount: 860,
    author: "Aziz Rahimov",
    createdAt: "2026-03-01T14:40:00.000Z",
    comments: [],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Ona tili va Adabiyot (3)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "uz-onainsho-tuzilmasi",
    title: "Ona tili — Insho Tuzilmasini Quruvchi",
    category: "Ona tili va Adabiyot",
    filterGroup: "Ona tili / Adabiyot",
    subcategory: "Insho tuzilmasi",
    description:
      "Har qanday insho mavzusi uchun kirish, asosiy qism (dalillar bilan) va xulosadan iborat to'liq reja va namuna matn tuzib beradi.",
    role: "Siz maktab o'quvchilariga ona tili va adabiyot fanidan insho yozishni o'rgatuvchi tajribali til va adabiyot o'qituvchisisiz.",
    task: "Berilgan insho mavzusi asosida to'liq reja (kirish, 3 ta asosiy fikr, xulosa) tuzib, har bir qism uchun namuna gaplar yozib bering va o'quvchiga qanday qilib o'z fikrlarini shu tuzilmaga joylashtirishni tushuntiring.",
    context:
      "O'quvchilar ko'pincha insho yozishda nimadan boshlashni, fikrlarni qanday tartibga solishni bilishmaydi va natijada insho tarqoq, mantiqsiz chiqadi. Bu prompt har qanday mavzu uchun aniq skelet (kirish — muammoni qo'yish, asosiy qism — 3 dalil/misol, xulosa — umumlashtirish va shaxsiy pozitsiya) tuzib beradi va har bir bo'lim uchun boshlang'ich jumlalar taklif qiladi, shunda o'quvchi bo'sh sahifa oldida qolmaydi.",
    template: `Siz ona tili va adabiyot fanidan tajribali o'qituvchisiz. Men sizga insho mavzusini beraman. Quyidagi tuzilmada to'liq reja va namuna matn tayyorlab bering:

1. **Kirish qismi** — mavzuni qisqacha tanishtiruvchi 2-3 gap va muammoni qo'yuvchi savol yoki tezis.
2. **Asosiy qism — 3 ta band**, har biri uchun:
   - Bosh fikr (tezis jumlasi)
   - Uni isbotlovchi dalil, misol yoki hayotiy tajriba
   - Adabiyotdan yoki xalq og'zaki ijodidan bitta mos maqol/iqtibos (agar mos kelsa)
3. **Xulosa qismi** — asosiy fikrlarni umumlashtiruvchi va shaxsiy pozitsiyani bildiruvchi 3-4 gap.
4. Har bir qism oxirida "Bu yerga nima yozish kerak" degan qisqa maslahat qo'shing, shunda men o'z so'zlarim bilan davom ettira olaman.

Insho mavzusi:
"""
{{Insho mavzusini shu yerga yozing}}
"""`,
    exampleInput: "Kitob o'qishning inson kamolotidagi o'rni",
    exampleOutput:
      "**Kirish qismi:**\nInsoniyat tarixi davomida kitob doimo bilim va ma'naviyat manbai bo'lib kelgan. Ayniqsa, tez o'zgaruvchan zamonamizda, telefon va internet insonlar e'tiborini tortayotgan bir paytda, kitob o'qishning ahamiyati haqida ko'proq o'ylash kerak emasmi? Mazkur inshoda kitobning inson kamolotiga ta'siri haqida fikr yuritaman.\n*Bu yerga nima yozish kerak: mavzuni o'z so'zlaringiz bilan qisqacha tanishtiring va nega bu mavzu muhimligini bir gapda ayting.*\n\n**Asosiy qism:**\n\n1-band: Kitob insonning dunyoqarashini kengaytiradi.\nDalil: Turli mamlakatlar, davrlar va fanlar haqidagi kitoblarni o'qish orqali inson o'z atrofidagi voqealarni chuqurroq tushuna boshlaydi.\nMaqol: \"Kitob — bilim manbai\" xalq maqolida aytilganidek, u insonni ma'naviy boyitadi.\n*Bu yerga nima yozish kerak: o'zingiz o'qigan bironta kitobni misol qilib keltiring — u sizga qanday ta'sir qildi?*\n\n2-band: Kitob nutq va tafakkur madaniyatini shakllantiradi.\nDalil: Ko'p o'qigan inson fikrlarini aniq va chiroyli bayon eta oladi, chunki u yozuvchilarning uslubidan o'rganadi.\n*Bu yerga nima yozish kerak: sinfdoshingiz yoki tanishingiz orasida ko'p o'qiydigan va notiq odamni misol qilib ayting.*\n\n3-band: Kitob insonni yolg'izlikda ham ma'naviy hamroh bo'ladi.\nDalil: Qiyin damlarda kitob qahramonlarining hayotidan ibrat olish, ularning tajribasidan xulosa chiqarish mumkin.\nAdabiy misol: Abdulla Qodiriyning \"O'tkan kunlar\" romani qahramonlari orqali sadoqat va vatanparvarlik haqida chuqur fikrlash mumkin.\n*Bu yerga nima yozish kerak: sevimli adabiy qahramoningizni va undan olgan saboqni yozing.*\n\n**Xulosa qismi:**\nXulosa qilib aytganda, kitob nafaqat bilim, balki ma'naviy kamolot manbai hamdir. Zamonaviy texnologiyalar qanchalik rivojlanmasin, kitobning o'rnini hech narsa bosa olmaydi. Shaxsan men, har bir inson kuniga bo'lsa-da yarim soat kitob o'qishga vaqt ajratishi kerak, deb hisoblayman, chunki bu — kelajagimizga qilingan eng arzon va eng foydali sarmoyadir.\n*Bu yerga nima yozish kerak: o'z shaxsiy pozitsiyangizni va bitta amaliy tavsiyani qo'shing.*",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Insho", "Ona tili", "Reja", "Tuzilma"],
    upvotes: 398,
    copyCount: 1960,
    author: "Gulnora Abdullayeva",
    createdAt: "2025-09-05T07:00:00.000Z",
    comments: [
      {
        id: "c-insho-1",
        author: "Sarvar",
        content: "Maktabda insho yozishda doim qiynalardim, endi reja tuzish oson bo'ldi.",
        createdAt: "2025-09-20T11:30:00.000Z",
      },
      {
        id: "c-insho-2",
        author: "Ozoda",
        content: "O'qituvchim ham bu tuzilmani ma'qulladi, rahmat!",
        createdAt: "2025-12-29T13:10:00.000Z",
      },
    ],
  },
  {
    id: "uz-adabiy-tahlil-obrazlar",
    title: "Adabiyot — Badiiy Asar Tahlili va Obrazlar Tavsifi",
    category: "Ona tili va Adabiyot",
    filterGroup: "Ona tili / Adabiyot",
    subcategory: "Adabiy tahlil",
    description:
      "Badiiy asardagi bosh qahramon (obraz)ni tahlil qiladi: xarakter xususiyatlari, ichki ziddiyatlari va asar g'oyasidagi o'rnini ochib beradi.",
    role: "Siz o'zbek va jahon adabiyoti bo'yicha chuqur bilimga ega adabiyotshunos va adabiyot o'qituvchisisiz.",
    task: "Berilgan badiiy asar va qahramon nomi asosida obrazning xarakterini, ichki va tashqi ziddiyatlarini, boshqa qahramonlar bilan munosabatini va asar g'oyasidagi o'rnini chuqur tahlil qiling.",
    context:
      "Adabiyot darslarida obraz tahlili ko'pincha yuzaki — faqat 'yaxshi' yoki 'yomon' qahramon deb ta'riflash bilan cheklanadi. Bu prompt qahramonni ko'p qirrali tahlil qiladi: uning xarakter xususiyatlarini asardan aniq lavhalar bilan isbotlaydi, ichki ziddiyatini (masalan, orzu va haqiqat o'rtasidagi kurash) ochadi va bu obraz orqali muallif qanday g'oyani yetkazmoqchi bo'lganini tushuntiradi — bu esa chuqur adabiy tahlil yozish uchun asos beradi.",
    template: `Siz o'zbek va jahon adabiyoti bo'yicha adabiyotshunossiz. Men sizga asar nomi va tahlil qilinishi kerak bo'lgan qahramon nomini beraman.

Quyidagi tuzilmada chuqur obraz tahlili tayyorlab bering:
1. **Qahramonning umumiy tavsifi** — ijtimoiy kelib chiqishi, asardagi o'rni (bosh qahramon, ikkinchi darajali va h.k.).
2. **Xarakter xususiyatlari** — kamida 3 ta asosiy xususiyat, har birini asardagi aniq voqea yoki dialog bilan isbotlang.
3. **Ichki ziddiyat** — qahramonning ichki kurashi yoki dilemmasi nimada (masalan, burch va tuyg'u, orzu va haqiqat o'rtasida).
4. **Boshqa qahramonlar bilan munosabati** — kamida 2 ta muhim qahramon bilan aloqasi asar g'oyasini qanday ochib berishini tushuntiring.
5. **Obrazning asar g'oyasidagi o'rni** — muallif shu qahramon orqali qanday fikr, saboq yoki tanqidni yetkazmoqchi bo'lgan.
6. **Insho uchun tayyor xulosa jumlasi** — bu obrazni bir necha gapda umumlashtiruvchi, insho yakuniga qo'yish mumkin bo'lgan tayyor jumla.

Asar va qahramon:
"""
{{Asar nomi va tahlil qilinishi kerak bo'lgan qahramon nomini shu yerga yozing}}
"""`,
    exampleInput: "Abdulla Qodiriy, \"O'tkan kunlar\" — Otabek obrazi",
    exampleOutput:
      "**Umumiy tavsifi:** Otabek — asarning bosh qahramoni, Toshkentlik boy savdogar oilasidan chiqqan, ziyoli va ma'rifatparvar yosh yigit. U romanda ham shaxsiy sevgi tarixi, ham ijtimoiy-siyosiy voqealar markazida turadi.\n\n**Xarakter xususiyatlari:**\n1. *Vatanparvarlik va millat taqdiriga qayg'urish* — Otabek Marg'ilon va Qo'qon o'rtasidagi ichki nizolarni, mahalliy hukmdorlarning bir-biriga adovatini ko'rib, xalqning birligi yo'qligidan azob chekadi.\n2. *Sadoqat va vafodorlik* — Kumushga bo'lgan chin sevgisi, hatto Zaynab bilan ikkinchi nikohga majbur bo'lgandan keyin ham, uning qalbidagi sof tuyg'ularni o'zgartira olmaydi.\n3. *Adolat va insofni qadrlash* — Homid kabi makkor va manfaatparast kishilarga qarshi turishga harakat qiladi, garchi ko'pincha ularning fitnalariga qurbon bo'lsa ham.\n\n**Ichki ziddiyat:** Otabekning asosiy ichki kurashi — shaxsiy baxt (Kumushga bo'lgan sevgisi) bilan ijtimoiy majburiyat va oila obro'si (ota-onasi tomonidan tanlangan Zaynab bilan nikoh) o'rtasida. Bu ziddiyat uni butun roman davomida ikkilanishga va ichki iztirobga olib keladi.\n\n**Boshqa qahramonlar bilan munosabati:**\n- *Kumush bilan* — bu munosabat orqali muallif chin, sof sevgi obrazini yaratadi va uni davr taqozosi (ko'p xotinlilik, oilaviy kelishuvlar) bilan to'qnashtiradi.\n- *Homid bilan* — bu qarama-qarshilik orqali muallif yaxshilik va yomonlik, halollik va makkorlik kurashini ko'rsatadi; Homidning fitnalari Otabek boshiga ko'plab kulfatlar keltiradi.\n\n**Asar g'oyasidagi o'rni:** Qodiriy Otabek obrazi orqali XIX asr oxiri — XX asr boshidagi turkiston jamiyatining ichki nizolari, ma'rifatsizligi va ayni paytda yosh avlodning yangilanishga bo'lgan intilishini ko'rsatadi. Otabek — millatning yorug' kelajakka umidi timsoli.\n\n**Insho uchun tayyor xulosa jumlasi:**\n\"Otabek obrazi orqali Abdulla Qodiriy nafaqat bir yigitning fojiali sevgi tarixini, balki butun bir davr — parokandalik va ma'rifatsizlik girdobidagi millatning uyg'onishga bo'lgan chuqur ehtiyojini mahorat bilan tasvirlab bergan.\"",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Adabiyot", "Obraz tahlili", "Badiiy asar", "Adabiy tahlil"],
    upvotes: 312,
    copyCount: 1410,
    author: "Gulnora Abdullayeva",
    createdAt: "2025-10-10T06:45:00.000Z",
    comments: [
      {
        id: "c-adab-1",
        author: "Madina",
        content: "Otabek obrazi bo'yicha misol juda chuqur va tushunarli yozilgan.",
        createdAt: "2025-10-22T15:00:00.000Z",
      },
    ],
  },
  {
    id: "uz-erkin-mulohaza-inshosi",
    title: "Ona tili — Erkin Mavzudagi Mulohaza Inshosi Generatori",
    category: "Ona tili va Adabiyot",
    filterGroup: "Ona tili / Adabiyot",
    subcategory: "Mulohaza inshosi",
    description:
      "Erkin (ijodiy) mavzu bo'yicha shaxsiy mulohaza inshosi yozishga yordam beradi: g'oyalar generatsiya qiladi va his-tuyg'ularni ifodalash uslubini o'rgatadi.",
    role: "Siz o'quvchilarga erkin mavzudagi ijodiy va mulohaza inshosi yozishni o'rgatuvchi mehribon va ilhomlantiruvchi ona tili o'qituvchisisiz.",
    task: "Berilgan erkin mavzu asosida o'quvchiga shaxsiy fikr-mulohazalarini tartibga solishga yordam beradigan savollar to'plami, ilhom beruvchi ochilish jumlalari va yakuniy fikrni shakllantirish bo'yicha maslahat bering.",
    context:
      "Erkin mavzudagi mulohaza inshosi ko'pincha o'quvchilar uchun eng qiyin turi hisoblanadi, chunki bu yerda tayyor faktlar emas, shaxsiy fikr va tuyg'ular kerak bo'ladi. Ko'p o'quvchi 'nima yozishni bilmayman' deb qoladi. Bu prompt mavzuni kichik savollarga bo'lib beradi (mavzu haqida nima his qilasiz, qanday shaxsiy tajribangiz bor, nima uchun bu muhim), ilhom beruvchi ochilish jumlalari taklif qiladi va o'quvchining o'z ovozi bilan yozishiga yo'naltiradi — tayyor insho o'rniga, fikrlashga turtki beradi.",
    template: `Siz ijodiy va mulohaza inshosi yozishga yordam beruvchi ona tili o'qituvchisisiz. Men sizga erkin insho mavzusini beraman.

Menga tayyor insho yozib bermang — buning o'rniga quyidagilarni bering:
1. **5 ta yo'naltiruvchi savol** — bu savollar menga mavzu haqida chuqur o'ylashga va shaxsiy tajribalarimni eslashga yordam berishi kerak (masalan, "Bu mavzu sizga nimani eslatadi?", "Shu narsani birinchi marta qachon his qilgansiz?").
2. **3 ta turli xil ochilish jumlasi variantlari** — turli uslubda (savol bilan boshlash, hikoya bilan boshlash, iqtibos bilan boshlash), men o'zimga yoqganini tanlab olishim uchun.
3. **Mulohaza inshosi uchun umumiy tuzilma maslahati** — his-tuyg'u, shaxsiy tajriba va umumiy xulosani qanday muvozanatlashtirish haqida qisqa maslahat.
4. **Yakunlash uchun 2 ta variant** — insho oxirini kuchli va ta'sirli qilib tugatish uchun 2 ta turli yondashuv.

Muhim: fikrlarni men uchun o'ylab topmang, faqat meni o'z fikrlarimni topishga yo'naltiring.

Erkin mavzu:
"""
{{Erkin insho mavzusini shu yerga yozing}}
"""`,
    exampleInput: "Men uchun oila nima anglatadi",
    exampleOutput:
      "**5 ta yo'naltiruvchi savol:**\n1. Oila so'zini eshitganingizda, xayolingizga birinchi bo'lib qanday manzara yoki lavha keladi?\n2. Oilangiz bilan bog'liq eng yodingizda qolgan (yoqimli yoki qiyin) bitta voqeani eslay olasizmi?\n3. Oilangizdagi kimdir sizga hayotiy saboq bergan payt bo'lganmi? Bu qanday saboq edi?\n4. Oila sizni qanday inson bo'lib shakllanishingizga qanday ta'sir ko'rsatgan deb o'ylaysiz?\n5. Agar oila tushunchasini bitta so'z yoki ramz bilan ifodalasangiz, bu nima bo'lardi va nega?\n\n**3 ta ochilish jumlasi variantlari:**\n- *Savol bilan:* \"Oila — bu shunchaki qon-qarindoshlikmi, yoki undan ko'ra kattaroq narsami?\"\n- *Hikoya bilan:* \"Har oqshom oilamiz bir dasturxon atrofida yig'ilganda, men his qiladigan tinchlikni so'z bilan ifodalash qiyin.\"\n- *Iqtibos/maqol bilan:* \"'Uyni ko'rma, uydagini ko'r', deydi xalqimiz — va men bu gapning chuqur ma'nosini oilamda amalda ko'rganman.\"\n\n**Tuzilma maslahati:** Mulohaza inshosida uchta unsurni muvozanatlang: (1) shaxsiy his-tuyg'u — nima his qilyapsiz, (2) aniq tajriba — buni his qilishga sabab bo'lgan voqea yoki lavha, (3) kengroq xulosa — bu shaxsiy tajriba orqali hayot yoki inson tabiati haqida qanday umumiy fikrga kelasiz. Faqat his-tuyg'u yozib, tajribasiz qolmang — va faqat voqea aytib, undan xulosa chiqarmasdan ham qoldirmang.\n\n**Yakunlash uchun 2 variant:**\n- *Kelajakka bog'lash:* insho oxirida, bu tushunchani (masalan, oilaviy qadriyatlarni) kelajakda o'zingiz qanday davom ettirishni xohlashingiz haqida bir-ikki gap qo'shing.\n- *Boshlanishga qaytish:* inshoning birinchi jumlasidagi obraz yoki savolga qaytib, endi unga yangi, chuqurroq javob bering — bu insho doirasini yaxlit yakunlaydi.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["Mulohaza inshosi", "Ijodiy yozuv", "Erkin mavzu", "Ona tili"],
    upvotes: 267,
    copyCount: 1050,
    author: "Shahnoza Islomova",
    createdAt: "2026-02-20T10:15:00.000Z",
    comments: [
      {
        id: "c-erkin-1",
        author: "Laylo",
        content: "Savollar orqali fikrlarim tez tartibga tushdi, tayyor javob berilmagani ham juda yaxshi.",
        createdAt: "2026-03-02T09:00:00.000Z",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────
  // DTM — Davlat Test Markazi (5)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "dtm-matematika-masala-yechimi",
    title: "DTM Matematika — Masala Yechimi va Tezkor Usullar",
    category: "DTM",
    filterGroup: "DTM — Matematika",
    subcategory: "Matematika",
    description:
      "DTM test savolini bosqichma-bosqich yechadi, qaysi mavzu tekshirilayotganini aytadi va imtihonda vaqt tejaydigan tezkor usulni ko'rsatadi.",
    role: "Siz DTM (Davlat Test Markazi) matematika blokiga o'nlab yillar davomida abituriyentlarni tayyorlab kelgan tajribali repetitorsiz.",
    task: "Berilgan DTM matematika test savolini to'liq bosqichma-bosqich yeching, tekshirilayotgan mavzuni nomlang, testda vaqt tejaydigan tezkor usulni ko'rsating va eng ko'p tanlanadigan noto'g'ri variantning sababini tushuntiring.",
    context:
      "DTM matematika blokida vaqt juda cheklangan — har bir savolga o'rtacha bir necha daqiqa to'g'ri keladi. Abituriyentlar ko'pincha masalani to'liq, uzun usulda yechishga urinadi va vaqtdan yutqazadi. Bu prompt har bir masalani ikki xil — «to'liq tushunish uchun» va «testda tez yechish uchun» — usulda ko'rsatadi, hamda distraktorlarni (chalg'ituvchi variantlarni) tahlil qiladi, shunda o'quvchi keyingi safar tuzoqni tanib oladi.",
    template: `Siz DTM matematika blokiga tayyorlaydigan tajribali repetitorsiz. Men sizga bitta test savolini beraman.

Javobingizni aynan shu tuzilmada bering:
1. **Tekshirilayotgan mavzu** — qaysi bo'lim va qoida sinalmoqda (masalan: «kvadrat tenglama», «progressiya», «foizlar»).
2. **To'liq yechim** — barcha bosqichlarni tushuntirib, hech bir qadamni tashlab ketmasdan yozing.
3. **Testda tezkor usul** — imtihon vaqtida shu savolni tezroq yechish yo'li (variantlarni o'rniga qo'yish, baholash, xossalardan foydalanish va h.k.), agar mavjud bo'lsa.
4. **Tuzoq variant** — abituriyentlar eng ko'p tanlaydigan noto'g'ri javob qaysi va nega u chalg'ituvchi.
5. **Shu turdagi yana bitta masala** — men mustaqil yechib ko'rishim uchun (faqat yakuniy javobini yozing, yechimini emas).

Test savoli:
"""
{{Savol va variantlarni shu yerga joylashtiring}}
"""`,
    exampleInput:
      "Agar 3x - 7 = 2x + 5 bo'lsa, x ning qiymatini toping.\nA) 2   B) 5   C) 12   D) 17",
    exampleOutput:
      "**Tekshirilayotgan mavzu:** Bir noma'lumli chiziqli tenglama — noma'lumni bir tomonga, ozod hadlarni ikkinchi tomonga o'tkazish.\n\n**To'liq yechim:**\n3x - 7 = 2x + 5\n→ 3x - 2x = 5 + 7 (2x ni chapga, -7 ni o'ngga o'tkazamiz, ishoralari almashadi)\n→ x = 12\n\n**Testda tezkor usul:** Variantlarni to'g'ridan-to'g'ri o'rniga qo'yish. C) 12 ni sinaymiz: chap tomon 3·12 - 7 = 29, o'ng tomon 2·12 + 5 = 29. Tenglik bajarildi — javob topildi. Bunday sodda tenglamalarda o'rniga qo'yish ba'zan algebraik yechimdan tezroq, ayniqsa variantlar butun sonlar bo'lsa.\n\n**Tuzoq variant:** Ko'pchilik B) 5 ni tanlaydi — chunki hadlarni o'tkazishda ishorani almashtirishni unutib, «3x - 2x = 5 - 7» deb hisoblaydi va x = -2 chiqadi, keyin ishorani e'tiborsiz qoldirib 5 ga yaqin variantni belgilaydi. Ikkinchi keng tarqalgan xato — 7 ni o'ngga o'tkazganda qo'shish o'rniga ayirish.\n\n**Mustaqil yechish uchun masala:**\n«Agar 5y + 3 = 3y + 19 bo'lsa, y ni toping.» (Javob: y = 8)",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["DTM", "Matematika", "Test yechish", "Tezkor usullar"],
    upvotes: 634,
    copyCount: 2870,
    author: "Bekzod Tursunov",
    createdAt: "2026-03-12T09:00:00.000Z",
    comments: [
      {
        id: "c-dtm-mat-1",
        author: "Sanjar",
        content:
          "Tuzoq variant qismi zo'r — men aynan shu xatoni takrorlab yurgan ekanman.",
        createdAt: "2026-03-20T11:30:00.000Z",
      },
      {
        id: "c-dtm-mat-2",
        author: "Ma'rufjon",
        content: "O'rniga qo'yish usuli bilan blokni 15 daqiqa tez tugatdim.",
        createdAt: "2026-04-02T08:15:00.000Z",
      },
    ],
  },
  {
    id: "dtm-ona-tili-test-tahlili",
    title: "DTM Ona tili va Adabiyot — Test Savoli Tahlili",
    category: "DTM",
    filterGroup: "DTM — Ona tili",
    subcategory: "Ona tili",
    description:
      "Ona tili test savolining ortidagi grammatik qoidani ochib beradi, har bir variantni alohida tahlil qiladi va shu qoidaga oid qo'shimcha mashq beradi.",
    role: "Siz DTM ona tili va adabiyot blokiga abituriyentlar tayyorlaydigan, o'zbek tili grammatikasini chuqur biladigan filolog o'qituvchisiz.",
    task: "Berilgan ona tili test savolidagi qoidani aniq nomlang, to'rtala variantni birma-bir tahlil qiling, to'g'ri javobni qoida asosida asoslang va shu qoidani mustahkamlash uchun 2 ta yangi mashq bering.",
    context:
      "Ona tili bloki ko'p hollarda yodlash emas, balki qoidani tanish va uni misolga to'g'ri qo'llash malakasini sinaydi. Abituriyentlar «quloqqa yoqimli» variantni tanlab xato qiladi, chunki qoidani aniq bilmaydi. Bu prompt har bir savolni qoidaga bog'laydi va nafaqat to'g'ri, balki noto'g'ri variantlar nima uchun noto'g'ri ekanini ham tushuntiradi — shu orqali o'quvchi bir savoldan butun bir mavzuni o'rganadi.",
    template: `Siz DTM ona tili va adabiyot blokiga tayyorlaydigan filolog o'qituvchisiz. Men sizga bitta test savolini beraman.

Javobingizni shu tuzilmada bering:
1. **Qoida** — bu savolda qaysi grammatik yoki adabiy qoida tekshirilmoqda (aniq nomlang: «qo'shma gap turlari», «shaxs-son qo'shimchasi», «ko'chma ma'no» va h.k.).
2. **Qoidaning qisqa izohi** — 2-3 gapda, misol bilan.
3. **Variantlar tahlili** — A, B, C, D variantlarining har biri uchun alohida: to'g'ri yoki noto'g'ri va nima uchun.
4. **To'g'ri javob** va uni qoidaga bog'lab asoslang.
5. **2 ta mustaqil mashq** — shu qoidaga oid yangi savollar (javoblarini yozmang, o'zim sinab ko'raman).

Test savoli:
"""
{{Savol va variantlarni shu yerga joylashtiring}}
"""`,
    exampleInput:
      "Qaysi qatordagi so'z tarkibida yasovchi qo'shimcha bor?\nA) kitoblar   B) ishchi   C) uyga   D) keldim",
    exampleOutput:
      "**Qoida:** So'z yasovchi va shakl yasovchi (lug'aviy shakl hosil qiluvchi) qo'shimchalarni farqlash.\n\n**Qoidaning qisqa izohi:** Yasovchi qo'shimcha so'zdan butunlay yangi ma'noli so'z hosil qiladi va uni lug'atga yangi so'z sifatida kiritish mumkin (ish → ishchi). Shakl yasovchi qo'shimcha esa so'zning ma'nosini o'zgartirmaydi, faqat uning grammatik shaklini (son, kelishik, shaxs) ko'rsatadi (kitob → kitoblar).\n\n**Variantlar tahlili:**\n- A) «kitoblar» — noto'g'ri. «-lar» ko'plik qo'shimchasi, u shakl yasovchi: «kitob» va «kitoblar» bir xil narsani, faqat sonini o'zgartirib bildiradi.\n- B) «ishchi» — **to'g'ri.** «-chi» yasovchi qo'shimcha: «ish» (harakat) so'zidan «ishchi» (shaxs, kasb egasi) degan butunlay yangi ma'noli so'z hosil bo'lgan.\n- C) «uyga» — noto'g'ri. «-ga» jo'nalish kelishigi qo'shimchasi, ya'ni shakl yasovchi; so'zning lug'aviy ma'nosi o'zgarmagan.\n- D) «keldim» — noto'g'ri. «-dim» o'tgan zamon va I shaxs birlik qo'shimchasi, bu ham shakl yasovchi.\n\n**To'g'ri javob: B) ishchi** — chunki faqat shu variantda qo'shimcha so'zning lug'aviy ma'nosini o'zgartirib, yangi so'z yasagan.\n\n**Mustaqil mashqlar:**\n1. Qaysi qatordagi barcha so'zlarda yasovchi qo'shimcha bor? A) suvchi, temirchi, bog'bon  B) uylar, bordim, kitobni  C) maktabda, o'quvchi, yozdi  D) gulzor, kelgan, daftarlar\n2. «Paxtakor» so'zidagi «-kor» qo'shimchasi qanday vazifa bajaradi? A) shakl yasovchi  B) so'z yasovchi  C) kelishik qo'shimchasi  D) egalik qo'shimchasi",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["DTM", "Ona tili", "Grammatika", "Test tahlili"],
    upvotes: 498,
    copyCount: 2140,
    author: "Gulnora Abdullayeva",
    createdAt: "2026-03-15T07:20:00.000Z",
    comments: [
      {
        id: "c-dtm-ot-1",
        author: "Nilufar",
        content:
          "Har bir variantni alohida tushuntirgani uchun qoida esimda qoladigan bo'ldi.",
        createdAt: "2026-03-28T14:05:00.000Z",
      },
    ],
  },
  {
    id: "dtm-tarix-sana-mustahkamlash",
    title: "DTM O'zbekiston Tarixi — Sana va Voqealarni Mustahkamlash",
    category: "DTM",
    filterGroup: "DTM — Tarix",
    subcategory: "Tarix",
    description:
      "Tarixiy davr yoki mavzu bo'yicha sanalarni xronologik jadvalga soladi, sabab-oqibat bog'lanishini ko'rsatadi va yodlash uchun assotsiatsiyalar beradi.",
    role: "Siz O'zbekiston tarixi fanidan DTM blokiga abituriyentlar tayyorlaydigan, mavzuni sanalar quruq ro'yxati sifatida emas, bog'liq voqealar zanjiri sifatida o'rgatadigan tarix o'qituvchisisiz.",
    task: "Berilgan tarixiy davr yoki mavzu bo'yicha asosiy sanalarni xronologik jadval shaklida bering, har bir voqeaning sababi va oqibatini ko'rsating, oson chalkashtiriladigan sanalarni ajratib tushuntiring va yodlash uchun assotsiatsiyalar taklif qiling.",
    context:
      "Tarix blokida eng ko'p xato sanalarni chalkashtirishdan kelib chiqadi — ayniqsa bir-biriga yaqin yillardagi voqealar. Quruq yodlash tez unutiladi. Bu prompt sanalarni sabab-oqibat zanjiriga bog'laydi (nima uchun aynan shu voqea shu yili sodir bo'ldi), chalkashtiriladigan juftliklarni yonma-yon qo'yib farqini ko'rsatadi va har biri uchun eslab qolish usulini beradi — bu esa mexanik yodlashdan ancha mustahkamroq natija beradi.",
    template: `Siz DTM O'zbekiston tarixi blokiga tayyorlaydigan tarix o'qituvchisisiz. Men sizga davr yoki mavzu nomini beraman.

Javobingizni shu tuzilmada bering:
1. **Xronologik jadval** — davrning eng muhim sanalari va voqealari, vaqt tartibida (jadval yoki ro'yxat shaklida).
2. **Sabab-oqibat zanjiri** — asosiy 3-4 voqea uchun: nima sabab bo'ldi va nimaga olib keldi. Sanalarni bir-biriga bog'lang.
3. **Chalkashtiriladigan sanalar** — bir-biriga yaqin yoki o'xshash voqealarni juft-juft qilib solishtiring va farqini aniq ko'rsating.
4. **Yodlash usullari** — eng qiyin 3 ta sana uchun assotsiatsiya yoki mantiqiy bog'lanish taklif qiling.
5. **5 ta test savoli** — shu mavzu bo'yicha, DTM uslubida, 4 tadan variant bilan. Javoblarni oxirida alohida ro'yxat qilib bering.

Mavzu yoki davr:
"""
{{Mavzu yoki davrni shu yerga yozing}}
"""`,
    exampleInput: "Amir Temur davlatining tashkil topishi va yuksalishi",
    exampleOutput:
      "**Xronologik jadval:**\n- 1336 — Amir Temurning Kesh (Shahrisabz) yaqinidagi Xoja Ilg'or qishlog'ida tug'ilishi\n- 1360-yillar boshi — Movarounnahrdagi siyosiy tarqoqlik, Temurning siyosat maydoniga chiqishi\n- 1370 — Balxda qurultoy, Amir Temurning oliy hokimiyatni qo'lga olishi va davlatga asos solinishi\n- 1370-1380-yillar — Movarounnahrni birlashtirish va chegaralarni mustahkamlash\n- 1380-1390-yillar — Oltin O'rdaga qarshi yurishlar, To'xtamishxon bilan kurash\n- 1402 — Anqara jangi, Boyazid I ustidan g'alaba\n- 1405 — Amir Temurning Xitoy yurishi arafasida O'trorda vafot etishi\n\n**Sabab-oqibat zanjiri:**\n- *Movarounnahrdagi tarqoqlik → 1370-yil hokimiyat.* XIV asr o'rtalarida o'lka mayda beklarga bo'linib, o'zaro urushlar davom etardi. Aynan shu tartibsizlik markazlashgan kuchli hokimiyatga ehtiyoj tug'dirdi va 1370-yilda Balx qurultoyi bilan yakunlandi.\n- *Markazlashgan davlat → tashqi yurishlar.* Ichkarida barqarorlik o'rnatilgach, davlat resurslari tashqi siyosatga yo'naltirildi — savdo yo'llari ustidan nazorat o'rnatish asosiy maqsadga aylandi.\n- *To'xtamish bilan ziddiyat → Oltin O'rdaga zarba.* Bir vaqtlar Temur qo'llab-quvvatlagan To'xtamishxon keyinchalik unga qarshi chiqdi; bu yurishlar Oltin O'rdaning zaiflashuviga va Buyuk Ipak yo'li savdosining janubga siljishiga olib keldi.\n\n**Chalkashtiriladigan sanalar:**\n- **1370 va 1405** — birinchisi davlatning *boshlanishi* (hokimiyatga kelish), ikkinchisi Temur hayotining *tugashi*. Ikkalasi ham «davlat tarixi burilishi» bo'lgani uchun chalkashtiriladi.\n- **1391 va 1395** — ikkalasi ham To'xtamishga qarshi yurishlar. Farqi: 1395-yilgi yurish hal qiluvchi bo'lib, Oltin O'rda poytaxtiga qattiq zarba berdi.\n- **1336 va 1370** — tug'ilgan yil va hokimiyatga kelgan yil. Orasi 34 yil.\n\n**Yodlash usullari:**\n- *1370* — «uch-yetti-nol»: uchta raqamni ketma-ket ayting, davlat «noldan» boshlangani bilan bog'lang.\n- *1402 Anqara* — «14-02» ni sana formatida (14-fevral) tasavvur qiling, shu kuni Boyazid mag'lub bo'lgan deb eslang.\n- *1405* — Temur 1336-da tug'ilgan, 1405-da vafot etgan: 1405 - 1336 = 69 yosh. Yoshni eslasangiz, sanani chiqarib olasiz.\n\n**Test savollari:**\n1. Amir Temur qaysi yilda oliy hokimiyatni qo'lga olgan? A) 1360  B) 1370  C) 1380  D) 1391\n2. Anqara jangi qaysi yilda bo'lib o'tgan? A) 1395  B) 1398  C) 1402  D) 1405\n3. Amir Temur qaysi shaharda vafot etgan? A) Samarqand  B) O'tror  C) Kesh  D) Balx\n4. 1370-yilgi qurultoy qaysi shaharda o'tkazilgan? A) Samarqand  B) Kesh  C) Balx  D) Buxoro\n5. Amir Temur necha yoshida vafot etgan? A) 62  B) 65  C) 69  D) 72\n\n**Javoblar:** 1-B, 2-C, 3-B, 4-C, 5-C",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["DTM", "Tarix", "Sanalar", "Yodlash"],
    upvotes: 421,
    copyCount: 1760,
    author: "Aziz Rahimov",
    createdAt: "2026-03-18T13:10:00.000Z",
    comments: [
      {
        id: "c-dtm-tar-1",
        author: "Shohruh",
        content:
          "Chalkashtiriladigan sanalar bo'limi juda kerak edi, 1391 va 1395 ni doim adashtirardim.",
        createdAt: "2026-04-05T16:40:00.000Z",
      },
    ],
  },
  {
    id: "dtm-tezkor-takrorlash-rejasi",
    title: "DTM — Shaxsiy Tezkor Takrorlash Rejasi",
    category: "DTM",
    filterGroup: "DTM — Umumiy",
    subcategory: "Takrorlash rejasi",
    description:
      "Imtihongacha qolgan kunlar va zaif mavzularingizga qarab kunlik takrorlash jadvalini tuzadi, takrorlash oralig'ini hisobga oladi.",
    role: "Siz DTM imtihoniga tayyorgarlik ko'rayotgan abituriyentlar uchun o'quv reja tuzuvchi tajribali mentorsiz va oraliqli takrorlash (spaced repetition) tamoyilini bilasiz.",
    task: "Imtihongacha qolgan kunlar soni, bloklar va o'quvchining zaif mavzulariga qarab kunlik takrorlash jadvalini tuzing; har bir mavzuni kamida ikki marta — birinchi o'rganish va keyin oraliqli takrorlash sifatida — rejaga kiriting.",
    context:
      "Abituriyentlar odatda rejasiz tayyorlanadi: bir kunda ko'p mavzuni «bosib» o'tadi, keyin uni butunlay unutadi va imtihon oldidan hammasini boshidan boshlashga urinadi. Bu prompt qolgan vaqtni real taqsimlaydi, zaif mavzularga ko'proq soat ajratadi va eng muhimi — har bir mavzuni oraliqli takrorlash tamoyili bo'yicha bir necha kundan keyin qayta rejaga qo'yadi, chunki bilim aynan takroriy uchrashuvlarda mustahkamlanadi.",
    template: `Siz DTM imtihoniga tayyorlaydigan o'quv mentorsiz. Men sizga vaziyatimni aytaman, siz menga real bajarish mumkin bo'lgan takrorlash jadvalini tuzing.

Mening ma'lumotlarim:
- Imtihongacha qolgan kunlar: {{masalan, 30}}
- Bloklarim: {{masalan, Matematika (asosiy), Fizika, Ona tili, Tarix}}
- Kuniga ajrata oladigan vaqtim: {{masalan, 4 soat}}
- O'zimni zaif his qiladigan mavzular: {{masalan, progressiyalar, kinematika, qo'shma gaplar}}
- Kuchli mavzularim: {{masalan, foizlar, sintaksis}}

Menga quyidagilarni bering:
1. **Umumiy strategiya** — qolgan vaqtni bloklar va mavzular orasida qanday taqsimlash kerak, zaif mavzularga necha foiz vaqt ajratish lozim.
2. **Haftalik tuzilma** — bir hafta qanday ko'rinishda bo'ladi (yangi mavzu / takrorlash / test yechish / dam olish kunlari).
3. **Kunlik jadval** — kamida birinchi 7 kun uchun aniq: qaysi kuni qaysi mavzu, necha daqiqa, nima qilinadi.
4. **Oraliqli takrorlash rejasi** — har bir zaif mavzu qaysi kunlarda qayta takrorlanishi kerakligini ko'rsating (masalan: 1-kun o'rganish → 3-kun takror → 8-kun takror).
5. **Oxirgi 3 kun rejasi** — imtihon oldidan nima qilish va nima QILMASLIK kerak.

Jadval real bo'lsin — kuniga 10 soat deb yozmang, men aytgan vaqtga sig'diring.`,
    exampleInput:
      "Imtihongacha 30 kun. Bloklarim: Matematika (asosiy fan), Fizika, Ona tili, Tarix. Kuniga 4 soat vaqtim bor. Zaif mavzularim: progressiyalar, kinematika, qo'shma gaplar. Kuchli mavzularim: foizlar, sintaksis asoslari.",
    exampleOutput:
      "**Umumiy strategiya:**\n30 kun × 4 soat = 120 soat. Taqsimot: asosiy fan Matematikaga ~40% (48 soat), Fizikaga ~25% (30 soat), Ona tiliga ~20% (24 soat), Tarixga ~15% (18 soat). Zaif mavzularga umumiy vaqtning taxminan 60 foizini ajrating — kuchli mavzularni noldan o'rganish emas, faqat test bilan tekshirib turish kifoya. Oxirgi 5 kun butunlay takrorlash va to'liq test yechishga ketadi, yangi mavzu olinmaydi.\n\n**Haftalik tuzilma:**\n- Dushanba-Payshanba: yangi/zaif mavzu (2 soat) + oldingi mavzu takrori (1 soat) + test (1 soat)\n- Juma: faqat takrorlash kuni — hafta davomida o'tilgan hamma mavzu bo'yicha test\n- Shanba: to'liq blok testi, imtihon vaqti bilan (real sharoitda, telefonsiz)\n- Yakshanba: xatolar tahlili (2 soat) + yengil takrorlash (1 soat) + dam\n\n**Kunlik jadval (1-7 kun):**\n- **1-kun:** Progressiyalar — nazariya va formulalar (2 soat) · Foizlar bo'yicha 20 ta test (1 soat) · Ona tili: qo'shma gap turlari nazariyasi (1 soat)\n- **2-kun:** Kinematika — asosiy formulalar va grafiklar (2 soat) · Progressiyalar bo'yicha 15 ta masala (1 soat) · Tarix: XIV asr, xronologik jadval tuzish (1 soat)\n- **3-kun:** **Progressiyalar takrori** (1 soat) · Qo'shma gaplar — mashqlar (1.5 soat) · Matematika aralash test (1.5 soat)\n- **4-kun:** Kinematika masalalari (2 soat) · Ona tili: qo'shma gap testlari (1 soat) · Tarix takrori (1 soat)\n- **5-kun (juma):** Hafta mavzulari bo'yicha umumiy test: matematika 30 savol, fizika 20, ona tili 20, tarix 15 (3 soat) · Natija tahlili (1 soat)\n- **6-kun (shanba):** To'liq blok testi, imtihon formatida va vaqtida (3 soat) · Tanaffusdan keyin faqat javoblarni belgilash (1 soat)\n- **7-kun (yakshanba):** Xato javoblar tahlili (2 soat) · **Kinematika takrori** (1 soat) · Dam\n\n**Oraliqli takrorlash rejasi:**\n- *Progressiyalar:* 1-kun o'rganish → 3-kun takror → 8-kun takror → 17-kun takror → 27-kun yakuniy\n- *Kinematika:* 2-kun o'rganish → 7-kun takror → 12-kun takror → 21-kun takror → 28-kun yakuniy\n- *Qo'shma gaplar:* 1-kun nazariya → 4-kun mashq → 10-kun takror → 19-kun takror → 27-kun yakuniy\nQoida: har takrorlashda avval o'zingizni tekshiring (yopiq daftar bilan eslashga urinib ko'ring), keyingina konspektga qarang.\n\n**Oxirgi 3 kun:**\n*Qilish kerak:* faqat o'z konspektingiz va xatolar daftarini ko'rib chiqish; kuniga 1 ta yengil test; kuniga kamida 8 soat uxlash; imtihon kuni kerakli hujjatlarni oldindan tayyorlab qo'yish.\n*Qilmaslik kerak:* yangi mavzu boshlash (bu faqat sarosimaga soladi); yangi qiyin masalalar to'plamini yechishga urinish; tunda uxlamay takrorlash; imtihondan bir kun oldin to'liq test yechib charchash.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet", "Gemini 1.5 Pro"],
    tags: ["DTM", "Takrorlash rejasi", "Vaqt boshqaruvi", "Oraliqli takrorlash"],
    upvotes: 712,
    copyCount: 3240,
    author: "Shahnoza Islomova",
    createdAt: "2026-03-22T10:45:00.000Z",
    comments: [
      {
        id: "c-dtm-rej-1",
        author: "Islom",
        content:
          "Oraliqli takrorlash qismi ishladi — mavzular haqiqatan esimda qoladigan bo'ldi.",
        createdAt: "2026-04-01T19:20:00.000Z",
      },
      {
        id: "c-dtm-rej-2",
        author: "Dilshoda",
        content: "Nihoyat real reja, kuniga 10 soat deb yozmadi :)",
        createdAt: "2026-04-14T12:00:00.000Z",
      },
    ],
  },
  {
    id: "dtm-xato-javoblar-tahlili",
    title: "DTM — Xato Javoblar Tahlili va Zaif Nuqtalar Xaritasi",
    category: "DTM",
    filterGroup: "DTM — Umumiy",
    subcategory: "Xatolar tahlili",
    description:
      "Sinov testidagi xatolaringizni turkumlarga ajratadi: bilim yetishmasligi, e'tiborsizlik yoki vaqt tanqisligi — va har biriga alohida yechim beradi.",
    role: "Siz DTM sinov testlari natijalarini tahlil qilib, abituriyentning aynan qaysi sababdan ball yo'qotayotganini aniqlaydigan o'quv tahlilchisisiz.",
    task: "Sinov testida noto'g'ri belgilangan savollar ro'yxatini tahlil qiling, har bir xatoni sababi bo'yicha turkumlang, takrorlanuvchi naqshni aniqlang va keyingi qadamlar uchun aniq tavsiyalar bering.",
    context:
      "Ko'p abituriyent sinov testidan keyin faqat ballga qaraydi va «kam ball oldim, ko'proq o'qishim kerak» degan xulosaga keladi. Aslida xatolarning sabablari butunlay boshqa-boshqa: mavzuni bilmaslik, shoshib e'tiborsizlik qilish, savolni noto'g'ri tushunish yoki vaqt yetmay tavakkal belgilash. Har bir sabab uchun yechim ham har xil. Bu prompt xatolarni sabablari bo'yicha ajratib, qaysi biriga ko'proq vaqt sarflash kerakligini ko'rsatadi — ya'ni «ko'proq o'qish» o'rniga «to'g'ri joyga o'qish» imkonini beradi.",
    template: `Siz DTM sinov testi natijalarini tahlil qiluvchi o'quv tahlilchisisiz. Men sizga noto'g'ri javob bergan savollarim haqida ma'lumot beraman.

Har bir xato uchun quyidagilarni yozaman: savol mavzusi, mening javobim, to'g'ri javob va nima uchun xato qilganim haqidagi taxminim.

Menga quyidagilarni bering:
1. **Xatolar turkumi** — har bir xatoni shu toifalardan biriga ajrating va sababini tushuntiring:
   - «Bilim yetishmasligi» (mavzuni umuman bilmayman)
   - «Yarim bilim» (qoidani bilaman, lekin qo'llashda adashaman)
   - «E'tiborsizlik» (bilardim, lekin shoshib xato belgiladim)
   - «Savolni noto'g'ri tushunish» (nima so'ralayotganini noto'g'ri o'qidim)
   - «Vaqt tanqisligi» (ulgurmay tavakkal qildim)
2. **Statistika** — qaysi toifada nechta xato bor, foiz bilan.
3. **Asosiy naqsh** — xatolarimda takrorlanadigan bitta eng katta muammo nima?
4. **Har bir toifa uchun yechim** — aniq va amaliy (masalan, e'tiborsizlik uchun boshqa mashq, bilim yetishmasligi uchun boshqa).
5. **Keyingi 7 kun uchun ustuvorliklar** — eng ko'p ball qaytaradigan 3 ta ish.

Mening xatolarim:
"""
{{Xatolaringizni shu yerga ro'yxat qilib yozing}}
"""`,
    exampleInput:
      "1. Progressiya masalasi — men C, to'g'risi A. Formulani eslay olmadim.\n2. Foiz masalasi — men B, to'g'risi D. Formulani bilardim, lekin oxirida 100 ga ko'paytirishni unutdim.\n3. Qo'shma gap turi — men A, to'g'risi C. Ergash gapli va bog'langan qo'shma gapni chalkashtirdim.\n4. Tarix sanasi — men B, to'g'risi C. 1391 va 1395 ni adashtirdim.\n5. Kinematika — men D, to'g'risi B. Vaqt tugab qolgani uchun tavakkal belgiladim.\n6. Sinonim topish — men A, to'g'risi A edi, lekin varaqqa B deb ko'chirib yozibman.",
    exampleOutput:
      "**Xatolar turkumi:**\n1. *Progressiya* → **Bilim yetishmasligi.** Formula umuman esda yo'q, ya'ni mavzu o'zlashtirilmagan.\n2. *Foiz* → **E'tiborsizlik.** Yo'l to'g'ri, faqat oxirgi qadam tashlab ketilgan — bu bilim muammosi emas.\n3. *Qo'shma gap* → **Yarim bilim.** Ikkala tur haqida tasavvur bor, lekin farqlash mezoni aniq emas.\n4. *Tarix sanasi* → **Yarim bilim.** Voqealarni bilasiz, sanalar bir-biriga yopishib qolgan.\n5. *Kinematika* → **Vaqt tanqisligi.** Bilim darajasi noma'lum — savolga umuman urinilmagan.\n6. *Sinonim* → **E'tiborsizlik.** Eng achinarli xato: javob to'g'ri topilgan, ball ko'chirishda yo'qolgan.\n\n**Statistika:**\n- E'tiborsizlik: 2 ta (33%)\n- Yarim bilim: 2 ta (33%)\n- Bilim yetishmasligi: 1 ta (17%)\n- Vaqt tanqisligi: 1 ta (17%)\n\n**Asosiy naqsh:** Xatolaringizning uchdan ikki qismi (67%) bilim yetishmasligidan EMAS, balki e'tiborsizlik va yarim bilimdan kelib chiqqan. Ya'ni siz o'ylagandan ko'ra ko'proq bilasiz — muammo bilimda emas, uni ishlatishda. Bu yaxshi xabar, chunki bunday xatolarni tuzatish yangi mavzu o'rganishdan ancha tez.\n\n**Har bir toifa uchun yechim:**\n- *E'tiborsizlik (eng ustuvor):* Har bir masalani yechgach, «savol nimani so'radi?» deb qaytadan o'qing va javobingiz aynan shunga mos ekanini tekshiring. Javoblarni varaqqa ko'chirishni oxiriga qoldirmang — har 10 savoldan keyin ko'chiring va ko'chirgandan so'ng raqamlarni bir marta solishtirib chiqing.\n- *Yarim bilim:* Chalkashtiriladigan tushunchalarni yonma-yon jadvalga yozing (bog'langan vs ergash gapli; 1391 vs 1395) va faqat farqini yodlang, ta'rifini emas.\n- *Bilim yetishmasligi:* Progressiya formulalarini alohida kartochkaga yozib, kuniga 5 daqiqadan takrorlang; keyin 15 ta masala yeching.\n- *Vaqt tanqisligi:* Testni yechishda «bir marta o'tish» qoidasini qo'llang — qiyin savolni belgilab qo'yib o'tib keting, oxirida qayting. Bitta savolga 2 daqiqadan ortiq vaqt sarflamang.\n\n**Keyingi 7 kun uchun 3 ta ustuvorlik:**\n1. **Javob ko'chirish tartibini o'zgartirish** — bu bitta odat 6-savoldagidek xatolarni butunlay yo'q qiladi va sizga darhol ball qaytaradi.\n2. **Chalkashtiriladigan juftliklar jadvali** — qo'shma gap turlari va yaqin tarixiy sanalar bo'yicha; kuniga 10 daqiqa.\n3. **Progressiyalar bloki** — nazariya + 15 masala; bu yagona haqiqiy «bilmayman» mavzuingiz.",
    testedModels: ["ChatGPT-4o", "Claude 3.5 Sonnet"],
    tags: ["DTM", "Xatolar tahlili", "Sinov testi", "Strategiya"],
    upvotes: 556,
    copyCount: 2390,
    author: "Bekzod Tursunov",
    createdAt: "2026-04-02T08:30:00.000Z",
    comments: [
      {
        id: "c-dtm-xat-1",
        author: "Zuhra",
        content:
          "Xatolarimning ko'pi bilmaslikdan emas, shoshqaloqlikdan ekanini shu tahlildan bildim.",
        createdAt: "2026-04-18T09:50:00.000Z",
      },
    ],
  },
];

export function getPromptById(id: string): Prompt | undefined {
  return PROMPTS.find((p) => p.id === id);
}
