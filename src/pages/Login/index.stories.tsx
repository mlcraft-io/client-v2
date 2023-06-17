import RootLayout from "@/layouts/RootLayout";
import BasicLayout from "@/layouts/BasicLayout";

import Login from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Login",
  component: Login,
} as Meta<typeof Login>;

const Template: StoryFn<typeof Login> = (args) => (
  <RootLayout>
    <BasicLayout>
      <Login {...args} />
    </BasicLayout>
  </RootLayout>
);

export const Default = Template.bind({});
