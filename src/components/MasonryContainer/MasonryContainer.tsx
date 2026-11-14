import { Children, useLayoutEffect, useRef, type CSSProperties } from "react";
import { tw } from "../../utils";
import { Container, type ContainerProps } from "../Container";
import type { LayoutGap } from "../FlexContainer/classes";

export interface MasonryContainerProps extends Omit<ContainerProps, "asChild"> {
  columns?: number;
  minColumnWidth?: string;
  gap?: LayoutGap;
}

/**
 * Puts each item in the currently shortest column of a grid of 1px rows, as
 * measured. Items keep their DOM order, so reading and tab order stay natural.
 */
function layout(grid: HTMLElement) {
  const items = [...grid.children].filter(
    (item): item is HTMLElement => item instanceof HTMLElement,
  );
  // Clear old placements first: an item left in a column that no longer fits
  // would keep it alive as an extra track, and the count below includes it.
  for (const item of items) item.style.gridColumn = item.style.gridRow = "";
  const styles = getComputedStyle(grid);
  const columns = styles.gridTemplateColumns.split(" ").filter(Boolean).length;
  const gap = Math.round(parseFloat(styles.columnGap) || 0);
  const heights = Array<number>(Math.max(1, columns)).fill(0);
  for (const item of items) {
    const column = heights.indexOf(Math.min(...heights));
    const start = heights[column]! === 0 ? 0 : heights[column]! + gap;
    const height = Math.max(1, Math.ceil(item.getBoundingClientRect().height));
    item.style.gridColumn = String(column + 1);
    item.style.gridRow = `${start + 1} / span ${height}`;
    heights[column] = start + height;
  }
  grid.dataset.placed = "";
}

export function MasonryContainer({
  columns = 3,
  minColumnWidth,
  gap = "md",
  className,
  style,
  children,
  ...props
}: MasonryContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Re-places on every render, when the width changes (columns may change)
  // and when any item's height changes (e.g. an image loads).
  useLayoutEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => layout(grid));
    };
    layout(grid);
    const observer = new ResizeObserver(schedule);
    observer.observe(grid);
    for (const item of grid.children) observer.observe(item);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  });

  return (
    <Container
      ref={ref}
      data-masonry-container
      data-gap={gap}
      style={
        {
          "--_columns": columns,
          "--masonry-container-min-column-width": minColumnWidth,
          ...style,
        } as CSSProperties
      }
      className={tw(
        "grid grid-cols-(--_responsive-columns) items-start gap-x-(--_gap)",
        className,
      )}
      {...props}
    >
      {Children.toArray(children).map((child, index) => (
        // Each item gets its own wrapper so it can be placed and measured.
        <div key={index} data-masonry-item className="min-w-0 self-start">
          {child}
        </div>
      ))}
    </Container>
  );
}
