import { Button, TextInput, schemeVars } from "../src";

const variants = ["solid", "soft", "outline", "ghost"] as const;

export default function App() {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex gap-4">
        {variants.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>
      <div className="flex gap-4" style={schemeVars("brand")}>
        {variants.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>
      <div className="flex max-w-md gap-4">
        <TextInput
          block
          type="email"
          placeholder="you@example.com"
          aria-label="Email"
        />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}
