import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '../../../components/RichTextEditor';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    console.log("id",id)

    const fetchPost = async () => {
    //   const response = await fetch(`/api/posts/${id}`);
      const response = await fetch(`/api/posts/5`);
      console.log("response",response)
      if (response.ok) {
        const data = await response.json();
        console.log("responsedata",data)
        setTitle(data.title);
        setSlug(data.slug);
        setContent(data.content);
        setLoading(false);
      } else {
        alert('Failed to fetch post data.');
        router.push('/posts');
      }
    };

    fetchPost();
  }, [id, router]);

  const handleSave = async () => {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });

    if (response.ok) {
      alert('Post updated successfully!');
      router.push('/posts');
    } else {
      alert('Failed to update post.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Post</h1>
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

export default EditPost;
