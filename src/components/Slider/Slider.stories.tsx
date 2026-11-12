import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Slider } from "./Slider";

const meta = {
  title: "Components/Slider",
  component: Slider,
  parameters: docsParameters("Slider", { layout: "centered" }),
  args: {
    defaultValue: [40],
    max: 100,
    step: 1,
    size: "md",
    colorScheme: "default",
    disabled: false,
    "aria-label": m.components.Slider.story.ariaLabel,
  },
  argTypes: docsArgTypes("Slider", ["size", "colorScheme", "disabled"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  }),
  render: (args) => (
    <div className="w-72">
      <Slider {...args} />
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
