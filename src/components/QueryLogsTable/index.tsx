import { Space, Table } from "antd";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Avatar from "@/components/Avatar";
import formatTime from "@/utils/helpers/formatTime";
import type { Request_Logs } from "@/graphql/generated";
import type { Member } from "@/types/team";
import type { DataSourceInfo } from "@/types/dataSource";

import styles from "./index.module.less";

import type { TableProps } from "antd";
import type { FC } from "react";

interface QueryLogsTableProps {
  logs: Request_Logs[];
  dataSources: DataSourceInfo[];
  members: Member[];
  pagination?: TableProps<Request_Logs>["pagination"];
  onChange?: TableProps<Request_Logs>["onChange"];
  onClickRow?: (rowId: string) => void;
}

const QueryLogsTable: FC<QueryLogsTableProps> = ({
  logs,
  onChange,
  onClickRow,
  dataSources,
  members,
  pagination = false,
}) => {
  const { t } = useTranslation(["logs"]);
  const columns: TableProps<Request_Logs>["columns"] = [
    {
      title: t("query.table.data_source"),
      dataIndex: "datasource_id",
      key: "datasource_id",
      render: (value) => (
        <span className={cn(styles.cell, styles.dataSource)}>
          {dataSources.find((ds) => ds.id === value)?.name || value}
        </span>
      ),
    },
    {
      title: t("query.table.path"),
      dataIndex: "path",
      key: "path",
      render: (value) => (
        <span className={cn(styles.cell, styles.path)}>{value}</span>
      ),
    },
    {
      title: t("query.table.events"),
      dataIndex: "request_event_logs_aggregate",
      key: "request_event_logs_aggregate",
      render: (value) => (
        <span className={cn(styles.cell, styles.events)}>
          {value?.aggregate?.count}
        </span>
      ),
    },
    {
      title: t("query.table.creator"),
      dataIndex: "user_id",
      key: "user_id",
      render: (value) => {
        const user = members.find((m) => m.user_id === value);
        if (user) {
          return (
            <span className={cn(styles.cell, styles.creator)}>
              <Space size={10}>
                <Avatar img={user?.avatarUrl} username={user?.displayName} />
                <span>{user?.displayName}</span>
              </Space>
            </span>
          );
        } else {
          return (
            <span className={cn(styles.cell, styles.creator)}>
              <span>{value}</span>
            </span>
          );
        }
      },
    },
    {
      title: t("query.table.duration"),
      dataIndex: "duration",
      key: "duration",
      render: (value) => (
        <span className={cn(styles.cell, styles.duration)}>
          {value} {t("query.table.ms")}
        </span>
      ),
    },
    {
      title: (
        <div className={styles.headerRight}>{t("query.table.start_time")}</div>
      ),
      dataIndex: "start_time",
      key: "start_time",
      render: (value) => (
        <span className={cn(styles.cell, styles.startTime, styles.headerRight)}>
          {formatTime(value)}
        </span>
      ),
    },
    {
      title: (
        <div className={styles.headerRight}>{t("query.table.created_at")}</div>
      ),
      dataIndex: "created_at",
      key: "created_at",
      render: (value) => (
        <span className={cn(styles.cell, styles.createdAt, styles.headerRight)}>
          {formatTime(value)}
        </span>
      ),
    },
  ];
  return (
    <Table
      className={styles.table}
      columns={columns}
      dataSource={logs}
      rowKey={(record) => record.id}
      onRow={(r) => ({
        onClick: () => onClickRow?.(r.id),
        style: { cursor: "pointer" },
      })}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default QueryLogsTable;
