import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { RadioField } from '../';

const meta: Meta<typeof RadioField> = {
  title: 'Components/RadioField',
  component: RadioField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of radio options with id, label, and value',
      table: { disable: true },
    },
    value: {
      description: 'Controlled selected value',
      table: { disable: true },
    },
    defaultValue: {
      description: 'Default selected value (uncontrolled)',
      table: { disable: true },
    },
    onChange: {
      description: 'Callback fired when selection changes, receives selected value',
    },
    layout: {
      control: 'select',
      options: ['stack', 'grid'],
      description: 'Layout style: vertical stack or responsive grid',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'The visual style variant of the radio buttons',
    },
    name: {
      control: 'text',
      description: 'Form field name attribute',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire radio group',
    },
    required: {
      control: 'boolean',
      description: 'Makes the radio group required',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
  args: {
    layout: 'stack',
    variant: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { id: 'radio-default-option-1', label: 'Option 1', value: 'option1' },
  { id: 'radio-default-option-2', label: 'Option 2', value: 'option2' },
  { id: 'radio-default-option-3', label: 'Option 3', value: 'option3' },
];

const manyOptions = [
  { id: 'radio-fruit-apple', label: 'Apple', value: 'apple' },
  { id: 'radio-fruit-banana', label: 'Banana', value: 'banana' },
  { id: 'radio-fruit-cherry', label: 'Cherry', value: 'cherry' },
  { id: 'radio-fruit-date', label: 'Date', value: 'date' },
  { id: 'radio-fruit-elderberry', label: 'Elderberry', value: 'elderberry' },
  { id: 'radio-fruit-fig', label: 'Fig', value: 'fig' },
  { id: 'radio-fruit-grape', label: 'Grape', value: 'grape' },
  { id: 'radio-fruit-honeydew', label: 'Honeydew', value: 'honeydew' },
  { id: 'radio-fruit-kiwi', label: 'Kiwi', value: 'kiwi' },
];

export const Default: Story = {
  render: (args) => (
    <div className="container">
      <RadioField {...args} />
    </div>
  ),
  args: {
    options: defaultOptions,
  },
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <div className="container">
      <RadioField {...args} />
    </div>
  ),
  args: {
    options: defaultOptions,
    defaultValue: 'option2',
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string>('option1');

    return (
      <div className="container">
        <RadioField
          {...args}
          value={selected}
          onChange={setSelected}
        />
        <p className="mt-4 text-sm text-default-600">
          Selected: {selected || 'None'}
        </p>
      </div>
    );
  },
  args: {
    options: defaultOptions,
  },
};

export const GridLayout: Story = {
  render: (args) => (
    <div className="container">
      <RadioField {...args} />
    </div>
  ),
  args: {
    options: manyOptions,
    layout: 'grid',
  },
};

export const WithDisabledOption: Story = {
  render: (args) => (
    <div className="container">
      <RadioField {...args} />
    </div>
  ),
  args: {
    options: [
      { id: 'radio-disabled-option-1', label: 'Available', value: 'available' },
      { id: 'radio-disabled-option-2', label: 'Disabled', value: 'disabled', disabled: true },
      { id: 'radio-disabled-option-3', label: 'Also Available', value: 'also-available' },
    ],
  },
};

export const VerticalLayout: Story = {
  render: (args) => (
    <div className="container">
      <RadioField {...args} />
    </div>
  ),
  args: {
    options: manyOptions,
    layout: 'stack',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="container flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <RadioField
          options={[{ id: 'radio-variant-default-1', label: 'Default variant', value: 'default' }]}
          variant="default"
          defaultValue="default"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Primary</p>
        <RadioField
          options={[{ id: 'radio-variant-primary-1', label: 'Primary variant', value: 'primary' }]}
          variant="primary"
          defaultValue="primary"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Secondary</p>
        <RadioField
          options={[{ id: 'radio-variant-secondary-1', label: 'Secondary variant', value: 'secondary' }]}
          variant="secondary"
          defaultValue="secondary"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Warning</p>
        <RadioField
          options={[{ id: 'radio-variant-warning-1', label: 'Warning variant', value: 'warning' }]}
          variant="warning"
          defaultValue="warning"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Danger</p>
        <RadioField
          options={[{ id: 'radio-variant-danger-1', label: 'Danger variant', value: 'danger' }]}
          variant="danger"
          defaultValue="danger"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Success</p>
        <RadioField
          options={[{ id: 'radio-variant-success-1', label: 'Success variant', value: 'success' }]}
          variant="success"
          defaultValue="success"
        />
      </div>
    </div>
  ),
};
