import { type InputProps, Description, Field, Input, Label } from '@headlessui/react'
import { cn } from '../util/cn';
import type { GlobalSizes } from '../types/globals';
import { type ReactElement } from 'react';

export type TextInputOrientation = 'horizontal' | 'vertical';
export type TextInputSizes = GlobalSizes;

export interface TextInputProps extends Omit<InputProps, 'size'> {
  appendElement?: ReactElement;
  block?: boolean;
  description?: string,
  error?: string;
  hasError?: boolean;
  label?: string,
  orientation?: TextInputOrientation;
  prependElement?: ReactElement;
  rounded?: boolean;
  size?: GlobalSizes
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
  rounded = false,
  size = "medium",
  ...rest
}: TextInputProps) => {
  return (
    <Field className={
      cn('inline-block', {
        "w-full grow": block
      })
    }>
      <div className={
        cn('flex', {
          "flex-row justify-center gap-4": orientation === "horizontal",
          "flex-col gap-1": orientation === "vertical"
        })
      }>
        {label && label.length > 0 && (
          <div>
            <Label className={
              cn("font-input-label font-semibold relative text-dark", {
                "text-base top-1": size === "small",
                "text-lg top-1": size === "medium",
                "text-xl top-2": size === "large",
              })
            }>{label}</Label>
          </div>
        )}

        <div className='space-y-1'>
          <div className={
            cn(
              'flex flex-row overflow-hidden rounded border border-input-border bg-input-background hover:bg-input-background-hover ring-4 ring-transparent focus-within:ring-input-ring focus-within:bg-input-background-hover placeholder:text-input-placeholder transition-colors duration-200',
              {
                "border-input-error-border focus-within:ring-input-error-ring": hasError,
                "rounded-full": rounded,
              },
              {
                "px-2 gap-2": size === "small",
                "px-2.5 gap-2.5": size === "medium",
                "px-3 gap-3": size === "large",
              },
              className
            )}>
            {prependElement && (
              <div className={
                cn('flex items-center justify-center grow-0', {
                  "text-base py-1": size === "small",
                  "text-lg py-1": size === "medium",
                  "text-xl py-1.5": size === "large",
                })
              }>                {prependElement}
              </div>
            )}
            <Input className={cn(
              "w-full h-full grow outline-0",
              {
                "text-base py-1": size === "small",
                "text-lg py-1": size === "medium",
                "text-xl py-1.5": size === "large",
              }
            )} {...rest} />
            {appendElement && (
              <div className={
                cn('flex items-center justify-center grow-0', {
                  "text-base py-1": size === "small",
                  "text-lg py-1": size === "medium",
                  "text-xl py-1.5": size === "large",
                })
              }>
                {appendElement}
              </div>
            )}
          </div>
          <div>
            {description && description.length > 0 && (
              <div>
                <Description
                  className={
                    cn(
                      'text-input-description font-input-description',
                      {
                        "text-xs": size === "small",
                        "text-sm": size === "medium",
                        "text-base": size === "large",
                      }
                    )}>
                  {description}
                </Description>
              </div>
            )}
            {hasError && error && (
              <div>
                <Description className={
                  cn(
                    'text-sm text-input-error font-input-error',
                    {
                      "text-xs": size === "small",
                      "text-sm": size === "medium",
                      "text-base": size === "large",
                    })
                }>
                  {error}
                </Description>
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
