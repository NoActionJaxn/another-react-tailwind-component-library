import type { Meta, StoryObj } from '@storybook/react-vite';

import Typography from '../components/Typography';

const meta = {
  title: 'Typography/Monospace',
  component: Typography.Monospace,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['span', 'p', 'i', 'u', 'b', 'strong'] as const,
    },
    size: {
      control: { type: 'select' },
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const,
    },
  },
  args: {
    as: 'code',
    children: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography.Monospace>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Monospace: Story = {}

export const FontSizes: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className='grid grid-cols-1'>
      <Typography.Monospace size='2xs' {...props} />
      <Typography.Monospace size='xs' {...props} />
      <Typography.Monospace size='sm' {...props} />
      <Typography.Monospace size='md' {...props} />
      <Typography.Monospace size='lg' {...props} />
      <Typography.Monospace size='xl' {...props} />
      <Typography.Monospace size='2xl' {...props} />
    </div>
  )
}
export const FontWeights: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className='grid grid-cols-1'>
      <Typography.Monospace className='font-normal' {...props} />
      <Typography.Monospace className='font-bold' {...props} />
    </div>
  )
};
