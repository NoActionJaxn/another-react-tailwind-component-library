import type { Meta, StoryObj } from "@storybook/react-vite";
import TextInputComponent from "../components/TextInput";

const meta = {
  title: "Forms/Inputs",
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
    label: {
      control: "text",
      description: "Label rendered alongside the input.",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Layout of the input relative to its label.",
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
    label: "Label",
    orientation: "vertical",
    disabled: false,
  },
} satisfies Meta<typeof TextInputComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultTextInput: Story = {};

export const HorizontalTextInput: Story = {
  args: {
    orientation: "horizontal",
  },
};

export const TextInputWithPrependedElement: Story = {
  args: {
    prependElement: <>🔥</>,
  },
};

export const TextInputWithAppendedElement: Story = {
  args: {
    appendElement: <>🔥</>,
  },
};
