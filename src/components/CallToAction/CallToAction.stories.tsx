import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  CallToAction,
  CallToActionActions,
  CallToActionContent,
  CallToActionDescription,
  CallToActionTitle,
} from "./CallToAction";

const text = m.components.CallToAction.story;

const meta = {
  title: "Blocks/CallToAction",
  component: CallToAction,
  parameters: docsParameters("CallToAction", { layout: "fullscreen" }),
  args: {
    variant: "soft",
    layout: "centered",
    fullBleed: false,
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("CallToAction", ["variant", "colorScheme", "block"], {
    variant: {
      control: "inline-radio",
      options: ["soft", "solid", "outline", "ghost"],
      table: { defaultValue: { summary: "soft" } },
    },
    layout: {
      control: "inline-radio",
      options: ["centered", "split"],
      table: { defaultValue: { summary: "centered" } },
    },
    fullBleed: { table: { defaultValue: { summary: "false" } } },
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <CallToAction {...args}>
      <CallToActionContent>
        <CallToActionTitle>{text.title}</CallToActionTitle>
        <CallToActionDescription>{text.description}</CallToActionDescription>
      </CallToActionContent>
      <CallToActionActions>
        {/* On the dark solid background, light buttons keep their contrast. */}
        <Button variant={args.variant === "solid" ? "soft" : "solid"}>
          {text.primary}
        </Button>
        <Button
          variant={args.variant === "solid" ? "ghost" : "outline"}
          className={
            args.variant === "solid"
              ? "text-white hover:text-stone-900"
              : undefined
          }
        >
          {text.secondary}
        </Button>
      </CallToActionActions>
    </CallToAction>
  ),
} satisfies Meta<typeof CallToAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: text.title }),
    ).toBeVisible();
    await expect(canvas.getAllByRole("button")).toHaveLength(2);
    await expect(canvas.getByText(text.description).tagName).toBe("P");
  },
};

export const TitleAsChild: Story = {
  tags: ["!dev"],
  render: (args) => (
    <CallToAction {...args}>
      <CallToActionContent>
        <CallToActionTitle asChild>
          <h3>{text.title}</h3>
        </CallToActionTitle>
      </CallToActionContent>
    </CallToAction>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: text.title }),
    ).toHaveAttribute("data-call-to-action-title");
  },
};
