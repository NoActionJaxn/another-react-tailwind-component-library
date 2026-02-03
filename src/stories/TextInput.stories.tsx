import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextInput, Button } from '../';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    labelPosition: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Position of the label relative to the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    prependElement: {
      description: 'Element to render before the input',
      table: { disable: true },
    },
    appendElement: {
      description: 'Element to render after the input',
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    labelPosition: 'vertical',
    label: 'Text Input',
    disabled: false,
    placeholder: 'Enter text...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <TextInput {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <TextInput variant="default" placeholder="Default variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Primary</p>
        <TextInput variant="primary" placeholder="Primary variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Secondary</p>
        <TextInput variant="secondary" placeholder="Secondary variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Warning</p>
        <TextInput variant="warning" placeholder="Warning variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Danger</p>
        <TextInput variant="danger" placeholder="Danger variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Success</p>
        <TextInput variant="success" placeholder="Success variant" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <p className="mb-2 text-sm font-medium">Small</p>
        <TextInput size="small" placeholder="Small input" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Medium</p>
        <TextInput size="medium" placeholder="Medium input" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Large</p>
        <TextInput size="large" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <TextInput {...args} disabled placeholder="Disabled input" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-64">
      <TextInput {...args} id="textinput-label-example" label="Email Address" placeholder="Enter your email" />
    </div>
  ),
};

export const WithLabelVertical: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <TextInput
        id="textinput-vertical-1"
        label="First Name"
        placeholder="Enter first name"
        labelPosition="vertical"
      />
      <TextInput
        id="textinput-vertical-2"
        label="Last Name"
        placeholder="Enter last name"
        labelPosition="vertical"
      />
      <TextInput
        id="textinput-vertical-3"
        label="Email"
        placeholder="Enter email"
        labelPosition="vertical"
        type="email"
      />
    </div>
  ),
};

export const WithLabelHorizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <TextInput
        id="textinput-horizontal-1"
        label="First Name"
        placeholder="Enter first name"
        labelPosition="horizontal"
      />
      <TextInput
        id="textinput-horizontal-2"
        label="Last Name"
        placeholder="Enter last name"
        labelPosition="horizontal"
      />
      <TextInput
        id="textinput-horizontal-3"
        label="Email"
        placeholder="Enter email"
        labelPosition="horizontal"
        type="email"
      />
    </div>
  ),
};

export const WithLabelDisabled: Story = {
  render: () => (
    <div className="w-64">
      <TextInput
        id="textinput-disabled-label"
        label="Disabled Field"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};

export const WithPrependButton: Story = {
  render: () => (
    <div className="w-80">
      <TextInput
        placeholder="Search..."
        prependElement={
          <Button variant="secondary" size="medium">
            Search
          </Button>
        }
      />
    </div>
  ),
};

export const WithAppendButton: Story = {
  render: () => (
    <div className="w-80">
      <TextInput
        placeholder="Enter email..."
        appendElement={
          <Button variant="primary" size="medium">
            Subscribe
          </Button>
        }
      />
    </div>
  ),
};

export const WithBothElements: Story = {
  render: () => (
    <div className="w-96">
      <TextInput
        placeholder="Enter amount..."
        prependElement={
          <Button variant="secondary" size="medium">
            $
          </Button>
        }
        appendElement={
          <Button variant="primary" size="medium">
            Submit
          </Button>
        }
      />
    </div>
  ),
};

export const SearchExample: Story = {
  render: () => (
    <div className="w-80">
      <TextInput
        placeholder="Search products..."
        variant="primary"
        appendElement={
          <Button variant="primary" size="medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Button>
        }
      />
    </div>
  ),
};

export const VariantMatchingButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextInput
        placeholder="Default variant"
        variant="default"
        appendElement={
          <Button variant="default" size="medium">
            Go
          </Button>
        }
      />
      <TextInput
        placeholder="Primary variant"
        variant="primary"
        appendElement={
          <Button variant="primary" size="medium">
            Go
          </Button>
        }
      />
      <TextInput
        placeholder="Warning variant"
        variant="warning"
        appendElement={
          <Button variant="warning" size="medium">
            Go
          </Button>
        }
      />
      <TextInput
        placeholder="Danger variant"
        variant="danger"
        appendElement={
          <Button variant="danger" size="medium">
            Go
          </Button>
        }
      />
      <TextInput
        placeholder="Success variant"
        variant="success"
        appendElement={
          <Button variant="success" size="medium">
            Go
          </Button>
        }
      />
    </div>
  ),
};

export const SizeMatchingButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <TextInput
        placeholder="Small"
        size="small"
        appendElement={
          <Button variant="primary" size="small">
            Submit
          </Button>
        }
      />
      <TextInput
        placeholder="Medium"
        size="medium"
        appendElement={
          <Button variant="primary" size="medium">
            Submit
          </Button>
        }
      />
      <TextInput
        placeholder="Large"
        size="large"
        appendElement={
          <Button variant="primary" size="large">
            Submit
          </Button>
        }
      />
    </div>
  ),
};
