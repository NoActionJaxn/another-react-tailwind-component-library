import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import ProfileCardComponent from "../components/ProfileCard";
import Avatar from "../components/Avatar";
import Button from "../components/Button.tsx";

const meta = {
  title: "Cards/ProfileCard",
  component: ProfileCardComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `A card with cover, avatar, name, role, bio, meta, and footer slots, well suited to a user profile.

**States & classes** (see \`styles/components/profile-card.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-profile-card\` | root element, always | border, shadow, transition |
| \`.another-profile-card[data-variant="default"]\` | \`variant="default"\` | background, border, text color |
| \`.another-profile-card-cover\` | cover image wrapper, always | background |
| \`.another-profile-card-avatar\` | avatar slot wrapper, always | ring color |
| \`.another-profile-card-role\` | role text, always | text color |
| \`.another-profile-card-bio\` | bio text, always | text color |
| \`.another-profile-card-meta\` | meta row, always | text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the card styling.",
    },
    name: {
      control: "text",
      description: "The person's name.",
    },
    role: {
      control: "text",
      description: "The person's role or title.",
    },
    bio: {
      control: "text",
      description: "A short bio.",
    },
  },
  args: {
    variant: "default",
    name: "Jackson Hermitt",
    role: "Product Engineer",
    bio: "Building component libraries and sweating the details.",
  },
} satisfies Meta<typeof ProfileCardComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ProfileCard: Story = {
  render: (args) => (
    <div className="w-72">
      <ProfileCardComponent
        {...args}
        cover={<div className="h-full w-full bg-default-300" />}
        avatar={<Avatar size="xl" fallback="JH" />}
        meta={
          <>
            <span>
              <strong>128</strong> Following
            </span>
            <span>
              <strong>4.2k</strong> Followers
            </span>
          </>
        }
        footer={<Button block>Follow</Button>}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", { name: "Jackson Hermitt" }),
    ).toBeInTheDocument();
    expect(canvas.getByText("Product Engineer")).toBeInTheDocument();
    expect(
      canvas.getByText(
        "Building component libraries and sweating the details.",
      ),
    ).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Follow" })).toBeInTheDocument();
  },
};
