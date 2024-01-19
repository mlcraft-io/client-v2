import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import SidebarLayout from "@/layouts/SidebarLayout";
import ExploreDataSection from "@/components/ExploreDataSection";
import ErrorFound from "@/components/ErrorFound";
import ExploreCubes from "@/components/ExploreCubes";
import usePlayground, { queryStateKeys } from "@/hooks/usePlayground";
import useExploreWorkspace from "@/hooks/useExploreWorkspace";
import useDimensions from "@/hooks/useDimensions";
import useLocation from "@/hooks/useLocation";
import ExploreFiltersSection from "@/components/ExploreFiltersSection";
import AppLayout from "@/layouts/AppLayout";
import pickKeys from "@/utils/helpers/pickKeys";
import type { Branch, DataSourceInfo } from "@/types/dataSource";
import type { QuerySettings } from "@/types/querySettings";
import type { ExplorationData, RawSql } from "@/types/exploration";
import ExploreSegmentsSection from "@/components/ExploreSegmentsSection";
import type { Meta } from "@/types/cube";
import { SOURCES } from "@/utils/constants/paths";

import NoDataSource from "../NoDataSource";

import styles from "./index.module.less";

import type { FC, ReactNode } from "react";

const DEFAULT_ROW_HEIGHT = 20;
const DEFAULT_HEADER_HEIGHT = 30;

interface ExploreWorkspaceProps {
  loading: boolean;
  meta: Meta;
  source?: DataSourceInfo;
  dataSources?: DataSourceInfo[];
  currentBranch?: Branch;
  explorationData?: ExplorationData;
  rawSql?: RawSql;
  runQuery: (state: object, settings: QuerySettings) => void;
  onOpenModal: (type: string) => void;
  header?: ReactNode;
  subTitle?: ReactNode;
  icon?: ReactNode;
}

const ExploreWorkspace: FC<ExploreWorkspaceProps> = (props) => {
  const {
    header = null,
    subTitle = "Explore",
    currentBranch,
    source: dataSource,
    dataSources,
    meta,
    explorationData,
    rawSql,
    runQuery = () => {},
    onOpenModal = () => {},
    loading = false,
    icon,
  } = props;

  const { t } = useTranslation(["common"]);
  const [location, setLocation] = useLocation();
  const { screenshotMode } = location?.query || {};
  const isScreenshotMode = screenshotMode !== undefined;
  const selector = isScreenshotMode
    ? document.querySelector(".ant-layout-content")
    : document.querySelector("#data-view");

  const { size } = useDimensions(selector);
  const width = size?.width;

  const {
    selectedQueryMembers = {},
    availableQueryMembers = {},
    state: explorationState,
    analyticsQuery: {
      state: playgroundState,
      updateMember,
      isQueryChanged,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    settings,
    dispatchSettings,
  } = usePlayground({
    explorationData,
    meta: meta.data,
    rawSql,
  });

  const { collapseState, state, onToggleSection, onDataSectionChange } =
    useExploreWorkspace({
      selectedQueryMembers,
    });

  const tableHeight = useMemo(
    () =>
      DEFAULT_ROW_HEIGHT * explorationState.rows.length + DEFAULT_HEADER_HEIGHT,
    [explorationState.rows.length]
  );

  const onRunQuery = useCallback(
    (e?: Event) => {
      const curExplorationState = pickKeys(queryStateKeys, playgroundState);
      runQuery(curExplorationState, settings);

      e?.preventDefault();
      e?.stopPropagation();
    },
    [playgroundState, runQuery, settings]
  );

  const onQueryChange = useCallback(
    (type: string, ...args: any) => {
      switch (type) {
        case "limit":
          setLimit(args[0]);
          break;
        case "offset":
          setOffset(args[0]);
          break;
        case "page":
          setPage(args[0]);
          break;
        case "order":
          return setOrderBy;
        case "hideCubeNames":
          dispatchSettings({ type: "hideCubeNames", value: args[0] });
          break;
        case "hideIndexColumn":
          dispatchSettings({ type: "hideIndexColumn", value: args[0] });
          break;
        default:
          return () => {};
      }
    },
    [dispatchSettings, setLimit, setOffset, setOrderBy, setPage]
  );

  if (Object.keys(dataSource || {}).length && !availableQueryMembers) {
    return <ErrorFound status={500} />;
  }

  const dataSection = (
    <ExploreDataSection
      key="dataSec"
      width={width}
      height={isScreenshotMode ? tableHeight : 400}
      selectedQueryMembers={selectedQueryMembers}
      dataSource={dataSource}
      currentBranch={currentBranch}
      onExec={onRunQuery}
      onQueryChange={onQueryChange}
      onOpenModal={onOpenModal}
      disabled={!isQueryChanged}
      state={state}
      loading={loading}
      playgroundState={playgroundState}
      queryState={explorationState}
      disableButtons={!explorationData?.exploration?.id}
      screenshotMode={isScreenshotMode}
      rowHeight={DEFAULT_ROW_HEIGHT}
      onToggleSection={onToggleSection}
      onSectionChange={(value: string) => onDataSectionChange(value)}
      isActive={collapseState.activePanelKey.includes("dataSec")}
    />
  );

  if (isScreenshotMode) {
    return dataSection;
  }

  const sidebar = (
    <>
      {header}
      <Spin spinning={meta.loading} wrapperClassName={styles.spinWrapper}>
        <ExploreCubes
          availableQueryMembers={availableQueryMembers}
          selectedQueryMembers={selectedQueryMembers}
          onMemberSelect={updateMember}
          error={meta.error}
        />
      </Spin>
    </>
  );

  const Layout = !!!dataSources?.length ? AppLayout : SidebarLayout;
  const showFiltersSection =
    !!state.filtersCount && state.dataSection === "results";

  return (
    <Layout
      title={dataSource?.name || t("explore")}
      icon={icon}
      divider
      subTitle={t("explore")}
      items={sidebar}
      burgerTitle={subTitle as any}
    >
      {!!dataSources?.length ? (
        <div id="data-view">
          {dataSection}
          {selectedQueryMembers.segments.length > 0 && (
            <ExploreSegmentsSection
              segments={selectedQueryMembers.segments}
              onRemove={(segment) => updateMember("segments").remove(segment)}
              key={"segmentsSec"}
              onToggleSection={onToggleSection}
              isActive={collapseState.activePanelKey.includes("segmentsSec")}
            />
          )}
          {showFiltersSection && (
            <ExploreFiltersSection
              key="filtersSec"
              availableQueryMembers={availableQueryMembers}
              selectedQueryMembers={selectedQueryMembers}
              onToggleSection={onToggleSection}
              onMemberChange={updateMember}
              state={state}
              isActive={collapseState.activePanelKey.includes("filtersSec")}
            />
          )}
        </div>
      ) : (
        <NoDataSource onConnect={() => setLocation(`${SOURCES}/new`)} />
      )}
    </Layout>
  );
};

export default ExploreWorkspace;
