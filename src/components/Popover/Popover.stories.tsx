import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
  argTypes: {},
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>Place any content here.</PopoverContent>
    </Popover>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
