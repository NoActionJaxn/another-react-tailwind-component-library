import en from "./locales/en.json";

export type Messages = typeof en;
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
export type ComponentKey = keyof Messages["components"];
type CommonProp = keyof Messages["common"]["props"];

const locales = import.meta.glob<DeepPartial<Messages>>("./locales/*.json", {
  eager: true,
  import: "default",
});

/** Set at build time: STORYBOOK_LOCALE=de npm run build-storybook */
export const locale: string = import.meta.env.STORYBOOK_LOCALE ?? "en";

function merge<T>(base: T, override: unknown): T {
  if (typeof base !== "object" || base === null) {
    return (override ?? base) as T;
  }
  const result = { ...(base as Record<string, unknown>) };
  const extra = (override ?? {}) as Record<string, unknown>;
  for (const key of Object.keys(result)) {
    result[key] = merge(result[key], extra[key]);
  }
  return result as T;
}

/** Docs strings for the active locale; keys missing from it fall back to English. */
export const m: Messages = merge(en, locales[`./locales/${locale}.json`]);

/** Fills `{name}` placeholders: format("Tag {n}", { n: 3 }). */
export function format(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

type ArgTypes = Record<string, Record<string, unknown>>;

/** A story meta's `parameters`, plus the component description from the locale. */
export function docsParameters<const T extends object>(
  key: ComponentKey,
  parameters: T,
): T {
  const docs = (parameters as { docs?: object }).docs;
  return {
    ...parameters,
    docs: {
      ...docs,
      description: { component: m.components[key].description },
    },
  };
}

/**
 * A story meta's `argTypes`, plus prop descriptions from the locale.
 * `common` lists props described by `common.props`: a prop name that matches a common
 * key, or `{ prop: commonKey }` to reuse a description under another name.
 */
export function docsArgTypes<const T extends object>(
  key: ComponentKey,
  common: (CommonProp | Partial<Record<string, CommonProp>>)[],
  argTypes: T,
): T {
  const descriptions: Record<string, string> = {};
  for (const entry of common) {
    const pairs: [string, CommonProp][] =
      typeof entry === "string"
        ? [[entry, entry]]
        : (Object.entries(entry) as [string, CommonProp][]);
    for (const [prop, commonKey] of pairs) {
      descriptions[prop] = m.common.props[commonKey];
    }
  }
  Object.assign(descriptions, m.components[key].props);

  const result: ArgTypes = { ...(argTypes as ArgTypes) };
  for (const [prop, description] of Object.entries(descriptions)) {
    result[prop] = { ...result[prop], description };
  }
  return result as T;
}
