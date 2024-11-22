import prisma from '../../prisma';

export const getPosts = async () => {
  return prisma.post.findMany();
};

export const createPost = async (data: { title: string; slug: string; content: string }) => {
  return prisma.post.create({ data });
};

export const getPostById = async (id: number) => {
  return prisma.post.findUnique({ where: { id } });
};

export const updatePost = async (id: number, data: { title: string; slug: string; content: string }) => {
  return prisma.post.update({ where: { id }, data });
};

export const deletePost = async (id: number) => {
  return prisma.post.delete({ where: { id } });
};
