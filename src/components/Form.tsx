import { Form as RadixForm } from "radix-ui";
import cn from "../lib/cn.ts";

export interface FormProps extends RadixForm.FormProps {
  className?: string;
}

export const Form = ({ className, ...rest }: FormProps) => (
  <RadixForm.Root className={cn("another-form", className)} {...rest} />
);

Form.displayName = "Form";

export interface FormFieldProps extends RadixForm.FormFieldProps {
  className?: string;
}

export const FormField = ({ className, ...rest }: FormFieldProps) => (
  <RadixForm.Field className={cn("another-form-field", className)} {...rest} />
);

FormField.displayName = "FormField";

export interface FormLabelProps extends RadixForm.FormLabelProps {
  className?: string;
}

export const FormLabel = ({ className, ...rest }: FormLabelProps) => (
  <RadixForm.Label className={cn("another-form-label", className)} {...rest} />
);

FormLabel.displayName = "FormLabel";

export interface FormControlProps extends RadixForm.FormControlProps {
  className?: string;
}

export const FormControl = ({ className, ...rest }: FormControlProps) => (
  <RadixForm.Control
    className={cn("another-form-control", className)}
    {...rest}
  />
);

FormControl.displayName = "FormControl";

export interface FormMessageProps extends RadixForm.FormMessageProps {
  className?: string;
}

export const FormMessage = ({ className, ...rest }: FormMessageProps) => (
  <RadixForm.Message
    className={cn("another-form-message", className)}
    {...rest}
  />
);

FormMessage.displayName = "FormMessage";

export default Form;
