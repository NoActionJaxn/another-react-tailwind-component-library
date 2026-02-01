import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button as ButtonComponent } from '../';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Render as a child component using Radix Slot',
      table: {
        disable: true
      }
    },
    children: {
      control: 'text',
      description: 'The content to display inside the button',
    },
    block: {
      control: 'boolean',
      description: 'Makes the button take the full width of its container',
    },
    rounded: {
      control: 'boolean',
      description: 'Applies fully rounded corners (pill shape)',
    },
    size: {
      description: 'The size of the button',
    },
    variant: {
      description: 'The visual style variant of the button',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The HTML button type attribute',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button and applies disabled styling',
    },
    onClick: {
      description: 'Callback function when the button is clicked',
    },
  },
  args: {
    onClick: fn(),
    asChild: false,
    children: 'Button',
    block: false,
    rounded: false,
    size: 'medium',
    variant: 'default',
    type: 'button',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args} />
      </div>
    );
  },
};

export const Rounded: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args} />
      </div>
    );
  },
  args: {
    rounded: true,
  },
};

export const Block: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args} />
      </div>
    );
  },
  args: {
    block: true,
  },
};

export const Disabled: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args} />
      </div>
    );
  },
  args: {
    disabled: true,
  },
};
