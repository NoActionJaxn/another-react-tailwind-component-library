import { tw } from "../../utils";
import { Button, type ButtonProps } from "../Button";

export interface IconButtonProps extends Omit<ButtonProps, "block"> {
  /** Required: an icon has no visible text to name the button. */
  "aria-label": string;
  round?: boolean;
}

/** A square Button for a single icon; same variants, sizes and states as Button. */
export function IconButton({
  size = "md",
  round = false,
  className,
  ...props
}: IconButtonProps) {
  return (
    <Button
      data-icon-button
      size={size}
      className={tw(
        "size-(--_size) shrink-0 p-0 [&_svg]:size-(--_icon-size)",
        round && "rounded-full",
        className,
      )}
      {...props}
    />
  );
}
