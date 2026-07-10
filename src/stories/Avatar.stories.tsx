import type { Meta, StoryObj } from "@storybook/react-vite";

import AvatarComponent from "../components/Avatar";

const meta = {
  title: "Avatar",
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

export const Avatar: Story = {};

export const FallbackOnly: Story = {
  args: {
    src: undefined,
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-image-url.invalid/none.jpg",
  },
};
