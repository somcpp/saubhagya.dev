import { monogram } from "@/lib/monogram";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so this one is a full square.
export default function AppleIcon() {
  return monogram(size.width, false);
}
