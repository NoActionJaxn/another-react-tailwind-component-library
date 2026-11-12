import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Anchor } from "./Anchor";

const meta = {
  title: "Components/Anchor",
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

export const Default: Story = {};
