import type { Meta, StoryObj } from '@storybook/react-vite';

import { Heading } from '../';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The heading content to display',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'The semantic heading level (h1-h6)',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xl', '2xl'],
      description: 'The visual size of the heading with responsive scaling',
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
    children: 'Heading Text',
    level: 1,
    size: 'medium',
    variant: 'display',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading size="small">Small heading</Heading>
      <Heading size="medium">Medium heading</Heading>
      <Heading size="large">Large heading</Heading>
      <Heading size="xl">Extra large heading</Heading>
      <Heading size="2xl">2XL heading</Heading>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Heading variant="sans">Sans variant</Heading>
      <Heading variant="serif">Serif variant</Heading>
      <Heading variant="mono">Mono variant</Heading>
      <Heading variant="display">Display variant</Heading>
    </div>
  ),
};
