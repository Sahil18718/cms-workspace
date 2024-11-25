import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../../global.css';
import RichTextEditor from '../../../components/RichImageEditor';
import Header from 'apps/cms-workspace/components/Header';

interface ContentBlock {
  type: string;
  props: { src: string };
}

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (response.ok) {
          const data = await response.json();


          const transformedBlocks = data.contentBlocks.map((block: any) => ({
            type: 'image-block',
            props: {
              src: block.props.content,
            },
          }));

          setTitle(data.title);
          setSlug(data.slug);
          setContentBlocks(transformedBlocks);
        } else {
          alert('Failed to fetch the post.');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isSlugEdited) {
      setSlug(newTitle.toLowerCase().replace(/ /g, '-'));
    }
  };

  const handleSlugChange = (newSlug: string) => {
    setSlug(newSlug);
    setIsSlugEdited(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, slug, contentBlocks }),
      });

      if (response.ok) {
        alert('Post updated successfully!');
        router.push('/');
      } else {
        alert('Failed to update post.');
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg font-medium">Loading post details...</div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Edit Post</h1>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title:
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="slug" className="block text-gray-700 font-semibold mb-2">
              Slug:
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contentBlocks" className="block text-gray-700 font-semibold mb-2">
              Content:
            </label>
            <RichTextEditor content={contentBlocks} onContentChange={setContentBlocks} />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PostDetail;
