import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    defaultValue: "account",
    orientation: "horizontal",
    colorScheme: "default",
  },
  argTypes: {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: (args) => (
    <Tabs {...args} className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Manage your account.</TabsContent>
      <TabsContent value="password">Change your password.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
