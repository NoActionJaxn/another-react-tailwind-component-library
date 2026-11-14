import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { FooterBar } from "./Footer";
import { StorySocials } from "./storyParts";

const text = m.components.Footer.story;

const meta = {
  title: "Blocks/FooterBar",
  component: FooterBar,
  parameters: docsParameters("FooterBar", { layout: "fullscreen" }),
  args: {
    variant: "solid",
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("FooterBar", ["variant", "colorScheme", "block"], {
    variant: {
      control: "inline-radio",
      options: ["solid", "soft", "outline", "ghost"],
      table: { defaultValue: { summary: "solid" } },
    },
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <FooterBar {...args}>
      <p>{text.copyright}</p>
      <StorySocials />
    </FooterBar>
  ),
} satisfies Meta<typeof FooterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("contentinfo")).toHaveTextContent(
      text.copyright,
    );
    await expect(
      canvas.getByRole("list", { name: "Social media" }).children,
    ).toHaveLength(5);
  },
};
