import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { tw } from "../../utils";
import type { Status } from "./status";

const icons = {
  info: InfoCircledIcon,
  success: CheckCircledIcon,
  warning: ExclamationTriangleIcon,
  danger: CrossCircledIcon,
};

/**
 * The status's icon, or `icon` if given. `icon={false}` (or null) renders nothing.
 * A box one line high keeps it level with the first line of text.
 */
export function StatusIcon({
  status,
  icon,
  className,
}: {
  status: Status | undefined;
  icon: ReactNode;
  className?: string;
}) {
  if (icon === false || icon === null) return null;
  const Icon = icons[status ?? "info"];
  return (
    <span
      aria-hidden
      data-status-icon
      className={tw(
        "flex h-lh shrink-0 items-center text-(--_icon) [&_svg]:size-(--_icon-size)",
        className,
      )}
    >
      {icon ?? <Icon />}
    </span>
  );
}
