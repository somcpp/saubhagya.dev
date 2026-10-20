import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** The "s" monogram used for the favicon and Apple touch icon. */
export async function monogram(px: number, rounded: boolean) {
  const italic = await readFile(join(process.cwd(), "src/assets/fonts/InstrumentSerif-Italic.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16130f",
          borderRadius: rounded ? 9999 : 0,
          color: "#f4efe6",
          fontFamily: "Serif Italic",
          fontSize: px * 0.78,
          paddingBottom: px * 0.12,
          position: "relative",
        }}
      >
        s
        <div
          style={{
            position: "absolute",
            right: px * 0.16,
            top: px * 0.16,
            width: px * 0.16,
            height: px * 0.16,
            borderRadius: 9999,
            background: "#ff5a1f",
          }}
        />
      </div>
    ),
    {
      width: px,
      height: px,
      fonts: [{ name: "Serif Italic", data: italic, style: "normal", weight: 400 }],
    },
  );
}
