import { createContext } from "react";

/** Set by InputGroup: the size for the inputs and selects inside it. */
export const InputGroupContext = createContext<{
  size?: "sm" | "md" | "lg";
} | null>(null);
