import classNames from "classnames";
import { useToast, type Toast as ToastType, type ToastVariant } from "./ToastProvider";

export interface ToastProps extends Omit<ToastType, "duration"> {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function Toast({ id, title, description, variant = "default", action, ...rest }: ToastProps) {
  const { dismiss } = useToast();

  const containerStyles = classNames(
    "flex items-start gap-3 p-4 rounded-lg shadow-lg border min-w-[300px] max-w-[400px]",
    "animate-in slide-in-from-right-full fade-in duration-300",
    {
      "bg-neutral-800 text-white border-neutral-700": variant === "default",
      "bg-primary-500 text-white border-primary-600": variant === "primary",
      "bg-white text-neutral-900 border-neutral-200": variant === "secondary",
      "bg-warning-500 text-white border-warning-600": variant === "warning",
      "bg-danger-500 text-white border-danger-600": variant === "danger",
      "bg-success-500 text-white border-success-600": variant === "success",
    }
  );

  const closeButtonStyles = classNames(
    "ml-auto p-1 rounded-md transition-colors cursor-pointer",
    {
      "hover:bg-neutral-700": variant === "default",
      "hover:bg-primary-600": variant === "primary",
      "hover:bg-neutral-100": variant === "secondary",
      "hover:bg-warning-600": variant === "warning",
      "hover:bg-danger-600": variant === "danger",
      "hover:bg-success-600": variant === "success",
    }
  );

  const actionButtonStyles = classNames(
    "mt-2 px-3 py-1 text-sm font-medium rounded-md transition-colors cursor-pointer",
    {
      "bg-neutral-700 hover:bg-neutral-600": variant === "default",
      "bg-primary-600 hover:bg-primary-700": variant === "primary",
      "bg-neutral-100 hover:bg-neutral-200 text-neutral-900": variant === "secondary",
      "bg-warning-600 hover:bg-warning-700": variant === "warning",
      "bg-danger-600 hover:bg-danger-700": variant === "danger",
      "bg-success-600 hover:bg-success-700": variant === "success",
    }
  );

  return (
    <div className={containerStyles} role="alert" {...rest}>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        {description && (
          <p className={classNames("text-sm mt-1", {
            "text-neutral-300": variant === "default",
            "text-primary-100": variant === "primary",
            "text-neutral-600": variant === "secondary",
            "text-warning-100": variant === "warning",
            "text-danger-100": variant === "danger",
            "text-success-100": variant === "success",
          })}>
            {description}
          </p>
        )}
        {action && (
          <button className={actionButtonStyles} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      <button
        className={closeButtonStyles}
        onClick={() => dismiss(id)}
        aria-label="Close"
      >
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
      </button>
    </div>
  );
}

Toast.displayName = "Toast";

export { Toast, type ToastVariant };
export default Toast;
