import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: 'Theme/Colors',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-5">
      <div className="size-8 bg-default-darkest"></div>
      <div className="size-8 bg-default-dark"></div>
      <div className="size-8 bg-default"></div>
      <div className="size-8 bg-default-light"></div>
      <div className="size-8 bg-default-lightest"></div>
      <div className="size-8 bg-primary-darkest"></div>
      <div className="size-8 bg-primary-dark"></div>
      <div className="size-8 bg-primary"></div>
      <div className="size-8 bg-primary-light"></div>
      <div className="size-8 bg-primary-lightest"></div>
      <div className="size-8 bg-secondary-darkest"></div>
      <div className="size-8 bg-secondary-dark"></div>
      <div className="size-8 bg-secondary"></div>
      <div className="size-8 bg-secondary-light"></div>
      <div className="size-8 bg-secondary-lightest"></div>
      <div className="size-8 bg-success-darkest"></div>
      <div className="size-8 bg-success-dark"></div>
      <div className="size-8 bg-success"></div>
      <div className="size-8 bg-success-light"></div>
      <div className="size-8 bg-success-lightest"></div>
      <div className="size-8 bg-warning-darkest"></div>
      <div className="size-8 bg-warning-dark"></div>
      <div className="size-8 bg-warning"></div>
      <div className="size-8 bg-warning-light"></div>
      <div className="size-8 bg-warning-lightest"></div>
      <div className="size-8 bg-danger-darkest"></div>
      <div className="size-8 bg-danger-dark"></div>
      <div className="size-8 bg-danger"></div>
      <div className="size-8 bg-danger-light"></div>
      <div className="size-8 bg-danger-lightest"></div>
      <div className="size-8 bg-info-darkest"></div>
      <div className="size-8 bg-info-dark"></div>
      <div className="size-8 bg-info"></div>
      <div className="size-8 bg-info-light"></div>
      <div className="size-8 bg-info-lightest"></div>
    </div>
  )
};
