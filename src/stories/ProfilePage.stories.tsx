import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import ProfilePageComponent from "../components/ProfilePage";
import Avatar from "../components/Avatar";
import Button from "../components/Button.tsx";

const meta = {
  title: "Pages/ProfilePage",
  component: ProfilePageComponent,
  parameters: {
    docs: {
      description: {
        component: `A full user profile page layout built on the Container component, using @container queries so the header switches from a stacked, centered layout to a horizontal one as the container widens.

**States & classes** (see \`styles/components/profile-page.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-profile-page[data-variant="default"]\` | \`variant="default"\` | text color |
| \`.another-profile-page-cover\` | cover image wrapper, always | background |
| \`.another-profile-page-avatar\` | avatar slot wrapper, always | ring color |
| \`.another-profile-page-role\` | role text, always | text color |
| \`.another-profile-page-meta\` | meta row, always | top border, text color |
| \`.another-profile-page-bio\` | bio text, always | text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the profile page styling.",
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
    bio: "Building component libraries and sweating the details. Previously worked on design systems for a handful of startups, always chasing the smallest reasonable API surface.",
  },
} satisfies Meta<typeof ProfilePageComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

const meta_ = (
  <>
    <span>
      <strong>128</strong> Following
    </span>
    <span>
      <strong>4.2k</strong> Followers
    </span>
    <span>San Francisco, CA</span>
  </>
);

export const ProfilePage: Story = {
  render: (args) => (
    <div className="mx-auto w-full max-w-3xl resize-x overflow-auto border-2 border-dashed border-default-400">
      <ProfilePageComponent
        {...args}
        cover={<div className="h-full w-full bg-default-300" />}
        avatar={<Avatar size="2xl" fallback="JH" />}
        meta={meta_}
        footer={
          <>
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </>
        }
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.getByRole("heading", { name: "Jackson Hermitt" }),
    ).toBeInTheDocument();
    expect(canvas.getByText("Product Engineer")).toBeInTheDocument();
    expect(canvas.getByText("San Francisco, CA")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Follow" })).toBeInTheDocument();
  },
};
