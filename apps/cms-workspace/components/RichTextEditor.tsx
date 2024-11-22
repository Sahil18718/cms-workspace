import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const RichTextEditor = ({ content, onContentChange }: { content: string; onContentChange: (value: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Prevent rendering EditorContent if the editor is not ready
  if (!editor) {
    return <div>Loading Editor...</div>;
  }

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
