import React, { useState } from 'react';

const FileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploadUrl, setUploadUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setUploadUrl(data.url);
                alert('File uploaded successfully!');
            } else {
                alert('Failed to upload file.');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Upload File</h1>
            <input
                type="file"
                onChange={handleFileChange}
                className="block mb-4"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Upload
            </button>
            {uploadUrl && (
                <div className="mt-4">
                    <p>Uploaded File URL:</p>
                    <a
                        href={uploadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        {uploadUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
