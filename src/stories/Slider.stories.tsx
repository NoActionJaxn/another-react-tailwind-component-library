import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Slider from "../components/Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    defaultValue: [50],
    label: "Volume",
    showValue: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <Slider defaultValue={[50]} variant="default" label="Default" showValue />
      <Slider defaultValue={[50]} variant="primary" label="Primary" showValue />
      <Slider defaultValue={[50]} variant="secondary" label="Secondary" showValue />
      <Slider defaultValue={[50]} variant="warning" label="Warning" showValue />
      <Slider defaultValue={[50]} variant="danger" label="Danger" showValue />
      <Slider defaultValue={[50]} variant="success" label="Success" showValue />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <Slider defaultValue={[50]} size="small" label="Small" showValue />
      <Slider defaultValue={[50]} size="medium" label="Medium" showValue />
      <Slider defaultValue={[50]} size="large" label="Large" showValue />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-64">
      <Slider defaultValue={[50]} label="Vertical Label" labelPosition="vertical" showValue />
      <Slider defaultValue={[50]} label="Horizontal Label" labelPosition="horizontal" showValue />
    </div>
  ),
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    label: "Price Range",
    showValue: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    defaultValue: [0],
    min: 0,
    max: 10,
    step: 1,
    label: "Rating",
    showValue: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const StepValues: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 10,
    label: "Step by 10",
    showValue: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    label: "Disabled Slider",
    showValue: true,
    disabled: true,
  },
  render: (args) => (
    <div className="w-64">
      <Slider {...args} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([30]);
    return (
      <div className="flex flex-col gap-4 w-64">
        <Slider
          value={value}
          onValueChange={setValue}
          label="Controlled Slider"
          showValue
        />
        <div className="flex gap-2">
          <button
            onClick={() => setValue([0])}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Min
          </button>
          <button
            onClick={() => setValue([50])}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Middle
          </button>
          <button
            onClick={() => setValue([100])}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Max
          </button>
        </div>
      </div>
    );
  },
};
