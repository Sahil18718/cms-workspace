import type { NextApiRequest, NextApiResponse } from 'next';
import { getPages, createPage } from '@cms-workspace/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const pages = await getPages();
    return res.status(200).json(pages);
  } else if (req.method === 'POST') {
    const { title, slug, content } = req.body;
    const newPage = await createPage({ title, slug, content });
    return res.status(201).json(newPage);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
