import type { Meta, StoryObj } from "@storybook/react";
import Banner from "../components/Banner";

const meta: Meta<typeof Banner> = {
  title: "Components/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

export const Default: Story = {
  args: {
    title: "Information",
    children: "This is a default info banner with some helpful information.",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    title: "New Feature",
    children: "We've added a new feature to help you be more productive.",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    title: "Note",
    children: "This is a secondary banner for less important information.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your settings before proceeding.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    title: "Error",
    children: "There was a problem processing your request. Please try again.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner title="Default" variant="default">
        This is a default info banner.
      </Banner>
      <Banner title="Primary" variant="primary">
        This is a primary info banner.
      </Banner>
      <Banner title="Secondary" variant="secondary">
        This is a secondary info banner.
      </Banner>
      <Banner title="Warning" variant="warning">
        This is a warning info banner.
      </Banner>
      <Banner title="Danger" variant="danger">
        This is a danger info banner.
      </Banner>
      <Banner title="Success" variant="success">
        This is a success info banner.
      </Banner>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    variant: "primary",
    title: "Dismissible Banner",
    children: "Click the X to dismiss this banner.",
    dismissible: true,
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "warning",
    children: "This is a banner without a title, just a message.",
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: "primary",
    title: "Custom Icon",
    children: "This banner has a custom icon.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
};

export const LongContent: Story = {
  args: {
    variant: "default",
    title: "Detailed Information",
    children: (
      <>
        <p>This banner contains multiple paragraphs of content to demonstrate how it handles longer text.</p>
        <p className="mt-2">
          You can include any React content inside the banner, including lists, links, and other components.
        </p>
      </>
    ),
  },
};

export const WithLink: Story = {
  args: {
    variant: "primary",
    title: "Update Available",
    children: (
      <>
        A new version is available.{" "}
        <a href="#" className="underline font-medium hover:no-underline">
          Learn more
        </a>
      </>
    ),
  },
};
