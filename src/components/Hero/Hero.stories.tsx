import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Hero,
  HeroActions,
  HeroContent,
  HeroDescription,
  HeroImage,
  HeroTitle,
} from "./Hero";

const text = m.components.Hero.story;

// Inline gradient so the story needs no network or image file.
const image = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#a8a29e"/><stop offset="1" stop-color="#44403c"/></linearGradient></defs><rect width="16" height="9" fill="url(#g)"/></svg>',
)}`;

const meta = {
  title: "Blocks/Hero",
  component: Hero,
  parameters: docsParameters("Hero", { layout: "fullscreen" }),
  args: {
    full: false,
    variant: "ghost",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Hero", ["variant", "colorScheme"], {
    full: { table: { defaultValue: { summary: "false" } } },
    variant: {
      control: "inline-radio",
      options: ["soft", "ghost"],
      table: { defaultValue: { summary: "ghost" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <Hero {...args}>
      <HeroContent>
        <HeroTitle>{text.title}</HeroTitle>
        <HeroDescription>{text.description}</HeroDescription>
        <HeroActions>
          <Button>{text.primary}</Button>
          <Button variant={args.full ? "soft" : "outline"}>
            {text.secondary}
          </Button>
        </HeroActions>
      </HeroContent>
      <HeroImage src={image} alt={text.imageAlt} aspectRatio="4 / 3" />
    </Hero>
  ),
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
