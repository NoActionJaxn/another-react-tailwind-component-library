import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import GridContainerComponent from "../components/GridContainer";

const items = Array.from({ length: 9 }, (_, index) => index + 1);

const meta = {
  title: "Containers/GridContainer",
  component: GridContainerComponent,
  parameters: {
    docs: {
      description: {
        component: `A Container that lays its children out in a grid, reducing the column count as the container itself narrows, up to a maximum of 9 columns.

**States & classes** (see \`styles/components/grid-container.css\`, and **Retheming Components** for how to target these). No colors of its own - purely layout:

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-grid-container\` | root element, always | grid layout, gap |
| \`.another-grid-container[data-columns="1".."9"]\` | \`columns\` prop | column count at each container breakpoint |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: { type: "range", min: 1, max: 9, step: 1 },
      description: "The maximum number of columns at full container width.",
    },
  },
  args: {
    columns: 4,
  },
} satisfies Meta<typeof GridContainerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GridContainer: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl resize-x overflow-auto border-2 border-dashed border-default-400 p-2">
      <GridContainerComponent {...args}>
        {items.map((item) => (
          <div key={item} className="rounded-sm bg-default-100 p-4 text-center">
            {item}
          </div>
        ))}
      </GridContainerComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const gridEl = canvasElement.querySelector(".another-grid-container");

    expect(gridEl).toHaveAttribute("data-columns", "4");
    expect(gridEl?.children).toHaveLength(9);
  },
};
