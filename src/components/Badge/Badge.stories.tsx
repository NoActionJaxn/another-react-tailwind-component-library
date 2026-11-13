import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  parameters: docsParameters("Badge", { layout: "centered" }),
  args: {
    children: m.components.Badge.story.children,
    variant: "solid",
    size: "md",
    colorScheme: "default",
    asChild: false,
  },
  argTypes: docsArgTypes("Badge", ["variant", "size", "colorScheme"], {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline"],
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
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
    asChild: { table: { defaultValue: { summary: "false" } } },
  }),
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
