import { Cross2Icon } from "@radix-ui/react-icons";
import * as ToastPrimitive from "@radix-ui/react-toast";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Button, type ButtonProps } from "../Button";

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
}

export function Toast({ colorScheme, className, style, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-toast
      style={schemeStyle(colorScheme, style)}
      className={tw(
        "relative grid gap-1 rounded-(--_radius) border border-(--_border) bg-(--_bg) p-(--_padding) pr-10 text-(--_text) shadow-(--_shadow) outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        className,
      )}
      {...props}
    />
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
  className,
  ...props
}: ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      aria-label="Close"
      className={tw(
        "absolute top-3 right-3 flex size-6 cursor-pointer items-center justify-center rounded-sm text-(--_description) outline-(--_focus-color) transition-colors hover:text-(--_text) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      <Cross2Icon />
    </ToastPrimitive.Close>
  );
}
