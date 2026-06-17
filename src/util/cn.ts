import classNames, { type ArgumentArray } from 'classnames'
import { twMerge } from 'tailwind-merge';


/**
 * Combines class name arguments and merges Tailwind classes.
 *
 * @param args - Class name values in the same shape accepted by `classnames`.
 * @returns A single string with merged Tailwind-compatible class names.
 */
export const cn = (...args: ArgumentArray) => {
  return twMerge(classNames(args));
}
