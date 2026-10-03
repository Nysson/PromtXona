# Promptlarni sinash bo'yicha qo'llanma

Bu qo'llanma `testedModels` (sahifadagi "Sinovdan o'tgan modellar") ro'yxatini
**haqiqiy** natijalar bilan to'ldirish uchun. Har bir model uchun bitta prompt
taxminan 5–10 daqiqa oladi.

## Qanday sinash kerak

1. Prompt sahifasini oching → formani pastdagi **Sinov kirishi** bilan
   to'ldiring → **ChatGPT / Claude / DeepSeek'da ochish**.
2. Har safar **yangi chat** oching (eski suhbat natijaga ta'sir qiladi).
3. Javobni pastdagi **tekshiruv ro'yxati** bo'yicha baholang.
4. Agar 6 ta banddan kamida 5 tasi ✅ bo'lsa, model **o'tdi** deb hisoblanadi.
5. Model nomini interfeysda qanday ko'rsatilgan bo'lsa, xuddi shunday yozing
   (masalan, "ChatGPT-4o", "Claude Sonnet", "DeepSeek-V3").

## Natijani yuborish shakli

Har bir sinov uchun bitta qator yozib, menga yuboring (yoki PR izohiga
qo'shing):

```
prompt_id | model | o'tdi? (ha/yo'q) | ✅ soni (x/6) | izoh (nima noto'g'ri bo'ldi)
```

Masalan:

```
ielts-writing-task2-error-analyzer | ChatGPT-4o | ha | 6/6 | —
sat-rw-passage-logic-deconstructor | DeepSeek-V3 | yo'q | 3/6 | javobni 1-qadamdayoq aytib qo'ydi
```

---

## 1. IELTS Writing Task 2 — Examiner & Error Analyzer
`ielts-writing-task2-error-analyzer`

**Sinov kirishi** (ataylab 250 so'zdan kam va xatoli):

- Task 2 savoli: *Some people think that children should start learning a foreign language at primary school. Others believe it is better to start at secondary school. Discuss both views and give your opinion.*
- Insho: *In nowadays world, foreign languages is very important. Some people think children must learn language in primary school because they learn very fast. For example my brother start English when he was 6 and now he speak very good. Other people think it is better in secondary school because children first need learn own language good. In my opinion, primary school is better because it give more time for practice. In conclusion, children should learn foreign language early.*
- Maqsad band: 6.5 · Izoh tili: O'zbekcha + inglizcha atamalar

**Tekshiruv ro'yxati**
- [ ] So'z soni 250 dan kamligini aniqlab, Task Response'ga ta'sirini aytdi
- [ ] 4 mezon uchun alohida band + iqtibos bor
- [ ] Overall bandni to'g'ri hisobladi (o'rtacha + IELTS yaxlitlash qoidasi)
- [ ] Xatolar jadvalida "Uzbek L1 link" ustuni mazmunli (artikl, ko'plik, "-ga → to")
- [ ] Butun inshoni qayta yozmadi, faqat bitta paragrafni
- [ ] Bahoni oshirib yubormadi (bu insho uchun 5.0–5.5 atrofida kutiladi)

## 2. Digital SAT R&W — Passage Logic Deconstructor
`sat-rw-passage-logic-deconstructor`

**Sinov kirishi** (Transitions savoli):

- Passage: *Researchers studying honeybees found that bees deprived of sleep performed less precise "waggle dances," the movements they use to tell other bees where food is located. ______ the sleep-deprived bees' directions were more likely to send their nestmates to the wrong place.*
- Savol: *Which choice completes the text with the most logical transition?* A) In contrast, B) As a result, C) Nevertheless, D) For instance,
- Savol turi: Bilmayman — aniqlab ber

**Tekshiruv ro'yxati**
- [ ] Savol turini "Transitions" deb to'g'ri aniqladi
- [ ] Javobni 5-qadamgacha aytmadi
- [ ] Har bir jumlaning rolini (claim / evidence / result) belgiladi
- [ ] To'g'ri javob: **B** (sabab → natija)
- [ ] Har bir noto'g'ri variant uchun tuzoq turini aytdi
- [ ] Mashq savolining javobi oxirida, "ANSWER KEY" ostida

## 3. Mumtoz she'riyat tahlili
`uz-mumtoz-sheriyat-tahlili`

**Sinov kirishi** (Boburning mashhur ruboiysi):

- Shoir: Zahiriddin Muhammad Bobur
- Matn:
  ```
  Jonimdin o'zga yori vafodor topmadim,
  Ko'nglumdin o'zga mahrami asror topmadim.
  ```
- Tahlil maqsadi: Insho yoki referat · Daraja: 10–11-sinf / litsey

**Tekshiruv ro'yxati**
- [ ] Matnda yo'q misralarni o'ylab topmadi (bu ruboiyning faqat 2 misrasi berilgan — buni sezishi yaxshi)
- [ ] Lug'at jadvali: "yor", "vafodor", "mahram", "asror" to'g'ri izohlangan
- [ ] Radif ("topmadim") to'g'ri aniqlangan
- [ ] Badiiy san'atlarni (masalan, tashxis, takrir) iqtibos bilan ko'rsatdi
- [ ] Ishonchsiz faktlarni (asar nomi, vazn) "aniqlashtirish kerak" / "taxminiy" deb belgiladi
- [ ] Zamonaviy talqin ruboiy g'oyasini buzmagan (yolg'izlik, sirdosh topa olmaslik)

## 4. IELTS Reading — True / False / Not Given
`ielts-reading-tfng-logic-trainer`

**Sinov kirishi:**

- Passage: *Samarkand's Registan square is framed by three madrasahs. The oldest, the Ulugh Beg Madrasah, was completed in the 1420s, while the other two were added in the seventeenth century. Today the square is one of the most visited sites in Central Asia.*
- Statements: 1. All three madrasahs were built in the same century. 2. The Ulugh Beg Madrasah is the oldest of the three. 3. More tourists visit the Registan than any other site in Uzbekistan.
- Mening javoblarim: 1-NG, 2-T, 3-T

**Tekshiruv ro'yxati**
- [ ] 1 → **FALSE** (1420s va 17-asr)
- [ ] 2 → **TRUE**
- [ ] 3 → **NOT GIVEN** ("one of the most visited" ≠ "eng ko'p")
- [ ] 1 va 3 dagi xatolarni turi bilan tasnifladi
- [ ] Tashqi bilimga tayanmadi
- [ ] 4 qadamli qaror algoritmini berdi

## 5. IELTS Reading — Matching Headings
`ielts-reading-matching-headings`

**Sinov kirishi:** prompt sahifasidagi namuna kirishdan foydalaning, lekin
"Mening javoblarim" ga `A-iii, B-iv` yozing.

**Tekshiruv ro'yxati**
- [ ] Sarlavhalarga qaramasdan avval har bir paragrafning asosiy g'oyasini aytdi
- [ ] A → iii, B → ii
- [ ] B uchun "iv" nima uchun tuzoq ekanini tushuntirdi
- [ ] Har bir tuzoqni turiga ajratdi (too narrow / keyword trap…)
- [ ] 5 qadamli strategiya kartasini berdi
- [ ] Javob faqat matnga asoslangan

## 6. DTM Biologiya — Mavzu tushuntirish
`dtm-biologiya-mavzu-tushuntirish`

**Sinov kirishi:** Mavzu: *Mitoz va meyoz* · Sinf: 10-sinf · Daraja: Asoslarni bilaman

**Tekshiruv ro'yxati**
- [ ] Mitoz → 2 ta diploid (2n), meyoz → 4 ta gaploid (n) hujayra — to'g'ri
- [ ] Krossingover meyozning I profazasida ekani to'g'ri ko'rsatilgan
- [ ] O'xshatish va uning chegarasi bor
- [ ] "DTM tuzoqlari" bo'limida kamida 4 ta mazmunli juftlik
- [ ] 10 ta test, javoblar eng oxirida
- [ ] Hech qanday aniq faktik xato yo'q

## 7. DTM Biologiya — Genetika masalasi
`dtm-biologiya-genetika-masala`

**Sinov kirishi:**

- Masala: *No'xatda sariq rang (A) yashil (a) ustidan, silliq shakl (B) burishgan (b) ustidan dominant. AaBb × AaBb chatishtirilganda avlodning necha foizi yashil va silliq bo'ladi?*
- Mening javobim: 25%

**Tekshiruv ro'yxati**
- [ ] Diduragay chatishtirish deb aniqladi
- [ ] Har bir ota-onada 4 xil gameta (AB, Ab, aB, ab)
- [ ] 4×4 Pennet katagi yoki to'g'ri ehtimollik ko'paytmasi
- [ ] Fenotip nisbati 9 : 3 : 3 : 1
- [ ] Javob: **3/16 = 18,75%**
- [ ] 25% xatosini aniq qadamga bog'ladi
