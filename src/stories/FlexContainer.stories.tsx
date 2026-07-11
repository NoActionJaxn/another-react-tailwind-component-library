import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import FlexContainerComponent from "../components/FlexContainer";

const items = ["First", "Second", "Third", "Fourth"];

const meta = {
  title: "Ui/Containers",
  component: FlexContainerComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A Container that lays its children out with flexbox, switching from a stacked column to a row once the container itself has enough width.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["row", "column"],
      description:
        '"row" stacks children in a column until the container widens, then switches to a row. "column" always stacks.',
    },
    wrap: {
      control: "boolean",
      description: "Allows children to wrap onto multiple lines.",
    },
  },
  args: {
    direction: "row",
    wrap: true,
  },
} satisfies Meta<typeof FlexContainerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FlexContainer: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl resize-x overflow-auto border-2 border-dashed border-default-400 p-2">
      <FlexContainerComponent {...args}>
        {items.map((item) => (
          <div key={item} className="rounded-sm bg-default-100 p-4 text-center">
            {item}
          </div>
        ))}
      </FlexContainerComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const flexEl = canvasElement.querySelector(".another-flex-container");

    expect(flexEl).toHaveAttribute("data-direction", "row");
    expect(flexEl).toHaveAttribute("data-wrap", "true");
    expect(flexEl?.children).toHaveLength(4);
  },
};
