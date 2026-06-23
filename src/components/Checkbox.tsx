import { type ReactElement } from 'react';
import { cn } from '../util/cn';
import type { GlobalSizes, GlobalVariants } from '../types/globals';
import {
  type CheckboxProps as HeadlessCheckboxProps,
  Checkbox as HeadlessCheckbox,
  Field,
  Label
} from '@headlessui/react';

export type CheckboxSizes = GlobalSizes;
export type CheckboxOrientation = 'horizontal' | 'vertical';
export type CheckboxVariants = GlobalVariants;
export type CheckboxLabelPosition = 'before' | 'after';

export interface CheckboxProps extends HeadlessCheckboxProps {
  label?: string;
  size?: CheckboxSizes;
  block?: boolean;
  icon?: ReactElement;
  variant?: CheckboxVariants;
  labelPosition?: CheckboxLabelPosition;
  className?: string;
}

const Checkbox = ({
  label = '',
  size = 'medium',
  block = false,
  icon,
  variant = 'default',
  labelPosition = 'after',
  className,
  ...rest
}: CheckboxProps) => {
  return (
    <Field className={cn('inline-block', { 'w-full grow': block })}>
      <div className={cn('flex flex-row items-center gap-3')}>
        {label && label.length > 0 && labelPosition === 'before' && (
          <div>
            <Label
              className={cn('font-input-label font-semibold relative text-dark', {
                'text-sm': size === 'small',
                'text-base': size === 'medium',
                'text-lg': size === 'large'
              })}
            >
              {label}
            </Label>
          </div>
        )}
        <HeadlessCheckbox
          className={cn(
            'group inline-flex items-center justify-center outline-0 rounded border ring-4 ring-transparent transition-colors duration-200',
            {
              'w-4 h-4': size === 'small',
              'w-5 h-5': size === 'medium',
              'w-6 h-6': size === 'large'
            },
            {
              'bg-checkbox-default-background hover:bg-checkbox-default-background-hover border-checkbox-default-border text-checkbox-default-check': variant === 'default',
              'bg-checkbox-primary-background hover:bg-checkbox-primary-background-hover border-checkbox-primary-border text-checkbox-primary-check': variant === 'primary',
              'bg-checkbox-secondary-background hover:bg-checkbox-secondary-background-hover border-checkbox-secondary-border text-checkbox-secondary-check': variant === 'secondary',
              'bg-checkbox-success-background hover:bg-checkbox-success-background-hover border-checkbox-success-border text-checkbox-success-check': variant === 'success',
              'bg-checkbox-warning-background hover:bg-checkbox-warning-background-hover border-checkbox-warning-border text-checkbox-warning-check': variant === 'warning',
              'bg-checkbox-danger-background hover:bg-checkbox-danger-background-hover border-checkbox-danger-border text-checkbox-danger-check': variant === 'danger',
              'bg-checkbox-info-background hover:bg-checkbox-info-background-hover border-checkbox-info-border text-checkbox-info-check': variant === 'info',
            },
            className
          )}
          {...rest}
        >
          {icon ? (
            <span className={
              cn(
                'flex items-center justify-center text-light',
                {
                  'text-xs': size === 'small',
                  'text-sm': size === 'medium',
                  'text-base': size === 'large'
                }
              )}>
              {icon}
            </span>
          ) : (
            <svg
              className="opacity-0 group-data-checked:opacity-100 text-light"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
            </svg>
          )}
        </HeadlessCheckbox>
        {label && label.length > 0 && labelPosition === 'after' && (
          <Label
            className={cn('font-input-label font-semibold relative text-dark', {
              'text-sm': size === 'small',
              'text-base': size === 'medium',
              'text-lg': size === 'large'
            })}
          >
            {label}
          </Label>
        )}
      </div>
    </Field>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
