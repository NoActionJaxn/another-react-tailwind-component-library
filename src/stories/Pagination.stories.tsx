import type { Meta, StoryObj } from "@storybook/react-vite";

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
  title: "Ui/Pagination",
  component: PaginationComponent,
  parameters: {
    docs: {
      description: {
        component:
          "Paginates a list of items using react-paginate, rendering each page as either a list or a grid.",
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
};
