import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Select from "../components/Select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape" },
  { value: "mango", label: "Mango" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
];

export const Default: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
  },
};

export const WithLabel: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
    label: "Favorite Fruit",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={fruitOptions} variant="default" label="Default" placeholder="Select..." />
      <Select options={fruitOptions} variant="primary" label="Primary" placeholder="Select..." />
      <Select options={fruitOptions} variant="secondary" label="Secondary" placeholder="Select..." />
      <Select options={fruitOptions} variant="warning" label="Warning" placeholder="Select..." />
      <Select options={fruitOptions} variant="danger" label="Danger" placeholder="Select..." />
      <Select options={fruitOptions} variant="success" label="Success" placeholder="Select..." />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={fruitOptions} size="small" label="Small" placeholder="Select..." />
      <Select options={fruitOptions} size="medium" label="Medium" placeholder="Select..." />
      <Select options={fruitOptions} size="large" label="Large" placeholder="Select..." />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Select options={fruitOptions} label="Vertical Label" labelPosition="vertical" placeholder="Select..." />
      <Select options={fruitOptions} label="Horizontal Label" labelPosition="horizontal" placeholder="Select..." />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2", disabled: true },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4", disabled: true },
      { value: "option5", label: "Option 5" },
    ],
    label: "With Disabled Options",
    placeholder: "Select an option",
  },
};

export const Disabled: Story = {
  args: {
    options: fruitOptions,
    label: "Disabled Select",
    placeholder: "Select a fruit",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("banana");
    return (
      <div className="flex flex-col gap-4">
        <Select
          options={fruitOptions}
          value={value}
          onValueChange={setValue}
          label="Controlled Select"
          placeholder="Select a fruit"
        />
        <p className="text-sm text-neutral-600">Selected: {value}</p>
        <div className="flex gap-2">
          <button
            onClick={() => setValue("apple")}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Set Apple
          </button>
          <button
            onClick={() => setValue("mango")}
            className="px-3 py-1 text-sm bg-neutral-100 rounded hover:bg-neutral-200"
          >
            Set Mango
          </button>
        </div>
      </div>
    );
  },
};

export const CountrySelector: Story = {
  args: {
    options: countryOptions,
    label: "Country",
    placeholder: "Select your country",
    variant: "primary",
  },
};
