import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Container } from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: docsParameters("Container", { layout: "fullscreen" }),
  args: {
    size: "lg",
    colorScheme: "default",
    asChild: false,
  },
  argTypes: docsArgTypes(
    "Container",
    ["size", "colorScheme", { asChild: "layoutAsChild" }],
    {
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg", "xl", "2xl", "full"],
        table: { defaultValue: { summary: "lg" } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
      asChild: { table: { defaultValue: { summary: "false" } } },
    },
  ),
  render: (args) => (
    <div className="bg-default-100 py-6">
      <Container {...args}>
        <div className="rounded-md border border-dashed border-default-400 bg-white p-4 text-sm text-default-900">
          {m.components.Container.story.children}
        </div>
      </Container>
    </div>
  ),
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
