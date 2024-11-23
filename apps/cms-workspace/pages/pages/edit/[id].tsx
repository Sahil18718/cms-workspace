import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '../../../components/RichTextEditor';

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      const response = await fetch(`/api/pages/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setLoading(false);
      } else {
        alert('Failed to fetch page data.');
        router.push('/pages');
      }
    };

    fetchPage();
  }, [id, router]);

  const handleSave = async () => {
    const response = await fetch(`/api/pages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });

    if (response.ok) {
      alert('Page updated successfully!');
      router.push('/pages');
    } else {
      alert('Failed to update page.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Page</h1>
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

export default EditPage;
