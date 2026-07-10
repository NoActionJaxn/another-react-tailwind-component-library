import { type ReactNode } from "react";
import Container, { type ContainerProps } from "./Container.tsx";
import cn from "../lib/cn.ts";

export type FlexContainerDirection = "row" | "column";

export interface FlexContainerProps extends Omit<ContainerProps, "children"> {
  children?: ReactNode;
  direction?: FlexContainerDirection;
  flexClassName?: string;
  wrap?: boolean;
}

const FlexContainer = ({
  children,
  direction = "row",
  flexClassName,
  wrap = true,
  ...rest
}: FlexContainerProps) => {
  return (
    <Container {...rest}>
      <div
        className={cn("another-flex-container", flexClassName)}
        data-direction={direction}
        data-wrap={wrap}
      >
        {children}
      </div>
    </Container>
  );
};

FlexContainer.displayName = "FlexContainer";

export default FlexContainer;
