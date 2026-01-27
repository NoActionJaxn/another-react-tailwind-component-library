import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button as ButtonComponent } from '../';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ButtonComponent> = {
  title: 'Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      table: {
        disable: true
      }
    },
    children: { control: 'text' },
    block: { control: 'boolean' },
    rounded: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset']
    },
  },
  args: { onClick: fn() },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args} />
      </div>
    );
  },
  args: {
    asChild: false,
    children: 'Button',
    block: false,
    rounded: false,
    size: 'medium',
    variant: 'default',
    type: 'button',
  }
};
