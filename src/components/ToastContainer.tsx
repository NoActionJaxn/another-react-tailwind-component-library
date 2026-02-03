import React from "react";
import classNames from "classnames";
import { useToast } from "./ToastProvider";
import Toast from "./Toast";

const positionStyles = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

function ToastContainer() {
  const { toasts, position } = useToast();

  if (toasts.length === 0) return null;

  const isTop = position.startsWith("top");

  return (
    <div
      className={classNames(
        "fixed z-50 flex flex-col gap-2 pointer-events-none",
        positionStyles[position]
      )}
    >
      {(isTop ? toasts : [...toasts].reverse()).map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            id={toast.id}
            title={toast.title}
            description={toast.description}
            variant={toast.variant}
            action={toast.action}
          />
        </div>
      ))}
    </div>
  );
}

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
