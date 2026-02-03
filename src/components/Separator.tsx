import classNames from "classnames";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
  className?: string;
}

function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      orientation={orientation}
      decorative={decorative}
      className={classNames(
        "bg-neutral-200 shrink-0",
        {
          "h-px w-full": orientation === "horizontal",
          "w-px h-full": orientation === "vertical",
        },
        className
      )}
    />
  );
}

Separator.displayName = "Separator";

export default Separator;
