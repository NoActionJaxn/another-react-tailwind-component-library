import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import IconButtonComponent from '../components/IconButton';

const meta = {
  title: 'IconButton',
  component: IconButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
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
    rounded: false,
    size: 'medium',
    type: 'button',
    variant: 'default',
    onClick: fn()
  },
} satisfies Meta<typeof IconButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const IconButton: Story = {};
