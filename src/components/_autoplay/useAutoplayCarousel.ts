import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useMemo, useRef, useState } from "react";

type EmblaOptions = NonNullable<Parameters<typeof useEmblaCarousel>[0]>;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * An Embla carousel that advances on its own, pauses while hovered or focused,
 * and has a pause toggle. Reduced-motion users start paused.
 */
export function useAutoplayCarousel(delay: number, options: EmblaOptions) {
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
  const [viewportRef, api] = useEmblaCarousel(options, [autoplay]);
  // A ref, so the listener below sees a change before play() fires its event.
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

  function togglePaused() {
    pausedRef.current = !paused;
    setPaused(!paused);
    if (paused) autoplay.play();
    else autoplay.stop();
  }

  return { viewportRef, api, paused, togglePaused };
}
