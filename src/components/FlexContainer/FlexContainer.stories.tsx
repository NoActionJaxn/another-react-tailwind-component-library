import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { FlexContainer } from "./FlexContainer";

const gapOptions = ["none", "xs", "sm", "md", "lg", "xl"];

const meta = {
  title: "Containers/FlexContainer",
  component: FlexContainer,
  parameters: docsParameters("FlexContainer", { layout: "padded" }),
  args: {
    direction: "row",
    align: "stretch",
    justify: "start",
    columns: 3,
    gap: "md",
    asChild: false,
  },
  argTypes: docsArgTypes(
    "FlexContainer",
    ["colorScheme", "gap", { asChild: "layoutAsChild" }],
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
      minColumnWidth: { control: "text" },
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
      colorScheme: {
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

export const Default: Story = {};
