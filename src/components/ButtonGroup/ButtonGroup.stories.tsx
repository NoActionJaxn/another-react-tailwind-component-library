import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import { ButtonGroup } from "./ButtonGroup";

const text = m.components.ButtonGroup.story;

const meta = {
  title: "Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: docsParameters("ButtonGroup", { layout: "centered" }),
  args: {
    orientation: "horizontal",
    variant: "outline",
    size: "md",
    colorScheme: "default",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "ButtonGroup",
    [
      "variant",
      "size",
      "colorScheme",
      "orientation",
      { "aria-label": "ariaLabel" },
    ],
    {
      orientation: {
        control: "inline-radio",
        options: ["horizontal", "vertical"],
        table: { defaultValue: { summary: "horizontal" } },
      },
      variant: {
        control: "inline-radio",
        options: ["solid", "soft", "outline", "ghost"],
        table: { defaultValue: { summary: "solid" } },
      },
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg"],
        table: { defaultValue: { summary: "md" } },
      },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <ButtonGroup {...args}>
      {text.buttons.map((label) => (
        <Button key={label}>{label}</Button>
      ))}
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
