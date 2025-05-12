import type { Preview } from "@storybook/react";
declare global {
  interface Window {
    $RefreshReg$: () => void;
    $RefreshSig$: () => () => void;
  }
}

if (typeof window !== "undefined") {
  window.$RefreshReg$ = () => {};
  window.$RefreshSig$ = () => () => {};
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
