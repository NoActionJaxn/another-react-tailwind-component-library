import { type InputProps, Description, Field, Input, Label } from '@headlessui/react'
import { cn } from '../util/cn';
import type { GlobalSizes } from '../types/globals';

export type TextInputOrientation = 'horizontal' | 'vertical';
export type TextInputSizes = GlobalSizes;

export interface TextInputProps extends Omit<InputProps, 'size'> {
  block?: boolean;
  description?: string,
  error?: string;
  hasError?: boolean;
  label?: string,
  orientation?: TextInputOrientation;
  rounded?: boolean;
  size?: GlobalSizes
}

const TextInput = ({
  block = false,
  description = "",
  error = "",
  hasError = false,
  label = "",
  orientation = "vertical",
  rounded = false,
  size = "medium",
  ...rest
}: TextInputProps) => {
  return (
    <div className={
      cn("another-text-input", {
        "w-full": block,
        "another-small-text-input": size === "small",
        "another-medium-text-input": size === "medium",
        "another-large-text-input": size === "large",
      })
    }>
      <Field className={cn(
        'flex gap-2',
        {
          'flex-col': orientation === 'vertical'
        }
      )}>
        {label && label.length > 0 && (
          <div>
            <Label>{label}</Label>
          </div>
        )}

        <div className="another-input-wrapper">
          <div className={
            cn("another-input-container",
              {
                "rounded-full": rounded,
              })
          }>
            <Input {...rest} />
          </div>

          {description && description.length > 0 && (
            <div>
              <Description className="another-text-input-description">{description}</Description>
            </div>
          )}

          {hasError && error && (
            <div>
              <Description>{error}</Description>
            </div>
          )}
        </div>
      </Field>
    </div>
  )
}

TextInput.displayName = "TextInput";

export default TextInput;
