import { Progress as RadixProgress } from "radix-ui";
import cn from "../lib/cn.ts";

export type ProgressVariant = "default" | string;
export type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends RadixProgress.ProgressProps {
  size?: ProgressSize;
  variant?: ProgressVariant;
}

const Progress = ({
  className,
  max = 100,
  size = "md",
  value,
  variant = "default",
  ...rest
}: ProgressProps) => {
  const percentage =
    value != null ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;

  return (
    <RadixProgress.Root
      className={cn("another-progress", className)}
      data-variant={variant}
      data-size={size}
      max={max}
      value={value}
      {...rest}
    >
      <RadixProgress.Indicator
        className="another-progress-indicator"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </RadixProgress.Root>
  );
};

Progress.displayName = "Progress";

export default Progress;
