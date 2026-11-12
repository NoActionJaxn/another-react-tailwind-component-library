import { ImageIcon } from "@radix-ui/react-icons";
import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type ImageVariant = "ghost" | "outline";
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: ImageVariant;
  fit?: ImageFit;
  aspectRatio?: string | number;
  colorScheme?: ColorScheme;
  fallback?: ReactNode;
}

const fits = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

export function Image({
  variant = "ghost",
  fit = "cover",
  aspectRatio,
  colorScheme,
  fallback,
  src,
  alt,
  width,
  height,
  onError,
  className,
  style,
  ...props
}: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const shared = {
    "data-image": "",
    "data-variant": variant,
    style: {
      ...(colorScheme && schemeVars(colorScheme)),
      aspectRatio,
      ...style,
    },
    className: tw(
      "block max-w-full rounded-(--_radius) border border-(--_border) bg-(--_bg)",
      className,
    ),
  };

  if (!src || failedSrc === src) {
    return (
      <div
        {...shared}
        data-fallback=""
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        style={{ width, height, ...shared.style }}
        className={tw(
          "flex items-center justify-center text-(--_icon) [&>svg]:size-(--_icon-size)",
          shared.className,
        )}
      >
        {fallback ?? <ImageIcon />}
      </div>
    );
  }

  return (
    <img
      {...shared}
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      className={tw(fits[fit], shared.className)}
    />
  );
}
