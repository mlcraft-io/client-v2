import { Col, Dropdown, Row, Space, Spin } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { useEffect } from "react";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";

import DataSourceForm from "@/components/DataSourceForm";
import Card from "@/components/Card";
import Modal from "@/components/Modal";
import NoDataSource from "@/components/NoDataSource";
import PageHeader from "@/components/PageHeader";
import formatTime from "@/utils/helpers/formatTime";
import DataSourceTag from "@/components/DataSourceTag";
import ConfirmModal from "@/components/ConfirmModal";
import { useDeleteDataSourceMutation } from "@/graphql/generated";
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import useOnboarding from "@/hooks/useOnboarding";
import CurrentUserStore from "@/stores/CurrentUserStore";
import DataSourceStore from "@/stores/DataSourceStore";
import { Roles } from "@/types/team";
import type {
  DataSource,
  DataSourceInfo,
  DataSourceSetupForm,
  DynamicForm,
} from "@/types/dataSource";
import { MODELS, SOURCES } from "@/utils/constants/paths";

import styles from "./index.module.less";

interface DataSourcesProps {
  dataSources: DataSourceInfo[];
  disableCreate: boolean;
  loading?: boolean;
  defaultOpen?: boolean;
  onFinish: () => void;
  onDataSourceSelect?: (value: DataSource) => void;
  onTestConnection?: (data: DataSourceSetupForm) => void;
  onDataSourceSetupSubmit?: (data: DataSourceSetupForm) => void;
  onDataModelGenerationSubmit?: (data: DynamicForm) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onGenerate?: (id: string) => void;
}

export const DataSources = ({
  dataSources = [],
  disableCreate = false,
  loading = false,
  defaultOpen = false,
  onDataSourceSelect = () => {},
  onTestConnection = () => {},
  onDataSourceSetupSubmit = () => {},
  onDataModelGenerationSubmit = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onFinish = () => {},
  onGenerate = () => {},
}: DataSourcesProps) => {
  const { t } = useTranslation(["settings", "pages"]);
  const [, setLocation] = useLocation();
  const { setStep, clean, setIsOnboarding } = DataSourceStore();
  const responsive = useResponsive();

  const onOpen = () => {
    setIsOnboarding(true);
    setLocation(`${SOURCES}/new`);
  };

  const onClose = useCallback(() => {
    setLocation(SOURCES);
  }, [setLocation]);

  const onFormFinish = () => {
    onClose();
    onFinish();
  };

  const onGenerateModel = (id: string) => {
    onGenerate(id);
    setStep(2);
  };

  const renderCard = (dataSource: DataSourceInfo) => {
    return (
      <Card
        title={dataSource.name}
        titleTooltip={dataSource.name}
        onTitleClick={() =>
          !disableCreate && dataSource.id && onEdit(dataSource.id)
        }
        extra={
          !disableCreate && (
            <Dropdown
              className={styles.btn}
              trigger={["click"]}
              menu={{
                items: [
                  {
                    key: "edit",
                    label: t("common:words.edit"),
                    onClick: () => dataSource.id && onEdit(dataSource.id),
                  },
                  {
                    key: "generate",
                    label: t("common:words.generate_models"),
                    onClick: () =>
                      dataSource.id && onGenerateModel(dataSource.id),
                  },
                  {
                    key: "delete",
                    className: styles.deleteItem,
                    label: (
                      <ConfirmModal
                        title={t("common:words.delete_datasource")}
                        className={styles.deleteText}
                        onConfirm={() =>
                          dataSource.id && onDelete(dataSource.id)
                        }
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
          )
        }
      >
        <dl>
          {dataSource.dbParams.host && (
            <>
              <dt>{t("common:words.host")}</dt>
              <dd title={dataSource.dbParams.host}>
                {dataSource.dbParams.host}
              </dd>
            </>
          )}

          {dataSource.type && (
            <>
              <dt>{t("common:words.type")}</dt>
              <dd>
                <DataSourceTag dataSource={dataSource.type} />
              </dd>
            </>
          )}

          {dataSource.createdAt && (
            <>
              <dt>{t("common:words.created_at")}</dt>
              <dd title={formatTime(dataSource.createdAt)}>
                {formatTime(dataSource.createdAt)}
              </dd>
            </>
          )}

          {dataSource.updatedAt && (
            <>
              <dt>{t("common:words.updated_at")}</dt>
              <dd title={formatTime(dataSource.updatedAt)}>
                {formatTime(dataSource.updatedAt)}
              </dd>
            </>
          )}
        </dl>
      </Card>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        {dataSources.length === 0 && (
          <NoDataSource onConnect={!disableCreate ? onOpen : undefined} />
        )}
        {dataSources.length > 0 && (
          <Space className={styles.wrapper} direction="vertical" size={13}>
            <PageHeader
              title={
                !responsive.sm
                  ? t("settings:data_sources.title_mobile")
                  : t("settings:data_sources.title")
              }
              action={!disableCreate && t("settings:data_sources.create_now")}
              actionProps={{
                type: "primary",
                size: "large",
              }}
              onClick={onOpen}
            />

            <div className={styles.body}>
              <Row justify={"start"} gutter={[32, 32]}>
                {dataSources.map((d) => (
                  <Col xs={24} sm={12} xl={8} key={d.id}>
                    {renderCard(d)}
                  </Col>
                ))}
              </Row>
            </div>
          </Space>
        )}
      </Spin>

      <Modal
        open={defaultOpen}
        onClose={onClose}
        closable
        afterClose={clean}
        width={1000}
        classNames={{
          modal: styles.modal,
        }}
        modalStyles={{
          padding: 0,
        }}
      >
        <DataSourceForm
          onFinish={onFormFinish}
          onDataSourceSelect={onDataSourceSelect}
          onTestConnection={onTestConnection}
          onDataSourceSetupSubmit={onDataSourceSetupSubmit}
          onDataModelGenerationSubmit={onDataModelGenerationSubmit}
          loading={loading}
          bordered={false}
          shadow={false}
        />
      </Modal>
    </>
  );
};

const DataSourcesWrapper = () => {
  const { t } = useTranslation(["dataSourceStepForm"]);
  const { currentTeam, loading, setLoading } = CurrentUserStore();
  const [, setLocation] = useLocation();
  const { editId, generate } = useParams();

  const basePath = SOURCES;
  const modelsPath = MODELS;
  const connect = editId === "new";

  const {
    formState: { step1: dataSourceSetup },
    isGenerate,
    setIsGenerate,
    setStep,
    clean,
    nextStep,
    setFormStateData,
  } = DataSourceStore();

  const {
    loading: sourceLoading,
    dataSources,
    curDataSource,
    onDataModelGenerationSubmit,
    onDataSourceSetupSubmit,
  } = useOnboarding({
    editId,
  });

  const [deleteMutation, execDeleteMutation] = useDeleteDataSourceMutation();

  useCheckResponse(deleteMutation, () => {}, {
    successMessage: t("datasource_deleted"),
  });

  const onFinish = useCallback(() => {
    let finishPath = modelsPath;

    if (dataSourceSetup?.id) {
      finishPath = `${finishPath}/${dataSourceSetup.id}`;
    }

    clean();
    setLocation(finishPath);
  }, [dataSourceSetup?.id, modelsPath, clean, setLocation]);

  const onDelete = (dataSourceId: string) => {
    setLoading(true);
    execDeleteMutation({ id: dataSourceId });
  };

  const onEdit = (dataSourceId: string) => {
    setLocation(`${basePath}/${dataSourceId}`);
  };

  useEffect(() => {
    if (!connect && dataSources.length && editId && !curDataSource) {
      setLocation(basePath);
    }
  }, [
    basePath,
    curDataSource,
    editId,
    dataSources.length,
    setLocation,
    connect,
  ]);

  const onDataSourceSelect = (value: DataSource) => {
    setFormStateData(0, value);
    nextStep();
  };

  const onDatasourceSetup = async (data: DataSourceSetupForm) => {
    await onDataSourceSetupSubmit(data, false, nextStep);
  };

  const onDataModelGeneration = async (data: DynamicForm) => {
    const isSuccess = await onDataModelGenerationSubmit(data);

    if (editId && isSuccess) {
      onFinish();
      return;
    }

    if (isSuccess) {
      nextStep();
    }
  };

  const onTestConnection = async (data: DataSourceSetupForm) => {
    await onDataSourceSetupSubmit(data, true, nextStep);
  };

  useEffect(() => {
    if (!connect && editId && !generate) {
      setStep(1);
    }
  }, [connect, editId, generate, setStep]);

  useEffect(() => {
    if (generate && generate === "generate") {
      setIsGenerate(true);
    }
  }, [generate, setIsGenerate]);

  useEffect(() => {
    if (isGenerate && curDataSource) {
      setStep(2);
    }
  }, [isGenerate, curDataSource, setStep]);

  const onGenerate = (id: string) => {
    setLocation(`${basePath}/${id}/generate`);
  };

  const isMember = currentTeam?.role === Roles.member;

  return (
    <DataSources
      defaultOpen={!!editId}
      disableCreate={isMember}
      dataSources={dataSources}
      loading={loading || sourceLoading}
      onEdit={onEdit}
      onDelete={onDelete}
      onFinish={onFinish}
      onGenerate={onGenerate}
      onTestConnection={onTestConnection}
      onDataSourceSelect={onDataSourceSelect}
      onDataSourceSetupSubmit={onDatasourceSetup}
      onDataModelGenerationSubmit={onDataModelGeneration}
    />
  );
};

export default DataSourcesWrapper;
