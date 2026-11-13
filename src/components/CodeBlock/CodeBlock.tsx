import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useRef, type HTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { useCopy } from "../Code/useCopy";

export type CodeBlockVariant = "solid" | "soft" | "outline";
export type CodeBlockSize = "sm" | "md" | "lg";
export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CodeBlockVariant;
  size?: CodeBlockSize;
  colorScheme?: ColorScheme;
  copyable?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

const sizes = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function CodeBlock({
  variant = "soft",
  size = "md",
  colorScheme,
  copyable = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  style,
  children,
  ...props
}: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const { copied, copy } = useCopy();
  return (
    <div
      data-code-block
      data-variant={variant}
      data-size={size}
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw(
        "relative rounded-(--_radius) border border-(--_border) bg-(--_bg) text-(--_text)",
        className,
      )}
      {...props}
    >
      <pre
        className={tw(
          "overflow-x-auto px-(--_padding-x) py-(--_padding-y) font-(family-name:--_font-family)",
          sizes[size],
          copyable && "pe-12",
        )}
      >
        <code ref={ref}>{children}</code>
      </pre>
      {copyable && (
        <IconButton
          variant="ghost"
          size="sm"
          aria-label={copied ? copiedLabel : copyLabel}
          onClick={() => copy(ref.current?.textContent ?? "")}
          className="absolute end-1.5 top-1.5"
        >
          {copied ? <CheckIcon aria-hidden /> : <CopyIcon aria-hidden />}
        </IconButton>
      )}
    </div>
  );
}
