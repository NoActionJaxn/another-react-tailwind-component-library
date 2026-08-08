import {
  useState,
  type ElementType,
  type FormEvent,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import Container from "./Container.tsx";
import Navigation, { type NavigationItem } from "./Navigation.tsx";
import TextInput from "./TextInput.tsx";
import Search from "../icons/Search.tsx";
import cn from "../lib/cn.ts";

export type HeaderVariant = "default" | string;

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode;
  as?: ElementType;
  fixed?: boolean;
  items?: NavigationItem[];
  logo?: ReactNode;
  onSearch?: (value: string) => void;
  search?: boolean;
  searchPlaceholder?: string;
  variant?: HeaderVariant;
}

const Header = ({
  actions,
  as = "header",
  className,
  fixed = true,
  items = [],
  logo,
  onSearch,
  search = false,
  searchPlaceholder = "Search",
  variant = "default",
  ...rest
}: HeaderProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(searchValue);
  };

  const renderSearchField = (formClassName: string) => (
    <form className={formClassName} role="search" onSubmit={handleSearchSubmit}>
      <TextInput
        type="search"
        size="sm"
        block
        aria-label={searchPlaceholder}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        prependElement={<Search />}
      />
    </form>
  );

  return (
    <Container
      as={as}
      className={cn("another-header", className)}
      data-fixed={fixed}
      data-variant={variant}
      {...rest}
    >
      <div className="another-header-bar">
        {logo && <div className="another-header-logo">{logo}</div>}
        <Navigation
          className="another-header-navigation"
          items={items}
          desktopExtra={search && renderSearchField("another-header-search")}
          mobileExtra={
            search && renderSearchField("another-header-search-mobile")
          }
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
        />
        {actions && <div className="another-header-actions">{actions}</div>}
      </div>
    </Container>
  );
};

Header.displayName = "Header";

export default Header;
