import { Space } from "antd";
import { useTranslation } from "react-i18next";

import PageHeader from "@/components/PageHeader";
import BasicLayout from "@/layouts/BasicLayout";
import LogsTable from "@/components/LogsTable";
import StatusCard from "@/components/StatusCard";
import type { Log } from "@/types/logs";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface ReportsLogsProps {
  logs: Log[];
}

const ReportsLogs: React.FC<ReportsLogsProps> = ({ logs }) => {
  const { t } = useTranslation(["logs", "common"]);
  return (
    <BasicLayout
      loggedIn
      divider
      withSideMenu
      headerProps={{ title: t("pages:logs.reports") }}
    >
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={t("reports.title")}
          action={
            <Space size={10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {t("reports.action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
        />

        <Space className={styles.body} size={13} direction="vertical">
          <Space size={10}>
            <StatusCard
              status="success"
              count={logs.reduce(
                (count, l) => (l.status === "success" ? count + 1 : count),
                0
              )}
            />

            <StatusCard
              status="error"
              count={logs.reduce(
                (count, l) => (l.status === "error" ? count + 1 : count),
                0
              )}
            />
          </Space>

          <LogsTable logs={logs} />
        </Space>
      </Space>
    </BasicLayout>
  );
};

export default ReportsLogs;