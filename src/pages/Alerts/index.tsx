import { Col, Dropdown, Row, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { SettingOutlined } from "@ant-design/icons";
import { useParams } from "@vitjs/runtime";

import PageHeader from "@/components/PageHeader";
import NoSignals from "@/components/NoSignals";
import AlertModal from "@/components/AlertModal";
import type { Alert } from "@/types/alert";
import ConfirmModal from "@/components/ConfirmModal";
import CurrentUserStore from "@/stores/CurrentUserStore";
import useLocation from "@/hooks/useLocation";
import useAlerts from "@/hooks/useAlerts";
import useCheckResponse from "@/hooks/useCheckResponse";
import { DOCS_CREATE_ALERT_LINK } from "@/utils/constants/links";
import Card from "@/components/Card";
import Avatar from "@/components/Avatar";
import formatTime from "@/utils/helpers/formatTime";
import StatusBadge from "@/components/StatusBadge";
import { ALERTS } from "@/utils/constants/paths";
import type { Exploration } from "@/types/exploration";

import DocsIcon from "@/assets/docs.svg";

import styles from "./index.module.less";

interface AlertsProps {
  alerts: Alert[];
  exploration: Exploration;
}

const Alerts: React.FC<AlertsProps> = ({
  alerts: initialAlerts,
  exploration,
}) => {
  const { t } = useTranslation(["alerts", "pages"]);
  const responsive = useResponsive();
  const [, setLocation] = useLocation();
  const basePath = ALERTS;
  const { teamData } = CurrentUserStore();
  const { alertId } = useParams();

  const alerts = useMemo(
    () => (initialAlerts?.length ? initialAlerts : teamData?.alerts || []),
    [initialAlerts, teamData]
  ) as Alert[];

  const curAlert = useMemo(
    () => alerts.find((a) => a.id === alertId),
    [alertId, alerts]
  );

  const {
    mutations: { deleteMutationData, execDeleteMutation },
  } = useAlerts({});

  const onEdit = (alert: Alert) => {
    setLocation(`${basePath}/${alert.id}`);
  };

  const onDelete = (alert: Alert) => {
    execDeleteMutation({ id: alert.id });
  };

  const onClose = () => {
    setLocation(basePath);
  };

  useCheckResponse(deleteMutationData, () => {}, {
    successMessage: t("alert_deleted"),
  });

  useEffect(() => {
    if (alerts?.length && alertId && !curAlert) {
      message.error(t("not_found.wrong_id"));
      setLocation(basePath);
    }
  }, [alertId, alerts?.length, basePath, curAlert, setLocation, t]);

  const renderCard = (alert: Alert) => {
    return (
      <Card
        key={alert.id}
        title={alert.name}
        titleTooltip={alert.name}
        onTitleClick={() => onEdit(alert)}
        extra={
          <Dropdown
            className={styles.btn}
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "edit",
                  label: t("common:words.edit"),
                  onClick: () => onEdit(alert),
                },
                {
                  key: "delete",
                  label: (
                    <ConfirmModal
                      title={t("common:words.delete_alert")}
                      onConfirm={() => onDelete(alert)}
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
          {alert.creator && (
            <>
              <dt>{t("common:words.creator")}</dt>
              <dd title={alert.creator.email}>
                <div className={styles.creator}>
                  <Avatar
                    className={styles.avatar}
                    width={!responsive.md ? 27 : 36}
                    height={!responsive.md ? 27 : 36}
                    username={alert.creator.displayName}
                    img={alert.creator.avatarUrl}
                  />
                  <div className={styles.email}>{alert.creator.email}</div>
                </div>
              </dd>
            </>
          )}

          {alert.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd title={formatTime(alert.type)}>{formatTime(alert.type)}</dd>
            </>
          )}

          {alert.schedule && (
            <>
              <dt>{t("common:words.schedule")}</dt>
              <dd title={formatTime(alert.schedule)}>
                {formatTime(alert.schedule)}
              </dd>
            </>
          )}

          {alert.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(alert.createdAt)}>
                {formatTime(alert.createdAt)}
              </dd>
            </>
          )}

          {alert.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(alert.updatedAt)}>
                {formatTime(alert.updatedAt)}
              </dd>
            </>
          )}

          {alert.status && (
            <>
              <dt>{t("common:words.status")}</dt>
              <dd>
                <StatusBadge status={alert.status}>
                  {alert.lastActivity}
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
          href={DOCS_CREATE_ALERT_LINK}
        />
        <div className={styles.body}>
          {!!alerts?.length ? (
            <Row justify={"start"} gutter={[32, 32]}>
              {alerts.map((a) => (
                <Col xs={24} sm={12} xl={8} key={a.id}>
                  {renderCard(a)}
                </Col>
              ))}
            </Row>
          ) : (
            <NoSignals />
          )}
        </div>
      </Space>

      <AlertModal
        alert={curAlert}
        exploration={curAlert?.exploration || exploration}
        isOpen={!!curAlert}
        onClose={onClose}
      />
    </>
  );
};

export default Alerts;
