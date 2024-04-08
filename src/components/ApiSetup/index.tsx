import { Col, Form, Row, Typography } from "antd";
import cn from "classnames";
import { useTranslation } from "react-i18next";
import { useResponsive } from "ahooks";
import { useForm } from "react-hook-form";

import type { ApiSetupField, ApiSetupForm } from "@/types/dataSource";
import Input from "@/components/Input";
import Button from "@/components/Button";
import CurrentUserStore from "@/stores/CurrentUserStore";

import CopyIcon from "@/assets/copy.svg";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

export const CONNECTION_DEFAULT = "psql";

declare global {
  interface Window {
    CUBEJS_MYSQL_API_URL?: string;
    CUBEJS_PG_API_URL?: string;
  }
}

const CUBEJS_MYSQL_API_URL =
  window.CUBEJS_MYSQL_API_URL !== undefined
    ? window.CUBEJS_MYSQL_API_URL
    : (import.meta.env.VITE_CUBEJS_MYSQL_API_URL as string);

const CUBEJS_PG_API_URL =
  window.CUBEJS_PG_API_URL !== undefined
    ? window.CUBEJS_PG_API_URL
    : (import.meta.env.VITE_CUBEJS_PG_API_URL as string);

export const connectionUrls: Record<string, string> = {
  mysql: CUBEJS_MYSQL_API_URL,
  psql: CUBEJS_PG_API_URL,
};

const defaultConnectionOptions = [
  {
    value: "psql",
    label: "PSQL",
    disabled: false,
    name: "connection",
  },
  {
    value: "mysql",
    label: "MySQL",
    disabled: false,
    name: "connection",
  },
];

interface ApiSetupProps {
  onSubmit: (data: ApiSetupForm) => void;
  onGoBack?: () => void;
  isOnboarding?: boolean;
  isNew?: boolean;
  initialValue: ApiSetupForm | undefined;
  connectionOptions?: ApiSetupField[];
}

const connectionData = [
  { label: "Host/URL", value: "host", name: "host", disabled: true },
  { label: "Database", value: "db", name: "db", disabled: true },
  {
    label: "Login (auto-generated)",
    name: "db_username",
  },
  {
    label: "Password (auto-generated)",
    type: "password",
    name: "password",
  },
];

const ApiSetup: FC<ApiSetupProps> = ({
  connectionOptions = defaultConnectionOptions,
  initialValue,
  isOnboarding,
  isNew,
  onSubmit,
  onGoBack,
}) => {
  const { teamData } = CurrentUserStore();
  const { control, handleSubmit, setValue, getValues, watch, resetField } =
    useForm<ApiSetupForm>({
      values: initialValue,
    });

  const { t } = useTranslation(["apiSetup", "common"]);
  const windowSize = useResponsive();

  const getLabel = (key: string) => t(`common:form.labels.${key}`, key);

  const createConnectionString = useCallback(
    ({
      connection = CONNECTION_DEFAULT,
      host = connectionUrls[CONNECTION_DEFAULT],
      user = initialValue?.db_username,
      password = initialValue?.password,
      database = initialValue?.db,
    }) => {
      const [hostname, port] = host ? host?.split?.(":") : [];

      const portOption = port ? `-P ${port}` : "";
      const psqlPortOption = port ? `--port=${port}` : "";

      if (connection === "mysql") {
        return `mysql -u ${user} -p -h ${hostname} ${portOption} -D ${database}`;
      }

      return `psql --host=${hostname} ${psqlPortOption} --username=${user} --dbname=${database}`;
    },
    [initialValue?.password, initialValue?.db_username, initialValue?.db]
  );

  const onDownload = () => {
    const formValues = getValues();
    delete formValues.datasource_id;
    delete formValues.user_id;

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formValues, null, 2));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "credentials.json";
    link.click();
    link.remove();
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (["password", "db_username", "connection"].includes(name || "")) {
        const connectionValues = {
          user: value.db_username,
          password: value.password,
          host: connectionUrls[value.connection || CONNECTION_DEFAULT],
          connection: value.connection,
        };

        resetField("host", {
          defaultValue: connectionValues.host,
        });

        resetField("connection_string", {
          defaultValue: createConnectionString(connectionValues),
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [createConnectionString, resetField, setValue, watch]);

  return (
    <div>
      <Title level={3} style={{ marginTop: 0 }}>
        {t("title")}
      </Title>

      <Text>{t("text")}</Text>

      <Form layout="vertical" id="api-setup">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Input
              control={control}
              name="user_id"
              fieldType="select"
              label={getLabel("team_member")}
              defaultValue={initialValue?.user_id}
              options={(teamData?.members || []).map((m) => ({
                value: m.user_id,
                label: m.displayName,
              }))}
              disabled={!isOnboarding || !isNew}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Input
              className={styles.input}
              control={control}
              name="datasource_id"
              fieldType="select"
              label={getLabel("data_source")}
              defaultValue={initialValue?.datasource_id}
              options={(teamData?.dataSources || []).map((d) => ({
                value: d.id as string,
                label: d.name,
              }))}
              disabled={!isOnboarding || !isNew}
            />
          </Col>
        </Row>

        <Input
          control={control}
          name="connection"
          label={getLabel("connect_via")}
          size="large"
          optionType="button"
          options={connectionOptions}
          defaultValue={CONNECTION_DEFAULT}
          fieldType="radio"
        />

        <Row gutter={[16, 16]}>
          {connectionData.map((f) => {
            const name = f.name as keyof ApiSetupForm;
            return (
              <Col key={f.label} xs={24} sm={12}>
                <Input
                  control={control}
                  name={name}
                  defaultValue={initialValue?.[name]}
                  fieldType={f.type}
                  label={f.label}
                  disabled={f.disabled || !isOnboarding || !isNew}
                  suffix={
                    <CopyIcon
                      className={styles.icon}
                      onClick={() =>
                        navigator.clipboard.writeText(getValues(name) || "")
                      }
                    />
                  }
                />
              </Col>
            );
          })}
        </Row>

        <div className={cn(styles.textareaWrapper, styles.label)}>
          <Input
            control={control}
            defaultValue={
              initialValue
                ? createConnectionString({
                    user: initialValue?.db_username,
                    password: initialValue?.password,
                    host: connectionUrls[CONNECTION_DEFAULT],
                    connection: initialValue?.connection,
                  })
                : ""
            }
            name="connection_string"
            fieldType="textarea"
            label={`${getLabel("connect_using")} ${
              watch("connection") || CONNECTION_DEFAULT
            }-client`}
            disabled
          />

          <CopyIcon
            className={cn(styles.icon, styles.textareaCopy)}
            onClick={() =>
              navigator.clipboard.writeText(
                getValues("connection_string") || ""
              )
            }
          />
        </div>

        <Row align="middle" justify={"space-between"}>
          <Col xs={24} md={18}>
            {!isOnboarding && (
              <Button
                className={cn(styles.back, {
                  [styles.fullwidth]: !windowSize.md,
                })}
                size="large"
                color="primary"
                onClick={onGoBack}
              >
                {t("common:words.back")}
              </Button>
            )}
            <Button
              className={cn(styles.submit, {
                [styles.fullwidth]: !windowSize.md,
              })}
              type="primary"
              size="large"
              htmlType="submit"
              form="api-setup"
              onClick={handleSubmit(onSubmit)}
            >
              {!isOnboarding
                ? t("common:words.close")
                : t("common:words.finish")}
            </Button>

            <Button
              className={cn(styles.link, {
                [styles.fullwidth]: !windowSize.md,
              })}
              type="link"
              onClick={onDownload}
            >
              {t("common:words.download_credentials")}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ApiSetup;
