import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import {
  Footer,
  FooterBar,
  FooterBrand,
  FooterColumn,
  FooterDescription,
  FooterLink,
  FooterMain,
  FooterText,
} from "./Footer";
import { StoryLogo, StorySocials } from "./storyParts";

const text = m.components.Footer.story;

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  parameters: docsParameters("Footer", { layout: "fullscreen" }),
  args: {
    variant: "solid",
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Footer", ["variant", "colorScheme", "block"], {
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
    <Footer {...args}>
      <FooterMain>
        <FooterBrand>
          <StoryLogo />
          <FooterDescription>{text.description}</FooterDescription>
        </FooterBrand>
        <FooterColumn title={text.company}>
          {text.companyLinks.map((link) => (
            <FooterLink key={link} href="#">
              {link}
            </FooterLink>
          ))}
        </FooterColumn>
        <FooterColumn title={text.contact}>
          <FooterLink href="tel:+12345678900">+1-234-567-8900</FooterLink>
          <FooterLink href="mailto:hello@example.com">
            hello@example.com
          </FooterLink>
          <FooterText>{text.address}</FooterText>
        </FooterColumn>
      </FooterMain>
      <FooterBar>
        <p>{text.copyright}</p>
        <StorySocials />
      </FooterBar>
    </Footer>
  ),
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("contentinfo")).toHaveLength(1);
    await expect(
      canvas.getByRole("region", { name: text.company }),
    ).toBeVisible();
    await expect(canvas.getByRole("link", { name: "GitHub" })).toBeVisible();
  },
};
