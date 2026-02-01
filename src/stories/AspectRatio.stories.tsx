import type { Meta, StoryObj } from '@storybook/react-vite';

import { AspectRatio } from '../';

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'The content to display within the aspect ratio container',
      table: { disable: true },
    },
    ratio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '21/9', '3/2', '2/3', '9/16'],
      mapping: {
        '1/1': 1,
        '4/3': 4/3,
        '16/9': 16/9,
        '21/9': 21/9,
        '3/2': 3/2,
        '2/3': 2/3,
        '9/16': 9/16,
      },
      description: 'The aspect ratio as width divided by height (e.g., 16/9 for widescreen)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply',
    },
  },
  args: {
    ratio: 16/9,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PlaceholderImage = () => (
  <img
    src="https://picsum.photos/600"
    alt="Landscape"
    className="h-full w-full object-cover"
  />
);

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <PlaceholderImage />
      </AspectRatio>
    </div>
  ),
};

export const Square: Story = {
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <PlaceholderImage />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 1,
  },
};


export const Portrait: Story = {
  render: (args) => (
    <div className="w-40">
      <AspectRatio {...args}>
        <PlaceholderImage />
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 9/16,
  },
};

export const WithContent: Story = {
  render: (args) => (
    <div className="w-80">
      <AspectRatio {...args}>
        <div className="flex h-full w-full items-center justify-center text-light bg-dark">
          Custom content here
        </div>
      </AspectRatio>
    </div>
  ),
  args: {
    ratio: 16/9,
  },
};

export const MixedRatios: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-4">
      <div className="w-32">
        <p className="mb-2 text-sm">1:1</p>
        <AspectRatio ratio={1}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-32">
        <p className="mb-2 text-sm">4:3</p>
        <AspectRatio ratio={4/3}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-32">
        <p className="mb-2 text-sm">16:9</p>
        <AspectRatio ratio={16/9}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-32">
        <p className="mb-2 text-sm">21:9</p>
        <AspectRatio ratio={21/9}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-32">
        <p className="mb-2 text-sm">3:2</p>
        <AspectRatio ratio={3/2}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-20">
        <p className="mb-2 text-sm">2:3</p>
        <AspectRatio ratio={2/3}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
      <div className="w-20">
        <p className="mb-2 text-sm">9:16</p>
        <AspectRatio ratio={9/16}>
          <PlaceholderImage />
        </AspectRatio>
      </div>
    </div>
  ),
};
