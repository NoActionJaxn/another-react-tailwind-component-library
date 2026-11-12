import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: TooltipContent,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { side: "top", colorScheme: "default", children: "Add to library" },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
