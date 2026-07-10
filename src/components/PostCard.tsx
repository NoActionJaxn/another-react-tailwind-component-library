import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import cn from "../lib/cn.ts";
import Typography from "./Typography.tsx";

export type PostCardVariant = "default" | string;

export interface PostCardProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  description?: ReactNode;
  footer?: ReactNode;
  image?: ReactNode;
  meta?: ReactNode;
  title?: ReactNode;
  variant?: PostCardVariant;
}

const PostCard = ({
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
}: PostCardProps) => {
  return (
    <Component
      className={cn("another-post-card", className)}
      data-variant={variant}
      {...rest}
    >
      {image && <div className="another-post-card-image">{image}</div>}
      <div className="another-post-card-body">
        {title && (
          <Typography as="h3" font="accent" className="another-post-card-title">
            {title}
          </Typography>
        )}
        {meta && <div className="another-post-card-meta">{meta}</div>}
        {description && (
          <Typography
            as="p"
            font="sans"
            className="another-post-card-description"
          >
            {description}
          </Typography>
        )}
        {children}
      </div>
      {footer && <div className="another-post-card-footer">{footer}</div>}
    </Component>
  );
};

PostCard.displayName = "PostCard";

export default PostCard;
