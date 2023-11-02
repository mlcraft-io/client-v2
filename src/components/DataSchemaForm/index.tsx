import { Form, Input, Space } from "antd";

import Button from "@/components/Button";
import type { AllDataSchemasQuery } from "@/graphql/generated";

import type { FC } from "react";

interface DataSchemaFormProps {
  defaultValues?: Partial<
    AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
  >;
  onSubmit: (
    values: Partial<
      AllDataSchemasQuery["branches"][number]["versions"][number]["dataschemas"][number]
    >
  ) => void;
}

const DataSchemaForm: FC<DataSchemaFormProps> = ({
  defaultValues = {
    name: "",
  },
  onSubmit,
}) => {
  const [value, setValue] = useState<string>(defaultValues.name || "");
  const [error, setError] = useState<boolean>(false);

  const onFormSubmit = () => {
    if (!value) {
      setError(true);
      return;
    }

    onSubmit({ name: value });
  };

  return (
    <Space direction="vertical" size={0}>
      <Form layout="vertical">
        <Form.Item label="* Filename:">
          <Input
            status={error ? "error" : undefined}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form.Item>
      </Form>

      <Button
        type="primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFormSubmit();
        }}
      >
        Save
      </Button>
    </Space>
  );
};

export default DataSchemaForm;