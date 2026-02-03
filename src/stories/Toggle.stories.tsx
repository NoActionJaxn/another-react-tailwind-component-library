import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle } from '../';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'The visual style variant of the toggle',
    },
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the label relative to the toggle',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
      table: { disable: true },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    onCheckedChange: {
      description: 'Callback fired when the toggle state changes',
    },
  },
  args: {
    variant: 'primary',
    labelPosition: 'right',
    disabled: false,
    defaultChecked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="container">
      <Toggle {...args} id="toggle-default" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="container">
      <Toggle {...args} id="toggle-with-label" label="Enable notifications" />
    </div>
  ),
};

export const WithLabelTop: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle
        id="toggle-top-1"
        label="Dark Mode"
        labelPosition="top"
      />
      <Toggle
        id="toggle-top-2"
        label="Auto-save"
        labelPosition="top"
        defaultChecked
      />
    </div>
  ),
};

export const WithLabelRight: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle
        id="toggle-right-1"
        label="Enable notifications"
        labelPosition="right"
      />
      <Toggle
        id="toggle-right-2"
        label="Subscribe to newsletter"
        labelPosition="right"
        defaultChecked
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="container">
        <Toggle
          {...args}
          id="toggle-controlled"
          label="Controlled toggle"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <p className="mt-4 text-sm text-default-600">
          Status: {checked ? 'On' : 'Off'}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Toggle
        id="toggle-disabled-off"
        label="Disabled (off)"
        disabled
      />
      <Toggle
        id="toggle-disabled-on"
        label="Disabled (on)"
        disabled
        defaultChecked
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-default" label="Default" variant="default" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-primary" label="Primary" variant="primary" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-secondary" label="Secondary" variant="secondary" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-warning" label="Warning" variant="warning" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-danger" label="Danger" variant="danger" defaultChecked />
      </div>
      <div className="flex items-center gap-4">
        <Toggle id="toggle-variant-success" label="Success" variant="success" defaultChecked />
      </div>
    </div>
  ),
};
