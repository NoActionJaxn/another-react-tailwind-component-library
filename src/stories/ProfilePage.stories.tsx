import type { Meta, StoryObj } from "@storybook/react-vite";

import ProfilePageComponent from "../components/ProfilePage";
import Avatar from "../components/Avatar";
import Button from "../components/Button.tsx";

const meta = {
  title: "Pages/ProfilePage",
  component: ProfilePageComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A full user profile page layout built on the Container component, using @container queries so the header switches from a stacked, centered layout to a horizontal one as the container widens.",
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
};

export const Mobile: Story = {
  render: (args) => (
    <div className="w-80 border-2 border-dashed border-default-400">
      <ProfilePageComponent
        {...args}
        cover={<div className="h-full w-full bg-default-300" />}
        avatar={<Avatar size="xl" fallback="JH" />}
        meta={meta_}
        footer={
          <>
            <Button block>Follow</Button>
            <Button variant="outline" block>
              Message
            </Button>
          </>
        }
      />
    </div>
  ),
};

export const Desktop: Story = {
  render: (args) => (
    <div className="w-full max-w-4xl border-2 border-dashed border-default-400">
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
};
