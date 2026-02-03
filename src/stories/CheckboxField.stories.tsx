import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CheckboxField } from '../';

const meta: Meta<typeof CheckboxField> = {
  title: 'Components/CheckboxField',
  component: CheckboxField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of checkbox options with id, label, and value',
      table: { disable: true },
    },
    value: {
      description: 'Controlled array of selected values',
      table: { disable: true },
    },
    defaultValue: {
      description: 'Default selected values (uncontrolled)',
      table: { disable: true },
    },
    onChange: {
      description: 'Callback fired when selection changes, receives array of selected values',
    },
    layout: {
      control: 'select',
      options: ['stack', 'grid'],
      description: 'Layout style: vertical stack or responsive grid',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'The visual style variant of the checkboxes',
    },
    name: {
      control: 'text',
      description: 'Form field name attribute',
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

const manyOptions = [
  { id: 'fruit-apple', label: 'Apple', value: 'apple' },
  { id: 'fruit-banana', label: 'Banana', value: 'banana' },
  { id: 'fruit-cherry', label: 'Cherry', value: 'cherry' },
  { id: 'fruit-date', label: 'Date', value: 'date' },
  { id: 'fruit-elderberry', label: 'Elderberry', value: 'elderberry' },
  { id: 'fruit-fig', label: 'Fig', value: 'fig' },
  { id: 'fruit-grape', label: 'Grape', value: 'grape' },
  { id: 'fruit-honeydew', label: 'Honeydew', value: 'honeydew' },
  { id: 'fruit-kiwi', label: 'Kiwi', value: 'kiwi' },
];

export const Default: Story = {
  render: (args) => (
    <div className="container">
      <CheckboxField {...args} />
    </div>
  ),
  args: {
    options: [
      { id: 'story-1-option-1', label: 'Option 1', value: 'option1' },
      { id: 'story-1-option-2', label: 'Option 2', value: 'option2' },
      { id: 'story-1-option-3', label: 'Option 3', value: 'option3' },
    ],
  },
};

export const WithDefaultValue: Story = {
  render: (args) => (
    <div className="container">
      <CheckboxField {...args} />
    </div>
  ),
  args: {
    options: [
      { id: 'story-2-option-1', label: 'Option 1', value: 'option1' },
      { id: 'story-2-option-2', label: 'Option 2', value: 'option2' },
      { id: 'story-2-option-3', label: 'Option 3', value: 'option3' },
    ],
    defaultValue: ['option1', 'option3'],
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>(['option2']);

    return (
      <div className="container">
        <CheckboxField
          {...args}
          value={selected}
          onChange={setSelected}
        />
        <p className="mt-4 text-sm text-default-600">
          Selected: {selected.length > 0 ? selected.join(', ') : 'None'}
        </p>
      </div>
    );
  },
  args: {
    options: [
      { id: 'story-3-option-1', label: 'Option 1', value: 'option1' },
      { id: 'story-3-option-2', label: 'Option 2', value: 'option2' },
      { id: 'story-3-option-3', label: 'Option 3', value: 'option3' },
    ],
  },
};

export const GridLayout: Story = {
  render: (args) => (
    <div className="container">
      <CheckboxField {...args} />
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
      <CheckboxField {...args} />
    </div>
  ),
  args: {
    options: [
      { id: 'disabled-option-1', label: 'Available', value: 'available' },
      { id: 'disabled-option-2', label: 'Disabled', value: 'disabled', disabled: true },
      { id: 'disabled-option-3', label: 'Also Available', value: 'also-available' },
    ],
  },
};

export const VerticalLayout: Story = {
  render: (args) => (
    <div className="w-xs">
      <CheckboxField {...args} />
    </div>
  ),
  args: {
    options: manyOptions,
    layout: 'stack',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <CheckboxField
          options={[{ id: 'variant-default-1', label: 'Default variant', value: 'default' }]}
          variant="default"
          defaultValue={['default']}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Primary</p>
        <CheckboxField
          options={[{ id: 'variant-primary-1', label: 'Primary variant', value: 'primary' }]}
          variant="primary"
          defaultValue={['primary']}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Secondary</p>
        <CheckboxField
          options={[{ id: 'variant-secondary-1', label: 'Secondary variant', value: 'secondary' }]}
          variant="secondary"
          defaultValue={['secondary']}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Warning</p>
        <CheckboxField
          options={[{ id: 'variant-warning-1', label: 'Warning variant', value: 'warning' }]}
          variant="warning"
          defaultValue={['warning']}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Danger</p>
        <CheckboxField
          options={[{ id: 'variant-danger-1', label: 'Danger variant', value: 'danger' }]}
          variant="danger"
          defaultValue={['danger']}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Success</p>
        <CheckboxField
          options={[{ id: 'variant-success-1', label: 'Success variant', value: 'success' }]}
          variant="success"
          defaultValue={['success']}
        />
      </div>
    </div>
  ),
};
