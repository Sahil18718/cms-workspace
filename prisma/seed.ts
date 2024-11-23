import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.post.create({
    data: {
      title: 'Sample Post',
      slug: 'sample-post',
      contentBlocks: [
        { type: 'example-block', props: { content: 'Hello, this is an example block!' } },
        { type: 'image-block', props: { src: 'https://play.google/howplayworks/static/assets/social/share_google_play_logo.png', alt: 'An example image' } },
      ],
    },
  });

  console.log('Sample data seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
