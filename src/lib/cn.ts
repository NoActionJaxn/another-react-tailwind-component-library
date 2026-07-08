import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: classNames.ArgumentArray) {
  return twMerge(classNames(...inputs));
}

export function cnWhitelisted(
  whitelist: string[],
  ...inputs: classNames.ArgumentArray
) {
  const merged = twMerge(classNames(...inputs));
  const allowed = merged
    .split(/\s+/)
    .filter(Boolean)
    .filter((className) => {
      if (className.startsWith("another-")) {
        return true;
      }

      return whitelist.some(
        (allowedClass) =>
          className === allowedClass ||
          className.startsWith(`${allowedClass}-`),
      );
    });

  return allowed.join(" ");
}

export default cn;
