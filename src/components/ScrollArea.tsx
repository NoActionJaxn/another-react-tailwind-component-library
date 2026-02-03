import React from "react";
import classNames from "classnames";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

export interface ScrollAreaProps {
  children: React.ReactNode;
  orientation?: "vertical" | "horizontal" | "both";
  className?: string;
  viewportClassName?: string;
}

function ScrollArea({
  children,
  orientation = "vertical",
  className,
  viewportClassName,
}: ScrollAreaProps) {
  const rootStyles = classNames("overflow-hidden", className);

  const viewportStyles = classNames("h-full w-full rounded-[inherit]", viewportClassName);

  const scrollbarStyles = classNames(
    "flex touch-none select-none p-0.5 transition-colors",
    "hover:bg-neutral-100",
    "data-[state=visible]:animate-in data-[state=hidden]:animate-out",
    "data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0"
  );

  const verticalScrollbarStyles = classNames(scrollbarStyles, "w-2.5");

  const horizontalScrollbarStyles = classNames(scrollbarStyles, "h-2.5 flex-col");

  const thumbStyles = classNames(
    "relative flex-1 rounded-full bg-neutral-300",
    "before:absolute before:left-1/2 before:top-1/2",
    "before:h-full before:min-h-[44px] before:w-full before:min-w-[44px]",
    "before:-translate-x-1/2 before:-translate-y-1/2"
  );

  return (
    <ScrollAreaPrimitive.Root className={rootStyles}>
      <ScrollAreaPrimitive.Viewport className={viewportStyles}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className={verticalScrollbarStyles}
        >
          <ScrollAreaPrimitive.Thumb className={thumbStyles} />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollAreaPrimitive.Scrollbar
          orientation="horizontal"
          className={horizontalScrollbarStyles}
        >
          <ScrollAreaPrimitive.Thumb className={thumbStyles} />
        </ScrollAreaPrimitive.Scrollbar>
      )}
      <ScrollAreaPrimitive.Corner className="bg-neutral-100" />
    </ScrollAreaPrimitive.Root>
  );
}

ScrollArea.displayName = "ScrollArea";

export default ScrollArea;
