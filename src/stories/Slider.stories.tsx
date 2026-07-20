import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import SliderComponent from "../components/Slider";

const meta = {
  title: "Components/Slider",
  component: SliderComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `An accessible slider, built on Radix UI, supporting single and range values.

**States & classes** (see \`styles/components/slider.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-slider-track\` | track, always | background |
| \`.another-slider-thumb\` | each thumb, always | shape, border, focus ring |
| \`.another-slider[data-variant="default"] .another-slider-range\` | \`variant="default"\` | filled range color |
| \`.another-slider[data-variant="default"] .another-slider-thumb\` | \`variant="default"\` | thumb border, background |
| \`.another-slider[data-variant="default"]:not([data-disabled]) .another-slider-thumb:hover\` | hovering, not disabled | thumb background |
| \`.another-slider[data-size="sm"\\|"md"\\|"lg"] .another-slider-thumb\` | \`size\` prop | thumb size |`,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const thumb = canvas.getByRole("slider");

    await expect(thumb).toHaveAttribute("aria-valuenow", "50");

    thumb.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(thumb).toHaveAttribute("aria-valuenow", "51");
  },
};

export const RangeSlider: Story = {
  args: {
    defaultValue: [25, 75],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [lowerThumb, upperThumb] = canvas.getAllByRole("slider");

    await expect(lowerThumb).toHaveAttribute("aria-valuenow", "25");
    await expect(upperThumb).toHaveAttribute("aria-valuenow", "75");

    lowerThumb.focus();
    await userEvent.keyboard("{ArrowRight}");

    await expect(lowerThumb).toHaveAttribute("aria-valuenow", "26");
    await expect(upperThumb).toHaveAttribute("aria-valuenow", "75");
  },
};
