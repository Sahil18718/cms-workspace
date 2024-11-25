import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostById, updatePost, deletePost } from '@cms-workspace/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = await getPostById(Number(id));
    return res.status(200).json(post);
  } else if (req.method === 'PUT') {
    const { title, slug, contentBlocks } = req.body
    const updatedPost = await updatePost(Number(id), { title, slug, contentBlocks });
    return res.status(200).json(updatedPost);
  } else if (req.method === 'DELETE') {
    await deletePost(Number(id));
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
