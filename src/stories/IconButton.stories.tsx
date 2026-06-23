import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ButtonComponent from '../components/Button';

const meta = {
  title: 'Buttons/IconButton',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
    children: { control: 'text' },
    icon: { control: 'boolean' },
    rounded: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'] as const,
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
    children: '❤️',
    block: false,
    icon: true,
    rounded: false,
    size: 'medium',
    type: 'button',
    variant: 'default',
    onClick: fn()
  },
} satisfies Meta<typeof ButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButton: Story = {};
