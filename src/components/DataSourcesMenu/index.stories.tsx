import RootLayout from "@/layouts/RootLayout";
import { dataSourcesMock } from "@/mocks/dataSources";

import DataSourcesMenu from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Basic/DataSourcesMenu",
  component: DataSourcesMenu,
} as Meta<typeof DataSourcesMenu>;

const Template: StoryFn<typeof DataSourcesMenu> = (args) => {
  const [selected, setSelected] = useState<string>("");
  return (
    <RootLayout>
      <DataSourcesMenu
        {...args}
        selectedId={selected}
        onChange={(dataSource) => setSelected(dataSource?.id || "")}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  entities: dataSourcesMock,
};
