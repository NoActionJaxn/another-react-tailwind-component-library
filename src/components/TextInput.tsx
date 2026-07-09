import {
  useId,
  type InputHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import cn from "../lib/cn";
import Label from "./Label";

export type TextInputType =
  "text" | "email" | "tel" | "search" | "password" | "number";
export type TextInputVariant = "default" | string;
export type TextInputSize = "sm" | "md" | "lg";
export type TextInputOrientation = "horizontal" | "vertical";

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size"
> {
  appendElement?: ReactElement;
  block?: boolean;
  label?: ReactNode;
  orientation?: TextInputOrientation;
  prependElement?: ReactElement;
  size?: TextInputSize;
  type?: TextInputType;
  variant?: TextInputVariant;
}

const TextInput = ({
  appendElement,
  className = "",
  block = false,
  id,
  label,
  orientation = "vertical",
  prependElement,
  size = "md",
  type = "text",
  variant = "default",
  ...rest
}: TextInputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div
      className={cn("another-text-input-group", { "w-full": block })}
      data-orientation={orientation}
    >
      {label && (
        <Label size={size} htmlFor={inputId}>
          {label}
        </Label>
      )}
      <div
        className={cn(
          "another-text-input",
          { "w-full grow": block },
          className,
        )}
        data-variant={variant}
        data-size={size}
      >
        {prependElement && (
          <div className="flex items-center justify-center aspect-square h-full">
            {prependElement}
          </div>
        )}
        <input
          id={inputId}
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
    </div>
  );
};

TextInput.displayName = "TextInput";

export default TextInput;
