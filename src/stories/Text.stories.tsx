import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '../';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The text content to display',
    },
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'label'],
      description: 'The HTML element to render as',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the text with responsive scaling',
    },
    variant: {
      control: 'select',
      options: ['sans', 'serif', 'mono', 'display'],
      description: 'The font family variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    as: 'span',
    size: 'medium',
    variant: 'sans',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsParagraph: Story = {
  args: {
    as: 'p',
    children: 'This is rendered as a paragraph element. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text size="small">Small text</Text>
      <Text size="medium">Medium text</Text>
      <Text size="large">Large text</Text>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Text variant="sans">Sans variant</Text>
      <Text variant="serif">Serif variant</Text>
      <Text variant="mono">Mono variant</Text>
      <Text variant="display">Display variant</Text>
    </div>
  ),
};
