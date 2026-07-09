import type { Meta, StoryObj } from "@storybook/react-vite";
import TextInputComponent from "../components/TextInput";
import LabelComponent from "../components/Label";

const meta = {
  title: "Inputs",
  component: TextInputComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible text input with optional prepended and appended content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text shown when the input is empty.",
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "tel", "search", "password", "number"],
      description: "HTML input type.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Input size.",
    },
    block: {
      control: "boolean",
      description: "Makes the component full width.",
    },
    variant: {
      control: "text",
      description: "Visual variant used by the input styling.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input.",
    },
    prependElement: {
      control: false,
      description: "Element rendered before the input value.",
    },
    appendElement: {
      control: false,
      description: "Element rendered after the input value.",
    },
  },
  args: {
    placeholder: "Enter text",
    size: "md",
    type: "text",
    block: false,
    variant: "default",
    disabled: false,
  },
} satisfies Meta<typeof TextInputComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextInput: Story = {
  render: ({ size, ...rest }) => (
    <div className="space-x-4">
      <LabelComponent size={size} htmlFor="text-input">
        Label
      </LabelComponent>
      <TextInputComponent size={size} id="text-input" {...rest} />
    </div>
  ),
};

export const TextInputWithPrependedElement: Story = {
  args: {
    prependElement: <>🔥</>,
  },
  render: ({ size, ...rest }) => (
    <div className="space-x-4">
      <LabelComponent size={size} htmlFor="text-input-prepend">
        Label
      </LabelComponent>
      <TextInputComponent size={size} id="text-input-prepend" {...rest} />
    </div>
  ),
};

export const TextInputWithAppendedElement: Story = {
  args: {
    appendElement: <>🔥</>,
  },
  render: ({ size, ...rest }) => (
    <div className="space-x-4">
      <LabelComponent size={size} htmlFor="text-input-append">
        Label
      </LabelComponent>
      <TextInputComponent size={size} id="text-input-append" {...rest} />
    </div>
  ),
};
