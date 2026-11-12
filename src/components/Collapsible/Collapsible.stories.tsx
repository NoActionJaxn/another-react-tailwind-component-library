import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {},
  argTypes: {},
  render: (args) => (
    <Collapsible {...args} className="w-72">
      <CollapsibleTrigger asChild>
        <Button variant="ghost">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm">
          Hidden details, revealed with a height animation.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
