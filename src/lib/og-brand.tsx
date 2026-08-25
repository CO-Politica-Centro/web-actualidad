import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 } as const;
export const ogContentType = "image/png";

async function loadLogoDataUrl(): Promise<string> {
  const bytes = await readFile(
    join(process.cwd(), "public/brand/logo-flor-512.png"),
  );
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
}

type BrandOgProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

/** Shared 1200×630 brand card for Open Graph / Twitter. */
export async function renderBrandOg({
  eyebrow,
  title,
  subtitle,
}: BrandOgProps): Promise<ImageResponse> {
  const logo = await loadLogoDataUrl();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background:
          "linear-gradient(135deg, #f7f4eb 0%, #fffdf7 48%, #efe8d4 100%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <img
          src={logo}
          width={128}
          height={128}
          alt=""
          style={{
            borderRadius: 999,
            boxShadow: "0 12px 40px rgba(26,31,22,0.18)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#2f6b3a",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 600,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 42 ? 48 : 60,
              lineHeight: 1.05,
              fontWeight: 700,
              color: "#1a1f16",
              maxWidth: 860,
            }}
          >
            {title}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            width: 96,
            height: 4,
            background: "#d4a017",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 28,
            lineHeight: 1.35,
            color: "#5c6554",
            fontFamily: "system-ui, sans-serif",
            maxWidth: 920,
          }}
        >
          {subtitle}
        </div>
      </div>
    </div>,
    { ...ogSize },
  );
}
