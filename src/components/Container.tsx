import cn from "../lib/cn.ts";
import type { HTMLAttributes, ElementType } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

const Container = ({
  as: Component = "div",
  className,
  ...rest
}: ContainerProps) => {
  return <Component className={cn("@container", className)} {...rest} />;
};

Container.displayName = "Container";

export default Container;
