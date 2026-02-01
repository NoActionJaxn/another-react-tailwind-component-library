import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button, ButtonGroup as ButtonGroupComponent } from '../';

const meta: Meta<typeof ButtonGroupComponent> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroupComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Button components to render inside the group',
      table: { disable: true },
    },
    block: {
      control: 'boolean',
      description: 'Makes the button group take the full width of its container',
    },
    rounded: {
      control: 'boolean',
      description: 'Applies fully rounded corners to the first and last buttons',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size applied to all buttons in the group',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success', 'ghost'],
      description: 'The visual style variant applied to all buttons in the group',
    },
  },
  args: {
    block: false,
    rounded: false,
    size: 'medium',
    variant: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonGroupComponent {...args}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroupComponent>
      </div>
    );
  },
};

export const Mixed: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonGroupComponent {...args}>
          <Button variant="primary">One</Button>
          <Button variant="secondary">Two</Button>
          <Button variant="success">Three</Button>
        </ButtonGroupComponent>
      </div>
    );
  },
  args: {
    rounded: true,
  },
};

export const Rounded: Story = {
  render: (args) => {
    return (
      <div className="w-xs flex justify-center">
        <ButtonGroupComponent {...args}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroupComponent>
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
        <ButtonGroupComponent {...args}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroupComponent>
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
        <ButtonGroupComponent {...args}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroupComponent>
      </div>
    );
  },
  args: {
    disabled: true,
  },
};
