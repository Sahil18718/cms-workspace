import React, { useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });

    if (response.ok) {
      alert('Post created successfully!');
    } else {
      alert('Failed to create post.');
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
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

export default CreatePost;
