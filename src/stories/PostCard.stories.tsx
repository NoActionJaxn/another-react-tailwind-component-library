import type { Meta, StoryObj } from "@storybook/react-vite";

import PostCardComponent from "../components/PostCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button.tsx";

const meta = {
  title: "Ui/Cards/PostCard",
  component: PostCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible card with image, title, meta, description, and footer slots, well suited to a list of blog posts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the card styling.",
    },
    title: {
      control: "text",
      description: "The card's title.",
    },
    description: {
      control: "text",
      description: "The card's excerpt/body copy.",
    },
  },
  args: {
    variant: "default",
    title: "Building a design system from scratch",
    description:
      "A look at the decisions behind our component library, from theming to accessibility.",
  },
} satisfies Meta<typeof PostCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PostCard: Story = {
  render: (args) => (
    <div className="w-80">
      <PostCardComponent
        {...args}
        image={
          <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
            Post image
          </div>
        }
        meta={
          <>
            <Avatar size="sm" fallback="JH" />
            <span>Jackson Hermitt · July 9, 2026</span>
          </>
        }
        footer={
          <Button asChild block>
            <a href="/">Read more</a>
          </Button>
        }
      />
    </div>
  ),
};
