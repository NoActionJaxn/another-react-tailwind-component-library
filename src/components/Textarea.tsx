import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import cn from "../lib/cn";
import Label from "./Label";

export type TextareaVariant = "default" | string;
export type TextareaSize = "sm" | "md" | "lg";
export type TextareaOrientation = "horizontal" | "vertical";

export interface TextareaProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> {
  block?: boolean;
  label?: ReactNode;
  orientation?: TextareaOrientation;
  size?: TextareaSize;
  variant?: TextareaVariant;
}

const Textarea = ({
  className = "",
  block = false,
  id,
  label,
  orientation = "vertical",
  size = "md",
  variant = "default",
  ...rest
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <div
      className={cn("another-textarea-group", { "w-full": block })}
      data-orientation={orientation}
    >
      {label && (
        <Label size={size} htmlFor={textareaId}>
          {label}
        </Label>
      )}
      <textarea
        id={textareaId}
        className={cn("another-textarea", { "w-full grow": block }, className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      />
    </div>
  );
};

Textarea.displayName = "Textarea";

export default Textarea;
