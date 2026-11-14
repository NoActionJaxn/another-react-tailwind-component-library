import { Cross2Icon } from "@radix-ui/react-icons";
import type { ComponentProps, ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { statusRole, type Status } from "../_status/status";
import { StatusIcon } from "../_status/StatusIcon";

export type BannerVariant = "soft" | "solid" | "outline";
export type BannerStatus = Status;
export interface BannerProps extends ComponentProps<"div"> {
  variant?: BannerVariant;
  status?: BannerStatus;
  colorScheme?: ColorScheme;
  icon?: ReactNode;
  action?: ReactNode;
  sticky?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function Banner({
  variant = "solid",
  status,
  colorScheme,
  icon,
  action,
  sticky = false,
  onDismiss,
  dismissLabel = "Dismiss",
  role,
  className,
  style,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      data-banner
      data-variant={variant}
      data-status={status}
      role={role ?? statusRole(status)}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex w-full items-center gap-(--_gap) border-b border-(--_border) bg-(--_bg) px-(--_padding-x) py-(--_padding-y) text-sm text-(--_text)",
        sticky && "sticky top-0 z-(--_z-index)",
        className,
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-(--_max-width) min-w-0 flex-1 flex-wrap items-center justify-center gap-x-(--_gap) gap-y-2">
        <div className="flex min-w-0 items-start gap-(--_icon-gap)">
          <StatusIcon status={status} icon={icon} />
          <div className="min-w-0">{children}</div>
        </div>
        {action}
      </div>
      {onDismiss && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="-my-1"
        >
          <Cross2Icon aria-hidden />
        </IconButton>
      )}
    </div>
  );
}
