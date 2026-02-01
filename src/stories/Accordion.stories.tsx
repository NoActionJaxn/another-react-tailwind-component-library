import type { Meta, StoryObj } from '@storybook/react-vite';

import { Accordion } from '../';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Array of accordion items containing value, title, content, and optional disabled state',
      table: { disable: true },
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether only one or multiple items can be open at a time',
    },
    defaultValue: {
      description: 'The value(s) of the item(s) to be open by default',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allows closing the open item by clicking it again',
    },
    className: {
      description: 'Additional CSS classes to apply to the accordion root',
    },
  },
  args: {
    type: 'single',
    collapsible: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    value: 'item-1',
    title: 'Is it accessible?',
    content: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    title: 'Is it styled?',
    content: 'Yes. It comes with default styles that match your theme.',
  },
  {
    value: 'item-3',
    title: 'Is it animated?',
    content: 'Yes. It uses CSS animations for smooth open/close transitions.',
  },
];

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Accordion {...args} />
    </div>
  ),
  args: {
    items: defaultItems,
  },
};

export const Multiple: Story = {
  render: (args) => (
    <div className="w-80">
      <Accordion {...args} />
    </div>
  ),
  args: {
    items: defaultItems,
    type: 'multiple',
  },
};

export const WithDefaultOpen: Story = {
  render: (args) => (
    <div className="w-80">
      <Accordion {...args} />
    </div>
  ),
  args: {
    items: defaultItems,
    defaultValue: 'item-1',
  },
};

export const WithDisabledItem: Story = {
  render: (args) => (
    <div className="w-80">
      <Accordion {...args} />
    </div>
  ),
  args: {
    items: [
      ...defaultItems.slice(0, 2),
      {
        value: 'item-3',
        title: 'Is this disabled?',
        content: 'You should not be able to see this.',
        disabled: true,
      },
    ],
    type: 'single',
    collapsible: true,
  },
};
