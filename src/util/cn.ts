import classNames, { type ArgumentArray } from 'classnames'
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-another-text-3xs',
        'text-another-text-2xs',
        'text-another-text-xs',
        'text-another-text-sm',
        'text-another-text-md',
        'text-another-text-lg',
        'text-another-text-xl',
        'text-another-text-2xl',
        'text-another-title-2xs',
        'text-another-title-xs',
        'text-another-title-sm',
        'text-another-title-md',
        'text-another-title-lg',
        'text-another-title-xl',
        'text-another-title-2xl',
      ],
      'font-family': [
        'font-another-title',
        'font-another-text',
        'font-another-mono',
      ],
      'text-color': [
        {
          'text': [
            'light', 'dark',
            'default', 'default-darkest', 'default-dark', 'default-neutral', 'default-light', 'default-lightest',
            'primary', 'primary-darkest', 'primary-dark', 'primary-neutral', 'primary-light', 'primary-lightest',
            'secondary', 'secondary-darkest', 'secondary-dark', 'secondary-neutral', 'secondary-light', 'secondary-lightest',
            'success', 'success-darkest', 'success-dark', 'success-neutral', 'success-light', 'success-lightest',
            'warning', 'warning-darkest', 'warning-dark', 'warning-neutral', 'warning-light', 'warning-lightest',
            'danger', 'danger-darkest', 'danger-dark', 'danger-neutral', 'danger-light', 'danger-lightest',
            'info', 'info-darkest', 'info-dark', 'info-neutral', 'info-light', 'info-lightest',
          ]
        },
      ],
      'bg-color': [
        {
          'bg': [
            'light', 'dark',
            'default', 'default-darkest', 'default-dark', 'default-neutral', 'default-light', 'default-lightest',
            'primary', 'primary-darkest', 'primary-dark', 'primary-neutral', 'primary-light', 'primary-lightest',
            'secondary', 'secondary-darkest', 'secondary-dark', 'secondary-neutral', 'secondary-light', 'secondary-lightest',
            'success', 'success-darkest', 'success-dark', 'success-neutral', 'success-light', 'success-lightest',
            'warning', 'warning-darkest', 'warning-dark', 'warning-neutral', 'warning-light', 'warning-lightest',
            'danger', 'danger-darkest', 'danger-dark', 'danger-neutral', 'danger-light', 'danger-lightest',
            'info', 'info-darkest', 'info-dark', 'info-neutral', 'info-light', 'info-lightest',
          ]
        },
      ],
      'border-color': [
        {
          'border': [
            'light', 'dark',
            'default', 'default-darkest', 'default-dark', 'default-neutral', 'default-light', 'default-lightest',
            'primary', 'primary-darkest', 'primary-dark', 'primary-neutral', 'primary-light', 'primary-lightest',
            'secondary', 'secondary-darkest', 'secondary-dark', 'secondary-neutral', 'secondary-light', 'secondary-lightest',
            'success', 'success-darkest', 'success-dark', 'success-neutral', 'success-light', 'success-lightest',
            'warning', 'warning-darkest', 'warning-dark', 'warning-neutral', 'warning-light', 'warning-lightest',
            'danger', 'danger-darkest', 'danger-dark', 'danger-neutral', 'danger-light', 'danger-lightest',
            'info', 'info-darkest', 'info-dark', 'info-neutral', 'info-light', 'info-lightest',
          ]
        },
      ],
    },
  },
});

/**
 * Combines class name arguments and merges Tailwind classes.
 *
 * @param args - Class name values in the same shape accepted by `classnames`.
 * @returns A single string with merged Tailwind-compatible class names.
 */
export const cn = (...args: ArgumentArray) => {
  return twMerge(classNames(args));
}
