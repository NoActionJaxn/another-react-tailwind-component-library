import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";
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

const text = m.components.Tabs.story;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const account = canvas.getByRole("tab", { name: text.account });
    const password = canvas.getByRole("tab", { name: text.password });
    const billing = canvas.getByRole("tab", { name: text.billing });
    await expect(account).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      text.accountContent,
    );
    await expect(billing).toBeDisabled();

    await userEvent.click(password);
    await expect(password).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent(
      text.passwordContent,
    );
    await expect(canvas.queryByText(text.accountContent)).toBeNull();

    // Arrow keys skip the disabled tab and wrap around.
    await userEvent.keyboard("{ArrowRight}");
    await expect(account).toHaveFocus();
    await expect(account).toHaveAttribute("aria-selected", "true");
    await userEvent.keyboard("{ArrowLeft}");
    await expect(password).toHaveAttribute("aria-selected", "true");
  },
};

export const ValueChange: Story = {
  tags: ["!dev"],
  args: { onValueChange: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("tab", { name: text.password }));
    await expect(args.onValueChange).toHaveBeenCalledWith("password");
    await userEvent.click(canvas.getByRole("tab", { name: text.billing }));
    await expect(args.onValueChange).toHaveBeenCalledTimes(1);
  },
};
