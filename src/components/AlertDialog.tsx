import React from "react";
import classNames from "classnames";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import Button from "./Button";

export type AlertDialogVariant = "default" | "danger";

export interface AlertDialogProps extends Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>, 'open' | 'defaultOpen' | 'onOpenChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  variant?: AlertDialogVariant;
  className?: string;
}

function AlertDialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  cancelText = "Cancel",
  confirmText = "Confirm",
  onCancel,
  onConfirm,
  variant = "default",
  className,
  ...rest
}: AlertDialogProps) {
  const overlayStyles = classNames(
    "fixed inset-0 z-50 bg-black/50",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
  );

  const contentStyles = classNames(
    "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
    "rounded-lg bg-white p-6 shadow-xl",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
    "duration-200",
    className
  );

  const titleStyles = "text-lg font-semibold text-neutral-900";
  
  const descriptionStyles = "mt-2 text-sm text-neutral-600";

  return (
    <AlertDialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} {...rest}>
      {trigger && <AlertDialogPrimitive.Trigger asChild>{trigger}</AlertDialogPrimitive.Trigger>}
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className={overlayStyles} />
        <AlertDialogPrimitive.Content className={contentStyles}>
          <AlertDialogPrimitive.Title className={titleStyles}>
            {title}
          </AlertDialogPrimitive.Title>
          {description && (
            <AlertDialogPrimitive.Description className={descriptionStyles}>
              {description}
            </AlertDialogPrimitive.Description>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialogPrimitive.Cancel asChild onClick={onCancel}>
              <Button variant="secondary">
                {cancelText}
              </Button>
            </AlertDialogPrimitive.Cancel>
            <AlertDialogPrimitive.Action asChild onClick={onConfirm}>
              <Button variant={variant}>
                {confirmText}
              </Button>
            </AlertDialogPrimitive.Action>
          </div>
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
}

// Export sub-components for more control
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogCancel = AlertDialogPrimitive.Cancel;
const AlertDialogAction = AlertDialogPrimitive.Action;

AlertDialog.displayName = "AlertDialog";
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Action = AlertDialogAction;

export default AlertDialog;
