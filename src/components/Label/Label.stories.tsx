import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { TextInput } from "../TextInput";
import { Label } from "./Label";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: docsParameters("Label", { layout: "centered" }),
  args: {
    children: m.components.Label.story.children,
    htmlFor: "label-story-email",
    size: "md",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Label", ["size", "colorScheme"], {
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      table: { defaultValue: { summary: "md" } },
    },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <div className="flex w-72 flex-col gap-2">
      <Label {...args} />
      <TextInput
        id="label-story-email"
        type="email"
        size={args.size}
        colorScheme={args.colorScheme}
        placeholder={m.components.Label.story.placeholder}
      />
    </div>
  ),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
