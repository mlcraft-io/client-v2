import type { CubeMember } from "@/types/cube";
import usePlayground from "@/hooks/usePlayground";
import RootLayout from "@/layouts/RootLayout";
import {
  availableQueryMembers,
  dataSectionProps,
  exploreMock,
  meta,
} from "@/mocks/explore";

import ExploreFiltersSection from ".";

import type { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Components/Explore/ExploreFiltersSection",
  component: ExploreFiltersSection,
} as Meta<typeof ExploreFiltersSection>;

const Template: StoryFn<typeof ExploreFiltersSection> = (args) => {
  const {
    selectedQueryMembers = {},
    analyticsQuery: { updateMember },
  } = usePlayground({
    explorationData: {
      exploration: exploreMock.exploration.data.explorations_by_pk,
      dataset: exploreMock.exploration.data.fetch_dataset,
    },
    rawSql: exploreMock.sql.data.gen_sql.result,
    meta,
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    updateMember("filters", (member: CubeMember) => ({
      dimension: member.dimension?.name,
      operator: member.operator,
      values: member.values,
    })).add({
      dimension: {
        isVisible: true,
        name: "Airports.country",
        shortTitle: "Country",
        suggestFilterValues: true,
        title: "Airports Country",
        type: "string",
      },
    } as CubeMember);
  }, [updateMember]);

  return (
    <RootLayout>
      <ExploreFiltersSection
        {...args}
        isActive={isActive}
        selectedQueryMembers={selectedQueryMembers}
        onToggleSection={() => setIsActive(!isActive)}
        onMemberChange={updateMember}
      />
    </RootLayout>
  );
};

export const Default = Template.bind({});

Default.args = {
  availableQueryMembers,
  state: dataSectionProps.state,
};
