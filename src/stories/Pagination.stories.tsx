import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import PaginationComponent from "../components/Pagination";
import ListCard from "../components/ListCard";
import PostCard from "../components/PostCard";

const posts = Array.from({ length: 23 }, (_, index) => ({
  title: `Post ${index + 1}: A look at design system decisions`,
  description:
    "A look at the decisions behind our component library, from theming to accessibility.",
  date: `July ${(index % 28) + 1}, 2026`,
}));

const meta = {
  title: "Components/Pagination",
  component: PaginationComponent,
  parameters: {
    docs: {
      description: {
        component: `Paginates a list of items using react-paginate, rendering each page as either a list or a grid.

**States & classes** (see \`styles/components/pagination.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-pagination-page-link\` | each page number, always | border, text color |
| \`.another-pagination-page-link:hover\` | hovering | background |
| \`.another-pagination-page-active .another-pagination-page-link\` | the current page | border, background, text color |
| \`.another-pagination-page-active .another-pagination-page-link:hover\` | hovering the current page | background |`,
      },
    },
  },
  tags: ["autodocs"],
  args: {
    items: posts,
    renderItem: () => null,
  },
} satisfies Meta<typeof PaginationComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GridView: Story = {
  render: () => (
    <PaginationComponent
      items={posts}
      itemsPerPage={6}
      columns={3}
      view="grid"
      renderItem={(post) => (
        <PostCard
          key={post.title}
          title={post.title}
          description={post.description}
          image={
            <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
              Post image
            </div>
          }
          meta={<span>{post.date}</span>}
        />
      )}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("Post 1: A look at design system decisions"),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText("Post 7: A look at design system decisions"),
    ).not.toBeInTheDocument();

    // react-paginate is lazy-loaded (see Pagination.tsx) - the page link
    // only exists once that import resolves. It renders as role="button"
    // with an aria-label ("Page 2") rather than a plain link/text name.
    const pageTwo = await canvas.findByRole("button", { name: "Page 2" });
    await userEvent.click(pageTwo);

    await expect(
      canvas.getByText("Post 7: A look at design system decisions"),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText("Post 1: A look at design system decisions"),
    ).not.toBeInTheDocument();
  },
};

export const ListView: Story = {
  render: () => (
    <div className="w-xl">
      <PaginationComponent
        items={posts}
        itemsPerPage={5}
        view="list"
        renderItem={(post) => (
          <ListCard
            key={post.title}
            title={post.title}
            description={post.description}
            image={
              <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
                Img
              </div>
            }
            meta={<span>{post.date}</span>}
          />
        )}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const previous = canvas.getByRole("button", { name: "Previous" });
    const next = canvas.getByRole("button", { name: "Next" });

    await expect(previous).toBeDisabled();
    await expect(
      canvas.getByText("Post 1: A look at design system decisions"),
    ).toBeInTheDocument();

    await userEvent.click(next);

    await expect(previous).not.toBeDisabled();
    await expect(
      canvas.getByText("Post 6: A look at design system decisions"),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText("Post 1: A look at design system decisions"),
    ).not.toBeInTheDocument();
  },
};
