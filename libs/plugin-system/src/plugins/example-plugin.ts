// @ts-nocheck
import { Plugin } from "../lib/plugin-system"

export const ExamplePlugin: Plugin = {
  name: 'Example Plugin',
  description: 'An example plugin that adds a custom block.',
  register: (context) => {
    context.addContentBlock({
      type: 'example-block',
      render: ({ content }: { content: string }) => {content},
    });
  },
};
