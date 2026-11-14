import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { ListItem, OrderedList } from "./List";

const text = m.components.OrderedList.story;

const meta = {
  title: "Typography/OrderedList",
  component: OrderedList,
  parameters: docsParameters("OrderedList", { layout: "centered" }),
  args: {
    marker: "decimal",
    size: "md",
    start: 1,
    reversed: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("OrderedList", ["size", "colorScheme"], {
    marker: {
      control: "select",
      options: [
        "decimal",
        "decimal-leading-zero",
        "lower-alpha",
        "upper-alpha",
        "lower-roman",
        "upper-roman",
      ],
      table: { defaultValue: { summary: "decimal" } },
    },
    start: { control: "number", table: { defaultValue: { summary: "1" } } },
    reversed: { table: { defaultValue: { summary: "false" } } },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <OrderedList {...args} className="max-w-sm">
      {text.items.map((item, index) => (
        <ListItem key={item}>
          {item}
          {index === 2 && (
            <OrderedList marker="lower-alpha">
              {text.nested.map((nested) => (
                <ListItem key={nested}>{nested}</ListItem>
              ))}
            </OrderedList>
          )}
        </ListItem>
      ))}
    </OrderedList>
  ),
} satisfies Meta<typeof OrderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const [outer] = canvas.getAllByRole("list");
    await expect(outer!.tagName).toBe("OL");
    await expect(outer!.children).toHaveLength(text.items.length);
    await expect(canvas.getAllByRole("listitem")).toHaveLength(
      text.items.length + text.nested.length,
    );
  },
};

export const NestedSize: Story = {
  tags: ["!dev"],
  args: { size: "sm" },
  play: async ({ canvas }) => {
    for (const list of canvas.getAllByRole("list")) {
      await expect(list).toHaveAttribute("data-size", "sm");
    }
  },
};
