import Link from 'next/link';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome to the CMS</h1>
      <h2 className="text-xl font-semibold mb-2">Posts</h2>
      <ul className="list-disc pl-4">
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/posts/edit/${post.id}`}>
              <a className="text-blue-500 hover:underline">{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
