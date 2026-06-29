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
    checked: { control: 'boolean' },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    icon: {
      control: {
        disable: true,
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const
    },
    reverse: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
    },
  },
  args: {
    block: false,
    checked: false,
    className: '',
    disabled: false,
    label: 'Label',
    variant: 'default',
    reverse: false,
    size: 'md',
    onChange: fn()
  }
} satisfies Meta<typeof CheckboxComponent>

export default meta;

type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {};
