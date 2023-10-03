import { useMemo, useCallback, useState, useEffect, useReducer } from "react";
import { useDeepCompareEffect } from "ahooks";

import useLocation from "@/hooks/useLocation";
import useAppSettings from "@/hooks/useAppSettings";
import useDataSourceMeta from "@/hooks/useDataSourcesMeta";
import useAnalyticsQuery, {
  queryState,
  initialState,
} from "@/hooks/useAnalyticsQuery";
import useExplorationData from "@/hooks/useExplorationData";
import trackEvent from "@/utils/helpers/trackEvent";
import pickKeys from "@/utils/helpers/pickKeys";
import equals from "@/utils/helpers/equals";
import type { CubeMembers } from "@/types/cube";
import { exploreMock } from "@/mocks/explore";

const queryStateKeys = Object.keys(queryState);

const initialSettings = {
  hideCubeNames: false,
  hideIndexColumn: false,
};

const reducer = (state: any, action: any) => {
  if (action.type === "hideCubeNames") {
    return {
      ...state,
      hideCubeNames: action.value,
    };
  }
  if (action.type === "hideIndexColumn") {
    return {
      ...state,
      hideIndexColumn: action.value,
    };
  }
  if (action.type === "update") {
    return action.value;
  }

  throw new Error(`Unknown action ${action.type}.`);
};

export const getTitle = (settings: any, column: any) =>
  settings.hideCubeNames ? column.shortTitle : column.title;

export const getColumns = (selectedQueryMembers: CubeMembers, settings = {}) =>
  [
    ...Object.values(selectedQueryMembers.dimensions || {}).map((d) => ({
      ...d,
      name: d.granularity ? `${d.dimension}.${d.granularity}` : d.name,
    })),
    ...Object.values(selectedQueryMembers.measures || {}),
  ].map((c) => ({
    id: c.name,
    Header: getTitle(settings, c),
    accessor: (row: any) => row[c.name],
    colId: c.name,
    type: c.type,
  }));

interface Props {
  dataSourceId: string;
  meta: [];
  editId: string;
  rowsLimit: number;
  offset: number;
}

interface State {
  dimensions: string[];
  filters: string[];
  limit: number;
  measures: string[];
  offset: number;
  order: [];
  page: number;
  segments: string[];
  timeDimensions: { dimension: string; granularity: string }[];
  timezone: string;
}

export default ({
  dataSourceId,
  meta = [],
  editId,
  rowsLimit,
  offset,
}: Props) => {
  const [, setLocation] = useLocation();
  const { withAuthPrefix } = useAppSettings();
  const [settings, dispatchSettings] = useReducer(reducer, initialSettings);

  // const {
  //   current,
  //   currentProgress,
  //   queries: { currentData, execQueryCurrent },
  //   mutations: {
  //     createMutation,
  //     execCreateMutation,
  //     genSqlMutation,
  //     execGenSqlMutation,
  //   },
  // } = useExplorations({
  //   params: {
  //     editId,
  //     rowsLimit,
  //     offset,
  //   },
  //   pauseQueryAll: true,
  // });

  const current = exploreMock.exploration.data.explorations_by_pk;
  const currentData = exploreMock.exploration;
  const genSqlMutation = exploreMock.sql;
  const createMutation = exploreMock.exploration;

  // useEffect(() => {
  //   if (editId) {
  //     execGenSqlMutation({ exploration_id: editId });
  //   }
  // }, [editId, execGenSqlMutation]);

  const playgroundSettings = useMemo(
    () => current.playground_settings || {},
    [current]
  );

  useDeepCompareEffect(() => {
    dispatchSettings({ type: "update", value: playgroundSettings });
  }, [playgroundSettings]);

  const {
    state: currPlaygroundState,
    dispatch,
    updateMember,
    setLimit,
    setOffset,
    setPage,
    setOrderBy,
    doReset,
  } = useAnalyticsQuery();

  const { selectedQueryMembers, availableQueryMembers } = useDataSourceMeta({
    meta,
    playgroundState: currPlaygroundState,
  });

  const { rows, hitLimit, skippedMembers } = useExplorationData({
    explorationResult: currentData.data?.fetch_dataset,
  });

  const columns = useMemo(() => {
    if (!selectedQueryMembers) {
      return [];
    }

    return getColumns(selectedQueryMembers, settings);
  }, [selectedQueryMembers, settings]);

  const explorationState = useMemo(
    () => ({
      loading: false,
      progress: {},
      hitLimit,
      columns,
      rows,
      ...currPlaygroundState,
      rawSql: genSqlMutation.data?.gen_sql?.sql,
      skippedMembers,
      settings,
    }),
    [
      genSqlMutation.data,
      hitLimit,
      columns,
      rows,
      currPlaygroundState,
      skippedMembers,
      settings,
    ]
  );

  const [isQueryChanged, setChangedStatus] = useState(false);

  useEffect(() => {
    const { playground_state: playgroundState = queryState } = current;

    const isChanged = !equals(
      pickKeys(queryStateKeys, playgroundState),
      pickKeys(queryStateKeys, currPlaygroundState)
    );

    if (isQueryChanged !== isChanged) {
      setChangedStatus(isChanged);
    }
  }, [isQueryChanged, currPlaygroundState, current]);

  useEffect(() => {
    const newState = current.playground_state;

    if (newState) {
      doReset(newState);
    }
  }, [current.playground_state, doReset]);

  useEffect(() => {
    if (!editId) {
      doReset(initialState);
    }
  }, [editId, doReset]);

  const runQuery = useCallback(() => {
    trackEvent("Run Query");

    const explorationQueryState = pickKeys(queryStateKeys, currPlaygroundState);
    const newExplorationObj = {
      datasource_id: dataSourceId,
      playground_state: explorationQueryState,
      playground_settings: settings,
    };

    // return execCreateMutation({ object: newExplorationObj });
  }, [currPlaygroundState, dataSourceId, settings]);

  const reset = useCallback(
    (explorationId: string) =>
      setLocation(withAuthPrefix(`/explore/${dataSourceId}/${explorationId}`)),
    [dataSourceId, setLocation, withAuthPrefix]
  );

  useEffect(() => {
    if (createMutation.data) {
      reset(createMutation.data?.insert_explorations_one?.id);
      createMutation.data = null;
    }
  }, [reset]);

  return {
    state: explorationState,
    exploration: current,
    // explorationLoading: currentData.fetching,
    // loadExploration: execQueryCurrent,
    selectedQueryMembers,
    availableQueryMembers,
    analyticsQuery: {
      state: currPlaygroundState,
      dispatch,
      updateMember,
      isQueryChanged,
      runQuery,
      setLimit,
      setOffset,
      setPage,
      setOrderBy,
    },
    dispatchSettings,
  };
};
