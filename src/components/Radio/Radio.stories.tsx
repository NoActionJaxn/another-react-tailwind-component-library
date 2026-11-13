import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { fn } from "storybook/test";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  subcomponents: { Radio },
  parameters: docsParameters("Radio", { layout: "centered" }),
  args: {
    defaultValue: "email",
    size: "md",
    colorScheme: "default",
    orientation: "vertical",
    disabled: false,
    "aria-label": m.components.Radio.story.ariaLabel,
    onValueChange: fn(),
  },
  argTypes: docsArgTypes("Radio", ["colorScheme", "orientation", "disabled"], {
    icon: {
      control: false,
      table: { defaultValue: { summary: "DotFilledIcon" } },
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
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    orientation: {
      table: { defaultValue: { summary: "vertical" } },
      control: "inline-radio",
      options: ["vertical", "horizontal"],
    },
    disabled: { table: { defaultValue: { summary: "false" } } },
  }),
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="email" label={m.components.Radio.story.email} />
      <Radio value="phone" label={m.components.Radio.story.phone} />
      <Radio value="mail" label={m.components.Radio.story.mail} />
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
