import { Cross2Icon } from "@radix-ui/react-icons";
import type { ComponentProps, ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { statusRole, type Status } from "../_status/status";
import { StatusIcon } from "../_status/StatusIcon";

export type AlertVariant = "soft" | "solid" | "outline";
export type AlertStatus = Status;
export interface AlertProps extends ComponentProps<"div"> {
  variant?: AlertVariant;
  status?: AlertStatus;
  colorScheme?: ColorScheme;
  icon?: ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}

export function Alert({
  variant = "soft",
  status,
  colorScheme,
  icon,
  onDismiss,
  dismissLabel = "Dismiss",
  role,
  className,
  style,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-alert
      data-variant={variant}
      data-status={status}
      role={role ?? statusRole(status)}
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "flex items-start gap-(--_gap) rounded-(--_radius) border border-(--_border) bg-(--_bg) p-(--_padding) text-sm text-(--_text)",
        className,
      )}
      {...props}
    >
      <StatusIcon status={status} icon={icon} />
      <div className="flex min-w-0 flex-1 flex-col gap-(--_content-gap)">
        {children}
      </div>
      {onDismiss && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="-my-1 -me-1"
        >
          <Cross2Icon aria-hidden />
        </IconButton>
      )}
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-alert-title
      className={tw(
        "font-(--_title-font-weight) text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-alert-description
      className={tw("text-(--_description-text)", className)}
      {...props}
    />
  );
}
