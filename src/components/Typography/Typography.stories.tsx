import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Typography } from "./Typography";

const meta = {
  title: "Typography/Typography",
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

const children = m.components.Typography.story.children;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(children).tagName).toBe("SPAN");
  },
};

// asChild styles the child element, e.g. a heading.
export const AsChild: Story = {
  tags: ["!dev"],
  args: { asChild: true, size: "xxl", font: "serif" },
  render: (args) => (
    <Typography {...args}>
      <h1>{children}</h1>
    </Typography>
  ),
  play: async ({ canvas }) => {
    const heading = canvas.getByRole("heading", { level: 1, name: children });
    await expect(heading).toHaveAttribute("data-typography");
    await expect(heading).toHaveAttribute("data-size", "xxl");
    await expect(heading).toHaveAttribute("data-font", "serif");
  },
};
