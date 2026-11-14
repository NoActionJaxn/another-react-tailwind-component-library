import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar";
import { AvatarGroup } from "./AvatarGroup";

const text = m.components.AvatarGroup.story;

// Inline portrait-style images so the story needs no network.
const portrait = (bg: string, skin: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="${bg}"/><circle cx="20" cy="16" r="7" fill="${skin}"/><path d="M6 40 C8 28 32 28 34 40 Z" fill="${skin}"/></svg>`,
  )}`;

const people = [
  {
    name: text.people[0]!,
    initials: "AL",
    src: portrait("#bae6fd", "#a16207"),
  },
  {
    name: text.people[1]!,
    initials: "GH",
    src: portrait("#fecaca", "#fcd9b6"),
  },
  { name: text.people[2]!, initials: "KJ" },
  {
    name: text.people[3]!,
    initials: "ML",
    src: portrait("#bbf7d0", "#7c4a2d"),
  },
  { name: text.people[4]!, initials: "RF" },
  {
    name: text.people[5]!,
    initials: "TB",
    src: portrait("#e9d5ff", "#f1c27d"),
  },
  { name: text.people[6]!, initials: "DK" },
];

const meta = {
  title: "Data Display/AvatarGroup",
  component: AvatarGroup,
  parameters: docsParameters("AvatarGroup", { layout: "centered" }),
  args: {
    size: "md",
    max: 5,
    colorScheme: "default",
    "aria-label": text.label,
  },
  argTypes: docsArgTypes(
    "AvatarGroup",
    ["size", "colorScheme", { "aria-label": "ariaLabel" }],
    {
      size: {
        control: "inline-radio",
        options: ["sm", "md", "lg"],
        table: { defaultValue: { summary: "md" } },
      },
      max: { control: { type: "number", min: 1, max: 8 } },
      total: { control: { type: "number", min: 0 } },
      overflowLabel: {
        control: false,
        table: { defaultValue: { summary: text.overflowLabelDefault } },
      },
      role: { control: false, table: { defaultValue: { summary: "group" } } },
      colorScheme: {
        // "brand" is defined in playground/playground.css
        control: "inline-radio",
        options: ["default", "brand"],
        table: { defaultValue: { summary: m.common.defaults.inherited } },
      },
    },
  ),
  render: (args) => (
    <AvatarGroup {...args}>
      {people.map((person) => (
        <Avatar key={person.name}>
          {person.src && <AvatarImage src={person.src} alt={person.name} />}
          <AvatarFallback aria-label={person.name}>
            {person.initials}
          </AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: text.label });
    // max 5: four avatars, then "+3" for the other three.
    await expect(group.children).toHaveLength(5);
    await expect(canvas.getByRole("img", { name: "3 more" })).toHaveTextContent(
      "+3",
    );
    // Avatars take the group's size.
    for (const avatar of group.children) {
      await expect(avatar).toHaveAttribute("data-size", "md");
    }
  },
};

export const NoMax: Story = {
  tags: ["!dev"],
  args: { max: undefined, size: "lg" },
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: text.label });
    await expect(group.children).toHaveLength(people.length);
    await expect(
      group.querySelector("[data-avatar-group-overflow]"),
    ).toBeNull();
    for (const avatar of group.children) {
      await expect(avatar).toHaveAttribute("data-size", "lg");
    }
  },
};

// total counts people whose avatars weren't passed.
export const Total: Story = {
  tags: ["!dev"],
  args: {
    max: undefined,
    total: 40,
    overflowLabel: (count) => `+${count} people`,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: `+${40 - people.length} people` }),
    ).toHaveTextContent(`+${40 - people.length}`);
  },
};

// At least one avatar shows next to the "+N".
export const MaxOne: Story = {
  tags: ["!dev"],
  args: { max: 1 },
  play: async ({ canvas }) => {
    const group = canvas.getByRole("group", { name: text.label });
    await expect(group.children).toHaveLength(2);
    await expect(
      canvas.getByRole("img", { name: `${people.length - 1} more` }),
    ).toBeVisible();
  },
};
