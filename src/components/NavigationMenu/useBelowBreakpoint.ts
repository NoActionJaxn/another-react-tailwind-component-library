import { useSyncExternalStore } from "react";

export type CollapseBreakpoint = "sm" | "md" | "lg" | "xl";

const fallback = { sm: "40rem", md: "48rem", lg: "64rem", xl: "80rem" };

// Reads Tailwind's --breakpoint-* so a theme that changes them is followed.
function query(breakpoint: CollapseBreakpoint) {
  const value =
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--breakpoint-${breakpoint}`)
      .trim() || fallback[breakpoint];
  return window.matchMedia(`(width < ${value})`);
}

/** Whether the window is narrower than the breakpoint ("always" / "never" are fixed). */
export function useBelowBreakpoint(
  breakpoint: CollapseBreakpoint | "always" | "never",
) {
  return useSyncExternalStore(
    (onChange) => {
      if (breakpoint === "always" || breakpoint === "never") return () => {};
      const media = query(breakpoint);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () =>
      breakpoint === "always" ||
      (breakpoint !== "never" && query(breakpoint).matches),
    () => breakpoint === "always",
  );
}
