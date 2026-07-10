import { type ReactNode } from "react";
import Container, { type ContainerProps } from "./Container.tsx";
import cn from "../lib/cn.ts";

export type GridContainerColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface GridContainerProps extends Omit<ContainerProps, "children"> {
  children?: ReactNode;
  columns?: GridContainerColumns;
  gridClassName?: string;
}

const GridContainer = ({
  children,
  columns = 3,
  gridClassName,
  ...rest
}: GridContainerProps) => {
  return (
    <Container {...rest}>
      <div
        className={cn("another-grid-container", gridClassName)}
        data-columns={columns}
      >
        {children}
      </div>
    </Container>
  );
};

GridContainer.displayName = "GridContainer";

export default GridContainer;
