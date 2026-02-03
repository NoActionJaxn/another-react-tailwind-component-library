import type { Meta, StoryObj } from "@storybook/react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

const Logo = () => (
  <a href="#" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center">
      <span className="text-white font-bold text-sm">A</span>
    </div>
    <span className="font-semibold text-lg text-neutral-900">Acme</span>
  </a>
);

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  {
    label: "Products",
    children: [
      { label: "Product A", href: "#product-a" },
      { label: "Product B", href: "#product-b" },
      { label: "Product C", href: "#product-c" },
    ],
  },
  { label: "Contact", href: "#contact" },
];

export const Default: Story = {
  args: {
    logo: <Logo />,
    items: navItems,
    actions: <Button variant="primary">Sign In</Button>,
  },
};

export const WithSearch: Story = {
  args: {
    logo: <Logo />,
    items: navItems,
    actions: (
      <div className="flex items-center gap-3">
        <TextInput placeholder="Search..." size="small" className="w-48" />
        <Button variant="primary" size="small">Sign In</Button>
      </div>
    ),
  },
};

export const WithMultipleActions: Story = {
  args: {
    logo: <Logo />,
    items: navItems,
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="small">Log In</Button>
        <Button variant="primary" size="small">Sign Up</Button>
      </div>
    ),
  },
};

export const LogoOnly: Story = {
  args: {
    logo: <Logo />,
    actions: <Button variant="primary">Get Started</Button>,
  },
};

export const NavItemsOnRight: Story = {
  args: {
    logo: <Logo />,
    items: navItems,
  },
};

export const Sticky: Story = {
  render: () => (
    <div>
      <Navbar
        logo={<Logo />}
        items={navItems}
        actions={<Button variant="primary">Sign In</Button>}
        sticky
      />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Scroll to see sticky navbar</h1>
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="mb-4 text-neutral-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </div>
    </div>
  ),
};

export const NoBorder: Story = {
  args: {
    logo: <Logo />,
    items: navItems,
    actions: <Button variant="primary">Sign In</Button>,
    bordered: false,
  },
};

export const WithDropdowns: Story = {
  args: {
    logo: <Logo />,
    items: [
      { label: "Home", href: "#" },
      {
        label: "Products",
        children: [
          { label: "Software", href: "#software" },
          { label: "Hardware", href: "#hardware" },
          { label: "Services", href: "#services" },
        ],
      },
      {
        label: "Resources",
        children: [
          { label: "Documentation", href: "#docs" },
          { label: "Tutorials", href: "#tutorials" },
          { label: "Blog", href: "#blog" },
          { label: "Community", href: "#community" },
        ],
      },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "#contact" },
    ],
    actions: (
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="small">Log In</Button>
        <Button variant="primary" size="small">Start Free Trial</Button>
      </div>
    ),
  },
};

export const CustomLogo: Story = {
  args: {
    logo: (
      <a href="#" className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-500"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="ml-2 font-bold text-xl">Layers</span>
      </a>
    ),
    items: navItems,
    actions: <Button variant="primary">Sign In</Button>,
  },
};
