import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: docsParameters("Switch", { layout: "centered" }),
  args: {
    label: m.components.Switch.story.label,
    size: "md",
    colorScheme: "default",
    disabled: false,
  },
  argTypes: docsArgTypes(
    "Switch",
    ["label", "size", "colorScheme", "disabled"],
    {
      disabled: { table: { defaultValue: { summary: "false" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    },
  ),
  render: (args) => <Switch {...args} />,
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
