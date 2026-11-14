import {
  InputField,
  type InputFieldProps,
  type TextInputLabelPlacement,
  type TextInputSize,
  type TextInputVariant,
} from "./InputField";

const types = ["text", "email", "search", "url"] as const;

export type TextInputType = (typeof types)[number];
export type { TextInputLabelPlacement, TextInputSize, TextInputVariant };
export interface TextInputProps extends Omit<InputFieldProps, "type"> {
  type?: TextInputType;
}

export function TextInput({ type = "text", ...props }: TextInputProps) {
  // Guards against other types passed from untyped code.
  return <InputField type={types.includes(type) ? type : "text"} {...props} />;
}
