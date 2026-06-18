import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "../components/Typography";

const meta = {
  title: 'Theme/Fonts',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Fonts: Story = {
  render: () => (
    <div className="space-y-4">
        <Typography.Text as="p" className="font-sans">Sans - Inter</Typography.Text>
        <Typography.Text as="p" className="font-serif">Serif - Source Serif 4</Typography.Text>
        <Typography.Text as="p" className="font-mono">Mono - JetBrains Mono</Typography.Text>
    </div>
  )
};
