import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ButtonComponent from '../components/Button';

const meta = {
  title: 'Buttons/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as const,
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'] as const,
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline', 'link'] as const,
    },
  },
  args: {
    block: false,
    children: 'Button',
    disabled: false,
    icon: false,
    size: 'md',
    type: 'button',
    variant: 'default',
    onClick: fn()
  },
  render: (args) => (
    <div className="text-center min-w-sm">
      <ButtonComponent {...args} />
    </div>
  ),
} satisfies Meta<typeof ButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {};

export const IconButton: Story = {
  args: {
    icon: true,
    children: '✨'
  }
};
