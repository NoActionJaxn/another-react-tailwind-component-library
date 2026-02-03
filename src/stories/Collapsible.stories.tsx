import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Collapsible from "../components/Collapsible";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    title: "Click to expand",
    children: "This is the collapsible content that will be revealed when you click the trigger.",
  },
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} />
    </div>
  ),
};

export const DefaultOpen: Story = {
  args: {
    title: "Already expanded",
    defaultOpen: true,
    children: "This collapsible starts in the open state.",
  },
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} />
    </div>
  ),
};

export const WithRichContent: Story = {
  args: {
    title: "Additional Information",
  },
  render: (args) => (
    <div className="w-96">
      <Collapsible {...args}>
        <div className="space-y-3">
          <p>This collapsible can contain any content, including:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Lists</li>
            <li>Images</li>
            <li>Forms</li>
            <li>Other components</li>
          </ul>
          <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600">
            Action Button
          </button>
        </div>
      </Collapsible>
    </div>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Collapsible title="Section One">
        Content for the first collapsible section.
      </Collapsible>
      <Collapsible title="Section Two">
        Content for the second collapsible section.
      </Collapsible>
      <Collapsible title="Section Three">
        Content for the third collapsible section.
      </Collapsible>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    title: "Disabled Collapsible",
    disabled: true,
    children: "You won't see this content because the collapsible is disabled.",
  },
  render: (args) => (
    <div className="w-80">
      <Collapsible {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="w-80 space-y-4">
        <Collapsible
          title="Controlled Collapsible"
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          This collapsible is controlled externally.
        </Collapsible>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Open
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Close
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Toggle
          </button>
        </div>
        <p className="text-sm text-neutral-600">State: {isOpen ? "Open" : "Closed"}</p>
      </div>
    );
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Collapsible title="What is your return policy?">
        We offer a 30-day money-back guarantee on all purchases. If you're not satisfied with your purchase, simply return it within 30 days for a full refund.
      </Collapsible>
      <Collapsible title="How long does shipping take?">
        Standard shipping typically takes 5-7 business days. Express shipping is available for an additional fee and takes 2-3 business days.
      </Collapsible>
      <Collapsible title="Do you offer international shipping?">
        Yes, we ship to over 100 countries worldwide. International shipping times vary by location but typically take 10-14 business days.
      </Collapsible>
    </div>
  ),
};
