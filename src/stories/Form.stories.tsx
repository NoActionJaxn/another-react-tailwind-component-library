import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import {
  Form as FormComponent,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "../components/Form";
import Button from "../components/Button";

const meta = {
  title: "Components/Form",
  component: FormComponent,
  parameters: {
    docs: {
      description: {
        component: `A thin, styled wrapper around Radix UI's Form primitive (\`@radix-ui/react-form\`) - \`Form\`, \`FormField\`, \`FormLabel\`, \`FormControl\`, and \`FormMessage\` map directly onto Radix's \`Form.Root\`/\`Field\`/\`Label\`/\`Control\`/\`Message\`. Compose a form by hand from these building blocks plus your own controls (a plain \`<input>\`, or one of this library's own components via \`FormControl asChild\`) and \`Button type="submit"\` - there's no field-schema system or bundled validation library here, just Radix's native browser constraint validation (\`required\`, \`type\`, \`pattern\`, etc.) surfaced through \`FormMessage\`'s built-in \`match\` matchers.

**States & classes** (see \`styles/components/form.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-form\` | root \`<form>\`, always | layout |
| \`.another-form-field\` | a \`FormField\`, always | layout |
| \`.another-form-label\` | a \`FormLabel\`, always | text color, weight |
| \`.another-form-control\` | a \`FormControl\` rendering its default \`<input>\`, always | border, background, focus ring |
| \`.another-form-message\` | a \`FormMessage\`, when shown | text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    onSubmit: {
      control: false,
      description: "Called when the form passes native browser validation.",
    },
  },
  args: {
    onSubmit: fn((event) => event.preventDefault()),
  },
} satisfies Meta<typeof FormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Form: Story = {
  render: (args) => (
    <FormComponent
      {...args}
      className="w-xs"
      onSubmit={(event) => {
        event.preventDefault();
        args.onSubmit?.(event);
      }}
    >
      <FormField name="email">
        <FormLabel>Email</FormLabel>
        <FormControl type="email" required placeholder="ada@example.com" />
        <FormMessage match="valueMissing">Email is required</FormMessage>
        <FormMessage match="typeMismatch">
          Please enter a valid email
        </FormMessage>
      </FormField>
      <Button type="submit">Submit</Button>
    </FormComponent>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Submit" });

    await userEvent.click(submit);
    await waitFor(() =>
      expect(canvas.getByText("Email is required")).toBeInTheDocument(),
    );
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.type(canvas.getByLabelText("Email"), "not-an-email");
    await userEvent.click(submit);
    await waitFor(() =>
      expect(
        canvas.getByText("Please enter a valid email"),
      ).toBeInTheDocument(),
    );
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.clear(canvas.getByLabelText("Email"));
    await userEvent.type(canvas.getByLabelText("Email"), "ada@example.com");
    await userEvent.click(submit);

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalledTimes(1));
    await expect(
      canvas.queryByText("Email is required"),
    ).not.toBeInTheDocument();
  },
};
