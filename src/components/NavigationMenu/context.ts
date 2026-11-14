import { createContext, type RefObject } from "react";

/**
 * Set by Header: its element, so the menu's full-screen panel can start under
 * the header's bar while the bar (and its close button) stays visible.
 */
export const MenuHostContext = createContext<
  RefObject<HTMLElement | null> | undefined
>(undefined);

/** True while the menu is collapsed into the hamburger panel. */
export const CompactMenuContext = createContext(false);
