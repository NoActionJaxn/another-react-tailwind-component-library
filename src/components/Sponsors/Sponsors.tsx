import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import {
  Children,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { useAutoplayCarousel } from "../_autoplay/useAutoplayCarousel";
import { IconButton } from "../IconButton";

export interface SponsorsProps extends HTMLAttributes<HTMLElement> {
  delay?: number;
  loop?: boolean;
  colorScheme?: ColorScheme;
  pauseLabel?: string;
  playLabel?: string;
  slideLabel?: (index: number, total: number) => string;
  children?: ReactNode;
}

export function Sponsors({
  delay = 3000,
  loop = true,
  colorScheme,
  pauseLabel = "Pause",
  playLabel = "Play",
  slideLabel = (index, total) => `${index} of ${total}`,
  className,
  style,
  children,
  ...props
}: SponsorsProps) {
  const { viewportRef, paused, togglePaused } = useAutoplayCarousel(delay, {
    loop,
    align: "start",
    slidesToScroll: 1,
  });

  const items = Children.toArray(children);
  return (
    <section
      data-sponsors
      aria-roledescription="carousel"
      style={schemeStyle(colorScheme, style)}
      className={tw("relative flex flex-col gap-(--_controls-gap)", className)}
      {...props}
    >
      {/* Padding so the zoomed logo and its focus outline aren't clipped. */}
      <div
        ref={viewportRef}
        className="overflow-hidden py-(--_viewport-padding)"
      >
        <div className="-ms-(--_gap) flex touch-pan-y">
          {items.map((item, index) => (
            <div
              key={index}
              data-sponsors-slide
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(index + 1, items.length)}
              className="flex min-w-0 shrink-0 grow-0 basis-(--_item-basis) justify-center ps-(--_gap)"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <IconButton
        variant="ghost"
        size="sm"
        aria-label={paused ? playLabel : pauseLabel}
        onClick={togglePaused}
        className="self-end"
      >
        {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
      </IconButton>
    </section>
  );
}

export interface SponsorsLogoProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  src: string;
  alt: string;
}

export function SponsorsLogo({
  src,
  alt,
  className,
  ...props
}: SponsorsLogoProps) {
  return (
    <a
      data-sponsors-logo
      className={tw(
        "group/logo flex h-(--_logo-height) w-full items-center justify-center rounded-(--_logo-radius) p-(--_logo-padding) outline-(--_focus-color) focus-visible:outline-(length:--_focus-width) focus-visible:outline-offset-(--_focus-offset) focus-visible:outline-solid",
        className,
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="max-h-full max-w-full object-contain transition-[scale] duration-(--_zoom-duration) group-hover/logo:scale-(--_zoom-scale) group-focus-visible/logo:scale-(--_zoom-scale) motion-reduce:transition-none"
      />
    </a>
  );
}
