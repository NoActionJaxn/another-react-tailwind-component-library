// Generates library-schema.json: a machine-readable manifest of every
// component's props, exported types, and associated CSS file.
//
// Uses two extraction passes, because neither alone is accurate enough:
//   1. react-docgen-typescript for prop names/required/defaultValue - it
//      does this well, including enums that don't include a bare `string`
//      member (e.g. ButtonSize = "sm" | "md" | "lg").
//   2. A direct TypeScript Compiler API pass over each file's *source AST*
//      for exported type aliases and interfaces. This is necessary because
//      this codebase's `type XVariant = "default" | "outline" | string`
//      pattern (a deliberately open-ended enum) gets widened by the type
//      checker to plain `string` for display purposes, which is what
//      docgen reports - losing the recommended literal values entirely.
//      Reading the original union's syntax nodes instead of asking the
//      checker for a display string avoids that widening.
//
// Run with `node scripts/generate-library-schema.mjs`.

import * as docgen from "react-docgen-typescript";
import ts from "typescript";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const tsconfigPath = join(rootDir, "tsconfig.build.json");

const kebabCase = (name) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

// --- Parse src/index.ts to get the authoritative list of public exports ---

const indexSource = readFileSync(join(rootDir, "src/index.ts"), "utf8");
const exportBlockPattern =
  /export\s*\{([^}]+)\}\s*from\s*"\.\/components\/([A-Za-z]+)\.tsx"/g;

const components = [];
for (const match of indexSource.matchAll(exportBlockPattern)) {
  const [, namesRaw, fileName] = match;
  const names = namesRaw
    .split(",")
    .map((n) => n.trim())
    .filter(Boolean);

  const componentExport = names.find((n) => !n.startsWith("type "));
  const componentName = componentExport
    .replace(/^default as /, "")
    .trim();

  const typeExports = names
    .filter((n) => n.startsWith("type "))
    .map((n) => n.replace(/^type\s+/, "").trim());

  components.push({ componentName, fileName, typeExports });
}

// --- Compiler API pass: exported type aliases (unions) and interfaces ---

const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  rootDir,
);
const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);

const stringLiteralValue = (node) =>
  ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)
    ? node.literal.text
    : null;

const memberToSchema = (member, sourceFile) => {
  if (!member.name || !ts.isIdentifier(member.name)) return null;
  return {
    name: member.name.text,
    required: !member.questionToken,
    type: member.type ? member.type.getText(sourceFile) : "unknown",
  };
};

const extractTypesFromFile = (filePath) => {
  const sourceFile = program.getSourceFile(filePath);
  const types = {};
  if (!sourceFile) return types;

  ts.forEachChild(sourceFile, (node) => {
    const isExported = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) return;

    if (ts.isTypeAliasDeclaration(node) && node.type) {
      if (ts.isUnionTypeNode(node.type)) {
        const literals = [];
        let openEnum = false;
        for (const member of node.type.types) {
          const literal = stringLiteralValue(member);
          if (literal !== null) literals.push(literal);
          else if (member.kind === ts.SyntaxKind.StringKeyword) {
            openEnum = true;
          }
        }
        if (literals.length > 0) {
          types[node.name.text] = { kind: "enum", literals, openEnum };
        }
      }
    } else if (ts.isInterfaceDeclaration(node)) {
      const members = node.members
        .map((member) => memberToSchema(member, sourceFile))
        .filter(Boolean);
      types[node.name.text] = { kind: "interface", members };
    }
  });

  return types;
};

// --- docgen pass: props for each component's main file ---

const docgenParser = docgen.withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
});

const allTypes = {};
const schemaComponents = {};

for (const { componentName, fileName, typeExports } of components) {
  const relativePath = `src/components/${fileName}.tsx`;
  const absolutePath = join(rootDir, relativePath);

  const fileTypes = extractTypesFromFile(absolutePath);
  Object.assign(allTypes, fileTypes);

  // docgen loses the original type alias name entirely for the widened
  // `"a" | "b" | string` case (no .raw, no .value - just { name: "string" }),
  // so for that case we fall back to our own AST-derived member types for
  // this component's own Props interface, keyed by prop name.
  const propsInterface = fileTypes[`${componentName}Props`];
  const declaredTypeByProp = new Map(
    (propsInterface?.members ?? []).map((m) => [m.name, m.type]),
  );

  const [docResult] = docgenParser.parse(absolutePath);
  const props = {};

  if (docResult) {
    for (const [propName, propInfo] of Object.entries(docResult.props)) {
      // Skip props inherited from React's own ambient DOM attribute types
      // (HTMLAttributes, DOMAttributes, AriaAttributes, etc, all declared in
      // @types/react) - every native onClick/aria-*/etc is technically
      // valid but drowns out each component's actual API. Props inherited
      // from a real dependency's own component props (e.g. Radix's
      // DialogProps exposing open/onOpenChange) are kept - those are
      // meaningfully part of the component, not generic DOM noise.
      if (propInfo.parent?.fileName?.includes("@types/react")) continue;

      const declaredType = declaredTypeByProp.get(propName);
      let type;
      if (propInfo.type.name === "enum" && propInfo.type.value) {
        type = {
          kind: "enum",
          literals: propInfo.type.value.map((v) =>
            v.value.replace(/^"|"$/g, ""),
          ),
          openEnum: false,
        };
      } else if (fileTypes[declaredType]?.kind === "enum") {
        type = fileTypes[declaredType];
      } else if (fileTypes[propInfo.type.raw]?.kind === "enum") {
        type = fileTypes[propInfo.type.raw];
      } else {
        type = declaredType ?? propInfo.type.raw ?? propInfo.type.name;
      }

      props[propName] = {
        type,
        required: propInfo.required,
        ...(propInfo.defaultValue
          ? { default: propInfo.defaultValue.value }
          : {}),
        ...(propInfo.description ? { description: propInfo.description } : {}),
      };
    }
  }

  const cssFile = `styles/components/${kebabCase(componentName)}.css`;
  const hasCss = existsSync(join(rootDir, "src", cssFile));

  schemaComponents[componentName] = {
    import: { name: componentName, from: "another-react-tailwind-component-library" },
    exportedTypes: typeExports,
    source: relativePath,
    css: hasCss ? cssFile : null,
    props,
  };
}

const pkg = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));

const schema = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  generated: new Date().toISOString(),
  components: schemaComponents,
  types: allTypes,
};

writeFileSync(
  join(rootDir, "library-schema.json"),
  JSON.stringify(schema, null, 2) + "\n",
);

console.log(
  `Generated library-schema.json: ${Object.keys(schemaComponents).length} components, ${Object.keys(allTypes).length} types.`,
);
