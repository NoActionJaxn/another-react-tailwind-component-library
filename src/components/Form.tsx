import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { Form as RadixForm } from "radix-ui";
import type { RegisterOptions, UseFormReturn } from "react-hook-form";
import Button from "./Button.tsx";
import Tooltip from "./Tooltip.tsx";
import Check from "../icons/Check.tsx";
import Info from "../icons/Info.tsx";
import cn from "../lib/cn.ts";

export type FormFieldInputType =
  | "text"
  | "textarea"
  | "checkbox"
  | "checkbox_group"
  | "radio"
  | "select"
  | "file"
  | "hidden";

export type FormVariant = "default" | string;

export interface FormFieldOption {
  label?: ReactNode;
  value: string;
}

export interface FormFieldConfig {
  defaultValue?: string | string[] | boolean;
  help?: ReactNode;
  label?: ReactNode;
  name: string;
  options?: (FormFieldOption | string)[];
  placeholder?: string;
  required?: boolean;
  type?: FormFieldInputType;
  /** Pipe-delimited rules: `email`, `url`, `min:N`, `max:N`, `length:N` - e.g. `"email|max:255"`. */
  validation?: string;
  width?: "100" | "67" | "50" | "33";
}

export interface FormProps extends Omit<
  ComponentPropsWithoutRef<"form">,
  "onSubmit"
> {
  fields: FormFieldConfig[];
  /**
   * A `react-hook-form` instance, created by the consumer via their own
   * `useForm()` call. Optional - when omitted, Form runs entirely on native
   * browser validation instead (no dependency on react-hook-form at all).
   * Passed in rather than created internally because `useForm` is a hook -
   * it can't be conditionally or lazily invoked, so this is the only way
   * for react-hook-form to be a true optional integration.
   */
  form?: UseFormReturn<Record<string, unknown>>;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  submitLabel?: ReactNode;
  variant?: FormVariant;
}

interface ParsedValidation {
  email?: boolean;
  maxLength?: number;
  minLength?: number;
  url?: boolean;
}

const parseValidation = (validation?: string | null): ParsedValidation => {
  const parsed: ParsedValidation = {};
  if (!validation) return parsed;

  for (const rule of validation.split("|")) {
    const [ruleName, ruleValue] = rule.split(":");

    switch (ruleName.trim().toLowerCase()) {
      case "email":
        parsed.email = true;
        break;
      case "url":
        parsed.url = true;
        break;
      case "min":
        parsed.minLength = parseInt(ruleValue, 10);
        break;
      case "max":
        parsed.maxLength = parseInt(ruleValue, 10);
        break;
      case "length":
        parsed.minLength = parseInt(ruleValue, 10);
        parsed.maxLength = parseInt(ruleValue, 10);
        break;
    }
  }

  return parsed;
};

const normalizeOption = (option: FormFieldOption | string) =>
  typeof option === "string" ? { value: option, label: option } : option;

const fieldLabel = (field: FormFieldConfig) => field.label ?? field.name;

const buildRegisterOptions = (
  field: FormFieldConfig,
  rules: ParsedValidation,
): RegisterOptions<Record<string, unknown>> => {
  const label = fieldLabel(field);
  const options: RegisterOptions<Record<string, unknown>> = {};

  if (field.required) {
    options.required = `${label} is required`;
  }
  if (rules.email) {
    options.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: `${label} must be a valid email`,
    };
  } else if (rules.url) {
    options.pattern = {
      value: /^https?:\/\/.+/,
      message: `${label} must be a valid URL`,
    };
  }
  if (rules.minLength !== undefined) {
    options.minLength = {
      value: rules.minLength,
      message: `${label} must be at least ${rules.minLength} characters`,
    };
  }
  if (rules.maxLength !== undefined) {
    options.maxLength = {
      value: rules.maxLength,
      message: `${label} must be at most ${rules.maxLength} characters`,
    };
  }

  return options;
};

const formDataToValues = (
  formData: FormData,
  fields: FormFieldConfig[],
): Record<string, unknown> => {
  const values: Record<string, unknown> = {};

  for (const field of fields) {
    if (field.type === "checkbox") {
      values[field.name] = formData.has(field.name);
    } else if (field.type === "checkbox_group") {
      values[field.name] = formData.getAll(field.name);
    } else if (field.type === "file") {
      const file = formData.get(field.name);
      values[field.name] =
        file instanceof File && file.size > 0 ? file : undefined;
    } else {
      values[field.name] = formData.get(field.name) ?? "";
    }
  }

  return values;
};

interface FormFieldRowProps {
  field: FormFieldConfig;
  form?: UseFormReturn<Record<string, unknown>>;
}

const FieldMessages = ({
  field,
  rules,
  form,
}: {
  field: FormFieldConfig;
  rules: ParsedValidation;
  form?: UseFormReturn<Record<string, unknown>>;
}) => {
  if (form) {
    // react-hook-form's error state is independent of the DOM's native
    // ValidityState, so it's rendered as a plain span rather than through
    // Radix's match/forceMatch machinery - `Form.Message` without an
    // explicit `match` renders unconditionally (forceMatch is only
    // consulted inside the builtin/custom matcher branches), so it can't
    // be used as a bare "show only when there's an error" wrapper here.
    const error = form.formState.errors[field.name]?.message;
    if (!error) return null;

    return (
      <span className="another-form-message">
        {typeof error === "string" ? error : "This value is not valid"}
      </span>
    );
  }

  const label = fieldLabel(field);

  return (
    <>
      {field.required && (
        <RadixForm.Message
          className="another-form-message"
          match="valueMissing"
        >
          {`${label} is required`}
        </RadixForm.Message>
      )}
      {rules.email && (
        <RadixForm.Message
          className="another-form-message"
          match="typeMismatch"
        >
          {`${label} must be a valid email`}
        </RadixForm.Message>
      )}
      {rules.url && (
        <RadixForm.Message
          className="another-form-message"
          match="typeMismatch"
        >
          {`${label} must be a valid URL`}
        </RadixForm.Message>
      )}
      {rules.minLength !== undefined && (
        <RadixForm.Message className="another-form-message" match="tooShort">
          {`${label} must be at least ${rules.minLength} characters`}
        </RadixForm.Message>
      )}
      {rules.maxLength !== undefined && (
        <RadixForm.Message className="another-form-message" match="tooLong">
          {`${label} must be at most ${rules.maxLength} characters`}
        </RadixForm.Message>
      )}
    </>
  );
};

const FieldHeader = ({ field }: { field: FormFieldConfig }) => {
  if (!field.label && !field.help) return null;

  return (
    <div className="another-form-field-header">
      {field.label && (
        <RadixForm.Label className="another-form-label">
          {field.label}
          {field.required && (
            <span className="another-form-required">*Required</span>
          )}
        </RadixForm.Label>
      )}
      {field.help && (
        <Tooltip
          trigger={
            <span className="another-form-help" tabIndex={0}>
              <Info />
            </span>
          }
        >
          {field.help}
        </Tooltip>
      )}
    </div>
  );
};

const FormFieldRow = ({ field, form }: FormFieldRowProps) => {
  const groupId = useId();
  const rules = parseValidation(field.validation);
  const registered = form?.register(
    field.name,
    buildRegisterOptions(field, rules),
  );
  const options = (field.options ?? []).map(normalizeOption);

  if (field.type === "hidden") {
    return (
      <input
        type="hidden"
        name={field.name}
        defaultValue={
          typeof field.defaultValue === "string"
            ? field.defaultValue
            : undefined
        }
        {...registered}
      />
    );
  }

  return (
    <RadixForm.Field
      name={field.name}
      className="another-form-field"
      data-width={field.width ?? "100"}
    >
      {field.type !== "checkbox" && <FieldHeader field={field} />}

      {field.type === "textarea" && (
        <RadixForm.Control asChild>
          <textarea
            className="another-form-input another-form-textarea"
            placeholder={field.placeholder}
            required={field.required}
            minLength={rules.minLength}
            maxLength={rules.maxLength}
            defaultValue={
              typeof field.defaultValue === "string"
                ? field.defaultValue
                : undefined
            }
            {...registered}
          />
        </RadixForm.Control>
      )}

      {field.type === "select" && (
        <RadixForm.Control asChild>
          <select
            className="another-form-input another-form-select"
            required={field.required}
            defaultValue={
              typeof field.defaultValue === "string" ? field.defaultValue : ""
            }
            {...registered}
          >
            <option value="" disabled hidden>
              {field.placeholder ?? "Select an option"}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </RadixForm.Control>
      )}

      {field.type === "checkbox" && (
        <div className="another-form-checkbox-row">
          <span className="another-form-checkbox-wrapper">
            <RadixForm.Control
              type="checkbox"
              className="another-form-checkbox"
              required={field.required}
              defaultChecked={field.defaultValue === true}
              {...registered}
            />
            <span className="another-form-checkbox-indicator">
              <Check />
            </span>
          </span>
          {field.label && (
            <RadixForm.Label className="another-form-label">
              {field.label}
            </RadixForm.Label>
          )}
          {field.help && (
            <Tooltip
              trigger={
                <span className="another-form-help" tabIndex={0}>
                  <Info />
                </span>
              }
            >
              {field.help}
            </Tooltip>
          )}
        </div>
      )}

      {field.type === "radio" && (
        <div className="another-form-option-list">
          {options.map((option) => {
            const itemId = `${groupId}-${option.value}`;

            return (
              <div key={option.value} className="another-form-option">
                <span className="another-form-radio-wrapper">
                  <RadixForm.Control
                    type="radio"
                    id={itemId}
                    className="another-form-radio"
                    value={option.value}
                    required={field.required}
                    defaultChecked={field.defaultValue === option.value}
                    {...registered}
                  />
                  <span className="another-form-radio-indicator" />
                </span>
                <label className="another-form-label" htmlFor={itemId}>
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      )}

      {field.type === "checkbox_group" && (
        <div className="another-form-option-list">
          {options.map((option) => {
            const itemId = `${groupId}-${option.value}`;

            return (
              <div key={option.value} className="another-form-option">
                <span className="another-form-checkbox-wrapper">
                  <RadixForm.Control
                    type="checkbox"
                    id={itemId}
                    className="another-form-checkbox"
                    value={option.value}
                    defaultChecked={
                      Array.isArray(field.defaultValue) &&
                      field.defaultValue.includes(option.value)
                    }
                    {...registered}
                  />
                  <span className="another-form-checkbox-indicator">
                    <Check />
                  </span>
                </span>
                <label className="another-form-label" htmlFor={itemId}>
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      )}

      {field.type === "file" && (
        <RadixForm.Control
          type="file"
          className="another-form-input"
          required={field.required}
          {...registered}
        />
      )}

      {(!field.type || field.type === "text") && (
        <RadixForm.Control
          type={rules.email ? "email" : rules.url ? "url" : "text"}
          className="another-form-input"
          placeholder={field.placeholder}
          required={field.required}
          minLength={rules.minLength}
          maxLength={rules.maxLength}
          defaultValue={
            typeof field.defaultValue === "string"
              ? field.defaultValue
              : undefined
          }
          {...registered}
        />
      )}

      <FieldMessages field={field} rules={rules} form={form} />
    </RadixForm.Field>
  );
};

const Form = ({
  className,
  fields,
  form,
  onSubmit,
  submitLabel = "Submit",
  variant = "default",
  ...rest
}: FormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitting = form ? form.formState.isSubmitting : isSubmitting;

  const handleNativeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = formDataToValues(new FormData(event.currentTarget), fields);

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RadixForm.Root
      className={cn("another-form", className)}
      data-variant={variant}
      // Native `required`/`type="email"` etc. still block the "submit"
      // event from ever firing when a control is invalid - which would
      // also block react-hook-form's own JS-driven validation from ever
      // running. `noValidate` hands validation entirely to react-hook-form
      // when it's present; native browser validation still applies as
      // normal otherwise.
      noValidate={!!form}
      onSubmit={form ? form.handleSubmit(onSubmit) : handleNativeSubmit}
      {...rest}
    >
      {fields.map((field) => (
        <FormFieldRow key={field.name} field={field} form={form} />
      ))}
      <div className="another-form-actions">
        <Button type="submit" disabled={submitting}>
          {submitLabel}
        </Button>
      </div>
    </RadixForm.Root>
  );
};

Form.displayName = "Form";

export default Form;
