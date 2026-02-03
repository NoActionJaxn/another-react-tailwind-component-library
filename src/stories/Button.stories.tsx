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
    square: {
      control: 'boolean',
      description: 'Makes the button square (equal width and height, no padding)',
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
    square: false,
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

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonComponent size="small">Small</ButtonComponent>
      <ButtonComponent size="medium">Medium</ButtonComponent>
      <ButtonComponent size="large">Large</ButtonComponent>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ButtonComponent variant="default">Default</ButtonComponent>
      <ButtonComponent variant="primary">Primary</ButtonComponent>
      <ButtonComponent variant="secondary">Secondary</ButtonComponent>
      <ButtonComponent variant="warning">Warning</ButtonComponent>
      <ButtonComponent variant="danger">Danger</ButtonComponent>
      <ButtonComponent variant="success">Success</ButtonComponent>
      <ButtonComponent variant="ghost">Ghost</ButtonComponent>
    </div>
  ),
};

export const Square: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonComponent {...args}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </ButtonComponent>
      </div>
    );
  },
  args: {
    square: true,
  },
};

export const SquareAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonComponent size="small" square>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
      <ButtonComponent size="medium" square>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
      <ButtonComponent size="large" square>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
    </div>
  ),
};

export const SquareRounded: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ButtonComponent size="small" square rounded variant="primary">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
      <ButtonComponent size="medium" square rounded variant="primary">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
      <ButtonComponent size="large" square rounded variant="primary">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </ButtonComponent>
    </div>
  ),
};
