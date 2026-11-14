import { createContext, type ReactNode } from "react";

export interface ListContextValue {
  size?: "sm" | "md" | "lg";
  /** Marker icon for the list's own items; nested lists reset it. */
  icon?: ReactNode;
}

export const ListContext = createContext<ListContextValue>({});
