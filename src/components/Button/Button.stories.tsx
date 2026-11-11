import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "solid",
    size: "md",
    colorScheme: "default",
    disabled: false,
    asChild: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline", "ghost"],
      table: { defaultValue: { summary: "solid" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: "inherited from parent" } },
    },
    disabled: { table: { defaultValue: { summary: "false" } } },
    asChild: { table: { defaultValue: { summary: "false" } } },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
