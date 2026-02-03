import type { Meta, StoryObj } from "@storybook/react";
import Anchor from "../components/Anchor";
import Text from "../components/Text";

const meta: Meta<typeof Anchor> = {
  title: "Components/Anchor",
  component: Anchor,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  args: {
    children: "Default Link",
    href: "#",
    variant: "default",
  },
};

export const Primary: Story = {
  args: {
    children: "Primary Link",
    href: "#",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Link",
    href: "#",
    variant: "secondary",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning Link",
    href: "#",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Link",
    href: "#",
    variant: "danger",
  },
};

export const Success: Story = {
  args: {
    children: "Success Link",
    href: "#",
    variant: "success",
  },
};

export const Muted: Story = {
  args: {
    children: "Muted Link",
    href: "#",
    variant: "muted",
  },
};

export const Small: Story = {
  args: {
    children: "Small Link",
    href: "#",
    size: "small",
  },
};

export const Large: Story = {
  args: {
    children: "Large Link",
    href: "#",
    size: "large",
  },
};

export const AlwaysUnderlined: Story = {
  args: {
    children: "Always Underlined",
    href: "#",
    underline: "always",
  },
};

export const NoUnderline: Story = {
  args: {
    children: "No Underline",
    href: "#",
    underline: "none",
  },
};

export const ExternalLink: Story = {
  args: {
    children: "External Link",
    href: "https://example.com",
    external: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Anchor href="#" variant="default">Default Link</Anchor>
      <Anchor href="#" variant="primary">Primary Link</Anchor>
      <Anchor href="#" variant="secondary">Secondary Link</Anchor>
      <Anchor href="#" variant="warning">Warning Link</Anchor>
      <Anchor href="#" variant="danger">Danger Link</Anchor>
      <Anchor href="#" variant="success">Success Link</Anchor>
      <Anchor href="#" variant="muted">Muted Link</Anchor>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Anchor href="#" size="small">Small</Anchor>
      <Anchor href="#" size="medium">Medium</Anchor>
      <Anchor href="#" size="large">Large</Anchor>
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <Text as="p" className="max-w-md">
      This is a paragraph with an{" "}
      <Anchor href="#">inline link</Anchor> embedded within the text.
      You can also have{" "}
      <Anchor href="https://example.com" external>external links</Anchor>{" "}
      that open in a new tab.
    </Text>
  ),
};

export const UnderlineVariations: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Anchor href="#" underline="hover">Underline on Hover (default)</Anchor>
      <Anchor href="#" underline="always">Always Underlined</Anchor>
      <Anchor href="#" underline="none">Never Underlined</Anchor>
    </div>
  ),
};
