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
    children: { table: { disable: true } },
    block: { control: 'boolean' },
    rounded: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success', 'ghost'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonGroup: Story = {
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
    children: 'Button',
    block: false,
    rounded: false,
    size: 'medium',
    variant: 'primary',
  },
};
