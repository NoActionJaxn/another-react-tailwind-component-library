import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Tag from "../components/Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: "Tag",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="primary">Primary</Tag>
      <Tag variant="secondary">Secondary</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
      <Tag variant="success">Success</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="small">Small</Tag>
      <Tag size="medium">Medium</Tag>
      <Tag size="large">Large</Tag>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default" rounded>Default</Tag>
      <Tag variant="primary" rounded>Primary</Tag>
      <Tag variant="secondary" rounded>Secondary</Tag>
      <Tag variant="warning" rounded>Warning</Tag>
      <Tag variant="danger" rounded>Danger</Tag>
      <Tag variant="success" rounded>Success</Tag>
    </div>
  ),
};

export const RoundedSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="small" rounded>Small</Tag>
      <Tag size="medium" rounded>Medium</Tag>
      <Tag size="large" rounded>Large</Tag>
    </div>
  ),
};

export const Removable: Story = {
  render: () => {
    const [tags, setTags] = useState(["React", "TypeScript", "Tailwind", "Radix UI"]);
    const removeTag = (tagToRemove: string) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Tag key={tag} variant="primary" onRemove={() => removeTag(tag)}>
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && (
          <button
            onClick={() => setTags(["React", "TypeScript", "Tailwind", "Radix UI"])}
            className="text-sm text-neutral-500 hover:text-neutral-700"
          >
            Reset tags
          </button>
        )}
      </div>
    );
  },
};

export const RemovableVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default" onRemove={() => {}}>Default</Tag>
      <Tag variant="primary" onRemove={() => {}}>Primary</Tag>
      <Tag variant="secondary" onRemove={() => {}}>Secondary</Tag>
      <Tag variant="warning" onRemove={() => {}}>Warning</Tag>
      <Tag variant="danger" onRemove={() => {}}>Danger</Tag>
      <Tag variant="success" onRemove={() => {}}>Success</Tag>
    </div>
  ),
};

export const StatusTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="success" size="small">Active</Tag>
      <Tag variant="warning" size="small">Pending</Tag>
      <Tag variant="danger" size="small">Inactive</Tag>
      <Tag variant="secondary" size="small">Draft</Tag>
    </div>
  ),
};

export const CategoryTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="primary" rounded>Technology</Tag>
      <Tag variant="primary" rounded>Design</Tag>
      <Tag variant="primary" rounded>Marketing</Tag>
      <Tag variant="primary" rounded>Sales</Tag>
    </div>
  ),
};
