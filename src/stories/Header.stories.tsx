import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import HeaderComponent from "../components/Header";
import { type NavigationItem } from "../components/Navigation";
import Container from "../components/Container.tsx";

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
| \`.another-header\` | root element, always | position, bottom border |
| \`.another-header[data-variant="default"]\` | \`variant="default"\` | background, text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the header styling.",
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<typeof HeaderComponent>;

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
    <div className="h-[150vh] w-full">
      <HeaderComponent {...args} logo={logo} items={items} />
      <p className="px-4 pt-20 text-sm text-default-500">
        The header is fixed to the top of the viewport - scroll this page to see
        it stay in place.
      </p>
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
