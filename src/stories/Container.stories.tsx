import type { Meta, StoryObj } from "@storybook/react-vite";

import ContainerComponent from "../components/Container";

const meta = {
  title: "Ui/Containers",
  component: ContainerComponent,
  parameters: {
    // layout: "centered",
    docs: {
      description: {
        component:
          "Marks an element as a container query context (@container), letting descendants respond to the container's own width instead of the viewport.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "text",
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
};
