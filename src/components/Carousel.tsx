import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
  type ComponentPropsWithoutRef,
} from "react";
import classNames from "classnames";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Button from "./Button";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type CarouselOrientation = "horizontal" | "vertical";

interface CarouselContextValue {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnapCount: number;
  scrollTo: (index: number) => void;
  orientation: CarouselOrientation;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel");
  }
  return context;
}

export interface CarouselProps {
  children: ReactNode;
  className?: string;
  orientation?: CarouselOrientation;
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  autoplay?: boolean;
  autoplayDelay?: number;
  showArrows?: boolean;
  showDots?: boolean;
  setApi?: (api: CarouselApi) => void;
}

function Carousel({
  children,
  className,
  orientation = "horizontal",
  opts,
  plugins,
  autoplay = false,
  autoplayDelay = 4000,
  showArrows = true,
  showDots = true,
  setApi,
}: CarouselProps) {
  const autoplayPlugin = autoplay
    ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
    : [];

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    [...autoplayPlugin, ...(plugins || [])]
  );

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);

  const onSelect = useCallback((api: CarouselApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;

    setScrollSnapCount(api.scrollSnapList().length);
    onSelect(api);

    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  const carouselStyles = classNames(
    "relative",
    {
      "w-full": orientation === "horizontal",
      "h-full": orientation === "vertical",
    },
    className
  );

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        selectedIndex,
        scrollSnapCount,
        scrollTo,
        orientation,
      }}
    >
      <div className={carouselStyles} role="region" aria-roledescription="carousel">
        {children}
        {showArrows && <CarouselPrevious />}
        {showArrows && <CarouselNext />}
        {showDots && scrollSnapCount > 1 && <CarouselDots />}
      </div>
    </CarouselContext.Provider>
  );
}

export interface CarouselContentProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

function CarouselContent({ children, className, ...props }: CarouselContentProps) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        className={classNames(
          "flex",
          {
            "-ml-4": orientation === "horizontal",
            "-mt-4 flex-col": orientation === "vertical",
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export interface CarouselItemProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

function CarouselItem({ children, className, ...props }: CarouselItemProps) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={classNames(
        "min-w-0 shrink-0 grow-0 basis-full",
        {
          "pl-4": orientation === "horizontal",
          "pt-4": orientation === "vertical",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CarouselPrevious({ className }: { className?: string }) {
  const { scrollPrev, canScrollPrev, orientation } = useCarousel();

  return (
    <Button
      variant="secondary"
      size="small"
      square
      rounded
      className={classNames(
        "absolute",
        {
          "left-2 top-1/2 -translate-y-1/2": orientation === "horizontal",
          "top-2 left-1/2 -translate-x-1/2 rotate-90": orientation === "vertical",
        },
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
}

function CarouselNext({ className }: { className?: string }) {
  const { scrollNext, canScrollNext, orientation } = useCarousel();

  return (
    <Button
      variant="secondary"
      size="small"
      square
      rounded
      className={classNames(
        "absolute",
        {
          "right-2 top-1/2 -translate-y-1/2": orientation === "horizontal",
          "bottom-2 left-1/2 -translate-x-1/2 rotate-90": orientation === "vertical",
        },
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path
          fillRule="evenodd"
          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
  );
}

function CarouselDots({ className }: { className?: string }) {
  const { selectedIndex, scrollSnapCount, scrollTo } = useCarousel();

  return (
    <div
      className={classNames(
        "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2",
        className
      )}
    >
      {Array.from({ length: scrollSnapCount }).map((_, index) => (
        <button
          key={index}
          className={classNames(
            "w-2 h-2 rounded-full transition-colors",
            {
              "bg-neutral-900": index === selectedIndex,
              "bg-neutral-300 hover:bg-neutral-400": index !== selectedIndex,
            }
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

CarouselContent.displayName = "Carousel.Content";
CarouselItem.displayName = "Carousel.Item";
CarouselPrevious.displayName = "Carousel.Previous";
CarouselNext.displayName = "Carousel.Next";
CarouselDots.displayName = "Carousel.Dots";

Carousel.Content = CarouselContent;
Carousel.Item = CarouselItem;
Carousel.Previous = CarouselPrevious;
Carousel.Next = CarouselNext;
Carousel.Dots = CarouselDots;

Carousel.displayName = "Carousel";

export default Carousel;
