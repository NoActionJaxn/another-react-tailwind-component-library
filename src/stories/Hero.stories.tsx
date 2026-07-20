import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import HeroComponent from "../components/Hero";
import Button from "../components/Button.tsx";

const meta = {
  title: "Components/Hero",
  component: HeroComponent,
  parameters: {
    docs: {
      description: {
        component: `A full-bleed marketing hero section built on the Container component. Accepts an optional background image or color slot behind centered content, and uses @container queries so spacing and type scale respond to the container's own width rather than the viewport.

**States & classes** (see \`styles/components/hero.css\`, and **Retheming Components** for how to target these). Note that \`"inverted"\` is a design variant, not a theme concept - it's meant to always contrast with the surrounding page, so it uses the *opposite* light/dark pairing from \`"default"\` in each mode:

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-hero[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-hero[data-variant="inverted"]\` | \`variant="inverted"\` | background, text color |
| \`.another-hero-eyebrow\` | eyebrow label, always | text color |
| \`.another-hero[data-variant="inverted"] .another-hero-eyebrow\` | inverted + eyebrow | text color override |
| \`.another-hero-description\` | supporting copy, always | text color |
| \`.another-hero[data-variant="inverted"] .another-hero-description\` | inverted + description | text color override |
| \`.another-hero[data-variant="inverted"] .another-button[data-variant="outline"\\|"ghost"]\` | inverted + an outline/ghost action button | button color override for contrast |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: false,
      description: "The element rendered.",
    },
    variant: {
      control: "radio",
      options: ["default", "inverted"],
      description:
        'Visual variant used by the hero styling. Use "inverted" for light text over a dark or image background.',
    },
    eyebrow: {
      control: "text",
      description: "Small label rendered above the title.",
    },
    title: {
      control: "text",
      description: "The hero's headline.",
    },
    description: {
      control: "text",
      description: "Supporting copy under the title.",
    },
    actions: {
      control: false,
      description: "Element rendered as the action buttons.",
    },
    background: {
      control: false,
      description: "Element rendered behind the content.",
    },
  },
  args: {
    as: "section",
    variant: "default",
    eyebrow: "Another Component Library",
    title: "Ship interfaces faster, without fighting the viewport",
    description:
      "A React and Tailwind component library built on container queries, so every component adapts to the space it's given instead of the screen it assumes.",
  },
} satisfies Meta<typeof HeroComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const actions = (
  <>
    <Button asChild variant="default">
      <a href="/">Get started</a>
    </Button>
    <Button asChild variant="outline">
      <a href="/">Learn more</a>
    </Button>
  </>
);

export const Hero: Story = {
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Another Component Library"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", {
        name: "Ship interfaces faster, without fighting the viewport",
      }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("link", { name: "Get started" }),
    ).toHaveAttribute("href", "/");
  },
};

export const BackgroundColor: Story = {
  args: {
    variant: "inverted",
  },
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent
        {...args}
        actions={actions}
        background={<div className="h-full w-full bg-cyan-700" />}
      />
    </div>
  ),
};

export const BackgroundImage: Story = {
  args: {
    variant: "inverted",
  },
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent
        {...args}
        actions={actions}
        background={
          <div className="flex h-full w-full items-center justify-center bg-default-800 text-default-400">
            Background image
          </div>
        }
      />
    </div>
  ),
};
