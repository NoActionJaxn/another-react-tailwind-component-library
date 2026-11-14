import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { FlexContainer } from "./FlexContainer";

const gapOptions = ["none", "xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Containers/FlexContainer",
  component: FlexContainer,
  parameters: docsParameters("FlexContainer", { layout: "padded" }),
  args: {
    minColumnWidth: "15rem",
    colorScheme: "default",
    direction: "row",
    align: "stretch",
    justify: "start",
    columns: 3,
    gap: "md",
    asChild: false,
    block: false,
  },
  argTypes: docsArgTypes(
    "FlexContainer",
    ["colorScheme", "gap", { asChild: "layoutAsChild" }, "block"],
    {
      direction: {
        control: "inline-radio",
        options: ["row", "column", "row-reverse", "column-reverse"],
        table: { defaultValue: { summary: "row" } },
      },
      align: {
        control: "inline-radio",
        options: ["start", "center", "end", "stretch", "baseline"],
        table: { defaultValue: { summary: "stretch" } },
      },
      justify: {
        control: "inline-radio",
        options: ["start", "center", "end", "between", "around", "evenly"],
        table: { defaultValue: { summary: "start" } },
      },
      columns: { control: "number" },
      minColumnWidth: {
        control: "text",
        table: { defaultValue: { summary: "15rem" } },
      },
      wrap: {
        control: "inline-radio",
        options: ["nowrap", "wrap", "wrap-reverse"],
        table: {
          defaultValue: { summary: m.components.FlexContainer.defaults.wrap },
        },
      },
      gap: {
        control: "inline-radio",
        options: gapOptions,
        table: { defaultValue: { summary: "none" } },
      },
      asChild: { table: { defaultValue: { summary: "false" } } },
      block: { table: { defaultValue: { summary: "false" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <FlexContainer
      {...args}
      className="min-h-40 rounded-md border border-dashed border-default-300 p-2"
    >
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className="rounded-md bg-default-200 px-4 py-2 text-sm text-default-900"
          style={{ fontSize: n === 2 ? "1.25rem" : undefined }}
        >
          {format(m.common.layout.item, { n })}
        </div>
      ))}
    </FlexContainer>
  ),
} satisfies Meta<typeof FlexContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelector("[data-flex-container]")!.children].map(
    (item) => item.getBoundingClientRect(),
  );

// columns: up to that many items per row, wrapping when they'd get narrower than minColumnWidth.
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("[data-flex-container]")!;
    await expect(getComputedStyle(container).flexWrap).toBe("wrap");
    const boxes = items(canvasElement);
    const rows = new Set(boxes.map((box) => Math.round(box.top)));
    const width = container.getBoundingClientRect().width;
    // As many per row as fit at 15rem.
    const perRow = Math.max(1, Math.min(3, Math.floor(width / 240)));
    await expect(rows.size).toBe(Math.ceil(3 / perRow));
  },
};

// Without columns, items stay on one line.
export const NoColumns: Story = {
  tags: ["!dev"],
  args: { columns: undefined, direction: "column" },
  play: async ({ canvasElement }) => {
    const container = canvasElement.querySelector("[data-flex-container]")!;
    await expect(getComputedStyle(container).flexWrap).toBe("nowrap");
    await expect(container).not.toHaveAttribute("data-columns");
    const boxes = items(canvasElement);
    // column: stacked in order.
    await expect(boxes[0]!.top).toBeLessThan(boxes[1]!.top);
    await expect(boxes[1]!.top).toBeLessThan(boxes[2]!.top);
  },
};
