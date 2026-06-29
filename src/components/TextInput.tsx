import { type InputProps, Description, Field, Input, Label } from '@headlessui/react'
import Typography from './Typography';

import { cn } from '../util/cn';
import type { GlobalSizes, GlobalVariants } from '../types/globals';
import type { ReactElement } from 'react';

export type TextInputOrientation = 'horizontal' | 'vertical';
export type TextInputSizes = GlobalSizes;
export type TextInputVariants = GlobalVariants;

export interface TextInputProps extends Omit<InputProps, 'size'> {
  appendElement?: ReactElement;
  block?: boolean;
  description?: string,
  error?: string;
  hasError?: boolean;
  label?: string,
  orientation?: TextInputOrientation;
  prependElement?: ReactElement;
  size?: GlobalSizes
  variant?: TextInputVariants;

}

const TextInput = ({
  appendElement,
  block = false,
  className,
  description = "",
  error = "",
  hasError = false,
  label = "",
  orientation = "vertical",
  prependElement,
  size = "md",
  variant = 'default',
  ...rest
}: TextInputProps) => {
  const descriptionSize = (size: TextInputSizes) => {
    switch (size) {
      case 'xs':
        return '2xs';
      case 'sm':
        return 'xs';
      case 'lg':
        return 'md';
      case 'xl':
        return 'lg';
      case 'md':
      default:
        return 'sm';
    }
  }


  return (
    <Field className={
      cn(
        'inline-block h-min',
        block
          ? "w-full grow"
          : "max-w-sm"
      )
    }>
      <div className={
        cn('flex',
          {
            "flex-row justify-center": orientation === "horizontal",
            "flex-col gap-1": orientation === "vertical"
          },
        )
      }>
        {label && label.length > 0 && (
          <div className='p-0.5'>
            <Typography.Text
              as={Label}
              className={
                cn(
                  "inline-block font-another-text-input-label font-semibold",
                  {
                    "another-text-input-padding-xs": size === "xs",
                    "another-text-input-padding-sm": size === "sm",
                    "another-text-input-padding-md": size === "md",
                    "another-text-input-padding-lg": size === "lg",
                    "another-text-input-padding-xl": size === "xl",
                  },
                )
              }
              size={size}
            >
              {label}
            </Typography.Text>
          </div>
        )}

        <div>
          <div className={
            cn(
              'flex flex-row overflow-hidden border-2 rounded-sm',
              {
                "ring-4 ring-danger-lightest": hasError,
              },
              {
                'another-text-input-variant-default': variant === 'default',
                'another-text-input-variant-primary': variant === 'primary',
                'another-text-input-variant-secondary': variant === 'secondary',
                'another-text-input-variant-success': variant === 'success',
                'another-text-input-variant-warning': variant === 'warning',
                'another-text-input-variant-danger': variant === 'danger',
                'another-text-input-variant-info': variant === 'info',
              },
              className
            )}>
            {prependElement && (
              <div className={
                cn(
                  'flex items-start justify-center grow-0 pr-0!',
                  {
                    "another-text-input-size-xs another-text-input-padding-xs": size === "xs",
                    "another-text-input-size-sm another-text-input-padding-sm": size === "sm",
                    "another-text-input-size-md another-text-input-padding-md": size === "md",
                    "another-text-input-size-lg another-text-input-padding-lg": size === "lg",
                    "another-text-input-size-xl another-text-input-padding-xl": size === "xl",
                  },
                )}>
                {prependElement}
              </div>
            )}
            <Input
              className={
                cn(
                  "h-full font-another-text-input grow outline-0",
                  {
                    "another-text-input-size-xs another-text-input-padding-xs": size === "xs",
                    "another-text-input-size-sm another-text-input-padding-sm": size === "sm",
                    "another-text-input-size-md another-text-input-padding-md": size === "md",
                    "another-text-input-size-lg another-text-input-padding-lg": size === "lg",
                    "another-text-input-size-xl another-text-input-padding-xl": size === "xl",
                  },
                )}
              {...rest}
            />
            {appendElement && (
              <div className={
                cn(
                  'flex items-start justify-center grow-0 pl-0!',
                  {
                    "another-text-input-size-xs another-text-input-padding-xs": size === "xs",
                    "another-text-input-size-sm another-text-input-padding-sm": size === "sm",
                    "another-text-input-size-md another-text-input-padding-md": size === "md",
                    "another-text-input-size-lg another-text-input-padding-lg": size === "lg",
                    "another-text-input-size-xl another-text-input-padding-xl": size === "xl",
                  },
                )}>
                {appendElement}
              </div>
            )}
          </div>
          <div>
            {description && description.length > 0 && (
              <div>
                <Typography.Text as={Description} className="font-another-text-input-label" size={descriptionSize(size)}>
                  {description}
                </Typography.Text>
              </div>
            )}
            {hasError && error && (
              <div>
                <Typography.Text as={Description} className="font-another-text-input-label text-danger" size={descriptionSize(size)}>
                  {error}
                </Typography.Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Field>
  )
}

TextInput.displayName = "TextInput";

export default TextInput;
