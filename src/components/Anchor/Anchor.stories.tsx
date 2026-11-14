import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Anchor } from "./Anchor";

const meta = {
  title: "Navigation/Anchor",
  component: Anchor,
  parameters: docsParameters("Anchor", { layout: "centered" }),
  args: {
    children: m.components.Anchor.story.children,
    href: "#",
    underline: "always",
    colorScheme: "default",
    asChild: false,
  },
  argTypes: docsArgTypes("Anchor", ["colorScheme"], {
    underline: {
      control: "inline-radio",
      options: ["always", "hover", "none"],
      table: { defaultValue: { summary: "always" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    asChild: { table: { defaultValue: { summary: "false" } } },
  }),
} satisfies Meta<typeof Anchor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("link", { name: m.components.Anchor.story.children }),
    ).toHaveAttribute("href", "#");
  },
};

// asChild renders the child (e.g. a router link) with the anchor's props.
export const AsChild: Story = {
  tags: ["!dev"],
  args: { asChild: true, underline: "hover" },
  render: (args) => (
    <Anchor {...args}>
      <a href="#child" target="_blank">
        {m.components.Anchor.story.children}
      </a>
    </Anchor>
  ),
  play: async ({ canvas, canvasElement }) => {
    const link = canvas.getByRole("link");
    await expect(canvasElement.querySelectorAll("a")).toHaveLength(1);
    await expect(link).toHaveAttribute("href", "#child");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("data-anchor");
    await expect(link).toHaveAttribute("data-underline", "hover");
  },
};
