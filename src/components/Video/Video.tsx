import { Cross2Icon, PlayIcon, VideoIcon } from "@radix-ui/react-icons";
import { useState, type ReactNode, type VideoHTMLAttributes } from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import { IconButton } from "../IconButton";

export type VideoVariant = "ghost" | "outline";
export type VideoFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export interface VideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  /** Accessible name: videos have no alt text. */
  label?: string;
  variant?: VideoVariant;
  fit?: VideoFit;
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

export function Video({
  label,
  variant = "ghost",
  fit = "cover",
  aspectRatio,
  colorScheme,
  fallback,
  zoomOnHover = false,
  openInDialog = false,
  dialogSrc,
  openLabel = "Play video",
  closeLabel = "Close",
  controls = true,
  src,
  poster,
  width,
  height,
  onError,
  className,
  style,
  children,
  ...props
}: VideoProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const shared = {
    "data-video": "",
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
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        style={{ width, height, ...shared.style }}
        className={tw(
          "flex items-center justify-center text-(--_icon) [&>svg]:size-(--_icon-size)",
          shared.className,
        )}
      >
        {fallback ?? <VideoIcon />}
      </div>
    );
  }

  // In dialog mode the inline video is only a preview: it plays in the dialog.
  const video = (videoClassName: string, rest = {}) => (
    <video
      {...rest}
      {...props}
      src={src}
      poster={poster}
      width={width}
      height={height}
      controls={openInDialog ? false : controls}
      aria-label={openInDialog ? undefined : label}
      tabIndex={openInDialog ? -1 : props.tabIndex}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
      className={videoClassName}
    >
      {children}
    </video>
  );

  if (!zoomOnHover && !openInDialog) {
    return video(tw(fits[fit], shared.className), shared);
  }

  // Zoom and dialog need a frame: it carries the box styles and clips the zoomed video.
  const Frame = openInDialog ? "button" : "div";
  const frame = (
    <Frame
      {...shared}
      type={openInDialog ? "button" : undefined}
      aria-label={openInDialog ? (label ?? openLabel) : undefined}
      style={{ width, height, ...shared.style }}
      className={tw(
        "group/video relative overflow-hidden p-0",
        openInDialog &&
          "cursor-pointer outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid",
        shared.className,
      )}
    >
      {video(
        tw(
          "block size-full",
          fits[fit],
          zoomOnHover &&
            "transition-transform duration-(--_zoom-duration) ease-out group-hover/video:scale-(--_zoom-scale) group-focus-visible/video:scale-(--_zoom-scale) motion-reduce:transition-none",
        ),
      )}
      {openInDialog && (
        // Centered by a flex overlay (no translate to combine with the scale), and
        // will-change keeps the button on its own layer so the hover scale is
        // composited smoothly instead of re-snapping to pixels each frame.
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-(--_play-size) items-center justify-center rounded-full bg-(--_play-bg) text-(--_play-text) shadow-md transition-transform duration-200 will-change-transform group-hover/video:scale-110 motion-reduce:transition-none [&>svg]:size-1/2">
            <PlayIcon />
          </span>
        </span>
      )}
    </Frame>
  );

  if (!openInDialog) return frame;

  return (
    <Dialog>
      <DialogTrigger asChild>{frame}</DialogTrigger>
      <DialogContent
        data-video-dialog
        colorScheme={colorScheme}
        showClose={false}
        aria-describedby={undefined}
        className="w-fit"
      >
        <DialogTitle className="sr-only">{label ?? openLabel}</DialogTitle>
        <div className="relative">
          <video
            src={dialogSrc ?? src}
            poster={poster}
            controls
            autoPlay
            playsInline
            aria-label={label}
            className="block max-h-[80vh] max-w-[calc(100vw-4rem)] rounded-(--_radius) bg-black"
          >
            {children}
          </video>
          {/* Centered on the video's top-right corner. */}
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
