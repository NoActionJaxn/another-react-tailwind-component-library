import type { Meta, StoryObj } from "@storybook/react-vite";
import { docsArgTypes, docsParameters, m } from "../../docs/i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: docsParameters("Tabs", { layout: "centered" }),
  args: {
    defaultValue: "account",
    orientation: "horizontal",
    colorScheme: "default",
  },
  argTypes: docsArgTypes("Tabs", ["orientation", "colorScheme"], {
    colorScheme: {
      // "brand" is defined in playground/playground.css
      control: "inline-radio",
      options: ["default", "brand"],
    },
    orientation: {
      table: { defaultValue: { summary: "horizontal" } },
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  }),
  render: (args) => (
    <Tabs {...args} className="w-80">
      <TabsList>
        <TabsTrigger value="account">
          {m.components.Tabs.story.account}
        </TabsTrigger>
        <TabsTrigger value="password">
          {m.components.Tabs.story.password}
        </TabsTrigger>
        <TabsTrigger value="billing" disabled>
          {m.components.Tabs.story.billing}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        {m.components.Tabs.story.accountContent}
      </TabsContent>
      <TabsContent value="password">
        {m.components.Tabs.story.passwordContent}
      </TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
