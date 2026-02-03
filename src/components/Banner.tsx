import React, { useState } from "react";
import classNames from "classnames";

export type BannerVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";

export interface BannerProps {
  title?: string;
  children: React.ReactNode;
  variant?: BannerVariant;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const defaultIcons: Record<BannerVariant, React.ReactNode> = {
  default: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  primary: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  secondary: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  danger: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

function Banner({
  title,
  children,
  variant = "default",
  icon,
  dismissible = false,
  onDismiss,
  className,
}: BannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const containerStyles = classNames(
    "flex items-start gap-3 p-4 rounded-lg border",
    {
      "bg-neutral-100 border-neutral-200 text-neutral-800": variant === "default",
      "bg-primary-50 border-primary-200 text-primary-800": variant === "primary",
      "bg-neutral-50 border-neutral-300 text-neutral-700": variant === "secondary",
      "bg-warning-50 border-warning-200 text-warning-800": variant === "warning",
      "bg-danger-50 border-danger-200 text-danger-800": variant === "danger",
      "bg-success-50 border-success-200 text-success-800": variant === "success",
    },
    className
  );

  const iconStyles = classNames("shrink-0 mt-0.5", {
    "text-neutral-600": variant === "default",
    "text-primary-600": variant === "primary",
    "text-neutral-500": variant === "secondary",
    "text-warning-600": variant === "warning",
    "text-danger-600": variant === "danger",
    "text-success-600": variant === "success",
  });

  const closeButtonStyles = classNames(
    "shrink-0 p-1 rounded-md transition-colors cursor-pointer ml-auto",
    {
      "hover:bg-neutral-200 text-neutral-600": variant === "default",
      "hover:bg-primary-100 text-primary-600": variant === "primary",
      "hover:bg-neutral-200 text-neutral-500": variant === "secondary",
      "hover:bg-warning-100 text-warning-600": variant === "warning",
      "hover:bg-danger-100 text-danger-600": variant === "danger",
      "hover:bg-success-100 text-success-600": variant === "success",
    }
  );

  const descriptionStyles = classNames("text-sm", {
    "text-neutral-600": variant === "default",
    "text-primary-700": variant === "primary",
    "text-neutral-500": variant === "secondary",
    "text-warning-700": variant === "warning",
    "text-danger-700": variant === "danger",
    "text-success-700": variant === "success",
  });

  return (
    <div className={containerStyles} role="alert">
      <span className={iconStyles}>{icon ?? defaultIcons[variant]}</span>
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium">{title}</p>}
        <div className={descriptionStyles}>{children}</div>
      </div>
      {dismissible && (
        <button
          className={closeButtonStyles}
          onClick={handleDismiss}
          aria-label="Dismiss"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
    </div>
  );
}

Banner.displayName = "Banner";

export default Banner;
