import RootLayout from "@/layouts/RootLayout";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import { meta } from "@/mocks/explore";
import { dbMock } from "@/mocks/db";
import { branchesMock } from "@/mocks/branches";

import ExploreWorkspace from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreWorkspace",
  component: ExploreWorkspace,
} as Meta<typeof ExploreWorkspace>;

const Template: StoryFn<typeof ExploreWorkspace> = (args) => (
  <RootLayout>
    <ExploreWorkspace {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  loading: false,
  meta,
  params: {
    screenshotMode: false,
  },
  source: {
    id: "1",
    name: "github.demo.altinity.cloud",
    type: {
      name: "Postgres",
      value: "postgres",
      icon: <></>,
    },
    branches: branchesMock,
    dbParams: {
      ssl: true,
      host: "github.demo.altinity.cloud",
      port: "8443",
      user: "demo",
      database: "default",
      password: "demo",
    },
    createdAt: "2021-09-09T11:52:58.347143+00:00",
    updatedAt: "2023-08-25T07:04:44.238898+00:00",
  },
  header: <DataSourcesMenu selectedId="1" entities={dbMock} />,
};
