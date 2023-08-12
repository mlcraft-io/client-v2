import RootLayout from "@/layouts/RootLayout";
import { alerts } from "@/mocks/alerts";
import { queryPreviewMock } from "@/mocks/queryPreview";

import Alerts from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Pages/Alerts",
  component: Alerts,
} as Meta<typeof Alerts>;

const Template: StoryFn<typeof Alerts> = (args) => (
  <RootLayout>
    <Alerts {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  alerts,
  query: queryPreviewMock,
};
