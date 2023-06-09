import type { DataSoureSetupField } from "@/types/dataSource";

import Postgres from "@/assets/databases/postgre.svg";
import Mysql from "@/assets/databases/my-sql.svg";
import Mongo from "@/assets/databases/mongo.svg";
import ClickHouse from "@/assets/databases/click-house.svg";
import Redshift from "@/assets/databases/redshift.svg";
import Bigquery from "@/assets/databases/big-query.svg";
import Trino from "@/assets/databases/trino.svg";
import Mssql from "@/assets/databases/ms-sql.svg";
import Druid from "@/assets/databases/druid.svg";
import Elasticsearch from "@/assets/databases/elastic-search.svg";
import Presto from "@/assets/databases/presto.svg";
import Databricks from "@/assets/databases/databricks.svg";
import Firebolt from "@/assets/databases/firebolt.svg";
import Ksql from "@/assets/databases/ksql.svg";
import Dremio from "@/assets/databases/dremio.svg";
import Crate from "@/assets/databases/crate.svg";
import Quest from "@/assets/databases/quest.svg";
import Snowflake from "@/assets/databases/snowflake.svg";
import Materialize from "@/assets/databases/materialize.svg";

export const dbTiles = [
  { name: "Postgres", value: "postgres", icon: <Postgres /> },
  { name: "MySQL", value: "mysql", icon: <Mysql /> },
  { name: "Mongo DB", value: "mongobi", icon: <Mongo /> },
  { name: "ClickHouse", value: "click-house", icon: <ClickHouse /> },
  { name: "Redshift", value: "reshift", icon: <Redshift /> },
  { name: "BigQuery", value: "bigquery", icon: <Bigquery /> },
  { name: "Trino", value: "trino", icon: <Trino /> },
  { name: "MSSQL", value: "mssql", icon: <Mssql /> },
  { name: "DRUID", value: "druid", icon: <Druid /> },
  { name: "ElasticSearch", value: "elasticsearch", icon: <Elasticsearch /> },
  { name: "PrestoDB", value: "prestodb", icon: <Presto /> },
  { name: "Databricks", value: "databricks-jdbc", icon: <Databricks /> },
  { name: "Firebolt", value: "firebolt", icon: <Firebolt /> },
  { name: "KSQL", value: "ksql", icon: <Ksql /> },
  { name: "Dremio", value: "default", icon: <Dremio /> },
  { name: "Crate", value: "default", icon: <Crate /> },
  { name: "QuestDB", value: "questdb", icon: <Quest /> },
  { name: "Snowflake", value: "snowflake", icon: <Snowflake /> },
  { name: "Materialize", value: "default", icon: <Materialize /> },
];

export const defaultForm: DataSoureSetupField[] = [
  {
    name: "db_params.database",
    label: "db_name",
    rules: {
      required: true,
    },
    placeholder: "ML_dbname",
    type: "text",
  },
  {
    name: "db_params.host",
    label: "host",
    rules: {
      required: true,
    },
    placeholder: "db1.ao.us-west-1.rds.amazonaws.com",
    type: "text",
  },
  {
    name: "db_params.port",
    label: "port",
    rules: {
      required: true,
    },
    placeholder: "5432",
    type: "number",
  },
  {
    name: "db_params.user",
    label: "user",
    rules: {
      required: true,
    },
    placeholder: "db_username",
    type: "text",
  },
  {
    name: "db_params.password",
    label: "password",
    rules: {
      required: false,
    },
    placeholder: "db_password",
    type: "password",
  },
  {
    name: "db_params.ssl",
    label: "use_ssl",
    value: "yes",
    placeholder: "use_ssl",
    type: "checkbox",
  },
];

type Form = Record<string, DataSoureSetupField[]>;

export const dataSourceForms: Form = {
  default: defaultForm,
  bigquery: [
    {
      name: "db_params.keyFile",
      label: "key_file",
      rules: {
        required: true,
      },
      placeholder: "attach_file_credentials",
      type: "file",
    },
    {
      name: "db_params.projectId",
      label: "project_id",
      rules: {
        required: true,
      },
      type: "text",
    },
  ],
  mongobi: [
    ...defaultForm,
    {
      name: "db_params.ca",
      label: "ssl_ca",
      type: "text",
    },
    {
      name: "db_params.cert",
      label: "ssl_cert",
      type: "text",
    },
    {
      name: "db_params.ciphers",
      label: "ssl_ciphers",
      type: "text",
    },
    {
      name: "db_params.passphrase",
      label: "ssl_passphrase",
      type: "text",
    },
  ],
  elasticsearch: [
    {
      name: "db_params.url",
      label: "url",
      rules: {
        required: true,
      },
      type: "text",
    },
    {
      name: "db_params.username",
      label: "user",
      type: "text",
    },
    {
      name: "db_params.password",
      label: "password",
      type: "password",
    },
    {
      name: "db_params.apiId",
      label: "api_id",
      type: "text",
    },
    {
      name: "db_params.apiKey",
      label: "api_key",
      type: "text",
    },
    {
      name: "db_params.ssl",
      label: "use_ssl",
      value: "yes",
      placeholder: "use_ssl",
      type: "checkbox",
    },
  ],
  druid: [
    {
      name: "db_params.host",
      label: "host",
      rules: {
        required: true,
      },
      placeholder: "example.com",
      type: "text",
    },
    {
      name: "db_params.port",
      label: "port",
      rules: {
        required: true,
      },
      placeholder: "8082",
      type: "number",
    },
    {
      name: "db_params.user",
      label: "user",
      rules: {
        required: false,
      },
      placeholder: "username",
      type: "text",
    },
    {
      name: "db_params.password",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "password",
      type: "password",
    },
  ],
  prestodb: [
    {
      name: "db_params.host",
      label: "host",
      rules: {
        required: true,
      },
      placeholder: "example.com",
      type: "text",
    },
    {
      name: "db_params.port",
      label: "port",
      rules: {
        required: true,
      },
      placeholder: "8080",
      type: "number",
    },
    {
      name: "db_params.catalog",
      label: "catalog",
      rules: {
        required: true,
      },
      placeholder: "catalog_name",
      type: "text",
    },
    {
      name: "db_params.schema",
      label: "schema",
      rules: {
        required: false,
      },
      placeholder: "schema",
      type: "text",
    },
    {
      name: "db_params.user",
      label: "user",
      rules: {
        required: false,
      },
      placeholder: "db_username",
    },
    {
      name: "db_params.pass",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "db_password",
      type: "password",
    },
    {
      name: "db_params.ssl",
      label: "use_ssl",
      value: "yes",
      type: "checkbox",
    },
  ],
  trino: [
    {
      name: "db_params.host",
      label: "host",
      rules: {
        required: true,
      },
      placeholder: "example.com",
      type: "text",
    },
    {
      name: "db_params.port",
      label: "port",
      rules: {
        required: true,
      },
      placeholder: "8080",
      type: "number",
    },
    {
      name: "db_params.catalog",
      label: "catalog",
      rules: {
        required: true,
      },
      placeholder: "catalog_name",
      type: "text",
    },
    {
      name: "db_params.schema",
      label: "schema",
      rules: {
        required: false,
      },
      placeholder: "schema",
      type: "text",
    },
    {
      name: "db_params.user",
      label: "user",
      rules: {
        required: false,
      },
      placeholder: "db_username",
    },
    {
      name: "db_params.pass",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "db_password",
      type: "password",
    },
    {
      name: "db_params.ssl",
      label: "use_ssl",
      value: "yes",
      type: "checkbox",
    },
  ],
  snowflake: [
    {
      name: "db_params.database",
      label: "db_name",
      rules: {
        required: true,
      },
      placeholder: "SNOWFLAKE",
      type: "text",
    },
    {
      name: "db_params.warehouse",
      label: "warehouse",
      rules: {
        required: true,
      },
      placeholder: "MY_WAREHOUSE",
      type: "text",
    },
    {
      name: "db_params.orgId",
      label: "organization_id",
      rules: {
        required: true,
      },
      placeholder: "ABCDEF",
      type: "text",
    },
    {
      name: "db_params.accountId",
      label: "account_id",
      rules: {
        required: true,
      },
      placeholder: "AB12345",
      type: "text",
    },
    {
      name: "db_params.username",
      label: "username",
      rules: {
        required: true,
      },
      placeholder: "user",
      type: "text",
    },
    {
      name: "db_params.password",
      label: "password",
      rules: {
        required: true,
      },
      placeholder: "pass",
      type: "password",
    },
    {
      name: "db_params.role",
      label: "role",
      rules: {
        required: true,
      },
      placeholder: "PUBLIC",
      type: "text",
    },
  ],
  questdb: [
    {
      name: "db_params.database",
      label: "db_name",
      rules: {
        required: false,
      },
      placeholder: "ML_dbname",
      type: "text",
    },
    {
      name: "db_params.host",
      label: "host",
      rules: {
        required: true,
      },
      placeholder: "db1.ao.us-west-1.rds.amazonaws.com",
      type: "text",
    },
    {
      name: "db_params.port",
      label: "port",
      rules: {
        required: true,
      },
      placeholder: "5432",
      type: "number",
    },
    {
      name: "db_params.user",
      label: "user",
      rules: {
        required: false,
      },
      placeholder: "db_username",
      type: "text",
    },
    {
      name: "db_params.password",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "db_password",
      type: "password",
    },
    {
      name: "db_params.ssl",
      label: "use_ssl",
      value: "yes",
      type: "checkbox",
    },
  ],
  firebolt: [
    {
      name: "db_params.database",
      label: "db_name",
      rules: {
        required: true,
      },
      placeholder: "db_name",
      type: "text",
    },
    {
      name: "db_params.username",
      label: "username",
      rules: {
        required: false,
      },
      placeholder: "user",
      type: "text",
    },
    {
      name: "db_params.password",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "pass",
      type: "password",
    },
    {
      name: "db_params.engineName",
      label: "engine_name",
      rules: {
        required: false,
      },
      type: "text",
    },
    {
      name: "db_params.apiEndpoint",
      label: "api_endpoint",
      rules: {
        required: false,
      },
      placeholder: "api.dev.firebolt.io, api.app.firebolt.io",
      type: "text",
    },
  ],
  "databricks-jdbc": [
    {
      name: "db_params.token",
      label: "access_token",
      rules: {
        required: true,
      },
      type: "text",
    },
    {
      name: "db_params.url",
      label: "databricks_jdbc_url",
      rules: {
        required: true,
      },
      type: "text",
    },
    {
      name: "db_params.database",
      label: "Database Name",
      rules: {
        required: true,
      },
      type: "text",
    },
  ],
  ksql: [
    {
      name: "db_params.host",
      label: "host",
      rules: {
        required: true,
      },
      placeholder: "example.com",
    },
    {
      name: "db_params.port",
      label: "port",
      rules: {
        required: true,
      },
      placeholder: "8088",
      type: "number",
    },
    {
      name: "db_params.username",
      label: "username",
      rules: {
        required: false,
      },
      placeholder: "user",
    },
    {
      name: "db_params.password",
      label: "password",
      rules: {
        required: false,
      },
      placeholder: "pass",
      type: "password",
    },
  ],
};
