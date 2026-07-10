import { useEffect, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ProgressComponent from "../components/Progress";

const meta = {
  title: "Ui/Progress",
  component: ProgressComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "An accessible progress bar, built on Radix UI.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "The current progress value.",
    },
    max: {
      control: "number",
      description: "The maximum value.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the progress styling.",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "The height of the progress bar.",
    },
  },
  args: {
    value: 50,
    max: 100,
    variant: "default",
    size: "md",
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Progress: Story = {};

export const Animated: Story = {
  render: (args) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((current) => (current >= 100 ? 0 : current + 10));
      }, 500);

      return () => clearInterval(interval);
    }, []);

    return <ProgressComponent {...args} value={value} />;
  },
};
