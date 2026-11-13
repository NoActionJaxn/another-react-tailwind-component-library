import { Cross2Icon, ImageIcon } from "@radix-ui/react-icons";
import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";

export type ImageVariant = "ghost" | "outline";
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  variant?: ImageVariant;
  fit?: ImageFit;
  aspectRatio?: string | number;
  colorScheme?: ColorScheme;
  fallback?: ReactNode;
  zoomOnHover?: boolean;
  openInDialog?: boolean;
  dialogSrc?: string;
  openLabel?: string;
  closeLabel?: string;
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
  zoomOnHover = false,
  openInDialog = false,
  dialogSrc,
  openLabel = "Open image",
  closeLabel = "Close",
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

  const image = (imageClassName: string, rest = {}) => (
    <img
      {...rest}
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      className={imageClassName}
    />
  );

  if (!zoomOnHover && !openInDialog) {
    return image(tw(fits[fit], shared.className), shared);
  }

  // Zoom and dialog need a frame: it carries the box styles and clips the zoomed image.
  const Frame = openInDialog ? "button" : "div";
  const frame = (
    <Frame
      {...shared}
      type={openInDialog ? "button" : undefined}
      aria-label={openInDialog && !alt ? openLabel : undefined}
      style={{ width, height, ...shared.style }}
      className={tw(
        "group/image overflow-hidden p-0",
        openInDialog &&
          "cursor-zoom-in outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        shared.className,
      )}
    >
      {image(
        tw(
          "block size-full",
          fits[fit],
          zoomOnHover &&
            "transition-transform duration-(--_zoom-duration) ease-out group-hover/image:scale-(--_zoom-scale) group-focus-visible/image:scale-(--_zoom-scale) motion-reduce:transition-none",
        ),
      )}
    </Frame>
  );

  if (!openInDialog) return frame;

  return (
    <Dialog>
      <DialogTrigger asChild>{frame}</DialogTrigger>
      <DialogContent
        data-image-dialog
        colorScheme={colorScheme}
        showClose={false}
        aria-describedby={undefined}
        className="w-fit"
      >
        <DialogTitle className="sr-only">{alt || openLabel}</DialogTitle>
        <div className="relative">
          <img
            src={dialogSrc ?? src}
            alt={alt}
            className="block max-h-[80vh] max-w-[calc(100vw-4rem)] rounded-(--_radius)"
          />
          {/* Centered on the image's top-right corner. */}
          <DialogClose asChild>
            <IconButton
              variant="soft"
              size="sm"
              round
              aria-label={closeLabel}
              className="absolute top-0 right-0 size-(--_close-size) translate-x-1/2 -translate-y-1/2 shadow-md"
            >
              <Cross2Icon aria-hidden />
            </IconButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
