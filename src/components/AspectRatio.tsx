import classNames from "classnames";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

export interface AspectRatioProps extends AspectRatioPrimitive.AspectRatioProps {
  children: React.ReactNode;
  className?: string;
}

function AspectRatio({
  children,
  ratio = 16 / 9,
  className,
}: AspectRatioProps) {
  return (
    <AspectRatioPrimitive.Root
      ratio={ratio}
      className={classNames("overflow-hidden rounded", className)}
    >
      {children}
    </AspectRatioPrimitive.Root>
  );
}

AspectRatio.displayName = "AspectRatio";

export default AspectRatio;
