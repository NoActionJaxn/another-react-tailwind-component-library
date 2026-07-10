import { useId, type ReactNode } from "react";
import { Switch as RadixSwitch } from "radix-ui";
import Label from "./Label.tsx";
import cn from "../lib/cn.ts";

export type SwitchVariant = "default" | string;
export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends RadixSwitch.SwitchProps {
  label?: ReactNode;
  reverse?: boolean;
  variant?: SwitchVariant;
  size?: SwitchSize;
}

const Switch = ({
  className,
  id,
  label,
  reverse = false,
  variant = "default",
  size = "md",
  ...rest
}: SwitchProps) => {
  const generatedId = useId();
  const switchId = id ?? generatedId;

  return (
    <div className="another-switch-group" data-reverse={reverse}>
      <RadixSwitch.Root
        className={cn("another-switch", className)}
        data-variant={variant}
        data-size={size}
        id={switchId}
        {...rest}
      >
        <RadixSwitch.Thumb className="another-switch-thumb" />
      </RadixSwitch.Root>
      {label && (
        <Label size={size} className="font-normal font-sans" htmlFor={switchId}>
          {label}
        </Label>
      )}
    </div>
  );
};

Switch.displayName = "Switch";

export default Switch;
