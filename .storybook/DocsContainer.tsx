import { useEffect } from "react";
import {
  DocsContainer as BaseContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { darkTheme } from "./themes";

// Docs pages (src/docs/*.mdx) are always dark, independent of the toolbar
// theme toggle - that toggle only affects individual component stories.
// data-theme drives our own CSS (theme.css's --color-default-* tokens, same
// as every component); the `theme` prop drives Storybook's own docs chrome
// (.sbdocs-* backgrounds/text/code blocks), a separate `storybook/theming`
// system - same one manager.ts uses, which is also permanently dark.
const DocsContainer = (props: DocsContainerProps) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return <BaseContainer {...props} theme={darkTheme} />;
};

export default DocsContainer;
