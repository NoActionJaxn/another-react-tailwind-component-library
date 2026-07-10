import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import Container from "./Container.tsx";
import Typography from "./Typography.tsx";
import cn from "../lib/cn.ts";

export type BlogPostVariant = "default" | string;

export interface BlogPostProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "title"
> {
  as?: ElementType;
  cover?: ReactNode;
  meta?: ReactNode;
  title?: ReactNode;
  variant?: BlogPostVariant;
}

const BlogPost = ({
  as = "article",
  children,
  className,
  cover,
  meta,
  title,
  variant = "default",
  ...rest
}: BlogPostProps) => {
  return (
    <Container
      as={as}
      className={cn("another-blog-post", className)}
      data-variant={variant}
      {...rest}
    >
      {cover && <div className="another-blog-post-cover">{cover}</div>}
      <div className="another-blog-post-content">
        {title && (
          <Typography as="h1" font="accent" className="another-blog-post-title">
            {title}
          </Typography>
        )}
        {meta && <div className="another-blog-post-meta">{meta}</div>}
        <div className="another-blog-post-body">{children}</div>
      </div>
    </Container>
  );
};

BlogPost.displayName = "BlogPost";

export default BlogPost;
