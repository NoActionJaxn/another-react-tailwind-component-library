import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ButtonComponent from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Buttons/Button',
  component: ButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
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
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
  args: {
    children: 'Button',
    block: false,
    icon: false,
    rounded: false,
    size: 'medium',
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Button: Story = {};
