import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '../../../components/RichTextEditor';
import '../../global.css'
import Header from 'apps/cms-workspace/components/Header';

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
      try {
        const response = await fetch(`/api/pages/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setSlug(data.slug);
          setContent(data.content);
        } else {
          alert('Failed to fetch page data.');
          router.push('/pages');
        }
      } catch (error) {
        console.error('Error fetching page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id, router]);

  const handleSave = async () => {
    try {
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
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg font-medium">Loading page data...</div>
      </div>
    );
  }

  return (
    <>
    <Header/>
     <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Edit Page</h1>
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
            onChange={(e) => {
              setTitle(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
            }}
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
            readOnly
            className="w-full px-4 py-2 bg-gray-100 border rounded-lg focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
            Content:
          </label>
          <RichTextEditor content={content} onContentChange={setContent} />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/pages')}
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

export default EditPage;
