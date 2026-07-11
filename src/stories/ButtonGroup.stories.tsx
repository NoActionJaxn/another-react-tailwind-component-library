import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { Button } from "../components/Button";
import ButtonGroupComponent from "../components/ButtonGroup";

const meta = {
  title: "Forms/Buttons",
  component: ButtonGroupComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroupComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ButtonGroup: Story = {
  args: {
    block: false,
    children: [
      <Button key="first">First</Button>,
      <Button key="second">Second</Button>,
      <Button key="third" variant="default">
        third
      </Button>,
      <Button key="fourth" variant="default">
        Fourth
      </Button>,
      <Button key="fifth" variant="default">
        Fifth
      </Button>,
    ],
    icon: false,
    size: "md",
    variant: "outline",
  },
  render: (args) => (
    <ButtonGroupComponent {...args}>{args.children}</ButtonGroupComponent>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Buttons that don't specify their own variant inherit the group's.
    expect(canvas.getByRole("button", { name: "First" })).toHaveAttribute(
      "data-variant",
      "outline",
    );
    // "third"/"Fourth"/"Fifth" pass their own variant="default", which
    // overrides the group's variant="outline".
    expect(canvas.getByRole("button", { name: "third" })).toHaveAttribute(
      "data-variant",
      "default",
    );
  },
};
