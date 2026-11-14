import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./Collapsible";

const meta = {
  title: "Data Display/Collapsible",
  component: Collapsible,
  parameters: docsParameters("Collapsible", { layout: "centered" }),
  args: {},
  argTypes: docsArgTypes(
    "Collapsible",
    ["open", "defaultOpen", "onOpenChange", "disabled"],
    {
      disabled: { table: { defaultValue: { summary: "false" } } },
      defaultOpen: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <Collapsible {...args} className="w-72">
      <CollapsibleTrigger asChild>
        <Button variant="ghost">
          {m.components.Collapsible.story.trigger}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p className="pt-2 text-sm">{m.components.Collapsible.story.content}</p>
      </CollapsibleContent>
    </Collapsible>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
