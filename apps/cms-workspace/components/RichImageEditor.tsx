import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface ContentBlock {
  type: string;
  props: any;
}

interface RichImageEditorProps {
  content: ContentBlock[];
  onContentChange: (blocks: ContentBlock[]) => void;
}

const RichImageEditor: React.FC<RichImageEditorProps> = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content
      .map((block) => `<p>${block.props.src || block.props.src}</p>`)
      .join(''),
    onUpdate: ({ editor }) => {
      const updatedHTML = editor.getHTML();

      const parser = new DOMParser();
      const doc = parser.parseFromString(updatedHTML, 'text/html');
      const updatedBlocks: ContentBlock[] = Array.from(doc.body.children)
        .map((node) => {
          if (node.tagName === 'IMG' && node.getAttribute('src')) {
            return {
              type: 'image-block',
              props: { src: node.getAttribute('src') },
            };
          }
          return {
            type: 'image-block',
            props: { src: node.textContent?.trim() || '' },
          };
        })
        .filter((block) => block.props.src || block.props.src);

      onContentChange(updatedBlocks);
    },
  });

  if (!editor) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichImageEditor;

