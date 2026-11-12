import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    defaultValue: "email",
    size: "md",
    colorScheme: "default",
    orientation: "vertical",
    disabled: false,
    "aria-label": "Contact method",
    onValueChange: fn(),
  },
  argTypes: {
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
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    disabled: { table: { defaultValue: { summary: "false" } } },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="email" label="Email" />
      <Radio value="phone" label="Phone" />
      <Radio value="mail" label="Mail" />
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
