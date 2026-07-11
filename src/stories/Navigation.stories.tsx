import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, screen, userEvent, within } from "storybook/test";

import NavigationComponent, {
  type NavigationItem,
} from "../components/Navigation";
import Container from "../components/Container.tsx";

const meta = {
  title: "Ui/Navigation",
  component: NavigationComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal navigation bar built on Radix's NavigationMenu primitive. Takes an array of items - each is a plain link, or a trigger with a dropdown/submenu when a content component is supplied.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the navigation styling.",
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof NavigationComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const navLink = (label: string, description: string, href = "/") => (
  <a
    href={href}
    className="flex flex-col gap-0.5 rounded-sm px-3 py-2 text-sm no-underline transition-colors duration-150 ease-in-out hover:bg-default-100"
  >
    <span className="font-semibold text-default-950">{label}</span>
    <span className="text-default-500">{description}</span>
  </a>
);

const items: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    content: (
      <div className="grid w-full max-w-xs gap-1">
        {navLink("Component Library", "React + Tailwind primitives")}
        {navLink("Icons", "A small set of hand-picked icons")}
        {navLink("Themes", "Swap the default color palette")}
      </div>
    ),
  },
  {
    label: "Docs",
    content: (
      <Container className="w-[36rem] max-w-[calc(100vw-2rem)]">
        <div className="grid grid-cols-1 gap-1 @sm:grid-cols-2">
          {navLink("Getting started", "Install and configure the library")}
          {navLink("Container queries", "How @sm/@md variants work here")}
          {navLink("Theming", "Customize the default color scale")}
          {navLink("Accessibility", "What Radix gives you for free")}
        </div>
      </Container>
    ),
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "Changelog",
    href: "/changelog",
    disabled: true,
  },
];

export const Navigation: Story = {
  render: (args) => (
    <div className="w-full border-2 border-dashed border-default-400 p-4">
      <NavigationComponent {...args} items={items} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );

    // Disabled items render as an <a> with no href, so they're not exposed
    // with the "link" role - query by text and check aria-disabled instead.
    expect(canvas.getByText("Changelog")).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    await userEvent.click(canvas.getByRole("button", { name: "Products" }));

    // Radix renders the open dropdown's content into a portal outside
    // canvasElement.
    const productsLink = await screen.findByRole("link", {
      name: "Component Library React + Tailwind primitives",
    });
    expect(productsLink).toHaveAttribute("href", "/");
  },
};

export const Mobile: Story = {
  render: (args) => (
    <div className="w-80 border-2 border-dashed border-default-400 p-4">
      <NavigationComponent {...args} items={items} />
    </div>
  ),
};
