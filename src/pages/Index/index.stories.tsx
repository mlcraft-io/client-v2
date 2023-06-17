import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";

import Index from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Index",
  component: Index,
} as Meta<typeof Index>;

const Template: StoryFn<typeof Index> = (args) => (
  <RootLayout>
    <BasicLayout>
      <Index {...args} />
    </BasicLayout>
  </RootLayout>
);

export const Default = Template.bind({});
