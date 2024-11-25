import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RichTextEditor from '../../components/RichTextEditor';
import '../global.css';
import Header from 'apps/cms-workspace/components/Header';


const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !slug || !content) {
      alert('Please fill in all fields before saving.');
      return;
    }

    const response = await fetch('/api/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, slug, content }),
    });

    if (response.ok) {
      alert('Page created successfully!');
      setTitle('');
      setSlug('');
      setContent('');
      router.push('/');
    } else {
      alert('Failed to create page.');
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Create New Page</h1>
        <form
          className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slug) {
                  setSlug(e.target.value.toLowerCase().replace(/ /g, '-'));
                }
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the page title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a custom slug or leave it auto-generated"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <RichTextEditor content={content} onContentChange={setContent} />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Page
            </button>
          </div>
        </form>
      </div>
    </>

  );
};

export default CreatePage;
