import type { Meta, StoryObj } from '@storybook/react-vite';

import { Avatar } from '../';

const URL = 'https://picsum.photos/200';  

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'The image source URL',
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image, also used to generate fallback initials',
    },
    fallback: {
      control: 'text',
      description: 'Custom fallback text (overrides auto-generated initials)',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium', 'large', 'x-large', '2x-large'],
      description: 'The size of the avatar',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
  args: {
    src: URL,
    alt: 'Jane Doe',
    size: 'medium',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithFallback: Story = {
  args: {
    src: undefined,
    alt: 'John Smith',
  },
};

export const CustomFallback: Story = {
  args: {
    src: undefined,
    fallback: 'JS',
  },
};

export const BrokenImage: Story = {
  args: {
    src: 'https://broken-link.com/image.jpg',
    alt: 'Broken Image',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="x-small" src={URL} alt="User" />
      <Avatar size="small" src={URL} alt="User" />
      <Avatar size="medium" src={URL} alt="User" />
      <Avatar size="large" src={URL} alt="User" />
      <Avatar size="x-large" src={URL} alt="User" />
    </div>
  ),
};

export const AllSizesFallback: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="x-small" alt="John Doe" />
      <Avatar size="small" alt="John Doe" />
      <Avatar size="medium" alt="John Doe" />
      <Avatar size="large" alt="John Doe" />
      <Avatar size="x-large" alt="John Doe" />
    </div>
  ),
};
