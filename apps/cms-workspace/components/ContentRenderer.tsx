import React from 'react';
import { pluginSystem } from '@cms-workspace/plugin-system';

const ContentRenderer = ({ blocks }: { blocks?: any[] }) => {
  const contentBlocks = pluginSystem.getContentBlocks();

  // Default to an empty array if blocks is undefined
  const safeBlocks = blocks || [];

  return (
    <>
      {safeBlocks.map((block, index) => {
        const BlockComponent = contentBlocks.find((cb) => cb.type === block.type)?.render;

        if (!BlockComponent) return <div key={index}>Unsupported block: {block.type}</div>;

        return <BlockComponent key={index} {...block.props} />;
      })}
    </>
  );
};

export default ContentRenderer;
