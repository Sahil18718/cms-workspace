const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Documentation',
      items: [
        'setup',
        'architecture',
        'api',
        'plugins',
      ],
    },
    {
      type: 'link',
      label: 'Storybook',
      href: 'http://localhost:59581/',
    },
    {
      type: 'link',
      label: 'CMS Application', 
      href: 'http://localhost:4200/',
    },
    {
      type: 'link',
      label: 'Prisma Studio',
      href: 'http://localhost:5555/',
    },
  ],
};

export default sidebars;
