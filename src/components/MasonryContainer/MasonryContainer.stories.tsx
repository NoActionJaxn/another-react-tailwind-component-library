import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { MasonryContainer } from "./MasonryContainer";

const text = m.components.MasonryContainer.story;

// Items of different heights, so the columns interlock.
const heights = [120, 200, 90, 160, 240, 110, 180, 140, 220, 100, 170, 130];

const meta = {
  title: "Containers/MasonryContainer",
  component: MasonryContainer,
  parameters: docsParameters("MasonryContainer", { layout: "padded" }),
  args: {
    columns: 3,
    minColumnWidth: "12rem",
    gap: "md",
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("MasonryContainer", ["colorScheme", "gap", "block"], {
    columns: {
      control: { type: "number", min: 1, max: 6 },
      table: { defaultValue: { summary: "3" } },
    },
    minColumnWidth: {
      control: "text",
      table: { defaultValue: { summary: "15rem" } },
    },
    gap: {
      control: "inline-radio",
      options: ["none", "xs", "sm", "md", "lg", "xl"],
      table: { defaultValue: { summary: "md" } },
    },
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <MasonryContainer {...args}>
      {heights.map((height, index) => (
        <div
          key={index}
          style={{ height }}
          className="flex items-start rounded-md bg-default-200 p-3 text-sm text-default-900"
        >
          {format(text.item, { n: index + 1 })}
        </div>
      ))}
    </MasonryContainer>
  ),
} satisfies Meta<typeof MasonryContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const grid = canvasElement.querySelector<HTMLElement>(
      "[data-masonry-container]",
    )!;
    await waitFor(() => expect(grid).toHaveAttribute("data-placed"));
    // Items in the same column follow each other one gap apart, never overlapping.
    const gap = parseFloat(getComputedStyle(grid).columnGap);
    const boxes = [...grid.children].map((item) => {
      const rect = item.getBoundingClientRect();
      return {
        left: Math.round(rect.left),
        top: rect.top,
        bottom: rect.bottom,
      };
    });
    const columns = new Map<number, typeof boxes>();
    for (const box of boxes) {
      columns.set(box.left, [...(columns.get(box.left) ?? []), box]);
    }
    await expect(columns.size).toBeGreaterThan(1);
    for (const column of columns.values()) {
      column.sort((a, b) => a.top - b.top);
      for (let i = 1; i < column.length; i++) {
        const space = column[i]!.top - column[i - 1]!.bottom;
        await expect(Math.abs(space - gap)).toBeLessThanOrEqual(1);
      }
    }
  },
};
