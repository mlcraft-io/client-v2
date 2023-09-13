import { Col, Row } from "antd";
import { useController } from "react-hook-form";

import DataModelSelection from "@/components/DataModelSelection";
import DataAccessSelection from "@/components/DataAccessSelection";
import type {
  AccessType,
  DataAccessOption,
  DataModel,
  DataModelOption,
  DataResource,
} from "@/types/access";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";

interface AccessControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  resource: DataResource;
  defaultOpen?: string;
  defaultValue?: PathValue<T, Path<T>>;
}

export const detectAccessType = (model: DataModel, value): AccessType => {
  if (!value || !value || !value?.[model.title]) return "no";

  const noAccess = Object.keys(value?.[model.title])?.every(
    (k) => value?.[model.title][k]?.length === 0
  );

  if (noAccess) return "no";

  const selected = Object.keys(value?.[model.title])?.reduce(
    (sum, k2) => value?.[model.title][k2].length + sum,
    0
  );
  const all = Object.keys(model)
    .filter((key) => key !== "title")
    .reduce((sum, key) => sum + model[key as keyof DataModel].length, 0);

  if (selected < all) return "partial";

  return "full";
};

const AccessController: <T extends FieldValues>(
  props: AccessControllerProps<T>
) => JSX.Element = ({
  control,
  resource,
  defaultOpen = "",
  defaultValue,
  name,
}) => {
  const [selectedModel, setSelectedModel] = useState<string>(defaultOpen);

  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const createDataAccessSelection = (): DataAccessOption => {
    const model = resource.dataModels.find((m) => m.title === selectedModel);
    return {
      measures: model?.measures,
      dimensions: model?.dimensions,
      segments: model?.segments,
    } as DataAccessOption;
  };

  const onAccessChange = (v: DataAccessOption) => {
    console.log("v", v);
    if (typeof value === "object") {
      value[resource.id] = {
        ...value[resource.id],
        [selectedModel]: v,
      };
      onChange(value);
    } else {
      onChange({
        [selectedModel]: v,
      });
    }
  };

  const dataModels = useMemo(() => {
    return resource.dataModels?.map((m) => ({
      title: m.title,
      access: detectAccessType(m, value?.[resource?.id]),
    }));
  }, [resource.dataModels, resource?.id, value]);

  useEffect(() => {
    if (resource?.dataModels?.length) {
      setSelectedModel(resource.dataModels[0].title);
    }
  }, [resource?.dataModels, name]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} lg={12}>
        <DataModelSelection
          onChange={(activeTitle) => setSelectedModel(activeTitle)}
          title={resource.title}
          dataModels={dataModels}
          active={selectedModel}
        />
      </Col>
      <Col span={24} lg={12}>
        {selectedModel && (
          <DataAccessSelection
            options={createDataAccessSelection()}
            onChange={onAccessChange}
            value={value?.[resource.id]?.[selectedModel]}
          />
        )}
      </Col>
    </Row>
  );
};

export default AccessController;
