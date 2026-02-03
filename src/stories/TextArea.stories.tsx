import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from '../';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'danger', 'success'],
      description: 'The visual style variant of the textarea',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the textarea',
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the label relative to the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    prependElement: {
      description: 'Element (icon) to render before the textarea',
      table: { disable: true },
    },
    appendElement: {
      description: 'Element (icon) to render after the textarea',
      table: { disable: true },
    },
  },
  args: {
    variant: 'default',
    size: 'medium',
    labelPosition: 'top',
    disabled: false,
    placeholder: 'Enter text...',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-64">
      <TextArea {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <TextArea variant="default" placeholder="Default variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Primary</p>
        <TextArea variant="primary" placeholder="Primary variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Secondary</p>
        <TextArea variant="secondary" placeholder="Secondary variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Warning</p>
        <TextArea variant="warning" placeholder="Warning variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Danger</p>
        <TextArea variant="danger" placeholder="Danger variant" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Success</p>
        <TextArea variant="success" placeholder="Success variant" />
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <div>
        <p className="mb-2 text-sm font-medium">Small</p>
        <TextArea size="small" placeholder="Small textarea" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Medium</p>
        <TextArea size="medium" placeholder="Medium textarea" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Large</p>
        <TextArea size="large" placeholder="Large textarea" />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className="w-64">
      <TextArea {...args} disabled placeholder="Disabled textarea" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="w-64">
      <TextArea {...args} id="textarea-label-example" label="Description" placeholder="Enter a description" />
    </div>
  ),
};

export const WithLabelTop: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <TextArea
        id="textarea-top-1"
        label="Bio"
        placeholder="Tell us about yourself"
        labelPosition="top"
      />
      <TextArea
        id="textarea-top-2"
        label="Notes"
        placeholder="Add any additional notes"
        labelPosition="top"
      />
    </div>
  ),
};

export const WithLabelLeft: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <TextArea
        id="textarea-left-1"
        label="Bio"
        placeholder="Tell us about yourself"
        labelPosition="left"
      />
      <TextArea
        id="textarea-left-2"
        label="Notes"
        placeholder="Add any additional notes"
        labelPosition="left"
      />
    </div>
  ),
};

export const WithLabelDisabled: Story = {
  render: () => (
    <div className="w-64">
      <TextArea
        id="textarea-disabled-label"
        label="Disabled Field"
        placeholder="Cannot edit"
        disabled
      />
    </div>
  ),
};

const PencilIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

export const WithPrependIcon: Story = {
  render: () => (
    <div className="w-80">
      <TextArea
        placeholder="Write your message..."
        prependElement={<MessageIcon />}
      />
    </div>
  ),
};

export const WithAppendIcon: Story = {
  render: () => (
    <div className="w-80">
      <TextArea
        placeholder="Edit content..."
        appendElement={<PencilIcon />}
      />
    </div>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <div className="w-80">
      <TextArea
        placeholder="Write your message..."
        prependElement={<MessageIcon />}
        appendElement={<PencilIcon />}
      />
    </div>
  ),
};
