import {
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Container from "./Container.tsx";
import Navigation, { type NavigationItem } from "./Navigation.tsx";
import cn from "../lib/cn.ts";

export type HeaderVariant = "default" | string;

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  items?: NavigationItem[];
  logo?: ReactNode;
  variant?: HeaderVariant;
}

const Header = ({
  as = "header",
  className,
  items = [],
  logo,
  variant = "default",
  ...rest
}: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Container
      as={as}
      className={cn("another-header", className)}
      data-variant={variant}
      {...rest}
    >
      <div className="another-header-bar">
        {logo && <div className="another-header-logo">{logo}</div>}
        <Navigation
          className="another-header-navigation"
          items={items}
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
        />
      </div>
    </Container>
  );
};

Header.displayName = "Header";

export default Header;
