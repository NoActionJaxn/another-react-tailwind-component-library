import type { CSSProperties } from "react";

export type ColorScheme = "default" | (string & {});

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/** Points --scheme-50 … 950 at --color-<name>-*; children inherit it. */
export function schemeVars(name: ColorScheme): CSSProperties {
  const vars: Record<string, string> = {};
  for (const step of STEPS) {
    vars[`--scheme-${step}`] = `var(--color-${name}-${step})`;
  }
  return vars as CSSProperties;
}
