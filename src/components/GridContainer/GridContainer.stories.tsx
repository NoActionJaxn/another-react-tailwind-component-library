import type { Meta, StoryObj } from "@storybook/react-vite";
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

export const Default: Story = {};
