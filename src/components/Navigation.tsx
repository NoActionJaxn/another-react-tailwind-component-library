import { useState, type ReactNode } from "react";
import { NavigationMenu as RadixNavigationMenu } from "radix-ui";
import Container from "./Container.tsx";
import Collapsible from "./Collapsible.tsx";
import Button from "./Button.tsx";
import ChevronDown from "../icons/ChevronDown.tsx";
import MenuIcon from "../icons/Menu.tsx";
import Close from "../icons/Close.tsx";
import cn from "../lib/cn.ts";

export type NavigationVariant = "default" | string;

export interface NavigationItem {
  content?: ReactNode;
  disabled?: boolean;
  href?: string;
  label: ReactNode;
  value?: string;
}

export interface NavigationProps
  extends RadixNavigationMenu.NavigationMenuProps {
  className?: string;
  items?: NavigationItem[];
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  variant?: NavigationVariant;
}

const Navigation = ({
  className,
  items = [],
  mobileOpen: mobileOpenProp,
  onMobileOpenChange,
  variant = "default",
  ...rest
}: NavigationProps) => {
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(false);
  const mobileOpen = mobileOpenProp ?? uncontrolledMobileOpen;

  const setMobileOpen = (open: boolean) => {
    if (mobileOpenProp === undefined) {
      setUncontrolledMobileOpen(open);
    }
    onMobileOpenChange?.(open);
  };

  return (
    <Container
      className={cn("another-navigation", className)}
      data-variant={variant}
    >
      <div className="another-navigation-bar">
        <RadixNavigationMenu.Root className="another-navigation-root" {...rest}>
          <RadixNavigationMenu.List className="another-navigation-list">
            {items.map((item, index) => {
              const value = item.value ?? String(index);

              return (
                <RadixNavigationMenu.Item
                  key={value}
                  value={value}
                  className="another-navigation-item"
                >
                  {item.content ? (
                    <>
                      <RadixNavigationMenu.Trigger
                        className="another-navigation-trigger"
                        disabled={item.disabled}
                      >
                        <span>{item.label}</span>
                        <span className="another-navigation-icon">
                          <ChevronDown />
                        </span>
                      </RadixNavigationMenu.Trigger>
                      <RadixNavigationMenu.Content className="another-navigation-content">
                        {item.content}
                      </RadixNavigationMenu.Content>
                    </>
                  ) : (
                    <RadixNavigationMenu.Link
                      className="another-navigation-link"
                      href={item.disabled ? undefined : item.href}
                      aria-disabled={item.disabled}
                      data-disabled={item.disabled ? "" : undefined}
                    >
                      {item.label}
                    </RadixNavigationMenu.Link>
                  )}
                </RadixNavigationMenu.Item>
              );
            })}
          </RadixNavigationMenu.List>
          <div className="another-navigation-viewport-wrapper">
            <RadixNavigationMenu.Viewport className="another-navigation-viewport" />
          </div>
        </RadixNavigationMenu.Root>

        <Button
          className="another-navigation-mobile-trigger"
          variant="ghost"
          size="sm"
          icon
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <Close /> : <MenuIcon />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="another-navigation-mobile-panel" data-variant={variant}>
          {items.map((item, index) => {
            const value = item.value ?? String(index);

            return item.content ? (
              <Collapsible
                key={value}
                title={item.label}
                className="another-navigation-mobile-item"
              >
                {item.content}
              </Collapsible>
            ) : (
              <a
                key={value}
                className="another-navigation-mobile-link"
                href={item.disabled ? undefined : item.href}
                aria-disabled={item.disabled}
                data-disabled={item.disabled ? "" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </Container>
  );
};

Navigation.displayName = "Navigation";

export default Navigation;
