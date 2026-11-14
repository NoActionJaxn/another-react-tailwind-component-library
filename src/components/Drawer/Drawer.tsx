import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import type { ComponentProps } from "react";
import { schemeStyle, tw, type ColorScheme } from "../../utils";
import { Backdrop } from "../Backdrop";
import { IconButton } from "../IconButton";

export const Drawer = DialogPrimitive.Root;
export const DrawerTrigger = DialogPrimitive.Trigger;
export const DrawerClose = DialogPrimitive.Close;

export type DrawerSide = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg";
export interface DrawerContentProps extends ComponentProps<
  typeof DialogPrimitive.Content
> {
  side?: DrawerSide;
  size?: DrawerSize;
  colorScheme?: ColorScheme;
  showClose?: boolean;
  closeLabel?: string;
}

const sides = {
  left: "inset-y-0 left-0 w-(--_size) max-w-(--_max-size) border-r rounded-r-(--_radius)",
  right:
    "inset-y-0 right-0 w-(--_size) max-w-(--_max-size) border-l rounded-l-(--_radius)",
  top: "inset-x-0 top-0 max-h-(--_size) border-b rounded-b-(--_radius)",
  bottom: "inset-x-0 bottom-0 max-h-(--_size) border-t rounded-t-(--_radius)",
};

export function DrawerContent({
  side = "right",
  size = "md",
  colorScheme,
  showClose = true,
  closeLabel = "Close",
  className,
  style,
  children,
  ...props
}: DrawerContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <Backdrop data-drawer-overlay colorScheme={colorScheme} />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content
        data-drawer-content
        data-side={side}
        data-size={size}
        style={schemeStyle(colorScheme, style)}
        className={tw(
          "fixed z-50 flex flex-col gap-(--_gap) border-(--_border) bg-(--_bg) py-(--_padding) text-(--_text) shadow-(--_shadow) outline-none",
          sides[side],
          className,
        )}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              size="sm"
              aria-label={closeLabel}
              className="absolute end-(--_close-inset) top-(--_close-inset)"
            >
              <Cross2Icon aria-hidden />
            </IconButton>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DrawerHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-drawer-header
      // Leaves room for the close button.
      className={tw(
        "flex flex-col gap-(--_description-gap) ps-(--_padding) pe-(--_header-padding-end)",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={tw(
        "text-(length:--_title-font-size) leading-snug font-(--_title-font-weight) text-(--_title-text)",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      className={tw(
        "text-(length:--_description-font-size) leading-normal text-(--_description-text)",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-drawer-body
      className={tw(
        "min-h-0 flex-1 overflow-y-auto px-(--_padding)",
        className,
      )}
      {...props}
    />
  );
}

export function DrawerFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-drawer-footer
      className={tw(
        "flex flex-wrap items-center justify-end gap-(--_footer-gap) border-t border-(--_footer-border) px-(--_padding) pt-(--_padding)",
        className,
      )}
      {...props}
    />
  );
}
