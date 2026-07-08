import type { InputHTMLAttributes, ReactElement } from "react";
import cn from "../lib/cn";

export type TextInputType =
  "text" | "email" | "tel" | "search" | "password" | "number";
export type TextInputVariant = "default" | string;
export type TextInputSize = "sm" | "md" | "lg";

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  appendElement?: ReactElement;
  block?: boolean;
  prependElement?: ReactElement;
  size?: TextInputSize;
  type?: TextInputType;
  variant?: TextInputVariant;
}

const TextInput = ({
  appendElement,
  className = "",
  block = false,
  prependElement,
  size = "md",
  type = "text",
  variant = "default",
  ...rest
}: TextInputProps) => {
  return (
    <div
      className={cn("another-text-input", { "w-full grow": block }, className)}
      data-variant={variant}
      data-size={size}
    >
      {prependElement && (
        <div className="flex items-center justify-center aspect-square h-full">
          {prependElement}
        </div>
      )}
      <input
        className={cn({ "pr-0": !!appendElement, "pl-0": !!prependElement })}
        type={type}
        {...rest}
      />
      {appendElement && (
        <div className="flex items-center justify-center aspect-square h-full">
          {appendElement}
        </div>
      )}
    </div>
  );
};

TextInput.displayName = "TextInput";

export default TextInput;
