import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Portal } from "./Portal";

const text = m.components.Portal.story;

const meta = {
  title: "Utilities/Portal",
  component: Portal,
  parameters: docsParameters("Portal", { layout: "centered" }),
  args: {
    disabled: false,
    asChild: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Portal", ["colorScheme"], {
    disabled: { table: { defaultValue: { summary: "false" } } },
    asChild: { table: { defaultValue: { summary: "false" } } },
    container: {
      control: false,
      table: { defaultValue: { summary: "document.body" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  // Portals into the second box so the docs page shows where the content goes.
  render: function Render(args) {
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const box =
      "flex min-h-28 w-56 flex-col gap-2 rounded-lg border border-dashed border-stone-300 p-3 text-xs text-stone-600";
    return (
      <div className="flex flex-wrap gap-4">
        <div className={box}>
          {text.source}
          <Portal {...args} container={target}>
            <div className="rounded-md bg-(--scheme-800) p-3 text-sm text-white">
              {text.content}
            </div>
          </Portal>
        </div>
        <div ref={setTarget} data-testid="target" className={box}>
          {text.target}
        </div>
      </div>
    );
  },
} satisfies Meta<typeof Portal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const content = await canvas.findByText(text.content);
    await expect(canvas.getByTestId("target")).toContainElement(content);
  },
};

// Disabled: rendered where it's written.
export const Disabled: Story = {
  tags: ["!dev"],
  args: { disabled: true },
  play: async ({ canvas }) => {
    const content = canvas.getByText(text.content);
    await expect(canvas.getByTestId("target")).not.toContainElement(content);
    await expect(canvas.getByText(text.source)).toContainElement(content);
  },
};
