import { Label as RadixLabel } from "radix-ui";
import cn from "../lib/cn.ts";
import type { LabelHTMLAttributes } from "react";

export type LabelVariant = "default" | string;
export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  size?: LabelSize;
}

const Label = ({
  className,
  size = "md",
  variant = "default",
  ...rest
}: LabelProps) => {
  return (
    <div className="inline-block w-auto h-min">
      <RadixLabel.Root
        className={cn("another-label", className)}
        data-variant={variant}
        data-size={size}
        {...rest}
      />
    </div>
  );
};

Label.displayName = "Label";

export default Label;
