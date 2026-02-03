import type { ReactNode } from "react";
import classNames from "classnames";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
}

function Container({ children, className, innerClassName }: ContainerProps) {
  return (
    <div className={className}>
      <div className={classNames("mx-auto container", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

Container.displayName = "Container";

export default Container;
