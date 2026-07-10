import type { Meta, StoryObj } from "@storybook/react-vite";

import SwitchComponent from "../components/Switch";

const meta = {
  title: "Inputs",
  component: SwitchComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible toggle switch with an optional label.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label rendered alongside the switch.",
    },
    reverse: {
      control: "boolean",
      description: "Reverses the flex direction of the switch and label.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the switch styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the switch.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the switch.",
    },
    defaultChecked: {
      control: "boolean",
      description: "Whether the switch is on by default.",
    },
  },
  args: {
    label: "Airplane mode",
    reverse: false,
    variant: "default",
    size: "md",
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof SwitchComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Switch: Story = {};
