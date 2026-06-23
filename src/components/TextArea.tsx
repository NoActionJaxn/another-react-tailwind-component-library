import { type TextareaProps as HeadlessTextAreaProps, Description, Field, Textarea as HeadlessTextArea, Label } from '@headlessui/react'
import { cn } from '../util/cn';
import type { GlobalSizes } from '../types/globals';
import { type ReactElement } from 'react';

export type TextAreaOrientation = 'horizontal' | 'vertical';
export type TextAreaSizes = GlobalSizes;

export interface TextAreaProps extends Omit<HeadlessTextAreaProps, 'size'> {
  block?: boolean;
  description?: string,
  error?: string;
  hasError?: boolean;
  label?: string,
  orientation?: TextAreaOrientation;
  prependElement?: ReactElement;
  rounded?: boolean;
  size?: GlobalSizes
}

const TextArea = ({
  block = false,
  description = "",
  error = "",
  hasError = false,
  label = "",
  orientation = "vertical",
  prependElement,
  rounded = false,
  size = "medium",
  ...rest
}: TextAreaProps) => {
  return (
    <Field className={
      cn('inline-block', {
        "w-full grow": block,
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
            )}>
            {prependElement && (
              <div className={
                cn('flex items-start justify-center grow-0', {
                  "text-base px-0.5 py-1": size === "small",
                  "text-lg px-1 py-1": size === "medium",
                  "text-xl px-2.5 py-1.5": size === "large",
                })}>
                {prependElement}
              </div>
            )}
            <HeadlessTextArea className={cn(
              "w-full h-full grow outline-0",
              {
                "text-base px-2 py-1": size === "small",
                "text-lg px-2.5 py-1": size === "medium",
                "text-xl px-3 py-1.5": size === "large",
              }
            )} {...rest} />
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

TextArea.displayName = "TextArea";

export default TextArea;
