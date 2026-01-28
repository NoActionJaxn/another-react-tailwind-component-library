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
    items: { table: { disable: true } },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    collapsible: { control: 'boolean' },
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
    type: 'single',
    collapsible: true,
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
    type: 'single',
    defaultValue: 'item-1',
    collapsible: true,
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
