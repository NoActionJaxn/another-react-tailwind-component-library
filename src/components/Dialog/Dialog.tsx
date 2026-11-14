import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../IconButton";
import {
  dialogContent,
  dialogDescription,
  dialogFooter,
  dialogHeader,
  dialogTitle,
} from "../_dialog/classes";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export interface DialogContentProps extends ComponentProps<
  typeof DialogPrimitive.Content
> {
  colorScheme?: ColorScheme;
  showClose?: boolean;
  closeLabel?: string;
}

export function DialogContent({
  colorScheme,
  showClose = true,
  closeLabel = "Close",
  className,
  style,
  children,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <Backdrop data-dialog-overlay colorScheme={colorScheme} />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content
        data-dialog-content
        style={schemeStyle(colorScheme, style)}
        className={tw(dialogContent, className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={closeLabel}
              className="absolute top-3 right-3"
            >
              <Cross2Icon aria-hidden />
            </IconButton>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={tw(dialogHeader, className)} {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={tw(dialogFooter, className)} {...props} />;
}

export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title className={tw(dialogTitle, className)} {...props} />
  );
}

export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={tw(dialogDescription, className)}
      {...props}
    />
  );
}
