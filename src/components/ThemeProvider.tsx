import type { ReactNode } from "react";
import { ToastProvider, type ToastPosition } from "./ToastProvider";
import ToastContainer from "./ToastContainer";

export interface ThemeProviderProps {
  children: ReactNode;
  toastPosition?: ToastPosition;
  maxToasts?: number;
}

function ThemeProvider({
  children,
  toastPosition = "bottom-right",
  maxToasts = 5,
}: ThemeProviderProps) {
  return (
    <ToastProvider position={toastPosition} maxToasts={maxToasts}>
      {children}
      <ToastContainer />
    </ToastProvider>
  );
}

ThemeProvider.displayName = "ThemeProvider";

export default ThemeProvider;
