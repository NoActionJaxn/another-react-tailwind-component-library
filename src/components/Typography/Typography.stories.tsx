import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Typography } from "./Typography";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: docsParameters("Typography", { layout: "centered" }),
  args: {
    children: m.components.Typography.story.children,
    font: "sans",
    size: "md",
    colorScheme: "default",
    asChild: false,
  },
  argTypes: docsArgTypes("Typography", ["size", "colorScheme"], {
    font: {
      control: "inline-radio",
      options: ["sans", "serif", "mono"],
      table: { defaultValue: { summary: "sans" } },
    },
    size: {
      control: "inline-radio",
      options: ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    asChild: { table: { defaultValue: { summary: "false" } } },
  }),
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
