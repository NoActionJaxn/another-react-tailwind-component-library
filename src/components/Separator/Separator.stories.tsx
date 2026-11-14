import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Separator } from "./Separator";

const meta = {
  title: "Containers/Separator",
  component: Separator,
  parameters: docsParameters("Separator", { layout: "centered" }),
  args: { decorative: true, orientation: "horizontal", colorScheme: "default" },
  argTypes: docsArgTypes("Separator", ["orientation", "colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    orientation: {
      table: { defaultValue: { summary: "horizontal" } },
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  }),
  render: (args) => (
    <div className="w-64 text-sm">
      <p>{m.components.Separator.story.above}</p>
      <Separator {...args} className="my-3" />
      <div className="flex h-5 items-center gap-3">
        <span>{m.components.Separator.story.left}</span>
        <Separator orientation="vertical" />
        <span>{m.components.Separator.story.right}</span>
      </div>
    </div>
  ),
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
