import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Progress from "../components/Progress";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
    variant: "primary",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={60} variant="default" label="Default" />
      <Progress value={60} variant="primary" label="Primary" />
      <Progress value={60} variant="secondary" label="Secondary" />
      <Progress value={60} variant="warning" label="Warning" />
      <Progress value={60} variant="danger" label="Danger" />
      <Progress value={60} variant="success" label="Success" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Progress value={70} size="small" label="Small" />
      <Progress value={70} size="medium" label="Medium" />
      <Progress value={70} size="large" label="Large" />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    value: 75,
    showValue: true,
    label: "Upload progress",
  },
};

export const Animated: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) return 0;
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(interval);
    }, []);

    return (
      <Progress
        value={value}
        variant="success"
        showValue
        label="Loading..."
      />
    );
  },
};

export const CustomMax: Story = {
  args: {
    value: 3,
    max: 5,
    showValue: true,
    label: "Steps completed",
    variant: "primary",
  },
};

export const Complete: Story = {
  args: {
    value: 100,
    showValue: true,
    label: "Download complete",
    variant: "success",
  },
};

export const Empty: Story = {
  args: {
    value: 0,
    showValue: true,
    label: "Not started",
    variant: "secondary",
  },
};
