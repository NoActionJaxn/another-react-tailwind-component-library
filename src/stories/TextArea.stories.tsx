import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import TextAreaComponent from '../components/TextArea';

const meta = {
  title: 'Inputs/TextArea',
  component: TextAreaComponent,
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
    prependElement: {
      control: {
        disable: true,
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'] as const
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
    size: 'md'
  }
} satisfies Meta<typeof TextAreaComponent>

export default meta;

type Story = StoryObj<typeof meta>;

export const TextArea: Story = {}

export const TextAreaPrependIcon: Story = {
  args: {
    prependElement: <>🔥</>
  }
}
