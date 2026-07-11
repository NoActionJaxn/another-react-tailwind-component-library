import { type ReactNode } from "react";
import { AlertDialog as RadixAlertDialog } from "radix-ui";
import cn from "../lib/cn.ts";

export type AlertDialogVariant = "default" | string;

export interface AlertDialogProps extends RadixAlertDialog.AlertDialogProps {
  action?: ReactNode;
  cancel?: ReactNode;
  className?: string;
  description?: ReactNode;
  title?: ReactNode;
  trigger?: ReactNode;
  variant?: AlertDialogVariant;
}

const AlertDialog = ({
  action,
  cancel,
  children,
  className,
  description,
  title,
  trigger,
  variant = "default",
  ...rest
}: AlertDialogProps) => {
  return (
    <RadixAlertDialog.Root {...rest}>
      {trigger && (
        <RadixAlertDialog.Trigger asChild>{trigger}</RadixAlertDialog.Trigger>
      )}
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="another-alert-dialog-overlay" />
        <RadixAlertDialog.Content
          className={cn("another-alert-dialog-content", className)}
          data-variant={variant}
        >
          {title && (
            <RadixAlertDialog.Title className="another-alert-dialog-title">
              {title}
            </RadixAlertDialog.Title>
          )}
          {description && (
            <RadixAlertDialog.Description className="another-alert-dialog-description">
              {description}
            </RadixAlertDialog.Description>
          )}
          {children && (
            <div className="another-alert-dialog-body">{children}</div>
          )}
          {(cancel || action) && (
            <div className="another-alert-dialog-footer">
              {cancel && (
                <RadixAlertDialog.Cancel asChild>
                  {cancel}
                </RadixAlertDialog.Cancel>
              )}
              {action && (
                <RadixAlertDialog.Action asChild>
                  {action}
                </RadixAlertDialog.Action>
              )}
            </div>
          )}
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

AlertDialog.displayName = "AlertDialog";

export default AlertDialog;
