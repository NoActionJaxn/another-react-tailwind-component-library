import {
  Controls,
  Description,
  Heading,
  Primary,
  Title,
} from "@storybook/addon-docs/blocks";
import { m, type ComponentKey } from "../i18n";
import { CssVariables } from "./CssVariables";

/** Page layout for every component MDX file. All text comes from the locale. */
export function ComponentDocs({
  component,
  css = [],
  sharedCss = [],
}: {
  component: ComponentKey;
  /** Raw CSS (`import css from "./Name.css?raw"`) whose variables are listed. */
  css?: string[];
  /** Raw CSS of shared styles (menu, dialog, toggle), listed under their own headings. */
  sharedCss?: string[];
}) {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Heading>{m.docs.headings.props}</Heading>
      <Controls />
      {css.length + sharedCss.length > 0 && (
        <>
          <Heading>{m.docs.headings.cssVariables}</Heading>
          <CssVariables component={component} css={css} sharedCss={sharedCss} />
        </>
      )}
    </>
  );
}
