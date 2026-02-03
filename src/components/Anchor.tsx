import type { AnchorHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { Slot } from "@radix-ui/react-slot";

export type AnchorVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success" | "muted";
export type AnchorSize = "small" | "medium" | "large";

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  asChild?: boolean;
  variant?: AnchorVariant;
  size?: AnchorSize;
  underline?: "always" | "hover" | "none";
  external?: boolean;
}

function Anchor({
  children,
  className,
  asChild = false,
  variant = "primary",
  size = "medium",
  underline = "hover",
  external = false,
  ...rest
}: AnchorProps) {
  const Component = asChild ? Slot : "a";

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const baseStyles = "inline-flex items-center gap-1 font-sans transition-colors duration-200 cursor-pointer";

  const sizeStyles = classNames({
    "text-sm": size === "small",
    "text-base": size === "medium",
    "text-lg": size === "large",
  });

  const variantStyles = classNames({
    "text-neutral-900 hover:text-neutral-700": variant === "default",
    "text-primary-600 hover:text-primary-700": variant === "primary",
    "text-secondary-600 hover:text-secondary-700": variant === "secondary",
    "text-warning-600 hover:text-warning-700": variant === "warning",
    "text-danger-600 hover:text-danger-700": variant === "danger",
    "text-success-600 hover:text-success-700": variant === "success",
    "text-neutral-500 hover:text-neutral-600": variant === "muted",
  });

  const underlineStyles = classNames({
    "underline underline-offset-2": underline === "always",
    "hover:underline underline-offset-2": underline === "hover",
    "no-underline": underline === "none",
  });

  const anchorStyles = classNames(
    baseStyles,
    sizeStyles,
    variantStyles,
    underlineStyles,
    className
  );

  return (
    <Component className={anchorStyles} {...externalProps} {...rest}>
      {children}
      {external && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-[1em] w-[1em]"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M6.194 12.753a.75.75 0 0 0 1.06.053L16.5 4.44v2.81a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.553l-9.056 8.194a.75.75 0 0 0-.053 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </Component>
  );
}

Anchor.displayName = "Anchor";

export default Anchor;
