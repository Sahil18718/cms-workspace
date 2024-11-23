import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ContentRenderer from '../../../components/ContentRenderer';

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${id}`);
      const data = await response.json();
      setPost(data);
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <ContentRenderer blocks={post.contentBlocks} />
    </div>
  );
};

export default PostDetail;
