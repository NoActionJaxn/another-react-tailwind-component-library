import type { Meta, StoryObj } from "@storybook/react";
import Container from "../components/Container";

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container className="bg-neutral-100 py-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-neutral-700">
          This content is inside a centered container with max-width constraints.
        </p>
      </div>
    </Container>
  ),
};

export const WithBackgroundColor: Story = {
  render: () => (
    <Container className="bg-primary-500 py-12">
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-2">Full-width Background</h2>
        <p>The wrapper spans full width while the content stays centered.</p>
      </div>
    </Container>
  ),
};

export const NestedSections: Story = {
  render: () => (
    <div className="space-y-0">
      <Container className="bg-primary-50 py-12">
        <h2 className="text-xl font-bold">Section One</h2>
        <p className="text-neutral-600">First section with light primary background.</p>
      </Container>
      <Container className="bg-white py-12">
        <h2 className="text-xl font-bold">Section Two</h2>
        <p className="text-neutral-600">Second section with white background.</p>
      </Container>
      <Container className="bg-neutral-900 py-12">
        <h2 className="text-xl font-bold text-white">Section Three</h2>
        <p className="text-neutral-400">Third section with dark background.</p>
      </Container>
    </div>
  ),
};

export const WithInnerPadding: Story = {
  render: () => (
    <Container className="bg-neutral-100 py-8" innerClassName="px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg">
        <p className="text-neutral-700">
          The inner container has responsive horizontal padding.
        </p>
      </div>
    </Container>
  ),
};
