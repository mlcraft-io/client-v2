import { useState } from "react";
import { set, getOr, get } from "unchanged";
import { useTranslation } from "react-i18next";
import { Typography } from "antd";

import { SHOWN_CATEGORIES } from "@/components/ExploreCubes";
import ExploreCubesSubSection from "@/components/ExploreCubesSubSection";
import ExploreCubesCategoryItem from "@/components/ExploreCubesCategoryItem";
import useAnalyticsQueryMembers from "@/hooks/useAnalyticsQueryMembers";
import { granularities } from "@/utils/constants/granularities";
import type {
  CubeMeta,
  SubSection,
  CubeMember,
  CubeMembers,
} from "@/types/cube";

import s from "./index.module.less";

import type { ReactNode } from "react";

const { Text } = Typography;

const toFilter = (member: CubeMember) => ({
  dimension: member.dimension?.name,
  operator: member.operator,
  values: member.values,
});

const granulateMember = (member: CubeMember): CubeMember[] => {
  const newMembers: CubeMember[] = [];

  granularities.forEach((granularity) => {
    let newName = member.name;
    let newTitle = member.title;
    let newShortTitle = member.shortTitle;
    let granularityName = null;

    if (granularity.name) {
      granularityName = granularity.name;
      newName += `+${granularity.name}`;
      newTitle = `by ${granularity.title}`;
      newShortTitle = `by ${granularity.name}`;
    } else {
      newTitle = "Raw";
      newShortTitle = "Raw";
    }

    const newMember: CubeMember = {
      ...member,
      name: newName,
      title: newTitle,
      shortTitle: newShortTitle,
      granularity: granularityName as string,
      meta: {
        subSection: member.shortTitle,
        subSectionType: member.type,
      },
    };

    newMembers.push(newMember);
  });

  return newMembers;
};

const getSubSections = (
  catMembers: CubeMember[],
  membersIndex: Record<string, CubeMember>
) => {
  const subSections: Record<string, SubSection> = {};
  const freeMembers: CubeMember[] = [];

  catMembers.forEach((member: CubeMember) => {
    const subSection = getOr(false, "meta.subSection", member);
    const subSectionType = getOr("string", "meta.subSectionType", member);

    if (!subSection) {
      freeMembers.push(member);
      return;
    }

    if (!subSections[subSection]) {
      subSections[subSection] = {
        members: [],
        haveSelected: false,
        subSectionType,
      };
    }

    subSections[subSection].members.push(member);
  });

  Object.keys(subSections).forEach((subSection) => {
    const foundSelected = subSections[subSection].members.find(
      (subMember: CubeMember) => get([subMember.name], membersIndex)
    );

    if (foundSelected) {
      subSections[subSection].haveSelected = true;
    }
  });

  return {
    subSections,
    freeMembers,
  };
};

const Cube = ({
  members,
  selectedMembers,
  onMemberSelect,
}: CubeProps): JSX.Element => {
  const { t } = useTranslation();

  const {
    baseMembers: { index: membersIndex },
  } = useAnalyticsQueryMembers({ selectedQueryMembers: selectedMembers });

  const [state, setState] = useState<CubeMeta>({
    lastClickedMember: {},
    hovered: {},
  });

  const getMemberId = (member: CubeMember) => member.name.replace(".", "_");
  const getMembersCategory = (category?: string): CubeMember[] => {
    return Object.values(members[category as keyof CubeMembers] || {});
  };
  const getSelectedCategoryMembers = (category?: string): string[] => {
    return Object.values(
      category ? selectedMembers[category as keyof CubeMembers] || {} : {}
    ).map((m: CubeMember) => m.name);
  };

  const onAction = (
    type = "over",
    member: CubeMember,
    memberMeta: CubeMeta = {}
  ) => {
    if (!member) {
      return;
    }

    const name = getMemberId(member);

    if (type === "click") {
      const { category: nextCategory, selectedIndex } = memberMeta;

      setState((prev) => set(["lastClickedMember"], memberMeta, prev));

      if (selectedIndex === -1) {
        onMemberSelect(nextCategory).add(member);
      } else {
        onMemberSelect(nextCategory).remove({
          ...member,
          index: selectedIndex,
        });
      }

      return;
    }

    if (type === "over") {
      setState((prev) => set(["hovered", name], "over", prev));
      return;
    }

    if (type === "focus") {
      setState((prev) => set(["hovered", name], "focus", prev));
      return;
    }

    setState((prev) => set(["hovered", name], false, prev));
  };

  const getItem = (
    category: string,
    member: CubeMember,
    index: number,
    categoryCubeMembers: string[],
    selectedFilters: string[]
  ): ReactNode => {
    const selectedIndex = categoryCubeMembers.indexOf(member.name);
    const selectedFilterIndex = selectedFilters.indexOf(member.name);
    return (
      <ExploreCubesCategoryItem
        key={member.name}
        member={member}
        category={category}
        onAction={(...args) =>
          onAction(...args, { index, category, selectedIndex })
        }
        selectedIndex={selectedIndex}
        selectedFilterIndex={selectedFilterIndex}
        onFilterUpdate={onMemberSelect("filters", toFilter)}
        hoverState={state.hovered[getMemberId(member)]}
      />
    );
  };

  const getCategory = (category: string): ReactNode => {
    let catMembers = getMembersCategory(category);
    if (!catMembers.length) {
      return null;
    }

    catMembers = catMembers.reduce((acc: CubeMember[], member: CubeMember) => {
      let newMembers = acc;

      if (member.type === "time") {
        const granMembers = granulateMember(member);
        newMembers = newMembers.concat(granMembers);
      } else {
        newMembers.push(member);
      }
      return newMembers;
    }, []);

    const { subSections, freeMembers } = getSubSections(
      catMembers,
      membersIndex
    );

    const categoryCubeMembers = getSelectedCategoryMembers(category);
    const selectedFilters: string[] = Object.values(
      selectedMembers.filters || {}
    ).map((m) => m.dimension!.name);

    return (
      <div key={category} className={s.categorySection}>
        <Text className={s.categoryTitle}>{t(`common:words.${category}`)}</Text>
        <div className={s.freeMembers}>
          {freeMembers.map((member, index) =>
            getItem(
              category,
              member,
              index,
              categoryCubeMembers,
              selectedFilters
            )
          )}
        </div>
        {Object.keys(subSections || {}).map((subSectionKey) => (
          <ExploreCubesSubSection
            key={subSectionKey}
            name={subSectionKey}
            subSection={subSections[subSectionKey]}
            onFilterUpdate={onMemberSelect("filters", toFilter)}
            selectedFilters={selectedFilters}
          >
            {subSections[subSectionKey].members.map(
              (member: CubeMember, index: number) =>
                getItem(
                  category,
                  member,
                  index,
                  categoryCubeMembers,
                  selectedFilters
                )
            )}
          </ExploreCubesSubSection>
        ))}
      </div>
    );
  };

  return (
    <div className={s.root} data-testid={"cube"}>
      {SHOWN_CATEGORIES.map(getCategory)}
    </div>
  );
};

interface CubeProps {
  members: CubeMembers;
  onMemberSelect: (
    memberType?: string,
    toQuery?: (member: CubeMember) => any
  ) => {
    add: (member: CubeMember) => void;
    remove: (member: CubeMember) => void;
    update: (member: CubeMember, newValue: any) => void;
  };
  selectedMembers: Record<string, CubeMember[]>;
}

export default Cube;
