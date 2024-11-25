import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';

export default {
  title: 'Components/RichTextEditor',
  component: RichTextEditor,
};

export const Default = () => {
  const [content, setContent] = useState('');

  return (
    <RichTextEditor
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
    />
  );
};
