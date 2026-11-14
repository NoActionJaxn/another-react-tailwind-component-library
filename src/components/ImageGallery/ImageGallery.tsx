import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross2Icon,
  PlayIcon,
} from "@radix-ui/react-icons";
import {
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../Dialog";
import { IconButton } from "../IconButton";
import { Image } from "../Image";
import { Video } from "../Video";

export type ImageGalleryItem =
  | {
      type?: "image";
      src: string;
      alt: string;
      /** Smaller image for the grid; src is shown in the lightbox. */
      thumbnail?: string;
    }
  | {
      type: "video";
      src: string;
      label: string;
      /** Shown in the grid and before the video plays. */
      poster?: string;
    };

export interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: ImageGalleryItem[];
  columns?: number;
  minColumnWidth?: string;
  aspectRatio?: string | number;
  zoomOnHover?: boolean;
  colorScheme?: ColorScheme;
  closeLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
}

const nameOf = (item: ImageGalleryItem) =>
  item.type === "video" ? item.label : item.alt;

/** A grid of image and video thumbnails that open in a lightbox you can step through. */
export function ImageGallery({
  items,
  columns = 3,
  minColumnWidth,
  aspectRatio = "4 / 3",
  zoomOnHover = true,
  colorScheme,
  closeLabel = "Close",
  previousLabel = "Previous",
  nextLabel = "Next",
  className,
  style,
  ...props
}: ImageGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const current = openIndex == null ? null : items[openIndex];

  // Wraps around at both ends.
  function step(direction: 1 | -1) {
    setOpenIndex((index) =>
      index == null ? index : (index + direction + items.length) % items.length,
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") step(1);
    else if (event.key === "ArrowLeft") step(-1);
    else return;
    event.preventDefault();
  }

  return (
    <div
      data-image-gallery
      style={
        {
          ...(colorScheme && schemeVars(colorScheme)),
          "--_columns": columns,
          "--image-gallery-min-column-width": minColumnWidth,
          ...style,
        } as CSSProperties
      }
      className={tw(
        "grid grid-cols-(--_responsive-columns) gap-(--_gap)",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <button
          key={index}
          type="button"
          data-image-gallery-item
          aria-label={item.type === "video" ? item.label : undefined}
          onClick={() => setOpenIndex(index)}
          className="group/thumb relative block cursor-zoom-in rounded-(--_radius) p-0 outline-(--_focus-color) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid"
        >
          {item.type === "video" ? (
            <>
              <Video
                src={item.src}
                poster={item.poster}
                aspectRatio={aspectRatio}
                zoomOnHover={zoomOnHover}
                controls={false}
                muted
                preload="metadata"
                className="w-full rounded-(--_radius)"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="flex size-(--_play-size) items-center justify-center rounded-full bg-(--_play-bg) text-(--_play-text) shadow-md [&>svg]:size-1/2">
                  <PlayIcon />
                </span>
              </span>
            </>
          ) : (
            <Image
              src={item.thumbnail ?? item.src}
              alt={item.alt}
              aspectRatio={aspectRatio}
              zoomOnHover={zoomOnHover}
              className="w-full rounded-(--_radius)"
            />
          )}
        </button>
      ))}

      <Dialog
        open={current != null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        {current && (
          <DialogContent
            data-image-gallery-dialog
            colorScheme={colorScheme}
            showClose={false}
            aria-describedby={undefined}
            onKeyDown={handleKeyDown}
            className="w-fit justify-items-center"
          >
            <DialogTitle className="sr-only">{nameOf(current)}</DialogTitle>
            <div className="relative">
              {current.type === "video" ? (
                <video
                  key={openIndex}
                  src={current.src}
                  poster={current.poster}
                  aria-label={current.label}
                  controls
                  autoPlay
                  playsInline
                  className="block max-h-[75vh] max-w-[calc(100vw-4rem)] rounded-(--_radius) bg-black"
                />
              ) : (
                <img
                  key={openIndex}
                  src={current.src}
                  alt={current.alt}
                  className="block max-h-[75vh] max-w-[calc(100vw-4rem)] rounded-(--_radius)"
                />
              )}
              {/* Centered on the media's top-right corner. */}
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
            {items.length > 1 && (
              <div className="flex items-center gap-4">
                <IconButton
                  variant="soft"
                  size="sm"
                  round
                  aria-label={previousLabel}
                  onClick={() => step(-1)}
                >
                  <ChevronLeftIcon aria-hidden />
                </IconButton>
                <span
                  aria-live="polite"
                  className="min-w-12 text-center text-sm text-(--_counter-text) tabular-nums"
                >
                  {openIndex! + 1} / {items.length}
                </span>
                <IconButton
                  variant="soft"
                  size="sm"
                  round
                  aria-label={nextLabel}
                  onClick={() => step(1)}
                >
                  <ChevronRightIcon aria-hidden />
                </IconButton>
              </div>
            )}
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
