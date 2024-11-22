import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts, createPost } from "@cms-workspace/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } else if (req.method === 'POST') {
    const { title, slug, content } = req.body;
    const newPost = await createPost({ title, slug, content });
    return res.status(201).json(newPost);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
