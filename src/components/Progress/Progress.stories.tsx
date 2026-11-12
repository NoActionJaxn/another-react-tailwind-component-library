import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    value: 60,
    size: "md",
    colorScheme: "default",
    "aria-label": "Upload progress",
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100 } },
  },
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
