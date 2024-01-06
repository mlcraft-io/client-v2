import { Col, Row, Space } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Button from "@/components/Button";
import SearchInput from "@/components/SearchInput";
import PopoverButton from "@/components/PopoverButton";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import DataSchemaForm from "@/components/DataSchemaForm";
import useSubstringSearch from "@/hooks/useSubstringSearch";
import Highlight from "@/components/Highlight";
import BranchSelection from "@/components/BranchSelection";
import type { Branch, DataSourceInfo } from "@/types/dataSource";
import type { Dataschema } from "@/types/dataschema";

import VerticalDots from "@/assets/dots-vertical.svg";
import YMLIcon from "@/assets/yml-flie.svg";
import JSIcon from "@/assets/js-file.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

export interface ModelsSidebarProps {
  dataSourceId?: string | null;
  branchMenu: MenuProps["items"];
  ideMenu: MenuProps["items"];
  branches: Branch[];
  currentBranch?: Branch;
  onChangeBranch: (branchId?: string) => void;
  docs: string;
  version?: string;
  files: Dataschema[];
  onSelectFile: (schema: string, hash?: string) => void;
  onSetDefault: (branchId?: string) => void;
  onCreateBranch: (name: string) => Promise<void>;
  onSchemaDelete: (schema: Dataschema) => void;
  onSchemaUpdate: (editId: string, values: Partial<Dataschema>) => void;
  onCreateFile: (values: Partial<Dataschema>) => void;
  dataSources: DataSourceInfo[];
  onDataSourceChange: (dataSource: DataSourceInfo | null) => void;
}

const icons = {
  js: <JSIcon className={styles.fileIcon} />,
  yml: <YMLIcon className={styles.fileIcon} />,
};

const ModelsSidebar: FC<ModelsSidebarProps> = ({
  branches,
  currentBranch,
  branchMenu,
  ideMenu,
  onChangeBranch,
  onSetDefault,
  docs,
  version,
  files,
  onCreateFile,
  onSelectFile,
  onCreateBranch,
  onSchemaDelete,
  onSchemaUpdate,
  dataSources,
  onDataSourceChange,
  dataSourceId,
}) => {
  const { t } = useTranslation(["models", "common"]);

  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [editPopover, setEditPopover] = useState<{
    id: string;
    type: "remove" | "edit";
  } | null>(null);
  const {
    term: searchTerm,
    matchedItems: filteredSchemas,
    setTerm,
  } = useSubstringSearch(files, "code");

  const onPopoverChange =
    (file: Dataschema, type: "remove" | "edit") => (isVisible: boolean) => {
      if (isVisible) {
        setEditPopover({
          id: file.id,
          type,
        });
      } else {
        setEditPopover(null);
      }
    };

  return (
    <Space
      size={12}
      direction="vertical"
      data-testid="models-sidebar"
      style={{ display: "flex" }}
    >
      <DataSourcesMenu
        selectedId={dataSourceId}
        entities={dataSources}
        onChange={onDataSourceChange}
      />
      <BranchSelection
        branchMenu={branchMenu}
        branches={branches}
        currentBranch={currentBranch}
        onChangeBranch={onChangeBranch}
        onCreateBranch={onCreateBranch}
      />

      <div className={styles.inner}>
        <Space
          className={cn(styles.space, styles.versionRow)}
          size={10}
          direction="vertical"
        >
          {branches?.length ? (
            <div>
              <span> {t("sidebar.version")}:</span>{" "}
              <Button
                className={styles.docsLink}
                type="link"
                href={docs}
                target="_blank"
              >
                {t("sidebar.open_docs")}
              </Button>
            </div>
          ) : null}
          <div className={styles.version} title={version}>
            {version}
          </div>
          {currentBranch && currentBranch.status !== "active" && (
            <Button
              className={styles.default}
              onClick={() => onSetDefault(currentBranch?.id)}
            >
              {t("sidebar.set_as_default")}
            </Button>
          )}
        </Space>

        <Space className={styles.space} size={16} direction="vertical">
          <div className={cn(styles.row, styles.searchRow)}>
            <SearchInput
              value={searchTerm}
              onChange={(val) => setTerm(val.toLowerCase())}
              placeholder={t("common:form.placeholders.search")}
            />

            <PopoverButton
              trigger={["click"]}
              open={isCreateFormOpen}
              onOpenChange={setIsCreateFormOpen}
              icon={<PlusOutlined className={styles.plusIcon} />}
              buttonProps={{
                className: styles.addFile,
                disabled: !branches?.length,
              }}
              content={
                <DataSchemaForm
                  onSubmit={(data) => {
                    setIsCreateFormOpen(false);
                    onCreateFile(data);
                  }}
                />
              }
            />

            {ideMenu && (
              <PopoverButton
                className={cn(styles.dropdown, styles.schemaMenu)}
                popoverType="dropdown"
                buttonProps={{ type: "ghost" }}
                menu={{ items: ideMenu }}
                icon={<VerticalDots />}
                trigger={["click"]}
                arrow
                disabled={!branches?.length}
              />
            )}
          </div>

          {((searchTerm && filteredSchemas) || files).map((f) => {
            return (
              <div
                key={f.id}
                className={styles.fileBtn}
                onClick={() => onSelectFile(f.name)}
              >
                <Row justify={"space-between"} wrap={false}>
                  <Col className={styles.file} span={18} title={f.name}>
                    {icons[f.name.split(".")[1] as keyof typeof icons]}{" "}
                    <span className={styles.fileNameText}>{f.name}</span>
                  </Col>

                  <Col
                    span={6}
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Space align="center" size={8}>
                      <PopoverButton
                        className={styles.edit}
                        trigger={["click"]}
                        icon={<EditOutlined />}
                        isVisible={
                          editPopover?.id === f.id &&
                          editPopover?.type === "edit"
                        }
                        onVisibleChange={onPopoverChange(f, "edit")}
                        content={
                          <DataSchemaForm
                            defaultValues={f}
                            onSubmit={(d) =>
                              onSchemaUpdate(f.id, {
                                ...f,
                                ...d,
                              })
                            }
                          />
                        }
                        buttonProps={{
                          size: "small",
                          type: "link",
                          className: styles.fileControl,
                        }}
                      />

                      <PopoverButton
                        popoverType="popconfirm"
                        title={t("sure_delete")}
                        buttonProps={{
                          size: "small",
                          type: "link",
                          className: styles.fileControl,
                        }}
                        isVisible={
                          editPopover?.id === f.id &&
                          editPopover?.type === "remove"
                        }
                        onVisibleChange={onPopoverChange(f, "remove")}
                        trigger={"click"}
                        onConfirm={(e) => {
                          e?.preventDefault();
                          e?.stopPropagation();
                          onSchemaDelete(f);
                        }}
                        okText={t("common:words.remove")}
                        cancelText={t("common:words.cancel")}
                        icon={<DeleteOutlined />}
                      />
                    </Space>
                  </Col>
                </Row>
                {"matchedLines" in f &&
                  Object.entries(f.matchedLines || {}).map(
                    ([lineIndex, match]) => (
                      <Highlight
                        key={lineIndex}
                        index={Number(lineIndex)}
                        text={match.line}
                        indices={match.indices}
                      />
                    )
                  )}
              </div>
            );
          })}
        </Space>
      </div>
    </Space>
  );
};

export default ModelsSidebar;
