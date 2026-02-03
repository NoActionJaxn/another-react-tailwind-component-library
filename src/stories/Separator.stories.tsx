import type { Meta, StoryObj } from "@storybook/react";
import Separator from "../components/Separator";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-64">
      <div className="text-sm font-medium">Section One</div>
      <Separator {...args} className="my-4" />
      <div className="text-sm font-medium">Section Two</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex items-center h-8 gap-4">
      <span className="text-sm">Item One</span>
      <Separator {...args} />
      <span className="text-sm">Item Two</span>
      <Separator {...args} />
      <span className="text-sm">Item Three</span>
    </div>
  ),
};
