# Plugins and Extensions

## What Are Plugins?
Plugins enable developers to extend the CMS by:
- Adding new block types (e.g., Image Blocks, Video Embeds).
- Modifying CMS behavior.

## Creating a Plugin
1. Create a plugin file in `libs/plugin-system/src/plugins`.
2. Register your plugin in the `pluginSystem` context.

### Example: Image Plugin
```typescript
import { Plugin } from '../plugin-system';

export const ImagePlugin: Plugin = {
  name: 'Image Plugin',
  description: 'Adds image block support.',
  register: (context) => {
    context.addContentBlock({
      type: 'image-block',
      render: ({ src, alt }: { src: string; alt: string }) => (
        <img src={src} alt={alt} style={{ maxWidth: '100%' }} />
      ),
    });
  },
};