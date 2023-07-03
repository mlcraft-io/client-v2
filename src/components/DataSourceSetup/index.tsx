import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import cn from "classnames";

import type { DataSource, DataSoureSetupField } from "@/types/dataSource";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

interface DataSourceSetupProps {
  dataSource: DataSource;
  fields: DataSoureSetupField[];
  name: string;
}

const DataSourceSetup: FC<DataSourceSetupProps> = ({
  dataSource,
  fields,
  name,
}) => {
  const { t } = useTranslation(["dataSetupForm", "common"]);

  const [error, setError] = useState<boolean>(false);
  const windowSize = useResponsive();

  const renderField = (field: DataSoureSetupField) => {
    switch (field.type) {
      case "checkbox":
        return (
          <Form.Item
            className={styles.label}
            name={field.name}
            label={field.label}
          >
            <Checkbox checked={field.value === "yes"}>
              <span className={styles.checkbox}>{field.placeholder}</span>
            </Checkbox>
          </Form.Item>
        );
      case "password":
        return (
          <Form.Item
            className={styles.label}
            name={field.name}
            label={field.label}
          >
            <Input.Password
              placeholder={field.placeholder}
              type={field.type}
              defaultValue={field.value}
            />
          </Form.Item>
        );
      default:
        return (
          <Form.Item
            className={styles.label}
            key={field.name}
            name={field.name}
            label={field.label}
          >
            <Input
              placeholder={field.placeholder}
              type={field.type}
              defaultValue={field.value}
            />
          </Form.Item>
        );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <div className={styles.dataSource}>
          <div className={styles.iconWrapper}>{dataSource.icon}</div>
          <Title className={styles.title} level={3}>
            {dataSource.name}
          </Title>
        </div>

        <Text className={styles.text}>
          {t("text.line1")} <br /> {t("text.line2")}
        </Text>
      </div>
      <Form
        className={styles.form}
        layout="vertical"
        id="setup-form"
        onFinish={console.log}
      >
        <Form.Item className={styles.label} label="Name*" name="name">
          <Input placeholder={name} value={name} disabled />
        </Form.Item>

        <Row gutter={[16, 16]}>
          {fields.map((f) => (
            <Col key={f.name} xs={24} sm={12}>
              {renderField(f)}
            </Col>
          ))}
        </Row>

        <Row>
          <Button
            className={cn(styles.back, { [styles.sm]: !windowSize.sm })}
            size="large"
            color="primary"
          >
            {t("common:words.back")}
          </Button>
          <Button
            className={cn(styles.submit, { [styles.sm]: !windowSize.sm })}
            form="setup-form"
            type="primary"
            size="large"
            htmlType="submit"
          >
            {t("common:words.apply")}
          </Button>

          <Button
            className={styles.link}
            type="link"
            onClick={() => setError(true)}
          >
            {t("common:words.test_connection")}
          </Button>

          <Button className={cn(styles.link, styles.skip)} type="link">
            {t("common:words.skip")}
          </Button>
        </Row>
      </Form>
      {error && <Alert message="Error" type="error" />}
    </div>
  );
};

export default DataSourceSetup;
