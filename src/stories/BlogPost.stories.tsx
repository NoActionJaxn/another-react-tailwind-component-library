import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import BlogPostComponent from "../components/BlogPost";
import Avatar from "../components/Avatar";

const meta = {
  title: "Pages/BlogPost",
  component: BlogPostComponent,
  parameters: {
    docs: {
      description: {
        component: `A full blog post layout built on the Container component, using @container queries so its title, meta, and body scale with the container's own width rather than the viewport.

**States & classes** (see \`styles/components/blog-post.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-blog-post[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-blog-post-cover\` | cover image wrapper, always | aspect ratio, overflow |
| \`.another-blog-post-title\` | heading, always | typography |
| \`.another-blog-post-meta\` | byline row, always | layout, text color |
| \`.another-blog-post-body\` | body content, always | typography, text color |
| \`.another-blog-post-body h2\`, \`h3\` | headings inside body | typography |
| \`.another-blog-post-body blockquote\` | blockquotes inside body | border, text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the post styling.",
    },
    title: {
      control: "text",
      description: "The post's title.",
    },
    cover: {
      control: false,
      description: "Element rendered as the cover image.",
    },
    meta: {
      control: false,
      description: "Element rendered in the meta row.",
    },
  },
  args: {
    variant: "default",
    title: "Building a design system from scratch",
  },
} satisfies Meta<typeof BlogPostComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const body = (
  <>
    <p>
      A look at the decisions behind our component library, from theming to
      accessibility. We started with a handful of primitives and grew the system
      one honest need at a time.
    </p>
    <h2>Why container queries</h2>
    <p>
      Viewport media queries can&apos;t tell you how much room a component
      actually has when it&apos;s nested in a sidebar, a modal, or a grid
      column. Container queries can.
    </p>
    <blockquote>
      Design for the space you&apos;re given, not the screen you assume.
    </blockquote>
    <ul>
      <li>Consistent spacing and type scale across contexts</li>
      <li>No duplicate layouts for &quot;narrow&quot; vs &quot;wide&quot;</li>
      <li>Works the same in Storybook, a CMS preview, or production</li>
    </ul>
  </>
);

export const BlogPost: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-3xl resize-x overflow-auto border-2 border-dashed border-default-400">
      <BlogPostComponent
        {...args}
        cover={
          <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
            Cover image
          </div>
        }
        meta={
          <>
            <Avatar size="sm" fallback="JH" />
            <span>Jackson Hermitt · July 10, 2026 · 4 min read</span>
          </>
        }
      >
        {body}
      </BlogPostComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByRole("heading", {
        name: "Building a design system from scratch",
        level: 1,
      }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("Jackson Hermitt · July 10, 2026 · 4 min read"),
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: "Why container queries", level: 2 }),
    ).toBeInTheDocument();
  },
};
