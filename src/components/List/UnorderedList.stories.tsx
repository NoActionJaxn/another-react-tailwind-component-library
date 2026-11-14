import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ArrowRightIcon,
  CheckIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { ListItem, UnorderedList } from "./List";

const text = m.components.UnorderedList.story;

const icons: Record<string, ReactNode> = {
  none: undefined,
  check: <CheckIcon />,
  arrow: <ArrowRightIcon />,
  star: <StarFilledIcon />,
};

const meta = {
  title: "Typography/UnorderedList",
  component: UnorderedList,
  parameters: docsParameters("UnorderedList", { layout: "centered" }),
  args: {
    marker: "disc",
    icon: "none",
    size: "md",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("UnorderedList", ["size", "colorScheme"], {
    marker: {
      control: "inline-radio",
      options: ["disc", "circle", "square", "none"],
      table: { defaultValue: { summary: "disc" } },
    },
    icon: {
      control: { type: "select", labels: text.icons },
      options: Object.keys(icons),
      mapping: icons,
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
  }),
  render: (args) => (
    <UnorderedList {...args} className="max-w-sm">
      {text.items.map((item, index) => (
        <ListItem key={item}>
          {item}
          {index === 1 && (
            <UnorderedList marker="circle">
              {text.nested.map((nested) => (
                <ListItem key={nested}>{nested}</ListItem>
              ))}
            </UnorderedList>
          )}
        </ListItem>
      ))}
    </UnorderedList>
  ),
} satisfies Meta<typeof UnorderedList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const [outer] = canvas.getAllByRole("list");
    await expect(outer!.children).toHaveLength(text.items.length);
    await expect(canvas.getAllByRole("listitem")).toHaveLength(
      text.items.length + text.nested.length,
    );
  },
};
