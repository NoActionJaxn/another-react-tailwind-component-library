import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import {
  dialogContent,
  dialogDescription,
  dialogFooter,
  dialogHeader,
  dialogOverlay,
  dialogTitle,
} from "../_dialog/classes";
import { Button, type ButtonProps } from "../Button";

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

export interface AlertDialogContentProps extends ComponentProps<
  typeof AlertDialogPrimitive.Content
> {
  /** Content renders in a portal, so it can't inherit a scheme from the trigger's parents. */
  colorScheme?: ColorScheme;
}

export function AlertDialogContent({
  colorScheme,
  className,
  style,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay
        data-dialog-overlay
        style={schemeStyle(colorScheme)}
        className={dialogOverlay}
      />
      <AlertDialogPrimitive.Content
        data-dialog-content
        style={schemeStyle(colorScheme, style)}
        className={tw(dialogContent, className)}
        {...props}
      />
    </AlertDialogPrimitive.Portal>
  );
}

export function AlertDialogHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={tw(dialogHeader, className)} {...props} />;
}

export function AlertDialogFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return <div className={tw(dialogFooter, className)} {...props} />;
}

export function AlertDialogTitle({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      className={tw(dialogTitle, className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={tw(dialogDescription, className)}
      {...props}
    />
  );
}

/** Confirms. Renders the library Button (solid by default). */
export function AlertDialogAction(props: Omit<ButtonProps, "asChild">) {
  return (
    <AlertDialogPrimitive.Action asChild>
      <Button {...props} />
    </AlertDialogPrimitive.Action>
  );
}

/** Dismisses. Renders the library Button (outline by default). */
export function AlertDialogCancel({
  variant = "outline",
  ...props
}: Omit<ButtonProps, "asChild">) {
  return (
    <AlertDialogPrimitive.Cancel asChild>
      <Button variant={variant} {...props} />
    </AlertDialogPrimitive.Cancel>
  );
}
