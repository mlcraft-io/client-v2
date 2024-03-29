import RootLayout from "@/layouts/RootLayout";
import { dbTiles, defaultForm } from "@/mocks/dataSources";

import DataSourceSetup from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Onboarding/DataSourceSetup",
  component: DataSourceSetup,
} as Meta<typeof DataSourceSetup>;

const Template: StoryFn<typeof DataSourceSetup> = (args) => (
  <RootLayout>
    <DataSourceSetup {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  dataSource: dbTiles[0],
  fields: defaultForm,
  initialValue: {
    name: "gh-api.clickhouse.tech (Yandex Demo)",
  },
  onSubmit: console.log,
};
