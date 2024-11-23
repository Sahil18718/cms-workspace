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
        'deployment',
      ],
    },
    {
      type: 'link',
      label: 'Storybook', // Label shown in the sidebar
      href: 'http://localhost:4400', // Replace with your deployed Storybook URL later
    },
  ],
};

export default sidebars;
