import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import TextInputComponent from '../components/TextInput';

const meta = {
  title: 'TextInput',
  component: TextInputComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    block: { control: 'boolean' },
    description: { control: 'text' },
    error: { control: 'text' },
    hasError: { control: 'boolean' },
    label: { control: 'text' },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'] as const,
    },
    placeholder: { control: 'text' },
    rounded: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'] as const
    }
  },
  args: {
    block: false,
    description: 'This is the description of my input.',
    error: 'This is an error',
    hasError: false,
    label: 'Label',
    placeholder: 'Input',
    orientation: 'horizontal',
    onChange: fn(),
    rounded: false,
    size: 'medium'
  }
} satisfies Meta<typeof TextInputComponent>

export default meta;

type Story = StoryObj<typeof meta>;

export const TextInput: Story = {}
