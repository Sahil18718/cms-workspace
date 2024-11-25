import type { NextApiRequest, NextApiResponse } from 'next';
import { getPageById, updatePage, deletePage } from '@cms-workspace/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Validate ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    try {
      const page = await getPageById(Number(id));
      if (!page) {
        return res.status(404).json({ message: 'Page not found' });
      }
      return res.status(200).json(page);
    } catch (error) {
      console.error('Error fetching page:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, slug, content } = req.body;

      if (!title || !slug || !content) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const updatedPage = await updatePage(Number(id), { title, slug, content });
      return res.status(200).json(updatedPage);
    } catch (error) {
      console.error('Error updating page:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else if (req.method === 'DELETE') {
    try {
      await deletePage(Number(id));
      return res.status(204).end();
    } catch (error) {
      console.error('Error deleting page:', error);
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
