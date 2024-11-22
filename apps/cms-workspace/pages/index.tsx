import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const PageList = () => {
    const [pages, setPages] = useState([]);
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

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this page?')) {
            const response = await fetch(`/api/pages/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Page deleted successfully!');
                setPages(pages.filter((page) => page.id !== id));
            } else {
                alert('Failed to delete page.');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Page List</h1>
            <button onClick={() => router.push('/pages/create')}>Create New Page</button>
            <ul>
                {pages.map((page) => (
                    <li key={page.id}>
                        <h2>{page.title}</h2>
                        <p>{page.content.slice(0, 100)}...</p>
                        <button onClick={() => router.push(`/pages/edit/${page.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(page.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageList;
