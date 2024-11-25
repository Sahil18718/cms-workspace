import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './global.css';
import Header from '../components/Header';

interface Post {
  id: number;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}


interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPages = async () => {
      const response = await fetch('/api/pages');
      if (response.ok) {
        const data = await response.json();
        setPages(data);
        setLoading(false);
      } else {
        alert('Failed to fetch pages.');
      }
    };

    fetchPages();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const response = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
        alert('Post deleted successfully!');
      } else {
        alert('Failed to delete post.');
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this page?')) {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Page deleted successfully!');
        setPages(pages.filter((page: { id: number }) => page.id !== id));
      } else {
        alert('Failed to delete page.');
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <section className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to the CMS</h1>

          {/* Posts Table */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Posts</h2>
              <button
                onClick={() => router.push('/posts/create')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create New Post
              </button>
            </div>
            {posts.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Slug</th>
                    {/* <th className="px-4 py-2 text-left">Content</th> */}
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Updated At</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post: any) => (
                    <tr key={post.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{post.id}</td>
                      <td className="px-4 py-2">{post.title}</td>
                      <td className="px-4 py-2">{post.slug}</td>
                      {/* <td className="px-4 py-2">{post.contentBlocks}</td> */}
                      <td className="px-4 py-2">{new Date(post.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(post.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-2 flex space-x-2 justify-center">
                        <Link href={`/posts/edit/${post.id}`} legacyBehavior>
                          <a className="text-blue-500 hover:underline">Edit</a>
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No posts available.</p>
            )}
          </div>

          {/* Pages Table */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Pages</h2>
              <button
                onClick={() => router.push('/pages/create')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create New Page
              </button>
            </div>
            {pages.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">slug</th>
                    <th className="px-4 py-2 text-left">content</th>
                    <th className="px-4 py-2 text-left">Created At</th>
                    <th className="px-4 py-2 text-left">Updated At</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2">{page.id}</td>
                      <td className="px-4 py-2">{page.title}</td>
                      <td className="px-4 py-2">{page.slug}</td>
                      <td className="px-4 py-2">{page.content}</td>
                      <td className="px-4 py-2">{new Date(page.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(page.updatedAt).toLocaleString()}</td>
                      <td className="px-4 py-2 flex space-x-2 justify-center">
                        <Link href={`/pages/edit/${page.id}`} legacyBehavior>
                          <a className="text-blue-500 hover:underline">Edit</a>
                        </Link>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No pages available.</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;
