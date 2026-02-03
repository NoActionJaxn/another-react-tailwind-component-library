import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/tailwind.css'
import ThemeProvider from '../src/components/ThemeProvider'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => React.createElement(ThemeProvider, null, React.createElement(Story)),
  ],
};

export default preview;