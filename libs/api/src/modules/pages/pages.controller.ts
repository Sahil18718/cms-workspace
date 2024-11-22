import prisma from '../../prisma';

export const getPages = async () => {
  return prisma.page.findMany();
};

export const createPage = async (data: { title: string; slug: string; content: string }) => {
  return prisma.page.create({ data });
};

export const getPageById = async (id: number) => {
  return prisma.page.findUnique({
    where: { id },
  });
};

export const updatePage = async (id: number, data: { title: string; slug: string; content: string }) => {
  return prisma.page.update({ where: { id }, data });
};

export const deletePage = async (id: number) => {
  return prisma.page.delete({ where: { id } });
};

