import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { GridContainer } from "./GridContainer";

const meta = {
  title: "Containers/GridContainer",
  component: GridContainer,
  parameters: docsParameters("GridContainer", { layout: "padded" }),
  args: {
    minColumnWidth: "15rem",
    colorScheme: "default",
    columns: 3,
    align: "stretch",
    justify: "stretch",
    flow: "row",
    gap: "md",
    asChild: false,
    block: false,
  },
  argTypes: docsArgTypes(
    "GridContainer",
    ["colorScheme", "gap", { asChild: "layoutAsChild" }, "block"],
    {
      columns: { control: "number" },
      minColumnWidth: {
        control: "text",
        table: { defaultValue: { summary: "15rem" } },
      },
      rows: { control: "text" },
      align: {
        control: "inline-radio",
        options: ["start", "center", "end", "stretch", "baseline"],
        table: { defaultValue: { summary: "stretch" } },
      },
      justify: {
        control: "inline-radio",
        options: ["start", "center", "end", "stretch"],
        table: { defaultValue: { summary: "stretch" } },
      },
      flow: {
        control: "inline-radio",
        options: ["row", "column", "dense", "row-dense", "column-dense"],
        table: { defaultValue: { summary: "row" } },
      },
      gap: {
        control: "inline-radio",
        options: ["none", "xs", "sm", "md", "lg", "xl"],
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
    <GridContainer
      {...args}
      className="rounded-md border border-dashed border-default-300 p-2"
    >
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <div
          key={n}
          className="rounded-md bg-default-200 px-4 py-2 text-sm text-default-900"
        >
          {format(m.common.layout.item, { n })}
        </div>
      ))}
    </GridContainer>
  ),
} satisfies Meta<typeof GridContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

const grid = (canvasElement: HTMLElement) =>
  canvasElement.querySelector<HTMLElement>("[data-grid-container]")!;

const trackCount = (value: string) => value.split(" ").filter(Boolean).length;

// A number of columns is responsive: fewer when they'd get narrower than minColumnWidth.
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const element = grid(canvasElement);
    await expect(element).toHaveAttribute("data-columns", "3");
    const columns = trackCount(getComputedStyle(element).gridTemplateColumns);
    const perRow = Math.max(
      1,
      Math.min(3, Math.floor(element.getBoundingClientRect().width / 240)),
    );
    await expect(columns).toBe(perRow);
  },
};

// A string is used as grid-template-columns as is.
export const TemplateColumns: Story = {
  tags: ["!dev"],
  args: { columns: "100px 1fr", rows: 3 },
  play: async ({ canvasElement }) => {
    const element = grid(canvasElement);
    await expect(element).not.toHaveAttribute("data-columns");
    const styles = getComputedStyle(element);
    await expect(trackCount(styles.gridTemplateColumns)).toBe(2);
    await expect(styles.gridTemplateColumns.split(" ")[0]).toBe("100px");
    // A number of rows becomes that many equal rows.
    await expect(trackCount(styles.gridTemplateRows)).toBe(3);
  },
};

export const ColumnFlow: Story = {
  tags: ["!dev"],
  args: { columns: undefined, rows: 2, flow: "column" },
  play: async ({ canvasElement }) => {
    const [first, second, third] = [...grid(canvasElement).children].map(
      (item) => item.getBoundingClientRect(),
    );
    // Fills each column top to bottom before the next.
    await expect(Math.round(first!.left)).toBe(Math.round(second!.left));
    await expect(third!.left).toBeGreaterThan(first!.left);
  },
};
