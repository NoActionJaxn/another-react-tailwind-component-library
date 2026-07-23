import { useForm } from "react-hook-form";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import FormComponent, { type FormFieldConfig } from "../components/Form";

const fields: FormFieldConfig[] = [
  { name: "name", label: "Name", required: true, placeholder: "Ada Lovelace" },
  {
    name: "email",
    label: "Email",
    required: true,
    validation: "email",
    placeholder: "ada@example.com",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "How can we help?",
  },
  { name: "newsletter", label: "Subscribe to updates", type: "checkbox" },
  {
    name: "contactMethod",
    label: "Preferred contact method",
    type: "radio",
    options: ["Phone call", "Video call"],
  },
  {
    name: "topic",
    label: "Topic",
    type: "select",
    placeholder: "Choose a topic",
    options: ["Sales", "Support", "Billing"],
  },
  {
    name: "interests",
    label: "Interests",
    type: "checkbox_group",
    options: ["Design", "Engineering", "Marketing"],
  },
];

const meta = {
  title: "Components/Form",
  component: FormComponent,
  parameters: {
    docs: {
      description: {
        component: `A form built from a \`fields\` array, using Radix UI's Form primitive (\`@radix-ui/react-form\`) directly rather than reusing \`TextInput\`/\`Checkbox\`/\`RadioGroup\`/\`Select\` - Radix Form's automatic validity tracking only works on real native \`<input>\`/\`<textarea>\`/\`<select>\` elements, so Form renders its own native controls (restyled to match the library) instead.

By default Form is entirely self-contained: no JS validation library, just native browser constraint validation (\`required\`, email/URL patterns, min/max length, all derived from each field's \`required\`/\`validation\` config) surfaced through Radix's built-in \`Form.Message match="..."\` matchers. Passing a \`form\` prop - a \`react-hook-form\` instance created by the consumer via their own \`useForm()\` - switches every field to controlled registration and react-hook-form's own error state instead. react-hook-form is never imported by this library at runtime (only as a type) - it's an optional peer dependency, and the consumer always owns the \`useForm()\` call, since hooks can't be conditionally or lazily loaded the way \`Pagination\` lazy-loads \`react-paginate\`.

**Known limitation**: native HTML has no way to express "at least one checkbox in this group is required" (unlike \`radio\`, where native \`required\` on a shared-name group works correctly) - enforcing that on a \`checkbox_group\` field requires passing a \`form\` with your own \`validate\` rule.

**States & classes** (see \`styles/components/form.css\`, and **Retheming Components** for how to target these):

| Selector | Applies when | Controls |
|---|---|---|
| \`.another-form-field[data-width="100"\\|"67"\\|"50"\\|"33"]\` | a field's \`width\` | flex-basis within the wrapping \`flex-wrap\` row |
| \`.another-form-input\` | text/email/url/textarea/select/file controls, always | border, background, focus ring |
| \`.another-form-checkbox\`, \`.another-form-radio\` | checkbox/radio controls, always | shape, border |
| \`.another-form-checkbox:checked\`, \`.another-form-radio:checked\` | checked | background, border |
| \`.another-form-message\` | a field's validation error, when shown | text color |`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    fields: {
      control: "object",
      description:
        "Describes each field to render: name, type, label, placeholder, help text, required, validation rules, choices, and width.",
    },
    onSubmit: {
      control: false,
      description: "Called with the submitted values once the form is valid.",
    },
    submitLabel: {
      control: "text",
      description: "Text rendered on the submit button.",
    },
    form: {
      control: false,
      description:
        "An optional react-hook-form instance (from your own useForm() call). Omit to run on native browser validation instead.",
    },
    variant: {
      control: "radio",
      options: ["default"],
      description: "Visual variant used by the form styling.",
    },
  },
  args: {
    fields,
    onSubmit: fn(),
    submitLabel: "Send message",
  },
} satisfies Meta<typeof FormComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Native: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Send message" });

    await userEvent.click(submit);

    await waitFor(() =>
      expect(canvas.getByText("Name is required")).toBeInTheDocument(),
    );
    await expect(canvas.getByText("Email is required")).toBeInTheDocument();
    await expect(canvas.getByText("Message is required")).toBeInTheDocument();
    await expect(args.onSubmit).not.toHaveBeenCalled();

    // Each label's accessible name includes the trailing "*Required" span
    // text, so match the start of the label rather than an exact string.
    await userEvent.type(canvas.getByLabelText(/^Name/), "Ada Lovelace");
    await userEvent.type(canvas.getByLabelText(/^Email/), "ada@example.com");
    await userEvent.type(canvas.getByLabelText(/^Message/), "How can we help?");
    await userEvent.click(submit);

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalledTimes(1));
    const [values] = args.onSubmit.mock.calls[0];
    await expect(values).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "How can we help?",
      newsletter: false,
    });
    await expect(
      canvas.queryByText("Name is required"),
    ).not.toBeInTheDocument();
  },
};

const rhfFields: FormFieldConfig[] = [
  { name: "name", label: "Name", required: true },
  {
    name: "email",
    label: "Email",
    required: true,
    validation: "email",
    help: "We'll only use this to reply to you.",
  },
];

const WithReactHookFormDemo = ({
  onSubmit,
}: {
  onSubmit: (values: Record<string, unknown>) => void;
}) => {
  const form = useForm<Record<string, unknown>>({
    defaultValues: { name: "", email: "" },
  });

  return (
    <FormComponent
      fields={rhfFields}
      form={form}
      onSubmit={onSubmit}
      submitLabel="Submit"
    />
  );
};

export const WithReactHookForm: Story = {
  args: {
    fields: rhfFields,
  },
  render: (args) => <WithReactHookFormDemo onSubmit={args.onSubmit} />,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: "Submit" });

    await userEvent.click(submit);

    await waitFor(() =>
      expect(canvas.getByText("Name is required")).toBeInTheDocument(),
    );
    await expect(args.onSubmit).not.toHaveBeenCalled();

    await userEvent.type(canvas.getByLabelText(/^Name/), "Grace Hopper");
    await userEvent.type(canvas.getByLabelText(/^Email/), "grace@example.com");
    await userEvent.click(submit);

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalledTimes(1));
    const [values] = args.onSubmit.mock.calls[0];
    await expect(values).toMatchObject({
      name: "Grace Hopper",
      email: "grace@example.com",
    });
  },
};
