import React from 'react';
import { pluginSystem } from '@cms-workspace/plugin-system';

interface ContentBlock {
  type: string;
  props: any;
}

const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => {
  // Fetch content blocks registered in the plugin system
  const contentBlocks = pluginSystem.getContentBlocks();

  return (
    <div>
      {blocks.map((block, index) => {
        const BlockComponent = contentBlocks.find((cb) => cb.type === block.type)?.render;

        if (!BlockComponent) {
          return (
            <div key={index} className="text-red-500">
              Unsupported block type: {block.type}
            </div>
          );
        }

        // Render the block dynamically
        return <BlockComponent key={index} {...block.props} />;
      })}
    </div>
  );
};

export default ContentRenderer;
