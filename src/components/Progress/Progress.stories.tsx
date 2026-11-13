import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Progress",
  component: Progress,
  parameters: docsParameters("Progress", { layout: "centered" }),
  args: {
    max: 100,
    value: 60,
    size: "md",
    colorScheme: "default",
    "aria-label": m.components.Progress.story.ariaLabel,
  },
  argTypes: docsArgTypes(
    "Progress",
    ["size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
      },
      size: { control: "inline-radio", options: ["sm", "md", "lg"] },
      value: { control: { type: "range", min: 0, max: 100 } },
    },
  ),
  render: (args) => (
    <div className="w-72">
      <Progress {...args} />
    </div>
  ),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
