import React from 'react';
import ContentRenderer from './ContentRenderer';

export default {
  title: 'Components/ContentRenderer',
  component: ContentRenderer,
};

const sampleBlocks = [
  { type: 'text-block', props: { content: 'Sample Text Block' } },
  { type: 'image-block', props: { src: 'https://via.placeholder.com/150', alt: 'Placeholder' } },
];

export const Default = () => <ContentRenderer blocks={sampleBlocks} />;
