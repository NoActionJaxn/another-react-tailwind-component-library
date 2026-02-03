import type { ReactElement, ComponentType } from "react";
import classNames from "classnames";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export interface NavbarLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export interface NavbarItem {
  label: string;
  href?: string;
  onClick?: () => void;
  children?: NavbarItem[];
}

export interface NavbarProps {
  logo?: ReactElement;
  items?: NavbarItem[];
  actions?: ReactElement;
  sticky?: boolean;
  fixed?: boolean;
  bordered?: boolean;
  className?: string;
  linkComponent?: ComponentType<NavbarLinkProps>;
}

const DefaultLink = ({ href, className, children }: NavbarLinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);

function Navbar({
  logo,
  items = [],
  actions,
  sticky = false,
  fixed = false,
  bordered = true,
  className,
  linkComponent: LinkComponent = DefaultLink,
}: NavbarProps) {
  const containerStyles = classNames(
    "w-full h-header bg-white flex items-center justify-between px-4 md:px-6",
    {
      "sticky top-0 z-40": sticky && !fixed,
      "fixed top-0 left-0 z-40": fixed,
      "border-b border-neutral-200": bordered,
    },
    className
  );

  const linkStyles = classNames(
    "px-3 py-2 text-sm font-medium text-neutral-700 rounded-md transition-colors",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
  );

  const triggerStyles = classNames(
    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-700 rounded-md transition-colors",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    "data-[state=open]:bg-neutral-100"
  );

  const contentStyles = classNames(
    "absolute left-1/2 -translate-x-1/2 top-full mt-1 w-max min-w-[180px] bg-white rounded-lg border border-neutral-200 shadow-lg p-1"
  );

  const subLinkStyles = classNames(
    "block w-full px-3 py-2 text-sm text-neutral-700 rounded-md transition-colors text-left",
    "hover:bg-neutral-100 hover:text-neutral-900",
    "focus:outline-none focus:bg-neutral-100"
  );

  const renderNavItem = (item: NavbarItem, index: number) => {
    if (item.children && item.children.length > 0) {
      return (
        <NavigationMenu.Item key={index} className="relative">
          <NavigationMenu.Trigger className={triggerStyles}>
            {item.label}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-data-[state=open]:rotate-180"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentStyles}>
            {item.children.map((child, childIndex) => (
              <NavigationMenu.Link key={childIndex} asChild>
                {child.href ? (
                  <LinkComponent href={child.href} className={subLinkStyles}>
                    {child.label}
                  </LinkComponent>
                ) : (
                  <button onClick={child.onClick} className={subLinkStyles}>
                    {child.label}
                  </button>
                )}
              </NavigationMenu.Link>
            ))}
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      );
    }

    return (
      <NavigationMenu.Item key={index}>
        <NavigationMenu.Link asChild>
          {item.href ? (
            <LinkComponent href={item.href} className={linkStyles}>
              {item.label}
            </LinkComponent>
          ) : (
            <button onClick={item.onClick} className={linkStyles}>
              {item.label}
            </button>
          )}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  };

  return (
    <header className={containerStyles}>
      <div className="flex items-center gap-6">
        {logo && <div className="shrink-0">{logo}</div>}

        {items.length > 0 && actions && (
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex items-center gap-1">
              {items.map(renderNavItem)}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        )}
      </div>

      <div className="flex items-center gap-4">
        {items.length > 0 && !actions && (
          <NavigationMenu.Root className="hidden md:block">
            <NavigationMenu.List className="flex items-center gap-1">
              {items.map(renderNavItem)}
            </NavigationMenu.List>
          </NavigationMenu.Root>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

Navbar.displayName = "Navbar";

export default Navbar;
