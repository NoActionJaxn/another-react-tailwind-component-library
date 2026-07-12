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
        component:
          "A full-bleed marketing hero section built on the Container component. Accepts an optional background image or color slot behind centered content, and uses @container queries so spacing and type scale respond to the container's own width rather than the viewport.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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
  },
  args: {
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

    expect(canvas.getByText("Another Component Library")).toBeInTheDocument();
    expect(
      canvas.getByRole("heading", {
        name: "Ship interfaces faster, without fighting the viewport",
      }),
    ).toBeInTheDocument();
    expect(canvas.getByRole("link", { name: "Get started" })).toHaveAttribute(
      "href",
      "/",
    );
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

export const Mobile: Story = {
  render: (args) => (
    <div className="w-80 border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} />
    </div>
  ),
};

export const Desktop: Story = {
  render: (args) => (
    <div className="w-full max-w-5xl border-2 border-dashed border-default-400">
      <HeroComponent {...args} actions={actions} />
    </div>
  ),
};
