import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ComponentProps, ReactNode } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Button, type ButtonProps } from "../Button";
import { IconButton } from "../IconButton";
import type { Status } from "../_status/status";
import { StatusIcon } from "../_status/StatusIcon";

export type ToastStatus = Status;

export const ToastProvider = ToastPrimitive.Provider;

export function ToastViewport({
  className,
  ...props
}: ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      className={tw(
        "fixed right-0 bottom-0 z-100 m-0 flex max-h-screen w-full max-w-sm list-none flex-col gap-2 p-4 outline-none",
        className,
      )}
      {...props}
    />
  );
}

export interface ToastProps extends ComponentProps<typeof ToastPrimitive.Root> {
  colorScheme?: ColorScheme;
  status?: ToastStatus;
  icon?: ReactNode;
}

export function Toast({
  colorScheme,
  status,
  icon,
  className,
  style,
  children,
  ...props
}: ToastProps) {
  // Without a status or icon, no icon column (the original layout).
  const withIcon = status != null || (icon != null && icon !== false);
  return (
    <ToastPrimitive.Root
      data-toast
      data-status={status}
      // Urgent toasts interrupt screen readers.
      type={
        status === "warning" || status === "danger" ? "foreground" : undefined
      }
      style={schemeStyle(colorScheme ?? status, style)}
      className={tw(
        "relative flex items-start gap-(--_icon-gap) rounded-(--_radius) border border-(--_border) bg-(--_bg) p-(--_padding) pr-12 text-(--_text) shadow-(--_shadow) outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        className,
      )}
      {...props}
    >
      {withIcon && (
        <StatusIcon status={status} icon={icon} className="text-sm" />
      )}
      <div className="grid min-w-0 flex-1 gap-1">{children}</div>
    </ToastPrimitive.Root>
  );
}

export function ToastTitle({
  className,
  ...props
}: ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      className={tw("text-sm font-semibold", className)}
      {...props}
    />
  );
}

export function ToastDescription({
  className,
  ...props
}: ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      className={tw("text-sm text-(--_description)", className)}
      {...props}
    />
  );
}

export function ToastAction({
  altText,
  variant = "outline",
  size = "sm",
  className,
  ...props
}: Omit<ButtonProps, "asChild"> & { altText: string }) {
  return (
    <ToastPrimitive.Action altText={altText} asChild>
      <Button
        variant={variant}
        size={size}
        className={tw("mt-2 w-fit", className)}
        {...props}
      />
    </ToastPrimitive.Action>
  );
}

export function ToastClose({
  "aria-label": label = "Close",
  className,
  ...props
}: ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close asChild {...props}>
      <IconButton
        variant="ghost"
        size="sm"
        aria-label={label}
        className={tw("absolute top-2 right-2", className)}
      >
        <Cross2Icon aria-hidden />
      </IconButton>
    </ToastPrimitive.Close>
  );
}
