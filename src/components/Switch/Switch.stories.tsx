import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Airplane mode",
    size: "md",
    colorScheme: "default",
    disabled: false,
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => <Switch {...args} />,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
