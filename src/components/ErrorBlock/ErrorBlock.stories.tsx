import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Button } from "../Button";
import {
  ErrorBlock,
  ErrorBlockActions,
  ErrorBlockCode,
  ErrorBlockDescription,
  ErrorBlockMessage,
} from "./ErrorBlock";

const text = m.components.ErrorBlock.story;

const meta = {
  title: "Blocks/ErrorBlock",
  component: ErrorBlock,
  parameters: docsParameters("ErrorBlock", { layout: "fullscreen" }),
  args: {
    variant: "ghost",
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("ErrorBlock", ["variant", "colorScheme", "block"], {
    variant: {
      control: "inline-radio",
      options: ["ghost", "soft"],
      table: { defaultValue: { summary: "ghost" } },
    },
    block: { table: { defaultValue: { summary: "false" } } },
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
      table: { defaultValue: { summary: m.common.defaults.inherited } },
    },
  }),
  render: (args) => (
    <ErrorBlock {...args}>
      <ErrorBlockCode>404</ErrorBlockCode>
      <ErrorBlockMessage>{text.message}</ErrorBlockMessage>
      <ErrorBlockDescription>{text.description}</ErrorBlockDescription>
      <ErrorBlockActions>
        <Button>
          <ArrowLeftIcon aria-hidden />
          {text.primary}
        </Button>
        <Button variant="outline">{text.secondary}</Button>
      </ErrorBlockActions>
    </ErrorBlock>
  ),
} satisfies Meta<typeof ErrorBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 1, name: text.message }),
    ).toBeVisible();
    await expect(canvas.getByText("404")).toBeVisible();
    await expect(canvas.getByText(text.description)).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: text.primary }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: text.secondary }),
    ).toBeVisible();
  },
};

export const MessageAsChild: Story = {
  tags: ["!dev"],
  render: (args) => (
    <ErrorBlock {...args}>
      <ErrorBlockMessage asChild>
        <h2>{text.message}</h2>
      </ErrorBlockMessage>
    </ErrorBlock>
  ),
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 2, name: text.message }),
    ).toHaveAttribute("data-error-block-message");
  },
};
