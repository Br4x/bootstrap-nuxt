import type { StorybookConfig } from "@storybook/vue3-vite";
import Unocss from 'unocss/vite';
import path from 'path';
import { loadConfigFromFile, mergeConfig } from 'vite';
const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", 'storybook_vitest_addon', 'storybook-addon-nuxt', "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  async viteFinal(baseConfig) {
    baseConfig.plugins?.push(Unocss());
    // Add other configuration here depending on your use case
    const {
      config: userConfig
    } = await loadConfigFromFile(path.resolve(__dirname, "../vite.config.ts"));
    return mergeConfig(baseConfig, userConfig);
  }
};
export default config;