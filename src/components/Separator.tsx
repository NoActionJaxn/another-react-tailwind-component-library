import { Separator as RadixSeparator } from "radix-ui";
import cn from "../lib/cn.ts";

export type SeparatorVariant = "default" | string;

export interface SeparatorProps extends RadixSeparator.SeparatorProps {
  variant?: SeparatorVariant;
}

const Separator = ({
  className,
  orientation = "horizontal",
  variant = "default",
  ...rest
}: SeparatorProps) => {
  return (
    <RadixSeparator.Root
      className={cn("another-separator", className)}
      data-variant={variant}
      orientation={orientation}
      {...rest}
    />
  );
};

Separator.displayName = "Separator";

export default Separator;
