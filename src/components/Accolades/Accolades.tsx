import { PauseIcon, PlayIcon } from "@radix-ui/react-icons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  Children,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";
import { Anchor, type AnchorProps } from "../Anchor";
import { Button } from "../Button";
import { Image, type ImageProps } from "../Image";

export type AccoladesAnimation = "none" | "fade" | "pop";
export interface AccoladesProps extends HTMLAttributes<HTMLElement> {
  animation?: AccoladesAnimation;
  delay?: number;
  loop?: boolean;
  colorScheme?: ColorScheme;
  pauseLabel?: string;
  playLabel?: string;
  slideLabel?: (index: number, total: number) => string;
  children?: ReactNode;
}

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function Accolades({
  animation = "none",
  delay = 4000,
  loop = true,
  colorScheme,
  pauseLabel = "Pause",
  playLabel = "Play",
  slideLabel = (index, total) => `${index} of ${total}`,
  className,
  style,
  children,
  ...props
}: AccoladesProps) {
  const autoplay = useMemo(
    () =>
      Autoplay({
        delay,
        playOnInit: !reducedMotion(),
        // With stopOnInteraction off, autoplay resumes when the pointer or focus leaves.
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        stopOnFocusIn: true,
      }),
    [delay],
  );
  const [viewportRef, api] = useEmblaCarousel(
    // A slide counts as in view once 60% of it shows, so it fades as it leaves.
    { loop, align: "start", slidesToScroll: 1, inViewThreshold: 0.6 },
    [autoplay],
  );
  // Paused with the button (reduced-motion users start paused). A ref, so the
  // listener below sees a change before play() fires its event.
  const [paused, setPaused] = useState(reducedMotion);
  const pausedRef = useRef(paused);

  useEffect(() => {
    if (!api) return;
    // Embla restarts autoplay when the pointer or focus leaves; undo that while paused.
    const keepPaused = () => {
      if (pausedRef.current) queueMicrotask(() => autoplay.stop());
    };
    api.on("autoplay:play", keepPaused);
    return () => {
      api.off("autoplay:play", keepPaused);
    };
  }, [api, autoplay]);

  const [inView, setInView] = useState<number[]>([]);
  useEffect(() => {
    if (!api || animation === "none") return;
    const update = () => setInView(api.slidesInView());
    update();
    api.on("slidesInView", update).on("reInit", update);
    return () => {
      api.off("slidesInView", update).off("reInit", update);
    };
  }, [api, animation]);

  function toggle() {
    pausedRef.current = !paused;
    setPaused(!paused);
    if (paused) autoplay.play();
    else autoplay.stop();
  }

  const items = Children.toArray(children);
  return (
    <section
      data-accolades
      data-animation={animation}
      aria-roledescription="carousel"
      style={colorScheme ? { ...schemeVars(colorScheme), ...style } : style}
      className={tw("relative flex flex-col gap-(--_controls-gap)", className)}
      {...props}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="-ms-(--_gap) flex touch-pan-y">
          {items.map((item, index) => (
            <div
              key={index}
              data-accolades-slide
              role="group"
              aria-roledescription="slide"
              aria-label={slideLabel(index + 1, items.length)}
              data-in-view={inView.includes(index) || undefined}
              className="flex min-w-0 shrink-0 grow-0 basis-(--_item-basis) ps-(--_gap)"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="sm"
        aria-label={paused ? playLabel : pauseLabel}
        onClick={toggle}
        className="self-end px-1.5"
      >
        {paused ? <PlayIcon aria-hidden /> : <PauseIcon aria-hidden />}
      </Button>
    </section>
  );
}

export function AccoladesItem({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-accolades-item
      className={tw(
        "flex w-full flex-col items-center justify-center gap-(--_item-gap) text-center",
        "rounded-(--_item-radius) bg-(--_item-bg) p-(--_item-padding)",
        className,
      )}
      {...props}
    />
  );
}

export function AccoladesImage({ className, ...props }: ImageProps) {
  return (
    <Image
      fit="contain"
      className={tw(
        "h-(--_image-height) w-auto max-w-full border-0 bg-transparent",
        className,
      )}
      {...props}
    />
  );
}

export function AccoladesQuote({
  className,
  ...props
}: HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      data-accolades-quote
      className={tw(
        "text-(length:--_quote-font-size) leading-relaxed text-pretty text-(--_quote-text)",
        className,
      )}
      {...props}
    />
  );
}

export function AccoladesLink({ className, ...props }: AnchorProps) {
  return (
    <Anchor
      className={tw("text-(length:--_link-font-size)", className)}
      {...props}
    />
  );
}
