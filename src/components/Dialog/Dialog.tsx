import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
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

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export interface DialogContentProps extends ComponentProps<
  typeof DialogPrimitive.Content
> {
  colorScheme?: ColorScheme;
  showClose?: boolean;
}

export function DialogContent({
  colorScheme,
  showClose = true,
  className,
  style,
  children,
  ...props
}: DialogContentProps) {
  const scheme = schemeStyle(colorScheme);
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        data-dialog-overlay
        style={scheme}
        className={dialogOverlay}
      />
      <DialogPrimitive.Content
        data-dialog-content
        style={schemeStyle(colorScheme, style)}
        className={tw(dialogContent, className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute top-4 right-4 flex size-6 cursor-pointer items-center justify-center rounded-sm text-(--_description) outline-(--_focus-color) transition-colors hover:text-(--_text) focus:outline-2 focus:outline-solid [&_svg]:size-4"
          >
            <Cross2Icon />
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
