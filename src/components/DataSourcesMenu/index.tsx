import { DownOutlined } from "@ant-design/icons";

import PopoverButton from "@/components/PopoverButton";

import s from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

interface DataSourcesMenuProps {
  entities: {
    id: string;
    name: string;
  }[];
  selectedId?: string;
  onChange?: (id: string) => void;
}

const DataSourcesMenu: FC<DataSourcesMenuProps> = ({
  entities,
  selectedId,
  onChange,
}) => {
  const items: MenuProps["items"] = entities.map((d) => ({
    key: d.id,
    label: d.name,
  }));

  const selectedIdx = items.findIndex((i) => i?.key === selectedId);

  if (selectedIdx > -1) {
    items.splice(selectedIdx, 1);
  }

  return (
    <div className={s.wrapper}>
      <span>{entities[selectedIdx]?.name || "Select datasource"}</span>
      <PopoverButton
        icon={<DownOutlined />}
        popoverType="dropdown"
        trigger={["hover"]}
        menu={{
          items,
          onClick: ({ key }) => onChange?.(key),
        }}
        buttonProps={{
          type: "text",
        }}
      />
    </div>
  );
};

export default DataSourcesMenu;