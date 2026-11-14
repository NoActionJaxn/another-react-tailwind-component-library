import { createContext } from "react";
import type { ButtonSize, ButtonVariant } from "./Button";

/** Set by ButtonGroup: defaults for the buttons inside it. */
export const ButtonGroupContext = createContext<{
  variant?: ButtonVariant;
  size?: ButtonSize;
} | null>(null);
