import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } else {
        alert('Failed to fetch posts.');
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Post deleted successfully!');
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert('Failed to delete post.');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Post List</h1>
      <button onClick={() => router.push('/posts/create')}>Create New Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            {/* <p>{post.content.slice(0, 100)}...</p> */}
            <button onClick={() => router.push(`/posts/edit/${post.id}`)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
