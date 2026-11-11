import classNames, { type ArgumentArray } from "classnames";
import { twMerge } from "tailwind-merge";

/** classnames, then tailwind-merge so later conflicting classes win. */
export function tw(...inputs: ArgumentArray): string {
  return twMerge(classNames(...inputs));
}
