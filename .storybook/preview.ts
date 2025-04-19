import type { Preview } from "@storybook/react";
if (typeof window !== "undefined") {
  (window as any).$RefreshReg$ = () => {};
  (window as any).$RefreshSig$ = () => () => {};
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
