import React from "react";
import classNames from "classnames";

export type TagVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type TagSize = "small" | "medium" | "large";

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  rounded?: boolean;
  onRemove?: () => void;
  className?: string;
}

function Tag({
  children,
  variant = "default",
  size = "medium",
  rounded = false,
  onRemove,
  className,
}: TagProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium select-none";

  const sizeStyles = classNames(
    rounded ? {
      "px-2.5 gap-1 text-xs": size === "small",
      "px-3 gap-1.5 text-sm": size === "medium",
      "px-4 gap-2 text-base": size === "large",
    } : {
      "px-2 gap-1 text-xs": size === "small",
      "px-2.5 gap-1.5 text-sm": size === "medium",
      "px-3 gap-2 text-base": size === "large",
    },
    {
      "h-5": size === "small",
      "h-6": size === "medium",
      "h-7": size === "large",
    }
  );

  const cornerRadius = classNames({
    "rounded-md": !rounded,
    "rounded-full": rounded,
  });

  const variantStyles = classNames({
    "bg-neutral-800 text-light": variant === "default",
    "bg-primary-500 text-light": variant === "primary",
    "bg-neutral-100 text-dark": variant === "secondary",
    "bg-warning-500 text-light": variant === "warning",
    "bg-danger-500 text-light": variant === "danger",
    "bg-success-500 text-light": variant === "success",
  });

  const borderStyles = classNames("border", {
    "border-transparent": ["default", "primary", "warning", "danger", "success"].includes(variant),
    "border-neutral-400": variant === "secondary",
  });

  const removeButtonStyles = classNames(
    "ml-1 -mr-1 rounded-full p-0.5 transition-colors",
    "hover:bg-black/10 focus:outline-none",
    {
      "hover:bg-white/20": variant !== "secondary",
      "hover:bg-black/10": variant === "secondary",
    }
  );

  return (
    <span
      className={classNames(
        baseStyles,
        sizeStyles,
        cornerRadius,
        variantStyles,
        borderStyles,
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={removeButtonStyles}
          aria-label="Remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size === "small" ? 12 : size === "medium" ? 14 : 16}
            height={size === "small" ? 12 : size === "medium" ? 14 : 16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";

export default Tag;
