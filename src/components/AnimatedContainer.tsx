import {
  Children,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import cn from "../lib/cn.ts";

export type AnimatedContainerAnimation = "fade" | "pop";

export interface AnimatedContainerProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "children"
> {
  animation?: AnimatedContainerAnimation;
  as?: ElementType;
  children?: ReactNode;
  duration?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

const AnimatedContainer = ({
  animation = "fade",
  as: Component = "div",
  children,
  className,
  duration = 300,
  stagger = false,
  staggerDelay = 100,
  ...rest
}: AnimatedContainerProps) => {
  return (
    <Component
      className={cn("another-animated-container", className)}
      {...rest}
    >
      {Children.map(children, (child, index) => (
        <div
          className="another-animated-container-item"
          data-animation={animation}
          style={{
            animationDuration: `${duration}ms`,
            animationDelay: stagger ? `${index * staggerDelay}ms` : undefined,
          }}
        >
          {child}
        </div>
      ))}
    </Component>
  );
};

AnimatedContainer.displayName = "AnimatedContainer";

export default AnimatedContainer;
