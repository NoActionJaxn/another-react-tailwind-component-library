import type { Meta, StoryObj } from "@storybook/react";
import ScrollArea from "../components/ScrollArea";
import Separator from "../components/Separator";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 50 }).map((_, i) => `Item ${i + 1}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-neutral-200">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium">Items</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm py-2">{tag}</div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 rounded-md border border-neutral-200" orientation="horizontal">
      <div className="flex gap-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md bg-neutral-100"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-72 w-72 rounded-md border border-neutral-200" orientation="both">
      <div className="p-4" style={{ width: 600 }}>
        <h4 className="mb-4 text-sm font-medium">Scrollable in both directions</h4>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-sm py-1 whitespace-nowrap">
            This is a long line of text that extends beyond the container width - Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-neutral-200 p-4">
      <h3 className="font-semibold mb-2">Notifications</h3>
      <ScrollArea className="h-48">
        <div className="space-y-3 pr-4">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="rounded-md bg-neutral-50 p-3">
              <p className="text-sm font-medium">Notification {i + 1}</p>
              <p className="text-xs text-neutral-500">This is a notification message.</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};

export const CodeBlock: Story = {
  render: () => (
    <ScrollArea className="h-64 w-96 rounded-md bg-neutral-900 text-neutral-100" orientation="both">
      <pre className="p-4 text-sm font-mono">
        {`function example() {
  const items = [1, 2, 3, 4, 5];
  
  return items.map((item) => {
    console.log("Processing item:", item);
    return item * 2;
  });
}

// This is a really long comment that extends beyond the normal width of the container to demonstrate horizontal scrolling

const result = example();
console.log(result);

function anotherFunction() {
  // More code here
  return "Hello, World!";
}

export default example;`}
      </pre>
    </ScrollArea>
  ),
};
