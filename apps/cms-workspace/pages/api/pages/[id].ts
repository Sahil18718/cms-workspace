import type { NextApiRequest, NextApiResponse } from 'next';
import { getPageById } from '@cms-workspace/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; 
  console.log('ID received:', id); 

  if (isNaN(Number(id))) {
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
      return res.status(500).json({ message: 'Internal server error', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
