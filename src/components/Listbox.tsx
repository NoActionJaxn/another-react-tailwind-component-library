import {
  Description,
  Field,
  Label,
  Listbox as HeadlessListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from '@headlessui/react'
import { cn } from '../util/cn';
import type { GlobalSizes } from '../types/globals';
import type { ReactElement } from 'react';

export type ListboxOrientation = 'horizontal' | 'vertical';
export type ListboxSize = GlobalSizes;

export interface ListboxItem {
  value: string | number;
  label: string;
}

export interface ListboxProps {
  block?: boolean;
  className?: string;
  description?: string;
  error?: string;
  hasError?: boolean;
  label?: string;
  orientation?: ListboxOrientation;
  options: ListboxItem[];
  prependElement?: ReactElement;
  rounded?: boolean;
  size?: GlobalSizes;
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const Listbox = ({
  block = false,
  className,
  description = "",
  error = "",
  hasError = false,
  label = "",
  orientation = "vertical",
  options,
  prependElement,
  rounded = false,
  size = "medium",
  value,
  onChange,
}: ListboxProps) => {
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption?.label || 'Select an option';

  return (
    <Field className={cn('inline-block', {
      "w-full grow": block
    })}>
      <div className={cn('flex', {
        "flex-row justify-center gap-4": orientation === "horizontal",
        "flex-col gap-1": orientation === "vertical"
      })}>
        {label && label.length > 0 && (
          <div>
            <Label className={cn("font-listbox-label font-semibold relative text-dark", {
              "text-base top-1": size === "small",
              "text-lg top-1": size === "medium",
              "text-xl top-2": size === "large",
            })}>
              {label}
            </Label>
          </div>
        )}

        <div className='space-y-1'>
          <HeadlessListbox value={value} onChange={onChange}>
            <div className={cn(
              'flex flex-row overflow-hidden rounded border border-listbox-border bg-listbox-background hover:bg-listbox-background-hover ring-4 ring-transparent focus-within:ring-listbox-ring focus-within:bg-listbox-background-hover transition-colors duration-200',
              {
                "border-listbox-error-border focus-within:ring-listbox-error-ring": hasError,
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
                <div className={cn('flex items-center justify-center grow-0', {
                  "text-base py-1": size === "small",
                  "text-lg py-1": size === "medium",
                  "text-xl py-1.5": size === "large",
                })}>
                  {prependElement}
                </div>
              )}

              <ListboxButton className={cn(
                "w-full h-full grow outline-0 bg-transparent border-0 cursor-pointer text-left text-dark",
                {
                  "text-base py-1": size === "small",
                  "text-lg py-1": size === "medium",
                  "text-xl py-1.5": size === "large",
                }
              )}>
                {displayText}
              </ListboxButton>
            </div>

            <ListboxOptions className={cn(
              'absolute z-10 w-56 bg-listbox-background border border-listbox-border rounded mt-1 shadow-lg max-h-64 overflow-y-auto'
            )}>
              {options.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className={cn(
                    'cursor-pointer transition-colors duration-150',
                    {
                      "text-base py-1 px-2": size === "small",
                      "text-lg py-1 px-2.5": size === "medium",
                      "text-xl py-1.5 px-3": size === "large",
                    }
                  )}
                >
                  {({ selected, focus }: { selected: boolean; focus: boolean }) => (
                    <div className={cn(
                      'w-full',
                      {
                        'bg-listbox-option-background-selected text-listbox-option-text': selected,
                        'bg-listbox-option-background-hover text-listbox-option-text': focus && !selected,
                        'bg-listbox-option-background text-listbox-option-text': !selected && !focus,
                      }
                    )}>
                      {option.label}
                    </div>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </HeadlessListbox>

          <div>
            {description && description.length > 0 && (
              <div>
                <Description className={cn(
                  'text-listbox-description font-listbox-description',
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
                <Description className={cn(
                  'text-sm text-listbox-error font-listbox-error',
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
  );
};

Listbox.displayName = "Listbox";

export default Listbox;
