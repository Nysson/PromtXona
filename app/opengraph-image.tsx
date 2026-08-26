import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PROMPTS } from "@/data/prompts";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — Ochiq kodli Prompt Kutubxonasi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Havola Telegram/Twitter/LinkedIn'ga ulashilganda ko'rinadigan rasm.
 * Logo `app/icon.svg` faylidan o'qiladi — belgi bitta joyda saqlanadi.
 */
export default async function OpengraphImage() {
  const svg = readFileSync(join(process.cwd(), "app", "icon.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  const count = PROMPTS.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #f6f8fb 0%, #e8eef7 45%, #dfe8f5 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={190} height={190} />

        <div
          style={{
            display: "flex",
            fontSize: 82,
            fontWeight: 700,
            letterSpacing: -2,
            color: "#0f2547",
            marginTop: 26,
          }}
        >
          {SITE.name}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#4a5b73",
            marginTop: 14,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          DTM, IELTS, SAT va Ona tili uchun ochiq kodli prompt kutubxonasi
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#7183a0",
            marginTop: 30,
          }}
        >
          {count} ta sinovdan o&apos;tgan prompt · ChatGPT · Claude · Gemini
        </div>
      </div>
    ),
    { ...size }
  );
}
