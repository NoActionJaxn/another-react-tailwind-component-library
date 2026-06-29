import { cn } from '../util/cn';
import Typography from './Typography';
import { type TextareaProps as HeadlessTextAreaProps, Description, Field, Textarea as HeadlessTextArea, Label } from '@headlessui/react'
import type { GlobalSizes, GlobalVariants } from '../types/globals';
import type { ReactElement } from 'react';

export type TextAreaOrientation = 'horizontal' | 'vertical';
export type TextAreaSizes = GlobalSizes;
export type TextAreaVariants = GlobalVariants;

export interface TextAreaProps extends Omit<HeadlessTextAreaProps, 'size'> {
  block?: boolean;
  description?: string,
  error?: string;
  hasError?: boolean;
  label?: string,
  orientation?: TextAreaOrientation;
  prependElement?: ReactElement;
  size?: TextAreaSizes;
  variant?: TextAreaVariants;
}

const TextArea = ({
  block = false,
  className = '',
  description = "",
  error = "",
  hasError = false,
  label = "",
  orientation = "vertical",
  prependElement,
  size = "md",
  variant = "default",
  ...rest
}: TextAreaProps) => {
  const descriptionSize = (size: TextAreaSizes) => {
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
                  "inline-block font-another-text-area-label font-semibold",
                  {
                    "another-text-area-padding-xs": size === "xs",
                    "another-text-area-padding-sm": size === "sm",
                    "another-text-area-padding-md": size === "md",
                    "another-text-area-padding-lg": size === "lg",
                    "another-text-area-padding-xl": size === "xl",
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
                'another-text-area-variant-default': variant === 'default',
                'another-text-area-variant-primary': variant === 'primary',
                'another-text-area-variant-secondary': variant === 'secondary',
                'another-text-area-variant-success': variant === 'success',
                'another-text-area-variant-warning': variant === 'warning',
                'another-text-area-variant-danger': variant === 'danger',
                'another-text-area-variant-info': variant === 'info',
              },
              className
            )}>
            {prependElement && (
              <div className={
                cn(
                  'flex items-start justify-center grow-0 pr-0!',
                  {
                    "another-text-area-size-xs another-text-area-padding-xs": size === "xs",
                    "another-text-area-size-sm another-text-area-padding-sm": size === "sm",
                    "another-text-area-size-md another-text-area-padding-md": size === "md",
                    "another-text-area-size-lg another-text-area-padding-lg": size === "lg",
                    "another-text-area-size-xl another-text-area-padding-xl": size === "xl",
                  },
                )}>
                {prependElement}
              </div>
            )}
            <HeadlessTextArea
              className={
                cn(
                  "h-full font-another-text-area grow outline-0",
                  {
                    "another-text-area-size-xs another-text-area-padding-xs": size === "xs",
                    "another-text-area-size-sm another-text-area-padding-sm": size === "sm",
                    "another-text-area-size-md another-text-area-padding-md": size === "md",
                    "another-text-area-size-lg another-text-area-padding-lg": size === "lg",
                    "another-text-area-size-xl another-text-area-padding-xl": size === "xl",
                  },
                )}
              {...rest}
            />
          </div>
          <div>
            {description && description.length > 0 && (
              <div>
                <Typography.Text as={Description} className="font-another-text-area-label" size={descriptionSize(size)}>
                  {description}
                </Typography.Text>
              </div>
            )}
            {hasError && error && (
              <div>
                <Typography.Text as={Description} className="font-another-text-area-label text-danger" size={descriptionSize(size)}>
                  {error}
                </Typography.Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Field >
  )
}

TextArea.displayName = "TextArea";

export default TextArea;
