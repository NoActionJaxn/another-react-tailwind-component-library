import { format, m, type ComponentKey } from "../i18n";

interface Row {
  name: string;
  value: string;
  description: string;
}

interface Group {
  label: string;
  rows: Row[];
}

const vars = m.docs.cssVariables;

/** Shows var(--scheme-600) as "scheme 600" and calc(var(--spacing) * 4) as "spacing × 4". */
function readable(value: string) {
  const scheme = value.match(/^var\(--scheme-(\d+)\)$/);
  if (scheme) return format(vars.values.scheme, { step: scheme[1] });
  const spacing = value.match(/^calc\(var\(--spacing\) \* ([\d.]+)\)$/);
  if (spacing) return format(vars.values.spacing, { n: spacing[1] });
  if (value === "var(--spacing)") return format(vars.values.spacing, { n: 1 });
  return value;
}

function describe(component: ComponentKey, name: string, suffix: string) {
  const overrides =
    (m.components[component] as { cssVariables?: Record<string, string> })
      .cssVariables ?? {};
  const suffixes = vars.suffixes as Record<string, string>;
  return overrides[name] ?? overrides[suffix] ?? suffixes[suffix] ?? "";
}

/** Reads `--_x: var(--public-name, default)` declarations from a component's CSS. */
function parse(component: ComponentKey, css: string, shared: boolean): Group[] {
  const groups = new Map<string, Row[]>();
  const source = css.replace(
    /@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g,
    "",
  );
  for (const [, selector, body] of source.matchAll(
    /(\[data-[^{]+)\{([^{}]*)\}/g,
  )) {
    const part = selector.match(/\[data-([\w-]+)\]/)![1];
    const size = selector.match(/data-size="([^"]+)"/)?.[1];
    const variant = selector.match(/data-variant="([^"]+)"/)?.[1];
    const gap = selector.match(/data-gap="([^"]+)"/)?.[1];
    const base = part.replace(/-(content|overlay|group)$/, "");
    const prefix = shared
      ? `${(vars.parts as Record<string, string>)[part] ?? part} · `
      : "";
    const label = size
      ? prefix + format(vars.groups.size, { value: size })
      : variant
        ? prefix + format(vars.groups.variant, { value: variant })
        : gap
          ? prefix + format(vars.groups.gap, { value: gap })
          : part === base && !shared
            ? vars.groups.base
            : ((vars.parts as Record<string, string>)[part] ?? part);
    for (const [, name, value] of body.matchAll(
      /--_[\w-]+:\s*var\(\s*(--[\w-]+)\s*,\s*([\s\S]*?)\);/g,
    )) {
      const owner = [part, base].find((p) => name.startsWith(`--${p}-`))!;
      let suffix = name.slice(owner.length + 3);
      for (const value of [size, variant, gap]) {
        if (value && suffix.startsWith(`${value}-`)) {
          suffix = suffix.slice(value.length + 1);
        }
      }
      const rows = groups.get(label) ?? [];
      rows.push({
        name,
        value: value
          .replace(/\s+/g, " ")
          .replace(/\( /g, "(")
          .replace(/ \)/g, ")"),
        description: describe(component, name, suffix),
      });
      groups.set(label, rows);
    }
  }
  return [...groups].map(([label, rows]) => ({ label, rows }));
}

export function CssVariables({
  component,
  css,
  sharedCss = [],
}: {
  component: ComponentKey;
  css: string[];
  sharedCss?: string[];
}) {
  const groups = [
    ...css.flatMap((source) => parse(component, source, false)),
    ...sharedCss.flatMap((source) => parse(component, source, true)),
  ];
  if (!groups.length) return null;
  return (
    <div
      data-css-variables
      className="sb-unstyled font-sans text-sm text-default-900"
    >
      <p className="mb-4 text-default-700">{vars.intro}</p>
      {groups.map((group) => (
        <div key={group.label} className="mb-6">
          <h4 className="mb-2 font-semibold">{group.label}</h4>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-default-300 text-xs text-default-600">
                <th className="py-2 pr-4 font-medium">
                  {vars.columns.variable}
                </th>
                <th className="py-2 pr-4 font-medium">
                  {vars.columns.default}
                </th>
                <th className="py-2 font-medium">{vars.columns.description}</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-default-200 align-top"
                >
                  <td className="py-2 pr-4">
                    <code className="font-mono text-xs whitespace-nowrap">
                      {row.name}
                    </code>
                  </td>
                  <td className="py-2 pr-4">
                    <code className="font-mono text-xs" title={row.value}>
                      {readable(row.value)}
                    </code>
                  </td>
                  <td className="py-2 text-default-700">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
