import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import FooterComponent, { type FooterColumn } from "../components/Footer";
import Anchor from "../components/Anchor.tsx";

const meta = {
  title: "Components/Footer",
  component: FooterComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A page footer with a brand/description block, responsive link columns, and a bottom bar for copyright and secondary links. Columns collapse from three to two per row as the container narrows.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the footer styling.",
    },
    description: {
      control: "text",
      description: "Short tagline shown under the logo.",
    },
  },
  args: {
    variant: "default",
    description:
      "A React and Tailwind component library built on container queries.",
  },
} satisfies Meta<typeof FooterComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const logo = (
  <>
    <span className="flex size-6 items-center justify-center rounded-sm bg-default-950 text-xs font-bold text-default-50">
      A
    </span>
    <span className="font-accent text-lg font-bold">Another</span>
  </>
);

const columns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "/" },
      { label: "Theming", href: "/" },
      { label: "Changelog", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/" },
      { label: "Storybook", href: "/" },
      { label: "GitHub", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Contact", href: "/" },
    ],
  },
];

const bottom = (
  <>
    <span>© 2026 Another. All rights reserved.</span>
    <div className="flex items-center gap-4">
      <Anchor href="/">Privacy</Anchor>
      <Anchor href="/">Terms</Anchor>
    </div>
  </>
);

export const Footer: Story = {
  render: (args) => (
    <div className="w-full border-2 border-dashed border-default-400">
      <FooterComponent
        {...args}
        logo={logo}
        columns={columns}
        bottom={bottom}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByText(
        "A React and Tailwind component library built on container queries.",
      ),
    ).toBeInTheDocument();
    expect(canvas.getByText("Product")).toBeInTheDocument();
    expect(canvas.getByRole("link", { name: "Components" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      canvas.getByText("© 2026 Another. All rights reserved."),
    ).toBeInTheDocument();
  },
};

export const Mobile: Story = {
  render: (args) => (
    <div className="w-80 border-2 border-dashed border-default-400">
      <FooterComponent
        {...args}
        logo={logo}
        columns={columns}
        bottom={bottom}
      />
    </div>
  ),
};
