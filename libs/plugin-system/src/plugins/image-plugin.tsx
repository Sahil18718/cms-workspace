import React from 'react';
import { Plugin } from '../lib/types';

export const ImagePlugin: Plugin = {
  name: 'Image Plugin',
  description: 'A plugin to render image blocks.',
  register: (context) => {
    context.addContentBlock({
      type: 'image-block',
      render: (props: { src: string; alt: string }) => (
        <img
          src={props.src}
          alt={props.alt}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      ),
    });
  },
};
