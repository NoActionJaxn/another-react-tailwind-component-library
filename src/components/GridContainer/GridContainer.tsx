import type { CSSProperties } from "react";
import { tw } from "../../utils";
import { Container, type ContainerProps } from "../Container";
import {
  alignItems,
  type LayoutAlign,
  type LayoutGap,
} from "../FlexContainer/classes";

export type GridContainerJustify = "start" | "center" | "end" | "stretch";
export type GridContainerFlow =
  "row" | "column" | "dense" | "row-dense" | "column-dense";
export interface GridContainerProps extends ContainerProps {
  columns?: number | string;
  minColumnWidth?: string;
  rows?: number | string;
  align?: LayoutAlign;
  justify?: GridContainerJustify;
  flow?: GridContainerFlow;
  gap?: LayoutGap;
}

const justifies = {
  start: "justify-items-start",
  center: "justify-items-center",
  end: "justify-items-end",
  stretch: "justify-items-stretch",
};

const flows = {
  row: "grid-flow-row",
  column: "grid-flow-col",
  dense: "grid-flow-dense",
  "row-dense": "grid-flow-row-dense",
  "column-dense": "grid-flow-col-dense",
};

function tracks(value: number | string | undefined) {
  return typeof value === "number" ? `repeat(${value}, minmax(0, 1fr))` : value;
}

export function GridContainer({
  columns,
  minColumnWidth,
  rows,
  align = "stretch",
  justify = "stretch",
  flow = "row",
  gap = "none",
  className,
  style,
  ...props
}: GridContainerProps) {
  // A number is a responsive column count; a string is a grid-template-columns value.
  const responsive = typeof columns === "number";
  return (
    <Container
      data-grid-container
      data-gap={gap}
      data-columns={responsive ? columns : undefined}
      style={
        {
          "--_columns": responsive ? columns : undefined,
          "--grid-container-min-column-width": minColumnWidth,
          gridTemplateColumns: responsive ? undefined : columns,
          gridTemplateRows: tracks(rows),
          ...style,
        } as CSSProperties
      }
      className={tw(
        "grid gap-(--_gap)",
        responsive && "grid-cols-(--_responsive-columns)",
        alignItems[align],
        justifies[justify],
        flows[flow],
        className,
      )}
      {...props}
    />
  );
}
