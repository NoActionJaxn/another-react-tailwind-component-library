import type { Meta, StoryObj } from "@storybook/react-vite";

import SliderComponent from "../components/Slider";

const meta = {
  title: "Inputs",
  component: SliderComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An accessible slider, built on Radix UI, supporting single and range values.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    min: {
      control: "number",
      description: "The minimum value.",
    },
    max: {
      control: "number",
      description: "The maximum value.",
    },
    step: {
      control: "number",
      description: "The step increment.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the slider styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The size of the slider thumb.",
    },
    disabled: {
      control: "boolean",
      description: "Disables the slider.",
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    variant: "default",
    size: "md",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SliderComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Slider: Story = {
  args: {
    defaultValue: [50],
  },
};

export const RangeSlider: Story = {
  args: {
    defaultValue: [25, 75],
  },
};
