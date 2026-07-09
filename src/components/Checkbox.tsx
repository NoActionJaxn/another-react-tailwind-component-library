import { useId, type ReactNode } from "react";
import { Checkbox as RadixCheckbox } from "radix-ui";
import Check from "../icons/Check.tsx";
import Label from "./Label.tsx";
import cn from "../lib/cn.ts";

export type CheckboxVariant = "default" | string;
export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: ReactNode;
  reverse?: boolean;
  variant?: CheckboxVariant;
  size?: CheckboxSize;
}

const Checkbox = ({
  className,
  id,
  label,
  reverse = false,
  variant = "default",
  size = "md",
  ...rest
}: CheckboxProps) => {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;

  return (
    <div className="another-checkbox-group" data-reverse={reverse}>
      <RadixCheckbox.Root
        className={cn("another-checkbox", className)}
        data-variant={variant}
        data-size={size}
        id={checkboxId}
        {...rest}
      >
        <RadixCheckbox.Indicator className="another-checkbox-indicator">
          <Check />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <Label
          size={size}
          className="font-normal font-sans"
          htmlFor={checkboxId}
        >
          {label}
        </Label>
      )}
    </div>
  );
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
