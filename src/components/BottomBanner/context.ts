import { createContext } from "react";

/** The title's id, so the banner region is named by its title. */
export const BottomBannerContext = createContext<string | undefined>(undefined);
