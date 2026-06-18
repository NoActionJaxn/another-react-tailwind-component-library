import type { Meta, StoryObj } from '@storybook/react-vite';

import Typography from '../components/Typography';

const meta = {
  title: 'Typography/Title',
  component: Typography.Title,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['default', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const,
    },
    size: {
      control: { type: 'select' },
      options: ['extra-small', 'small', 'medium', 'large', 'extra-large'] as const,
    },
  },
  args: {
    as: 'default',
    size: 'medium',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography.Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Title: Story = {
  render: ({ ...props }) => <Typography.Title as="h1" {...props}>This is a Title</Typography.Title>
};