import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * iOS "Bosh ekranga qo'shish" ikonkasi. Apple SVG'ni qo'llab-quvvatlamaydi,
 * shuning uchun `app/icon.svg` shu yerda PNG'ga aylantiriladi.
 */
export default async function AppleIcon() {
  const svg = readFileSync(join(process.cwd(), "app", "icon.svg"), "utf8");
  const logo = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="" width={164} height={164} />
      </div>
    ),
    { ...size }
  );
}
