import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import ListCardComponent from "../components/ListCard";
import Button from "../components/Button.tsx";

const meta = {
  title: "Cards/ListCard",
  component: ListCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A horizontal card with image, title, meta, description, and footer slots, well suited to a vertical list of posts.

**States & classes** (see \`styles/components/list-card.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-list-card\` | root element, always | border, shadow, transition |
| \`.another-list-card[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-list-card-meta\` | meta row, always | text color |
| \`.another-list-card-description\` | excerpt, always | text color |`,
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
    image: {
      control: false,
      description: "Element rendered as the card's image.",
    },
    meta: {
      control: false,
      description: "Element rendered in the meta row.",
    },
    footer: {
      control: false,
      description: "Element rendered as the card's footer.",
    },
  },
  args: {
    variant: "default",
    title: "Building a design system from scratch",
    description:
      "A look at the decisions behind our component library, from theming to accessibility.",
  },
} satisfies Meta<typeof ListCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ListCard: Story = {
  render: (args) => (
    <div className="w-xl">
      <ListCardComponent
        {...args}
        image={
          <div className="flex h-full w-full items-center justify-center bg-default-200 text-default-500">
            Img
          </div>
        }
        meta={<span>July 9, 2026</span>}
        footer={
          <Button asChild size="sm" variant="ghost">
            <a href="/">Read more</a>
          </Button>
        }
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", {
        name: "Building a design system from scratch",
      }),
    ).toBeInTheDocument();
    expect(canvas.getByText("July 9, 2026")).toBeInTheDocument();
    expect(canvas.getByRole("link", { name: "Read more" })).toHaveAttribute(
      "href",
      "/",
    );
  },
};
