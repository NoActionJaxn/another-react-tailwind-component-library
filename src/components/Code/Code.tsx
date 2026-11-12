import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useRef, type HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { useCopy } from "./useCopy";

export type CodeVariant = "soft" | "outline";
export type CodeSize = "sm" | "md" | "lg";
export interface CodeProps extends HTMLAttributes<HTMLElement> {
  variant?: CodeVariant;
  size?: CodeSize;
  colorScheme?: ColorScheme;
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

export function Code({
  variant = "soft",
  size = "md",
  colorScheme,
  copyable = false,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  style,
  children,
  ...props
}: CodeProps) {
  const ref = useRef<HTMLElement>(null);
  const { copied, copy } = useCopy();
  return (
    <code
      ref={ref}
      data-code
      data-variant={variant}
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "rounded-(--_radius) border box-decoration-clone px-(--_padding-x) py-(--_padding-y)",
        "font-(family-name:--_font-family) text-(length:--_font-size)",
        "border-(--_border) bg-(--_bg) text-(--_text)",
        className,
      )}
      {...props}
    >
      {children}
      {copyable && (
        <button
          type="button"
          aria-label={copied ? copiedLabel : copyLabel}
          onClick={() => copy(ref.current?.textContent ?? "")}
          className={tw(
            "ms-(--_copy-gap) inline-flex size-[1.25em] cursor-pointer items-center justify-center rounded-(--_radius) align-[-0.05em] transition-colors",
            "text-(--_copy-text) hover:bg-(--_copy-bg-hover)",
            "outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
            "[&_svg]:size-[0.875em]",
          )}
        >
          {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
        </button>
      )}
    </code>
  );
}
