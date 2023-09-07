import RootLayout from "@/layouts/RootLayout";

import CickHouseIcon from "@/assets/databases/click-house.svg";

import CredentialsTable from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Settings/SQLApi/CredentialsTable",
  component: CredentialsTable,
} as Meta<typeof CredentialsTable>;

const Template: StoryFn<typeof CredentialsTable> = (args) => (
  <RootLayout>
    <CredentialsTable {...args} />
  </RootLayout>
);

export const Default = Template.bind({});

Default.args = {
  credentials: [
    {
      id: "1",
      member: {
        userId: "1",
        displayName: "Ivan Fokeev",
      },
      dataSourceData: {
        id: "1",
        dbParams: {
          host: "gh-api.clickhouse.tech",
          port: "5432",
          user: "user",
        },
        name: "Eco",
        createdAt: "2023-09-07T15:44:08.133839+00:00",
        updatedAt: "2023-09-07T15:44:08.133839+00:00",
        type: {
          url: "gh-api.clickhouse.tech",
          name: "Clickhouse",
          icon: <CickHouseIcon />,
        },
      },
      login: "mysql_db",
      createdAt: "02.11.2022/ 3:32 PM",
    },
    {
      id: "2",
      member: {
        userId: "1",
        displayName: "Ivan Fokeev",
      },
      dataSourceData: {
        id: "2",
        dbParams: {
          host: "gh-api.clickhouse.tech",
          port: "5432",
          user: "user",
        },
        name: "Eco",
        createdAt: "2023-09-07T15:44:08.133839+00:00",
        updatedAt: "2023-09-07T15:44:08.133839+00:00",
        type: {
          url: "gh-api.clickhouse.tech",
          name: "Clickhouse",
          icon: <CickHouseIcon />,
        },
      },
      login: "mysql_db",
      createdAt: "02.11.2022/ 3:32 PM",
    },
  ],
};
