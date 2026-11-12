import { Slot } from "@radix-ui/react-slot";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { schemeVars, tw, type ColorScheme } from "../../utils";

export type AnimatedContainerAnimation = "fade" | "pop";
export interface AnimatedContainerProps extends HTMLAttributes<HTMLDivElement> {
  animation?: AnimatedContainerAnimation;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
  colorScheme?: ColorScheme;
  asChild?: boolean;
}

export function AnimatedContainer({
  animation = "fade",
  duration,
  stagger = false,
  staggerDelay,
  colorScheme,
  asChild = false,
  className,
  style,
  ...props
}: AnimatedContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  const Component = asChild ? Slot : "div";
  return (
    <Component
      ref={ref}
      data-animated-container
      data-animation={animation}
      data-stagger={stagger || undefined}
      data-in-view={inView || undefined}
      style={
        {
          ...(colorScheme && schemeVars(colorScheme)),
          "--animated-container-duration":
            duration != null ? `${duration}ms` : undefined,
          "--animated-container-stagger-delay":
            staggerDelay != null ? `${staggerDelay}ms` : undefined,
          ...style,
        } as CSSProperties
      }
      className={tw(className)}
      {...props}
    />
  );
}
