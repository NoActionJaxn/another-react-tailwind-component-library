import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
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
  parameters: docsParameters("Tooltip", { layout: "centered" }),
  args: {
    showArrow: true,
    sideOffset: 4,
    side: "top",
    colorScheme: "default",
    children: m.components.Tooltip.story.content,
  },
  argTypes: docsArgTypes("Tooltip", [{ colorScheme: "portalColorScheme" }], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  }),
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">
            {m.components.Tooltip.story.trigger}
          </Button>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
