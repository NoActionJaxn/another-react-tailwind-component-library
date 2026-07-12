import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";

import AvatarComponent from "../components/Avatar";

const meta = {
  title: "Components/Avatar",
  component: AvatarComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible avatar with automatic fallback while the image loads or if it fails.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL.",
    },
    alt: {
      control: "text",
      description: "Alt text for the image.",
    },
    fallback: {
      control: "text",
      description:
        "Content rendered when there is no image, or it fails to load.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the avatar styling.",
    },
    size: {
      control: "radio",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "The size of the avatar.",
    },
  },
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "Avatar",
    fallback: "JH",
    variant: "default",
    size: "md",
  },
} satisfies Meta<typeof AvatarComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Avatar: Story = {
  // Deliberately doesn't assert whether the image or fallback ends up
  // rendered - that depends on the real network fetch of the src url
  // succeeding, which shouldn't be a condition for this test passing.
  // Queries the root by its own class rather than role/text, since neither
  // is guaranteed present regardless of which state wins.
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector(".another-avatar");

    expect(root).toHaveAttribute("data-size", "md");
    expect(root).toHaveAttribute("data-variant", "default");
  },
};

export const FallbackOnly: Story = {
  args: {
    src: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // No src means delayMs is 0, so the fallback renders immediately.
    expect(canvas.getByText("JH")).toBeInTheDocument();
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-image-url.invalid/none.jpg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Radix waits for the image to error AND fallbackDelay (600ms) to pass
    // before swapping to the fallback, to avoid a flash on fast loads.
    await waitFor(() => expect(canvas.getByText("JH")).toBeInTheDocument(), {
      timeout: 3000,
    });
  },
};
