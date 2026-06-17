import type { Meta, StoryObj } from '@storybook/react-vite';

import Typography from '../components/Typography';

const meta = {
  title: 'Example/Typography/Text',
  component: Typography.Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'i', 'u', 'strong', 'code'] as const,
    },
    size: {
      control: { type: 'select' },
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const,
    },
  },
  args: {
    as: 'span',
    size: 'medium',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography.Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  render: ({ ...props }) => <Typography.Text as="span" {...props}>This is a Text</Typography.Text>
};