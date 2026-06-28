import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import Listbox from '../components/Listbox';

const meta = {
  title: 'Components/Listbox',
  component: Listbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    block: {
      control: 'boolean',
      description: 'Make listbox full width',
    },
    description: {
      control: 'text',
      description: 'Helper text below the listbox',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    hasError: {
      control: 'boolean',
      description: 'Show error state',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    rounded: {
      control: 'boolean',
      description: 'Rounded button style',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
    },
    value: {
      control: false,
    },
    onChange: {
      action: 'changed',
    },
  },
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions = [
  { value: 'option1', label: 'First Option' },
  { value: 'option2', label: 'Second Option' },
  { value: 'option3', label: 'Third Option' },
  { value: 'option4', label: 'Fourth Option' },
];

export const Default: Story = {
  args: {
    label: 'Select an item',
    options: sampleOptions,
    onChange: fn(),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Select an item',
    description: 'Choose from the available options',
    options: sampleOptions,
    onChange: fn(),
  },
};

export const WithError: Story = {
  args: {
    label: 'Select an item',
    hasError: true,
    error: 'This field is required',
    options: sampleOptions,
    onChange: fn(),
  },
};

export const Small: Story = {
  args: {
    label: 'Select',
    size: 'small',
    options: sampleOptions,
    onChange: fn(),
  },
};

export const Large: Story = {
  args: {
    label: 'Select an item',
    size: 'large',
    options: sampleOptions,
    onChange: fn(),
  },
};

export const Rounded: Story = {
  args: {
    label: 'Select an item',
    rounded: true,
    options: sampleOptions,
    onChange: fn(),
  },
};

export const Block: Story = {
  args: {
    label: 'Select an item',
    block: true,
    options: sampleOptions,
    onChange: fn(),
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Select an item',
    orientation: 'horizontal',
    options: sampleOptions,
    onChange: fn(),
  },
};
