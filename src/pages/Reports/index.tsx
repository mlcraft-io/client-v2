import { Col, Dropdown, Row, Space, message } from "antd";
import { useParams } from "@vitjs/runtime";
import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";
import { SettingOutlined } from "@ant-design/icons";

import PageHeader from "@/components/PageHeader";
import ReportModal from "@/components/ReportModal";
import NoSignals from "@/components/NoSignals";
import type { Alert } from "@/types/alert";
import type { Report } from "@/types/report";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useCheckResponse from "@/hooks/useCheckResponse";
import useReports from "@/hooks/useReports";
import useLocation from "@/hooks/useLocation";
import { DOCS_CREATE_REPORT_LINK } from "@/utils/constants/links";
import StatusBadge from "@/components/StatusBadge";
import formatTime from "@/utils/helpers/formatTime";
import Avatar from "@/components/Avatar";
import ConfirmModal from "@/components/ConfirmModal";
import Card from "@/components/Card";
import { REPORTS } from "@/utils/constants/paths";
import type { Exploration } from "@/types/exploration";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface ReportsProps {
  alerts: Alert[];
  exploration: Exploration;
}

const Reports: React.FC<ReportsProps> = ({
  alerts: initialReports,
  exploration,
}) => {
  const { t } = useTranslation(["reports", "pages"]);
  const responsive = useResponsive();
  const [, setLocation] = useLocation();
  const basePath = REPORTS;
  const { teamData } = CurrentUserStore();
  const { reportId } = useParams?.() || {};

  const reports = useMemo(
    () => (initialReports?.length ? initialReports : teamData?.reports || []),
    [initialReports, teamData]
  ) as Alert[];

  const curReport = useMemo(
    () => reports.find((r) => r.id === reportId),
    [reportId, reports]
  );

  const {
    mutations: { deleteMutationData, execDeleteMutation },
  } = useReports({});

  const onEdit = (report: Report) => {
    setLocation(`${basePath}/${report.id}`);
  };

  const onDelete = (report: Report) => {
    execDeleteMutation({ id: report.id });
  };

  const onClose = () => {
    setLocation(basePath);
  };

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("report_deleted"),
  });

  useEffect(() => {
    if (reports?.length && reportId && !curReport) {
      message.error(t("not_found"));
      setLocation(basePath);
    }
  }, [reportId, reports?.length, basePath, curReport, setLocation, t]);

  const renderCard = (report: Alert) => {
    return (
      <Card
        key={report.id}
        title={report.name}
        titleTooltip={report.name}
        onTitleClick={() => onEdit(report)}
        extra={
          <Dropdown
            className={styles.btn}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => onEdit(report),
                },
                {
                  key: "delete",
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_report")}
                      onConfirm={() => onDelete(report)}
                    >
                      {t("common:words.delete")}
                    </ConfirmModal>
                  ),
                },
              ],
            }}
          >
            <SettingOutlined key="setting" />
          </Dropdown>
        }
      >
        <dl>
          {report.creator && (
            <>
              <dt>{t("common:words.creator")}</dt>
              <dd title={report.creator.email}>
                <div className={styles.creator}>
                  <Avatar
                    className={styles.avatar}
                    width={!responsive.md ? 27 : 36}
                    height={!responsive.md ? 27 : 36}
                    username={report.creator.displayName}
                    img={report.creator.avatarUrl}
                  />
                  <div className={styles.email}>{report.creator.email}</div>
                </div>
              </dd>
            </>
          )}

          {report.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd title={formatTime(report.type)}>{formatTime(report.type)}</dd>
            </>
          )}

          {report.schedule && (
            <>
              <dt>{t("common:words.schedule")}</dt>
              <dd title={formatTime(report.schedule)}>
                {formatTime(report.schedule)}
              </dd>
            </>
          )}

          {report.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(report.createdAt)}>
                {formatTime(report.createdAt)}
              </dd>
            </>
          )}

          {report.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(report.updatedAt)}>
                {formatTime(report.updatedAt)}
              </dd>
            </>
          )}

          {report.status && (
            <>
              <dt>{t("common:words.status")}</dt>
              <dd>
                <StatusBadge status={report.status}>
                  {report.lastActivity}
                </StatusBadge>
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={13}>
        <PageHeader
          title={!responsive.sm ? t("title_mobile") : t("title")}
          action={
            <Space size={!responsive.sm ? 5 : 10} align="start">
              <span className={styles.actionIcon}>
                <DocsIcon />
              </span>
              {!responsive.sm ? t("action_mobile") : t("action")}
            </Space>
          }
          actionProps={{
            className: styles.action,
          }}
          target="_blank"
          href={DOCS_CREATE_REPORT_LINK}
        />
        <div className={styles.body}>
          {!!reports?.length ? (
            <Row justify={"start"} gutter={[32, 32]}>
              {reports.map((r) => (
                <Col xs={24} sm={12} xl={8} key={r.id}>
                  {renderCard(r)}
                </Col>
              ))}
            </Row>
          ) : (
            <NoSignals type="reports" />
          )}
        </div>
      </Space>

      <ReportModal
        report={curReport}
        exploration={curReport?.exploration || exploration}
        isOpen={!!curReport}
        onClose={onClose}
      />
    </>
  );
};

export default Reports;
