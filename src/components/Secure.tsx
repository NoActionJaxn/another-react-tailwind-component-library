import { type ReactNode } from "react";
import { VisuallyHidden } from "radix-ui";
import cn from "../lib/cn.ts";

export interface SecureProps {
  children: ReactNode;
  className?: string;
  fallback: ReactNode;
  reveal?: boolean;
}

const Secure = ({
  children,
  className,
  fallback,
  reveal = false,
}: SecureProps) => {
  if (reveal) {
    return <span className={cn("another-secure", className)}>{children}</span>;
  }

  return (
    <span className={cn("another-secure", className)}>
      <span aria-hidden="true">{fallback}</span>
      <VisuallyHidden.Root>{children}</VisuallyHidden.Root>
    </span>
  );
};

Secure.displayName = "Secure";

export default Secure;
