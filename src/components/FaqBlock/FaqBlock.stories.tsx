import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Anchor } from "../Anchor";
import {
  FaqBlock,
  FaqBlockDescription,
  FaqBlockFooter,
  FaqBlockHeader,
  FaqBlockItem,
  FaqBlockList,
  FaqBlockTitle,
} from "./FaqBlock";

const text = m.components.FaqBlock.story;

const meta = {
  title: "Blocks/FaqBlock",
  component: FaqBlock,
  parameters: docsParameters("FaqBlock", { layout: "fullscreen" }),
  args: {
    variant: "ghost",
    layout: "stacked",
    block: false,
    colorScheme: "default",
  },
  argTypes: docsArgTypes("FaqBlock", ["variant", "colorScheme", "block"], {
    variant: {
      control: "inline-radio",
      options: ["ghost", "soft"],
      table: { defaultValue: { summary: "ghost" } },
    },
    layout: {
      control: "inline-radio",
      options: ["stacked", "split"],
      table: { defaultValue: { summary: "stacked" } },
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
    <FaqBlock {...args}>
      <FaqBlockHeader>
        <FaqBlockTitle>{text.title}</FaqBlockTitle>
        <FaqBlockDescription>{text.description}</FaqBlockDescription>
      </FaqBlockHeader>
      <FaqBlockList>
        {text.items.map((item) => (
          <FaqBlockItem key={item.question} question={item.question}>
            {item.answer}
          </FaqBlockItem>
        ))}
      </FaqBlockList>
      <FaqBlockFooter>
        {text.footer} <Anchor href="#">{text.contact}</Anchor>
      </FaqBlockFooter>
    </FaqBlock>
  ),
} satisfies Meta<typeof FaqBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const [first, second] = text.items;
    const q1 = canvas.getByRole("button", { name: first!.question });
    const q2 = canvas.getByRole("button", { name: second!.question });
    await expect(q1).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(q1);
    await expect(q1).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(first!.answer)).toBeVisible();
    // One answer at a time: opening the second closes the first.
    await userEvent.click(q2);
    await expect(q2).toHaveAttribute("aria-expanded", "true");
    await expect(q1).toHaveAttribute("aria-expanded", "false");
  },
};
