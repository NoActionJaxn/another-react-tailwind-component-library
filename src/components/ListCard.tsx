import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import cn from "../lib/cn.ts";
import Typography from "./Typography.tsx";

export type ListCardVariant = "default" | string;

export interface ListCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  description?: ReactNode;
  footer?: ReactNode;
  image?: ReactNode;
  meta?: ReactNode;
  title?: ReactNode;
  variant?: ListCardVariant;
}

const ListCard = ({
  as: Component = "article",
  children,
  className,
  description,
  footer,
  image,
  meta,
  title,
  variant = "default",
  ...rest
}: ListCardProps) => {
  return (
    <Component
      className={cn("another-list-card", className)}
      data-variant={variant}
      {...rest}
    >
      {image && <div className="another-list-card-image">{image}</div>}
      <div className="another-list-card-body">
        {title && (
          <Typography as="h3" font="accent" className="another-list-card-title">
            {title}
          </Typography>
        )}
        {meta && <div className="another-list-card-meta">{meta}</div>}
        {description && (
          <Typography
            as="p"
            font="sans"
            className="another-list-card-description"
          >
            {description}
          </Typography>
        )}
        {children}
      </div>
      {footer && <div className="another-list-card-footer">{footer}</div>}
    </Component>
  );
};

ListCard.displayName = "ListCard";

export default ListCard;
