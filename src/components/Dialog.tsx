import { type ReactNode } from "react";
import { Dialog as RadixDialog } from "radix-ui";
import Button from "./Button.tsx";
import Close from "../icons/Close.tsx";
import cn from "../lib/cn.ts";

export type DialogVariant = "default" | string;

export interface DialogProps extends RadixDialog.DialogProps {
  className?: string;
  description?: ReactNode;
  footer?: ReactNode;
  title?: ReactNode;
  trigger?: ReactNode;
  variant?: DialogVariant;
}

const Dialog = ({
  children,
  className,
  description,
  footer,
  title,
  trigger,
  variant = "default",
  ...rest
}: DialogProps) => {
  return (
    <RadixDialog.Root {...rest}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="another-dialog-overlay" />
        <RadixDialog.Content
          className={cn("another-dialog-content", className)}
          data-variant={variant}
        >
          <RadixDialog.Close asChild>
            <Button
              className="another-dialog-close"
              variant="ghost"
              size="sm"
              icon
              aria-label="Close"
            >
              <Close />
            </Button>
          </RadixDialog.Close>
          {title && (
            <RadixDialog.Title className="another-dialog-title">
              {title}
            </RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description className="another-dialog-description">
              {description}
            </RadixDialog.Description>
          )}
          {children && <div className="another-dialog-body">{children}</div>}
          {footer && <div className="another-dialog-footer">{footer}</div>}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

Dialog.displayName = "Dialog";

export default Dialog;
