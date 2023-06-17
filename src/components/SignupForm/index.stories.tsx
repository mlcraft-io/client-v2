import RootLayout from "@/layouts/RootLayout";

import SignupForm from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/SignupForm",
  component: SignupForm,
} as Meta<typeof SignupForm>;

const Template: StoryFn<typeof SignupForm> = (args) => (
  <RootLayout>
    <SignupForm {...args} />
  </RootLayout>
);

export const Default = Template.bind({});
