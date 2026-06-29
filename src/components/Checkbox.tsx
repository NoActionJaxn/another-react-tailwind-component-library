import { cn } from '../util/cn';
import {
  Checkbox as HeadlessCheckbox,
  Field,
  Label,
  type CheckboxProps as HeadlessCheckboxProps,
} from '@headlessui/react';
import type { ReactElement } from 'react';
import type { GlobalSizes, GlobalVariants } from '../types/globals';

import Typography from './Typography';

export type CheckboxSizes = GlobalSizes;
export type CheckboxOrientation = 'horizontal' | 'vertical';
export type CheckboxVariant = GlobalVariants;
export interface CheckboxProps extends HeadlessCheckboxProps {
  label?: string;
  size?: CheckboxSizes;
  block?: boolean;
  icon?: ReactElement;
  reverse?: boolean;
  variant?: CheckboxVariant;
}

const Checkbox = ({
  block = false,
  className = '',
  disabled = false,
  label = '',
  size = 'md',
  icon = <span>&#10003;</span>,
  reverse = false,
  variant = 'default',
  ...rest
}: CheckboxProps) => {
  return (
    <Field className={cn('inline-block', { 'w-full grow': block })}>
      <div className={
        cn(
          'flex flex-row items-center',
          disabled ? 'cursor-default opacity-60' : 'cursor-pointer',
          {
            'flex-row-reverse': reverse,
            'another-checkbox-gap-xs': size === 'xs',
            'another-checkbox-gap-sm': size === 'sm',
            'another-checkbox-gap-md': size === 'md',
            'another-checkbox-gap-lg': size === 'lg',
            'another-checkbox-gap-xl': size === 'xl',
          },
        )
      }>
        <div>
          <Typography.Text as={Label} className="font-another-checkbox font-semibold" size={size}>
            {label}
          </Typography.Text>
        </div>
        <HeadlessCheckbox
          className={cn(
            'group inline-flex items-center justify-center rounded-sm border-2 transition-colors duration-200',
            {
              'another-checkbox-size-xs': size === 'xs',
              'another-checkbox-size-sm': size === 'sm',
              'another-checkbox-size-md': size === 'md',
              'another-checkbox-size-lg': size === 'lg',
              'another-checkbox-size-xl': size === 'xl',
            },
            {
              'another-checkbox-variant-default': variant === 'default',
              'another-checkbox-variant-primary': variant === 'primary',
              'another-checkbox-variant-secondary': variant === 'secondary',
              'another-checkbox-variant-success': variant === 'success',
              'another-checkbox-variant-warning': variant === 'warning',
              'another-checkbox-variant-danger': variant === 'danger',
              'another-checkbox-variant-info': variant === 'info',
            },
            className
          )}
          disabled={disabled}
          {...rest}
        >
          <span className={
            cn(
              'w-min h-min text-inherit',
              {
                'another-checkbox-icon-size-xs': size === 'xs',
                'another-checkbox-icon-size-sm': size === 'sm',
                'another-checkbox-icon-size-md': size === 'md',
                'another-checkbox-icon-size-lg': size === 'lg',
                'another-checkbox-icon-size-xl': size === 'xl',
              }
            )}>
            {icon}
          </span>
        </HeadlessCheckbox>
      </div>
    </Field>
  );
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
