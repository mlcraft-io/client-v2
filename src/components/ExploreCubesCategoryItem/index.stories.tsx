import RootLayout from "@/layouts/RootLayout";

import ExploreCubesCategoryItem from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreCubesCategoryItem",
  component: ExploreCubesCategoryItem,
} as Meta<typeof ExploreCubesCategoryItem>;

const Template: StoryFn<typeof ExploreCubesCategoryItem> = (args) => (
  <RootLayout>
    <ExploreCubesCategoryItem {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  member: {
    name: "test measure",
    title: "string",
    shortTitle: "string",
    isVisible: true,
    aggType: "string",
    cumulative: true,
    cumulativeTotal: true,
    drillMembers: [],
    drillMembersGrouped: {
      dimensions: [],
      measures: [],
    },
    type: "string",
  },
};
