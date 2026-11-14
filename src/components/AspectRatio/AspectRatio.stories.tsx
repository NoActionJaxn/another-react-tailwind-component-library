import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Containers/AspectRatio",
  component: AspectRatio,
  parameters: docsParameters("AspectRatio", { layout: "centered" }),
  args: { ratio: 16 / 9 },
  argTypes: docsArgTypes("AspectRatio", [], {
    ratio: { table: { defaultValue: { summary: "1" } } },
  }),
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <div className="flex size-full items-center justify-center rounded-md bg-default-200 text-sm text-default-700">
          {m.components.AspectRatio.story.content}
        </div>
      </AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

// The box keeps the ratio at any width.
export const Default: Story = {
  play: async ({ canvas }) => {
    const box = canvas
      .getByText(m.components.AspectRatio.story.content)
      .getBoundingClientRect();
    await expect(box.width / box.height).toBeCloseTo(16 / 9, 1);
  },
};

export const Square: Story = {
  tags: ["!dev"],
  args: { ratio: 1 },
  play: async ({ canvas }) => {
    const box = canvas
      .getByText(m.components.AspectRatio.story.content)
      .getBoundingClientRect();
    await expect(box.width).toBeCloseTo(box.height, 0);
  },
};
