import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '../../components/RichTextEditor';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });

    if (response.ok) {
      alert('Page created successfully!');
      router.push('/pages');
    } else {
      alert('Failed to create page.');
    }
  };

  return (
    <div>
      <h1>Create New Page</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
            }}
          />
        </div>
        <div>
          <label>Slug:</label>
          <input type="text" value={slug} readOnly />
        </div>
        <div>
          <label>Content:</label>
          <RichTextEditor content={content} onContentChange={setContent} />
        </div>
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default CreatePage;
