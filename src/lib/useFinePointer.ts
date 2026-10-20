import { useSyncExternalStore } from "react";

/** Live result of a CSS media query. Always false during SSR. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a mouse/trackpad. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
