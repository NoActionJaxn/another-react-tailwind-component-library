import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import CheckboxComponent from '../components/Checkbox';

const meta = {
  title: 'Inputs/Checkbox',
  component: CheckboxComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
    label: { control: 'text' },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['before', 'after'] as const
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'] as const,
    },
    icon: { control: 'boolean' }
  },
  args: {
    block: false,
    label: 'Label',
    variant: 'default',
    labelPosition: 'after',
    size: 'medium',
    onChange: fn()
  }
} satisfies Meta<typeof CheckboxComponent>

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {};

