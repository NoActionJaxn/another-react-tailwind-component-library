import {
  Fragment,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Container from "./Container.tsx";
import GridContainer, { type GridContainerColumns } from "./GridContainer.tsx";
import cn from "../lib/cn.ts";

export type RecentsVariant = "default" | string;

export interface RecentsProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  columns?: GridContainerColumns;
  items?: ReactNode[];
  title?: ReactNode;
  variant?: RecentsVariant;
  viewMore?: ReactNode;
}

const Recents = ({
  as = "section",
  className,
  columns = 3,
  items = [],
  title,
  variant = "default",
  viewMore,
  ...rest
}: RecentsProps) => {
  return (
    <Container
      as={as}
      className={cn("another-recents", className)}
      data-variant={variant}
      {...rest}
    >
      <div className="another-recents-inner">
        {(title || viewMore) && (
          <div className="another-recents-header">
            {title && (
              <h2 className="another-recents-title font-accent">{title}</h2>
            )}
            {viewMore && (
              <div className="another-recents-view-more">{viewMore}</div>
            )}
          </div>
        )}
        <GridContainer columns={columns} gridClassName="another-recents-grid">
          {items.map((item, index) => (
            <Fragment key={index}>{item}</Fragment>
          ))}
        </GridContainer>
      </div>
    </Container>
  );
};

Recents.displayName = "Recents";

export default Recents;
