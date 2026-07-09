import { Label as RadixLabel } from "radix-ui";
import cn from "../lib/cn.ts";

export type LabelVariant = "default" | string;
export type LabelSize = "sm" | "md" | "lg";

export interface LabelProps extends RadixLabel.LabelProps {
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
    <RadixLabel.Root
      className={cn("another-label", className)}
      data-variant={variant}
      data-size={size}
      {...rest}
    />
  );
};

Label.displayName = "Label";

export default Label;
