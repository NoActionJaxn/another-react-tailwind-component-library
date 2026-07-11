import {
  useEffect,
  useRef,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Container from "./Container.tsx";
import cn from "../lib/cn.ts";

export type AccoladesVariant = "default" | string;

export interface AccoladesProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  as?: ElementType;
  items?: ReactNode[];
  speed?: number;
  variant?: AccoladesVariant;
}

const Accolades = ({
  as = "section",
  className,
  items = [],
  speed = 40,
  variant = "default",
  ...rest
}: AccoladesProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || items.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame: number;
    let lastTime: number | null = null;

    const step = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (!pausedRef.current) {
        const halfWidth = viewport.scrollWidth / 2;
        const next = viewport.scrollLeft + (speed * delta) / 1000;
        viewport.scrollLeft = next >= halfWidth ? next - halfWidth : next;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [items.length, speed]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <Container
      as={as}
      className={cn("another-accolades", className)}
      data-variant={variant}
      {...rest}
    >
      <div
        ref={viewportRef}
        className="another-accolades-viewport"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        {[...items, ...items].map((item, index) => (
          <div
            className="another-accolades-item"
            key={index}
            aria-hidden={index >= items.length}
            inert={index >= items.length}
          >
            {item}
          </div>
        ))}
      </div>
    </Container>
  );
};

Accolades.displayName = "Accolades";

export default Accolades;
