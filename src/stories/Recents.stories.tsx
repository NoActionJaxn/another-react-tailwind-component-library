import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import RecentsComponent from "../components/Recents";
import PostCard from "../components/PostCard.tsx";
import Anchor from "../components/Anchor.tsx";
import Avatar from "../components/Avatar.tsx";
import Button from "../components/Button.tsx";

const meta = {
  title: "Components/Recents",
  component: RecentsComponent,
  parameters: {
    docs: {
      description: {
        component: `A 'recent posts' section built on the GridContainer component, so the card grid collapses to a single column on mobile and expands as the container widens. Pairs a title with a view-more link above a grid of 3-5 items.

**States & classes** (see \`styles/components/recents.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-recents[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-recents-view-more\` | view-more link slot, always | text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the section styling.",
    },
    columns: {
      control: { type: "number", min: 1, max: 5, step: 1 },
      description: "Maximum number of grid columns at the widest size.",
    },
    title: {
      control: "text",
      description: "The section's heading.",
    },
  },
  args: {
    variant: "default",
    columns: 3,
    title: "Recent posts",
  },
} satisfies Meta<typeof RecentsComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const posts = [
  {
    title: "Building a design system from scratch",
    excerpt:
      "A look at the decisions behind our component library, from theming to accessibility.",
    date: "July 9, 2026",
  },
  {
    title: "Why container queries",
    excerpt:
      "Viewport media queries can't tell you how much room a component actually has.",
    date: "July 2, 2026",
  },
  {
    title: "Shipping a hero section",
    excerpt:
      "Notes on building a full-bleed hero that still works inside a sidebar.",
    date: "June 24, 2026",
  },
  {
    title: "Snap scrolling done right",
    excerpt: "A pure-CSS pattern for auto-sliding, loopable carousels.",
    date: "June 15, 2026",
  },
];

const items = posts.map((post) => (
  <PostCard
    key={post.title}
    title={post.title}
    description={post.excerpt}
    image={
      <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
        Post image
      </div>
    }
    meta={
      <>
        <Avatar size="sm" fallback="JH" />
        <span>Jackson Hermitt · {post.date}</span>
      </>
    }
    footer={
      <Button asChild block>
        <a href="/">Read more</a>
      </Button>
    }
  />
));

const viewMore = <Anchor href="/">View all posts →</Anchor>;

export const Recents: Story = {
  render: (args) => (
    <div className="w-full resize-x overflow-auto border-2 border-dashed border-default-400">
      <RecentsComponent {...args} items={items} viewMore={viewMore} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", { name: "Recent posts" }),
    ).toBeInTheDocument();
    expect(
      canvas.getByRole("link", { name: "View all posts →" }),
    ).toHaveAttribute("href", "/");
    expect(
      canvas.getByRole("heading", {
        name: "Building a design system from scratch",
      }),
    ).toBeInTheDocument();
    expect(canvas.getAllByRole("link", { name: "Read more" })).toHaveLength(4);
  },
};
