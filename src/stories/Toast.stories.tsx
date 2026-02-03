import type { Meta, StoryObj } from "@storybook/react";
import Toast from "../components/Toast";
import { useToast } from "../components/ToastProvider";
import Button from "../components/Button";

const meta: Meta<typeof Toast> = {
  title: "Components/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

const ToastDemo = ({
  variant,
  title,
  description,
  withAction,
}: {
  variant?: "default" | "primary" | "secondary" | "warning" | "danger" | "success";
  title?: string;
  description?: string;
  withAction?: boolean;
}) => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: title || "Toast notification",
      description: description,
      variant: variant || "default",
      action: withAction
        ? { label: "Undo", onClick: () => console.log("Undo clicked") }
        : undefined,
    });
  };

  return (
    <Button onClick={handleClick} variant={variant === "secondary" ? "secondary" : variant || "default"}>
      Show {variant || "default"} toast
    </Button>
  );
};

export const Default: Story = {
  render: () => <ToastDemo title="Default toast" description="This is a default toast notification." />,
};

export const Primary: Story = {
  render: () => (
    <ToastDemo
      variant="primary"
      title="Primary toast"
      description="This is a primary toast notification."
    />
  ),
};

export const Secondary: Story = {
  render: () => (
    <ToastDemo
      variant="secondary"
      title="Secondary toast"
      description="This is a secondary toast notification."
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastDemo
      variant="warning"
      title="Warning toast"
      description="This is a warning toast notification."
    />
  ),
};

export const Danger: Story = {
  render: () => (
    <ToastDemo
      variant="danger"
      title="Danger toast"
      description="Something went wrong!"
    />
  ),
};

export const Success: Story = {
  render: () => (
    <ToastDemo
      variant="success"
      title="Success toast"
      description="Operation completed successfully."
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastDemo
      variant="default"
      title="Item deleted"
      description="The item has been removed from your list."
      withAction
    />
  ),
};

export const AllVariants: Story = {
  render: () => {
    const { toast } = useToast();

    const showAllToasts = () => {
      const variants = ["default", "primary", "secondary", "warning", "danger", "success"] as const;
      variants.forEach((variant, index) => {
        setTimeout(() => {
          toast({
            title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} toast`,
            description: `This is a ${variant} toast notification.`,
            variant,
          });
        }, index * 200);
      });
    };

    return (
      <Button onClick={showAllToasts} variant="primary">
        Show all variants
      </Button>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-600 mb-2">
          Toast position is configured in the ThemeProvider. Click to show a toast at the current position.
        </p>
        <Button
          onClick={() =>
            toast({
              title: "Position demo",
              description: "This toast appears at the configured position.",
              variant: "primary",
            })
          }
        >
          Show toast
        </Button>
      </div>
    );
  },
};

export const LongDuration: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() =>
          toast({
            title: "Long duration toast",
            description: "This toast will stay for 10 seconds.",
            variant: "primary",
            duration: 10000,
          })
        }
      >
        Show long toast (10s)
      </Button>
    );
  },
};

export const Persistent: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() =>
          toast({
            title: "Persistent toast",
            description: "This toast won't auto-dismiss. Click the X to close it.",
            variant: "warning",
            duration: 0,
          })
        }
        variant="warning"
      >
        Show persistent toast
      </Button>
    );
  },
};
