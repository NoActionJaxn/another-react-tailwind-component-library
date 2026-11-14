import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
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
    block: false,
    variant: "ghost",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Hero", ["variant", "colorScheme", "block"], {
    full: { table: { defaultValue: { summary: "false" } } },
    block: { table: { defaultValue: { summary: "false" } } },
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

export const Default: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvasElement.querySelector("section[data-hero]"),
    ).toHaveAttribute("data-layout", "split");
    // The title is the page's h1.
    await expect(
      canvas.getByRole("heading", { level: 1, name: text.title }),
    ).toBeVisible();
    await expect(canvas.getByText(text.description).tagName).toBe("P");
    await expect(
      canvas.getByRole("button", { name: text.primary }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: text.secondary }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("img", { name: text.imageAlt }),
    ).toBeVisible();
  },
};

export const Full: Story = {
  tags: ["!dev"],
  args: { full: true },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("[data-hero]")).toHaveAttribute(
      "data-layout",
      "full",
    );
  },
};

// asChild changes the title's element, e.g. when the page already has an h1.
export const TitleAsChild: Story = {
  tags: ["!dev"],
  render: (args) => (
    <Hero {...args}>
      <HeroContent>
        <HeroTitle asChild>
          <h2>{text.title}</h2>
        </HeroTitle>
      </HeroContent>
    </Hero>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole("heading", { level: 1 })).toBeNull();
    await expect(
      canvas.getByRole("heading", { level: 2, name: text.title }),
    ).toHaveAttribute("data-hero-title");
  },
};
