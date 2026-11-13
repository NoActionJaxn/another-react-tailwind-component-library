import type { ReactNode } from "react";

/** True when an optional slot has something to render; "" counts as empty. */
export function hasContent(node: ReactNode) {
  return node != null && node !== false && node !== "";
}
