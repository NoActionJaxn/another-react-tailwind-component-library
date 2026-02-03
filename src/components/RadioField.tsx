import classNames from "classnames";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as LabelPrimitive from "@radix-ui/react-label";

export type RadioFieldLayout = 'stack' | 'grid';
export type RadioFieldVariant = 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | 'success';

export interface RadioFieldOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioFieldProps {
  options: RadioFieldOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  layout?: RadioFieldLayout;
  variant?: RadioFieldVariant;
  className?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

function RadioField({
  options,
  value,
  defaultValue,
  onChange,
  layout = 'stack',
  variant = 'primary',
  className,
  name,
  disabled,
  required,
}: RadioFieldProps) {
  const layoutStyles = classNames({
    'flex flex-col gap-3': layout === 'stack',
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3': layout === 'grid',
  });

  const baseRadioStyles = classNames(
    "h-5 w-5 shrink-0 rounded-full border transition-colors duration-200 cursor-pointer",
    "focus:outline-none focus:ring-4 focus:ring-offset-0",
    "disabled:cursor-default disabled:opacity-50"
  );

  const variantStyles = classNames({
    "border-neutral-400 data-[state=checked]:border-neutral-800": variant === "default",
    "border-neutral-400 data-[state=checked]:border-primary-500": variant === "primary",
    "border-neutral-400 data-[state=checked]:border-neutral-400": variant === "secondary",
    "border-neutral-400 data-[state=checked]:border-warning-500": variant === "warning",
    "border-neutral-400 data-[state=checked]:border-danger-500": variant === "danger",
    "border-neutral-400 data-[state=checked]:border-success-500": variant === "success",
  });

  const focusStyles = classNames({
    "focus:ring-neutral-800/50": variant === "default",
    "focus:ring-primary-500/50": variant === "primary",
    "focus:ring-neutral-400/50": variant === "secondary",
    "focus:ring-warning-500/50": variant === "warning",
    "focus:ring-danger-500/50": variant === "danger",
    "focus:ring-success-500/50": variant === "success",
  });

  const indicatorStyles = classNames(
    "flex items-center justify-center w-full h-full relative",
    "after:content-[''] after:block after:w-2.5 after:h-2.5 after:rounded-full",
    {
      "after:bg-neutral-800": variant === "default",
      "after:bg-primary-500": variant === "primary",
      "after:bg-neutral-600": variant === "secondary",
      "after:bg-warning-500": variant === "warning",
      "after:bg-danger-500": variant === "danger",
      "after:bg-success-500": variant === "success",
    }
  );

  const labelStyles = classNames(
    "text-sm font-medium leading-none cursor-pointer",
    "peer-disabled:cursor-default peer-disabled:opacity-50"
  );

  return (
    <RadioGroupPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      name={name}
      disabled={disabled}
      required={required}
      className={layoutStyles}
    >
      {options.map((option) => (
        <div key={option.id} className="flex items-center gap-2">
          <RadioGroupPrimitive.Item
            id={option.id}
            value={option.value}
            disabled={option.disabled}
            className={classNames("peer", baseRadioStyles, variantStyles, focusStyles, className)}
          >
            <RadioGroupPrimitive.Indicator className={indicatorStyles} />
          </RadioGroupPrimitive.Item>
          <LabelPrimitive.Root
            htmlFor={option.id}
            className={labelStyles}
          >
            {option.label}
          </LabelPrimitive.Root>
        </div>
      ))}
    </RadioGroupPrimitive.Root>
  );
}

RadioField.displayName = "RadioField";

export default RadioField;
