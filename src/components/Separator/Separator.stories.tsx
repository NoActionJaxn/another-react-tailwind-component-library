import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./Separator";

const meta = {
  title: "Components/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { orientation: "horizontal", colorScheme: "default" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) => (
    <div className="w-64 text-sm">
      <p>Above</p>
      <Separator {...args} className="my-3" />
      <div className="flex h-5 items-center gap-3">
        <span>Left</span>
        <Separator orientation="vertical" />
        <span>Right</span>
      </div>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
