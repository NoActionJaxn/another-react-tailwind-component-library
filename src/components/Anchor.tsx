import { type AnchorHTMLAttributes } from "react";
import cn from "../lib/cn.ts";

export type AnchorElement = "a" | "span";

export interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: AnchorElement;
}

const Anchor = ({ as: Component = "a", className, ...rest }: AnchorProps) => {
  return <Component className={cn("another-anchor", className)} {...rest} />;
};

Anchor.displayName = "Anchor";

export default Anchor;
