import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../components/Button";
import ButtonGroupComponent from "../components/ButtonGroup";

const meta = {
  title: "Buttons",
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
      <Button key="second" variant="default">
        third
      </Button>,
      <Button key="second" variant="default">
        Fourth
      </Button>,
      <Button key="second" variant="default">
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
};
