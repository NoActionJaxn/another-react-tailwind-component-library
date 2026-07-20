import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import ContainerComponent from "../components/Container";

const meta = {
  title: "Components/Container",
  component: ContainerComponent,
  parameters: {
    // layout: "centered",
    docs: {
      description: {
        component: `Marks an element as a container query context (@container), letting descendants respond to the container's own width instead of the viewport.

**States & classes**: \`Container\` has no dedicated stylesheet and no colors of its own - it renders a single \`@container\` utility class (see \`src/components/Container.tsx\`) with no root class or variants to target. \`GridContainer\` and \`FlexContainer\` wrap it and add their own layout classes; see those pages for their own tables.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: false,
      description: "The element rendered.",
    },
  },
  args: {
    as: "div",
  },
} satisfies Meta<typeof ContainerComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Container: Story = {
  render: (args) => (
    <div className="w-96 resize-x overflow-auto border-2 border-dashed border-default-400 p-2">
      <ContainerComponent {...args}>
        <div className="grid grid-cols-1 gap-2 @sm:grid-cols-2 @md:grid-cols-3">
          <div className="rounded-sm bg-default-100 p-4 text-center">1</div>
          <div className="rounded-sm bg-default-100 p-4 text-center">2</div>
          <div className="rounded-sm bg-default-100 p-4 text-center">3</div>
          <div className="rounded-sm bg-default-100 p-4 text-center">4</div>
          <div className="rounded-sm bg-default-100 p-4 text-center">5</div>
          <div className="rounded-sm bg-default-100 p-4 text-center">6</div>
        </div>
      </ContainerComponent>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Walk up from a grid item to the Container element itself, since it
    // has no accessible role/name of its own to query by directly.
    const containerEl = canvas.getByText("1").parentElement?.parentElement;

    expect(containerEl).toHaveClass("@container");
  },
};
