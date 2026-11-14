import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, format, m } from "../../docs/i18n";
import { Separator } from "../Separator";
import { ScrollArea } from "./ScrollArea";

const meta = {
  title: "Containers/ScrollArea",
  component: ScrollArea,
  parameters: docsParameters("ScrollArea", { layout: "centered" }),
  args: { colorScheme: "default" },
  argTypes: docsArgTypes("ScrollArea", ["colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    scrollbars: {
      control: "inline-radio",
      options: ["vertical", "horizontal", "both"],
    },
  }),
  render: (args) => (
    <ScrollArea
      {...args}
      className="h-56 w-48 rounded-md border border-default-300"
    >
      <div className="p-4 text-sm">
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i}>
            <div className="py-1.5">
              {format(m.components.ScrollArea.story.item, { n: i + 1 })}
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
