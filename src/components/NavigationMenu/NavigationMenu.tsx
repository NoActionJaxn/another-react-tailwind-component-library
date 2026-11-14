import {
  ChevronDownIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Portal } from "@radix-ui/react-portal";
import {
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { IconButton } from "../IconButton";
import { CompactMenuContext, MenuHostContext } from "./context";
import {
  useBelowBreakpoint,
  type CollapseBreakpoint,
} from "./useBelowBreakpoint";

export type NavigationMenuCollapse = CollapseBreakpoint | "always" | "never";
export interface NavigationMenuProps extends ComponentProps<
  typeof NavigationMenuPrimitive.Root
> {
  colorScheme?: ColorScheme;
  collapse?: NavigationMenuCollapse;
  menuOpen?: boolean;
  defaultMenuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  openMenuLabel?: string;
  closeMenuLabel?: string;
}

// Everything the panel and its items read, resolved on the menu (scheme,
// Header overrides, the user's variables), to copy onto the portaled panel.
const PANEL_VARS = [
  ...[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
    (step) => `--scheme-${step}`,
  ),
  "--_text",
  "--_item-radius",
  "--_item-hover-bg",
  "--_focus-color",
  "--_focus-width",
  "--_focus-offset",
  "--_panel-bg",
  "--_panel-padding-x",
  "--_panel-padding-y",
  "--_panel-max-width",
  "--_panel-font-size",
  "--_panel-z-index",
  "--button-ghost-text",
  "--button-ghost-bg-hover",
];

function inheritedVars(element: Element) {
  const computed = getComputedStyle(element);
  const vars: Record<string, string> = {};
  for (const name of PANEL_VARS) {
    const value = computed.getPropertyValue(name).trim();
    if (value) vars[name] = value;
  }
  return vars as CSSProperties;
}

export function NavigationMenu({
  colorScheme,
  collapse = "md",
  menuOpen: menuOpenProp,
  defaultMenuOpen = false,
  onMenuOpenChange,
  openMenuLabel = "Open menu",
  closeMenuLabel = "Close menu",
  orientation,
  className,
  style,
  children,
  ...props
}: NavigationMenuProps) {
  const compact = useBelowBreakpoint(collapse);
  const [openState, setOpenState] = useState(defaultMenuOpen);
  const menuOpen = compact && (menuOpenProp ?? openState);
  const panelId = useId();
  const hostRef = useContext(MenuHostContext);
  const rootRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [panelTop, setPanelTop] = useState(0);
  const [panelVars, setPanelVars] = useState<CSSProperties>();

  const setMenuOpen = (open: boolean) => {
    setOpenState(open);
    onMenuOpenChange?.(open);
  };

  // Widening the window past the breakpoint closes the panel.
  const [wasCompact, setWasCompact] = useState(compact);
  if (wasCompact !== compact) {
    setWasCompact(compact);
    if (!compact) setOpenState(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const root = rootRef.current;
    // The panel is portaled to <body>: carry over the variables it would inherit.
    if (root) setPanelVars(inheritedVars(root));
    // Under the header's bar while it's on screen; otherwise the whole screen.
    const place = () =>
      setPanelTop(
        Math.max(0, hostRef?.current?.getBoundingClientRect().bottom ?? 0),
      );
    place();
    window.addEventListener("resize", place);
    // The page behind the full-screen panel shouldn't scroll.
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      window.removeEventListener("resize", place);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      if (toggle?.isConnected && document.activeElement !== toggle) {
        toggle.focus();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen, hostRef]);

  // Covering the toggle, the panel shows its own close button and takes focus.
  const coversToggle = panelTop === 0;
  useEffect(() => {
    if (menuOpen && coversToggle) closeRef.current?.focus();
  }, [menuOpen, coversToggle]);

  // Following a link in the panel closes it.
  const closeOnLink = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as Element).closest("a[href]")) setMenuOpen(false);
  };

  return (
    <NavigationMenuPrimitive.Root
      ref={rootRef}
      data-navigation-menu
      data-compact={compact || undefined}
      data-menu-open={menuOpen || undefined}
      orientation={compact ? "vertical" : orientation}
      style={schemeStyle(colorScheme, style)}
      // Compact, the root makes no stacking context, so the panel can cover the page.
      className={tw(
        "group/nav flex max-w-max flex-1 items-center justify-center text-(--_text)",
        !compact && "relative z-10",
        className,
      )}
      {...props}
    >
      {compact ? (
        <>
          <IconButton
            ref={toggleRef}
            variant="ghost"
            aria-label={menuOpen ? closeMenuLabel : openMenuLabel}
            aria-expanded={menuOpen}
            aria-controls={panelId}
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-(--_text)"
          >
            {menuOpen ? (
              <Cross1Icon aria-hidden />
            ) : (
              <HamburgerMenuIcon aria-hidden />
            )}
          </IconButton>
          {/* Stays mounted while closed so aria-controls points at something.
              Portaled so no transformed ancestor can trap the fixed panel. */}
          <Portal asChild>
            <div
              id={panelId}
              data-navigation-menu-panel
              // Outside the root in the DOM: the panel is the group the items' compact styles key off.
              data-compact
              hidden={!menuOpen}
              onClick={closeOnLink}
              style={{ ...panelVars, top: panelTop }}
              className="group/nav fixed inset-x-0 bottom-0 z-(--_panel-z-index) overflow-y-auto overscroll-contain bg-(--_panel-bg) px-(--_panel-padding-x) py-(--_panel-padding-y) text-(--_text)"
            >
              {coversToggle && (
                <div className="mx-auto mb-(--_panel-padding-y) flex max-w-(--_panel-max-width) justify-end">
                  <IconButton
                    ref={closeRef}
                    variant="ghost"
                    aria-label={closeMenuLabel}
                    onClick={() => setMenuOpen(false)}
                    className="text-(--_text)"
                  >
                    <Cross1Icon aria-hidden />
                  </IconButton>
                </div>
              )}
              <CompactMenuContext value={true}>{children}</CompactMenuContext>
            </div>
          </Portal>
        </>
      ) : (
        <>
          {children}
          <div className="absolute top-full left-0 flex justify-center">
            <NavigationMenuPrimitive.Viewport className="relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-top overflow-hidden rounded-(--_radius) border border-(--_border) bg-(--_bg) shadow-(--_shadow)" />
          </div>
        </>
      )}
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
  const compact = useContext(CompactMenuContext);
  return (
    <NavigationMenuPrimitive.List
      className={tw(
        "flex flex-1 list-none gap-1",
        compact
          ? "mx-auto max-w-(--_panel-max-width) flex-col items-stretch"
          : "items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

// In the panel, items are full-width rows with larger text.
const compactItem =
  "group-data-compact/nav:flex group-data-compact/nav:w-full group-data-compact/nav:justify-between group-data-compact/nav:px-4 group-data-compact/nav:py-3 group-data-compact/nav:text-(length:--_panel-font-size)";

// In the panel, submenus open and close on click only: Radix's hover behavior
// would close one as soon as the pointer moves on (e.g. to scroll).
const noHover = (event: { preventDefault: () => void }) =>
  event.preventDefault();

export function NavigationMenuTrigger({
  className,
  children,
  onPointerMove,
  onPointerLeave,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  const compact = useContext(CompactMenuContext);
  return (
    <NavigationMenuPrimitive.Trigger
      onPointerMove={compact ? noHover : onPointerMove}
      onPointerLeave={compact ? noHover : onPointerLeave}
      className={tw(
        "group inline-flex cursor-pointer items-center gap-1 rounded-(--_item-radius) px-3 py-2 text-sm font-medium outline-(--_focus-color) transition-colors hover:bg-(--_item-hover-bg) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid data-[state=open]:bg-(--_item-hover-bg)",
        compactItem,
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden
        className="size-3 transition-transform duration-200 group-data-compact/nav:size-4 group-data-[state=open]:rotate-180"
      />
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  const compact = useContext(CompactMenuContext);
  return (
    <NavigationMenuPrimitive.Content
      onPointerMove={compact ? noHover : onPointerMove}
      onPointerLeave={compact ? noHover : onPointerLeave}
      // In the panel there's no viewport: the content opens in place, indented.
      className={tw(
        "absolute top-0 left-0 w-max p-2 group-data-compact/nav:static group-data-compact/nav:w-full group-data-compact/nav:ps-4 group-data-compact/nav:*:w-full",
        className,
      )}
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  ...props
}: ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      className={tw(
        "block cursor-pointer rounded-(--_item-radius) px-3 py-2 text-sm font-medium outline-(--_focus-color) transition-colors hover:bg-(--_item-hover-bg) focus:outline-(length:--_focus-width) focus:outline-offset-(--_focus-offset) focus:outline-solid data-active:font-semibold",
        compactItem,
        className,
      )}
      {...props}
    />
  );
}
