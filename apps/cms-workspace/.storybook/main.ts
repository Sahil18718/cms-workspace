import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)', '../**/*.mdx'],
  addons: [
    '@storybook/addon-essentials', // Includes Docs, Controls, Actions
    '@storybook/addon-links', // Link between stories
    '@storybook/addon-a11y', // Accessibility checks
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'], // Include static assets
};

export default config;
