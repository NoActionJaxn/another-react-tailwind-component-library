import React from "react";
import classNames from "classnames";
import * as DialogPrimitive from "@radix-ui/react-dialog";

export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

function Dialog({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  const overlayStyles = classNames(
    "fixed inset-0 z-50 bg-black/50",
    "data-[state=open]:animate-in data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
  );

  const contentStyles = classNames(
    "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
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
  const closeStyles = classNames(
    "absolute right-4 top-4 rounded-sm opacity-70 transition-opacity",
    "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
    "disabled:pointer-events-none"
  );

  return (
    <DialogPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={overlayStyles} />
        <DialogPrimitive.Content className={contentStyles}>
          {title && (
            <DialogPrimitive.Title className={titleStyles}>
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className={descriptionStyles}>
              {description}
            </DialogPrimitive.Description>
          )}
          <div className="mt-4">{children}</div>
          {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
          <DialogPrimitive.Close className={closeStyles}>
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
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Export sub-components for more control
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

Dialog.displayName = "Dialog";
Dialog.Trigger = DialogTrigger;
Dialog.Close = DialogClose;

export default Dialog;
