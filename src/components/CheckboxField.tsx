import classNames from "classnames";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as LabelPrimitive from "@radix-ui/react-label";

export type CheckboxFieldLayout = 'stack' | 'grid';
export type CheckboxFieldVariant = 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | 'success';

export interface CheckboxFieldOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxFieldProps extends Omit<CheckboxPrimitive.CheckboxProps, 'checked' | 'onCheckedChange' | 'onChange'> {
  options: CheckboxFieldOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  layout?: CheckboxFieldLayout;
  variant?: CheckboxFieldVariant;
  className?: string;
  name?: string;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CheckboxField({
  options,
  value,
  defaultValue = [],
  onChange,
  layout = 'stack',
  variant = 'primary',
  className,
  name,
}: CheckboxFieldProps) {
  const isControlled = !!value;
  const checkedValues = isControlled ? value : [];

  const handleCheckedChange = (optionValue: string, checked: boolean) => {
    if (!onChange) return;

    const currentValues = checkedValues.length > 0
      ? checkedValues
      : defaultValue;

    const newValues = checked
      ? [...currentValues, optionValue]
      : currentValues.filter((v) => v !== optionValue);

    onChange(newValues);
  };

  const layoutStyles = classNames({
    'flex flex-col gap-3': layout === 'stack',
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3': layout === 'grid',
  });

  const baseCheckboxStyles = classNames(
    "h-5 w-5 shrink-0 rounded border transition-colors duration-200 cursor-pointer",
    "focus:outline-none focus:ring-4 focus:ring-offset-0",
    "disabled:cursor-default disabled:opacity-50"
  );

  const variantStyles = classNames({
    "border-neutral-400 data-[state=checked]:bg-neutral-800 data-[state=checked]:border-neutral-800": variant === "default",
    "border-neutral-400 data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500": variant === "primary",
    "border-neutral-400 data-[state=checked]:bg-neutral-100 data-[state=checked]:border-neutral-400": variant === "secondary",
    "border-neutral-400 data-[state=checked]:bg-warning-500 data-[state=checked]:border-warning-500": variant === "warning",
    "border-neutral-400 data-[state=checked]:bg-danger-500 data-[state=checked]:border-danger-500": variant === "danger",
    "border-neutral-400 data-[state=checked]:bg-success-500 data-[state=checked]:border-success-500": variant === "success",
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
    "flex items-center justify-center",
    {
      "text-light": variant !== "secondary",
      "text-dark": variant === "secondary",
    }
  );

  const labelStyles = classNames(
    "text-sm font-medium leading-none cursor-pointer",
    "peer-disabled:cursor-default peer-disabled:opacity-50"
  );

  return (
    <div className={layoutStyles}>
      {options.map((option) => {
        const isChecked = checkedValues?.includes(option.value);
        const checked = isControlled ? isChecked : undefined;
        const defaultChecked = !isControlled ? isChecked : undefined;

        const handleOnChange = (checked: boolean) => {
          handleCheckedChange(option.value, checked);
        }

        return (
          <div key={option.id} className="flex items-center gap-2">
            <CheckboxPrimitive.Root
              id={option.id}
              name={name}
              value={option.value}
              checked={checked}
              defaultChecked={defaultChecked}
              onCheckedChange={handleOnChange}
              disabled={option.disabled}
              className={classNames("peer", baseCheckboxStyles, variantStyles, focusStyles, className)}
            >
              <CheckboxPrimitive.Indicator className={indicatorStyles}>
                <CheckIcon className="h-3.5 w-3.5" />
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
            <LabelPrimitive.Root
              htmlFor={option.id}
              className={labelStyles}
            >
              {option.label}
            </LabelPrimitive.Root>
          </div>
        );
      })}
    </div>
  );
}

CheckboxField.displayName = "CheckboxField";

export default CheckboxField;
