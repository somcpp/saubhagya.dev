import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name}, Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "src/assets/fonts");

export default async function Image() {
  const [serif, serifItalic] = await Promise.all([
    readFile(join(fontDir, "InstrumentSerif-Regular.ttf")),
    readFile(join(fontDir, "InstrumentSerif-Italic.ttf")),
  ]);

  const chips = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#f4efe6",
          color: "#16130f",
          position: "relative",
        }}
      >
        {/* warm glow */}
        <div
          style={{
            position: "absolute",
            right: -160,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,90,31,0.45), rgba(232,64,43,0.12) 55%, rgba(244,239,230,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: "#16130f",
              color: "#f4efe6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Serif Italic",
              fontSize: 36,
              paddingBottom: 6,
            }}
          >
            s
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", borderRadius: 9999, border: "1.5px solid rgba(22,19,15,0.2)" }}>
            <div style={{ width: 12, height: 12, borderRadius: 9999, background: "#10b981" }} />
            {profile.status}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Serif", fontSize: 150, lineHeight: 0.9, letterSpacing: -3 }}>{profile.firstName}</div>
          <div style={{ display: "flex", fontFamily: "Serif Italic", fontSize: 150, lineHeight: 0.95, letterSpacing: -3 }}>
            {profile.lastName}
            <span style={{ color: "#ff5a1f", marginLeft: 8 }}>*</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, color: "#5b544a" }}>{`${profile.role} · SaaS, real-time apps, dev tools`}</div>
          <div style={{ display: "flex", gap: 10 }}>
            {chips.map((c, i) => (
              <div
                key={c}
                style={{
                  fontSize: 20,
                  padding: "8px 16px",
                  borderRadius: 9999,
                  border: "1.5px solid #16130f",
                  background: ["#FFD9A8", "#D4C8FF", "#BFE8C9", "#fffaf2", "#FFC2D1"][i],
                  boxShadow: "3px 3px 0 #16130f",
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, style: "normal", weight: 400 },
        // Registered as its own family so it can be picked by name alone.
        { name: "Serif Italic", data: serifItalic, style: "normal", weight: 400 },
      ],
    },
  );
}
