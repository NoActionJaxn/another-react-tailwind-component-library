import type { Meta, StoryObj } from "@storybook/react-vite";

import SeparatorComponent from "../components/Separator";

const meta = {
  title: "Ui/Separator",
  component: SeparatorComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible visual divider, built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the separator styling.",
    },
    decorative: {
      control: "boolean",
      description:
        "Whether the separator is purely decorative and removed from the accessibility tree.",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "default",
    decorative: true,
  },
} satisfies Meta<typeof SeparatorComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Separator: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <span>Above</span>
      <SeparatorComponent {...args} />
      <span>Below</span>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-16 items-center gap-4">
      <span>Left</span>
      <SeparatorComponent {...args} />
      <span>Right</span>
    </div>
  ),
};
