import classNames from "classnames";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as LabelPrimitive from "@radix-ui/react-label";

export type ToggleVariant = "default" | "primary" | "secondary" | "warning" | "danger" | "success";
export type ToggleLabelPosition = "top" | "bottom" | "left" | "right";

export interface ToggleProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'size'> {
  id?: string;
  label?: string;
  labelPosition?: ToggleLabelPosition;
  variant?: ToggleVariant;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
}

function Toggle({
  id,
  label,
  labelPosition = "right",
  variant = "primary",
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  className,
  ...rest
}: ToggleProps) {
  const wrapperStyles = classNames({
    "flex flex-col gap-1.5": labelPosition === "top" || labelPosition === "bottom",
    "flex flex-row items-center gap-3": labelPosition === "left" || labelPosition === "right",
  });

  const labelStyles = classNames(
    "text-sm font-medium leading-none",
    {
      "cursor-pointer": !disabled,
      "cursor-default opacity-50": disabled,
    }
  );

  const switchBaseStyles = classNames(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-0",
    "disabled:cursor-default disabled:opacity-50",
    "data-[state=unchecked]:bg-neutral-300"
  );

  const variantStyles = classNames({
    "data-[state=checked]:bg-neutral-800 focus-visible:ring-neutral-800/50": variant === "default",
    "data-[state=checked]:bg-primary-500 focus-visible:ring-primary-500/50": variant === "primary",
    "data-[state=checked]:bg-neutral-400 focus-visible:ring-neutral-400/50": variant === "secondary",
    "data-[state=checked]:bg-warning-500 focus-visible:ring-warning-500/50": variant === "warning",
    "data-[state=checked]:bg-danger-500 focus-visible:ring-danger-500/50": variant === "danger",
    "data-[state=checked]:bg-success-500 focus-visible:ring-success-500/50": variant === "success",
  });

  const thumbStyles = classNames(
    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0",
    "transition-transform duration-200",
    "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
  );

  const switchElement = (
    <SwitchPrimitive.Root
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      required={required}
      name={name}
      value={value}
      className={classNames(switchBaseStyles, variantStyles, className)}
      {...rest}
    >
      <SwitchPrimitive.Thumb className={thumbStyles} />
    </SwitchPrimitive.Root>
  );

  if (!label) {
    return switchElement;
  }

  const labelElement = (
    <LabelPrimitive.Root htmlFor={id} className={labelStyles}>
      {label}
    </LabelPrimitive.Root>
  );

  return (
    <div className={wrapperStyles}>
      {(labelPosition === "top" || labelPosition === "left") && labelElement}
      {switchElement}
      {(labelPosition === "bottom" || labelPosition === "right") && labelElement}
    </div>
  );
}

Toggle.displayName = "Toggle";

export default Toggle;
