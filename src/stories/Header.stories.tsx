import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import HeaderComponent from "../components/Header";
import { type NavigationItem } from "../components/Navigation";
import Container from "../components/Container.tsx";
import AvatarBadge from "../components/AvatarBadge.tsx";

const meta = {
  title: "Components/Header",
  component: HeaderComponent,
  parameters: {
    docs: {
      description: {
        component: `A page header pairing a logo slot with the Navigation component, so the same items array that drives the desktop dropdown bar also collapses into a hamburger menu on mobile.

**States & classes** (see \`styles/components/header.css\`, and **Retheming Components** for how to target these; the embedded nav uses **Navigation**'s own classes):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-header\` | root element, always | bottom border |
| \`.another-header[data-fixed="true"]\` | \`fixed\` (default \`true\`) | position, offset, stacking |
| \`.another-header[data-variant="default"]\` | \`variant="default"\` | background, text color |
| \`.another-header-search\` | \`search\` is true | the desktop search input, floating right of the nav links |
| \`.another-header-search-mobile\` | \`search\` is true | the same search input rendered inside the mobile hamburger panel instead, above the nav links - it and \`.another-header-search\` share Navigation's own desktop/mobile breakpoint, so exactly one is ever shown |
| \`.another-header-actions\` | \`actions\` is set | layout for arbitrary trailing content (e.g. a user menu trigger), appended after the nav |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    actions: {
      control: false,
      description:
        "Arbitrary content appended after the nav, e.g. a user menu trigger.",
    },
    fixed: {
      control: "boolean",
      description:
        "Pins the header to the top of the viewport with position: fixed. Set to false to render it in normal document flow instead.",
    },
    onSearch: {
      control: false,
      description:
        "Called with the current search value when the search form is submitted (Enter key). Only relevant when search is true.",
    },
    search: {
      control: "boolean",
      description:
        "Renders a built-in search input in the header. Hidden entirely when false (the default).",
    },
    searchPlaceholder: {
      control: "text",
      description:
        "Placeholder text (and accessible label) for the search input.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the header styling.",
    },
  },
  args: {
    fixed: true,
    search: false,
    searchPlaceholder: "Search",
    variant: "default",
  },
} satisfies Meta<typeof HeaderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const navLink = (label: string, description: string, href = "/") => (
  <a
    href={href}
    className="flex flex-col gap-0.5 rounded-sm px-3 py-2 text-sm no-underline transition-colors duration-150 ease-in-out hover:bg-default-100 dark:hover:bg-default-900"
  >
    <span className="font-semibold text-default-950 dark:text-default-50">
      {label}
    </span>
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
];

const logo = (
  <>
    <span className="flex size-6 items-center justify-center rounded-sm bg-default-950 text-xs font-bold text-default-50">
      A
    </span>
    <span className="font-accent text-lg font-bold">Another</span>
  </>
);

export const Header: Story = {
  render: (args) => (
    <div className="h-96 w-full">
      <HeaderComponent {...args} logo={logo} items={items} />
    </div>
  ),
  // Dropdown/mobile-menu interaction is covered by Navigation.stories.tsx,
  // which this component wraps - just check the logo and static links wire
  // through correctly here.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Another")).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(canvas.getByRole("link", { name: "Pricing" })).toHaveAttribute(
      "href",
      "/pricing",
    );
  },
};

export const WithSearch: Story = {
  args: {
    search: true,
    onSearch: fn(),
  },
  render: (args) => (
    <div className="h-96 w-full">
      <HeaderComponent {...args} logo={logo} items={items} />
    </div>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole("searchbox", { name: "Search" });

    await userEvent.type(searchInput, "components{Enter}");

    await expect(args.onSearch).toHaveBeenCalledOnce();
    await expect(args.onSearch).toHaveBeenCalledWith("components");
  },
};

export const WithActions: Story = {
  render: (args) => (
    <div className="h-96 w-full">
      <HeaderComponent
        {...args}
        logo={logo}
        items={items}
        actions={<AvatarBadge fallback="JH" size="sm" count={3} />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Another")).toBeInTheDocument();
    await expect(canvas.getByText("JH")).toBeInTheDocument();
    await expect(canvas.getByText("3")).toBeInTheDocument();
  },
};

export const Static: Story = {
  args: {
    fixed: false,
  },
  render: (args) => (
    <div className="h-96 w-full">
      <HeaderComponent {...args} logo={logo} items={items} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Another")).toBeInTheDocument();
    await expect(canvas.getByRole("banner")).toHaveAttribute(
      "data-fixed",
      "false",
    );
  },
};
