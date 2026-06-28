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
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const,
    },
    size: {
      control: { type: 'select' },
      options: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const,
    },
  },
  args: {
    as: 'h1',
    children: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.'
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Typography.Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Title: Story = {}

export const FontSizes: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className='grid grid-cols-1'>
      <Typography.Title size='2xs' {...props} />
      <Typography.Title size='xs' {...props} />
      <Typography.Title size='sm' {...props} />
      <Typography.Title size='md' {...props} />
      <Typography.Title size='lg' {...props} />
      <Typography.Title size='xl' {...props} />
      <Typography.Title size='2xl' {...props} />
    </div>
  )
}

export const FontWeights: Story = {
  args: {},
  render: ({ ...props }) => (
    <div className='grid grid-cols-1'>
      <Typography.Title className='font-light' {...props} />
      <Typography.Title className='font-normal' {...props} />
      <Typography.Title className='font-semibold' {...props} />
      <Typography.Title className='font-bold' {...props} />
    </div>
  )
};
