import type { CSSProperties } from "react";
import { tw } from "../../utils";
import { Container, type ContainerProps } from "../Container";
import { alignItems, type LayoutAlign, type LayoutGap } from "./classes";

export type FlexContainerDirection =
  "row" | "column" | "row-reverse" | "column-reverse";
export type FlexContainerJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";
export type FlexContainerWrap = "nowrap" | "wrap" | "wrap-reverse";
export interface FlexContainerProps extends ContainerProps {
  direction?: FlexContainerDirection;
  align?: LayoutAlign;
  justify?: FlexContainerJustify;
  wrap?: FlexContainerWrap;
  gap?: LayoutGap;
  columns?: number;
  minColumnWidth?: string;
}

const directions = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};

const justifies = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

const wraps = {
  nowrap: "flex-nowrap",
  wrap: "flex-wrap",
  "wrap-reverse": "flex-wrap-reverse",
};

export function FlexContainer({
  direction = "row",
  align = "stretch",
  justify = "start",
  wrap,
  gap = "none",
  columns,
  minColumnWidth,
  className,
  style,
  ...props
}: FlexContainerProps) {
  return (
    <Container
      data-flex-container
      data-gap={gap}
      data-columns={columns}
      style={
        {
          "--_columns": columns,
          "--flex-container-min-column-width": minColumnWidth,
          ...style,
        } as CSSProperties
      }
      className={tw(
        "flex gap-(--_gap)",
        directions[direction],
        alignItems[align],
        justifies[justify],
        wraps[wrap ?? (columns ? "wrap" : "nowrap")],
        className,
      )}
      {...props}
    />
  );
}
