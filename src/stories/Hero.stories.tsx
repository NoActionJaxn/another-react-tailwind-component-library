import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import HeroComponent from "../components/Hero";
import Button from "../components/Button.tsx";

const meta = {
  title: "Blocks/Hero",
  component: HeroComponent,
  parameters: {
    docs: {
      description: {
        component: `A full-bleed marketing hero section built on the Container component. Accepts an optional \`background\` slot, and uses @container queries so spacing and type scale respond to the container's own width rather than the viewport. The \`layout\` prop controls how that slot is arranged: \`"background"\` (default) treats it as a full-bleed image/color layer behind centered content; \`"image-left"\`, \`"image-center"\`, and \`"image-right"\` instead lay it out beside (or under, for center) the text as a normal-flow image.

**States & classes** (see \`styles/components/hero.css\`, and **Retheming Components** for how to target these). Note that \`"inverted"\` is a design variant, not a theme concept - it's meant to always contrast with the surrounding page, so it uses the *opposite* light/dark pairing from \`"default"\` in each mode:

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-hero[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-hero[data-variant="inverted"]\` | \`variant="inverted"\` | background, text color |
| \`.another-hero[data-layout="background"]\` | \`layout="background"\` (default) | \`background\` slot rendered as a full-bleed layer behind centered content |
| \`.another-hero[data-layout="image-left"\\|"image-center"\\|"image-right"]\` | \`layout\` is an image variant | \`background\` slot rendered as a normal-flow image beside/under the text |
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
      description:
        'Element rendered as the hero\'s image - behind the content when layout is "background", or beside/under it for the "image-*" layouts.',
    },
    layout: {
      control: "radio",
      options: ["background", "image-left", "image-center", "image-right"],
      description:
        'How the `background` slot is arranged. "background" (default) is a full-bleed layer behind centered content; the "image-*" options lay it out beside (or under, for center) the text instead.',
    },
  },
  args: {
    as: "section",
    variant: "default",
    layout: "background",
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

const image = (
  <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
    Image
  </div>
);

export const ImageLeft: Story = {
  args: {
    layout: "image-left",
  },
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} background={image} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Image")).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", {
        name: "Ship interfaces faster, without fighting the viewport",
      }),
    ).toBeInTheDocument();
  },
};

export const ImageCenter: Story = {
  args: {
    layout: "image-center",
  },
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} background={image} />
    </div>
  ),
};

export const ImageRight: Story = {
  args: {
    layout: "image-right",
  },
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} background={image} />
    </div>
  ),
};
