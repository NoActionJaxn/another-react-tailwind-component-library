import type { Meta, StoryObj } from "@storybook/react-vite";
import { FontBoldIcon } from "@radix-ui/react-icons";
import { Toggle } from "./Toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    variant: "ghost",
    size: "md",
    colorScheme: "default",
    "aria-label": "Bold",
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["ghost", "outline"] },
  },
  render: (args) => (
    <Toggle {...args}>
      <FontBoldIcon />
    </Toggle>
  ),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
