import type { Meta, StoryObj } from "@storybook/react";
import Card from "../components/Card";
import Button from "../components/Button";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      alt: "Mountain landscape",
    },
    title: "Mountain Adventure",
    description: "Explore the breathtaking views of the Alpine mountains with our guided tours.",
  },
};

export const WithActions: Story = {
  args: {
    image: {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      alt: "Mountain landscape",
    },
    title: "Mountain Adventure",
    description: "Explore the breathtaking views of the Alpine mountains with our guided tours.",
    actions: (
      <>
        <Button variant="primary" size="small">Book Now</Button>
        <Button variant="ghost" size="small">Learn More</Button>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: "bordered",
    image: {
      src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
      alt: "Ocean view",
    },
    title: "Beach Getaway",
    description: "Relax on pristine beaches and enjoy the crystal-clear waters.",
    actions: (
      <Button variant="primary" size="small">View Details</Button>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    image: {
      src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      alt: "Lake view",
    },
    title: "Lake Retreat",
    description: "Experience tranquility at our lakeside cabins surrounded by nature.",
    actions: (
      <>
        <Button variant="success" size="small">Reserve</Button>
        <Button variant="secondary" size="small">Gallery</Button>
      </>
    ),
  },
};

export const CustomAspectRatio: Story = {
  args: {
    image: {
      src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
      alt: "Night sky",
      ratio: 4 / 3,
    },
    title: "Stargazing Experience",
    description: "Witness the cosmos like never before with our night sky tours.",
    actions: (
      <Button variant="primary" size="small">Join Tour</Button>
    ),
  },
};

export const SquareImage: Story = {
  args: {
    image: {
      src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
      alt: "Foggy forest",
      ratio: 1,
    },
    title: "Forest Walk",
    description: "Immerse yourself in the serene beauty of ancient forests.",
  },
};

export const AsLink: Story = {
  render: () => (
    <Card
      asChild
      image={{
        src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        alt: "Mountain peak",
      }}
      title="Clickable Card"
      description="This entire card is a clickable link. Try hovering over it!"
    >
      <a href="#" className="block hover:opacity-90 transition-opacity">
        <Card.Image
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
          alt="Mountain peak"
        />
        <Card.Content>
          <Card.Title>Clickable Card</Card.Title>
          <Card.Description>
            This entire card is a clickable link. Try hovering over it!
          </Card.Description>
        </Card.Content>
      </a>
    </Card>
  ),
};

export const ComposableCard: Story = {
  render: () => (
    <Card>
      <Card.Image
        src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800"
        alt="Himalayas"
        ratio={21 / 9}
      />
      <Card.Content>
        <Card.Title>Composable Card</Card.Title>
        <Card.Description>
          Use the sub-components for full control over the card layout and content.
        </Card.Description>
        <Card.Actions>
          <Button variant="primary" size="small">Primary</Button>
          <Button variant="danger" size="small">Danger</Button>
          <Button variant="ghost" size="small">Ghost</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  ),
};

export const NoImage: Story = {
  render: () => (
    <Card variant="bordered">
      <Card.Content>
        <Card.Title>Text Only Card</Card.Title>
        <Card.Description>
          Cards can also be used without images for simple content blocks or notices.
        </Card.Description>
        <Card.Actions>
          <Button variant="secondary" size="small">Action</Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  ),
};

export const CardGrid: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-4xl">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        image={{
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          alt: "Mountains",
        }}
        title="Mountains"
        description="Explore alpine peaks"
        actions={<Button variant="primary" size="small">Explore</Button>}
      />
      <Card
        image={{
          src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800",
          alt: "Ocean",
        }}
        title="Ocean"
        description="Discover marine life"
        actions={<Button variant="primary" size="small">Explore</Button>}
      />
      <Card
        image={{
          src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
          alt: "Forest",
        }}
        title="Forest"
        description="Wander through woods"
        actions={<Button variant="primary" size="small">Explore</Button>}
      />
    </div>
  ),
};
