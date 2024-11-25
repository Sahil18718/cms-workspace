import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { useRouter } from "next/router";
import Header from "./Header"; // Adjust the path as per your file structure


// Mock Router for Storybook
const mockRouter = {
  pathname: "/",
  route: "/",
  query: {},
  asPath: "/",
  push: () => Promise.resolve(true),
  replace: () => Promise.resolve(true),
  reload: () => {},
  back: () => {},
  prefetch: () => Promise.resolve(),
  beforePopState: () => {},
  isFallback: false,
};

export default {
  title: "Components/Header",
  component: Header,
  decorators: [
    // (Story) => (
    //   <RouterContex.Provider value={mockRouter}>{Story()}</RouterContext.Provider>
    // ),
  ],
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = () => <Header />;

export const Default = Template.bind({});
Default.parameters = {
  nextRouter: {
    pathname: "/",
  },
};
