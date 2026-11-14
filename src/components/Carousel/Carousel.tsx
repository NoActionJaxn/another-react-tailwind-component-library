import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PauseIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { Slot } from "@radix-ui/react-slot";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { Image, type ImageProps } from "../Image";

export interface CarouselProps extends HTMLAttributes<HTMLElement> {
  aspectRatio?: string | number;
  loop?: boolean;
  autoplay?: boolean;
  delay?: number;
  showArrows?: boolean;
  showPager?: boolean;
  colorScheme?: ColorScheme;
  previousLabel?: string;
  nextLabel?: string;
  pauseLabel?: string;
  playLabel?: string;
  slideLabel?: (index: number, total: number) => string;
  pagerLabel?: (index: number, total: number) => string;
  children?: ReactNode;
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const control =
  "size-(--_arrow-size) bg-(--_control-bg) text-(--_control-text) shadow-md hover:bg-(--_control-bg-hover)";

export function Carousel({
  aspectRatio,
  loop = true,
  autoplay = false,
  delay = 5000,
  showArrows = true,
  showPager = true,
  colorScheme,
  previousLabel = "Previous slide",
  nextLabel = "Next slide",
  pauseLabel = "Pause",
  playLabel = "Play",
  slideLabel = (index, total) => `${index} of ${total}`,
  pagerLabel = (index) => `Go to slide ${index}`,
  className,
  style,
  children,
  onKeyDown,
  ...props
}: CarouselProps) {
  const plugin = useMemo(
    () =>
      autoplay
        ? Autoplay({
            delay,
            playOnInit: !reducedMotion(),
            // Pauses while hovered or focused, and resumes when they leave.
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          })
        : undefined,
    [autoplay, delay],
  );
  const [viewportRef, api] = useEmblaCarousel(
    { loop, align: "start" },
    plugin ? [plugin] : [],
  );

  const items = Children.toArray(children);
  const [selected, setSelected] = useState(0);
  const [canPrev, setCanPrev] = useState(loop);
  const [canNext, setCanNext] = useState(items.length > 1);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSelected(api.selectedScrollSnap());
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update).on("reInit", update);
    return () => {
      api.off("select", update).off("reInit", update);
    };
  }, [api]);

  // Paused with the button (reduced-motion users start paused). A ref, so the
  // listener below sees a change before play() fires its event.
  const [paused, setPaused] = useState(reducedMotion);
  const pausedRef = useRef(paused);
  useEffect(() => {
    if (!api || !plugin) return;
    // Embla restarts autoplay when the pointer or focus leaves; undo that while paused.
    const keepPaused = () => {
      if (pausedRef.current) queueMicrotask(() => plugin.stop());
    };
    api.on("autoplay:play", keepPaused);
    return () => {
      api.off("autoplay:play", keepPaused);
    };
  }, [api, plugin]);

  function togglePaused() {
    pausedRef.current = !paused;
    setPaused(!paused);
    if (paused) plugin?.play();
    else plugin?.stop();
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
      if (event.key === "ArrowLeft") api?.[rtl ? "scrollNext" : "scrollPrev"]();
      else if (event.key === "ArrowRight")
        api?.[rtl ? "scrollPrev" : "scrollNext"]();
      else return;
      event.preventDefault();
    },
    [api, onKeyDown],
  );

  return (
    <section
      data-carousel
      aria-roledescription="carousel"
      onKeyDown={handleKeyDown}
      style={schemeStyle(colorScheme, { aspectRatio, ...style })}
      className={tw(
        "group/carousel relative isolate aspect-(--_aspect-ratio) overflow-hidden rounded-(--_radius) bg-(--_bg)",
        className,
      )}
      {...props}
    >
      {/* Announces slide changes, except while autoplay would announce every few seconds. */}
      <div
        ref={viewportRef}
        aria-live={plugin && !paused ? "off" : "polite"}
        className="h-full overflow-hidden"
      >
        <div className="flex h-full touch-pan-y">
          {items.map((item, index) => (
            <div
              key={index}
              data-carousel-slide
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(index + 1, items.length)}
              // Off-screen slides stay out of the tab order and the accessibility tree.
              inert={index !== selected}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {showArrows && items.length > 1 && (
        <>
          <IconButton
            variant="soft"
            round
            aria-label={previousLabel}
            disabled={!canPrev}
            onClick={() => api?.scrollPrev()}
            className={tw(
              control,
              "absolute start-(--_controls-inset) top-1/2 -translate-y-1/2 rtl:[&>svg]:-scale-x-100",
            )}
          >
            <ChevronLeftIcon aria-hidden />
          </IconButton>
          <IconButton
            variant="soft"
            round
            aria-label={nextLabel}
            disabled={!canNext}
            onClick={() => api?.scrollNext()}
            className={tw(
              control,
              "absolute end-(--_controls-inset) top-1/2 -translate-y-1/2 rtl:[&>svg]:-scale-x-100",
            )}
          >
            <ChevronRightIcon aria-hidden />
          </IconButton>
        </>
      )}

      {showPager && items.length > 1 && (
        <div
          data-carousel-pager
          className="absolute inset-x-0 bottom-(--_controls-inset) flex justify-center gap-(--_dot-gap)"
        >
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={pagerLabel(index + 1, items.length)}
              aria-current={index === selected || undefined}
              onClick={() => api?.scrollTo(index)}
              // The visible dot is small; the button around it is a bigger target.
              className="group/dot flex h-(--_dot-target) min-w-(--_dot-target) cursor-pointer items-center justify-center rounded-full outline-(--_focus-color) focus-visible:outline-(length:--_focus-width) focus-visible:outline-solid"
            >
              <span className="block h-(--_dot-size) w-(--_dot-size) rounded-full bg-(--_dot) shadow-sm transition-all duration-300 group-hover/dot:bg-(--_dot-active) group-aria-current/dot:w-(--_dot-active-width) group-aria-current/dot:bg-(--_dot-active) motion-reduce:transition-none" />
            </button>
          ))}
        </div>
      )}

      {plugin && (
        <IconButton
          variant="soft"
          round
          size="sm"
          aria-label={paused ? playLabel : pauseLabel}
          onClick={togglePaused}
          className={tw(
            control,
            "absolute end-(--_controls-inset) bottom-(--_controls-inset) size-(--_pause-size)",
          )}
        >
          {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
        </IconButton>
      )}
    </section>
  );
}

export function CarouselSlide({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-carousel-content
      className={tw("relative isolate size-full", className)}
      {...props}
    />
  );
}

export function CarouselImage({ className, ...props }: ImageProps) {
  return (
    <Image
      className={tw(
        "absolute inset-0 -z-10 size-full rounded-none border-0",
        className,
      )}
      {...props}
    />
  );
}

export type CarouselCaptionPosition = "bottom" | "center";
export interface CarouselCaptionProps extends HTMLAttributes<HTMLDivElement> {
  position?: CarouselCaptionPosition;
}

export function CarouselCaption({
  position = "bottom",
  className,
  ...props
}: CarouselCaptionProps) {
  return (
    <div
      data-carousel-caption
      data-position={position}
      className={tw(
        "absolute flex flex-col gap-(--_caption-gap) text-(--_caption-text)",
        position === "bottom"
          ? "inset-x-0 bottom-0 items-start bg-(image:--_scrim) px-(--_caption-padding-x) pt-(--_caption-padding-top) pb-(--_caption-padding-bottom)"
          : "inset-0 items-center justify-center bg-(--_overlay) px-(--_caption-padding-x) text-center",
        className,
      )}
      {...props}
    />
  );
}

export interface CarouselPartProps extends HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export function CarouselTitle({
  asChild = false,
  className,
  ...props
}: CarouselPartProps) {
  const Component = asChild ? Slot : "h2";
  return (
    <Component
      data-carousel-title
      className={tw(
        "text-(length:--_title-font-size) leading-tight font-(--_title-font-weight) tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselDescription({
  asChild = false,
  className,
  ...props
}: CarouselPartProps) {
  const Component = asChild ? Slot : "p";
  return (
    <Component
      data-carousel-description
      className={tw(
        "max-w-(--_description-max-width) text-(length:--_description-font-size) leading-relaxed text-pretty text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function CarouselActions({
  asChild = false,
  className,
  ...props
}: CarouselPartProps) {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      data-carousel-actions
      className={tw(
        "mt-(--_actions-gap) flex flex-wrap items-center gap-(--_actions-item-gap)",
        className,
      )}
      {...props}
    />
  );
}
