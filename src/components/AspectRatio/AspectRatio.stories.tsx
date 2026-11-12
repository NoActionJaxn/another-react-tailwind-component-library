import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Components/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { ratio: 16 / 9 },
  argTypes: {},
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <div className="flex size-full items-center justify-center rounded-md bg-default-200 text-sm text-default-700">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
