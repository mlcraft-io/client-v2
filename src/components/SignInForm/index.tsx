import { Form, Typography } from "antd";
import cn from "classnames";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Input from "@/components/Input";
import useLocation from "@/hooks/useLocation";
import validate from "@/utils/validations";

import styles from "./index.module.less";

import type { FC } from "react";

const { Title, Text } = Typography;

export interface SignInFormType {
  email: string;
  password?: string;
}

interface SignInFormProps {
  isMagicLink: boolean;
  onSubmit: (data: SignInFormType) => void;
}

const SignInForm: FC<SignInFormProps> = ({ isMagicLink, onSubmit }) => {
  const [_, setLocation] = useLocation();

  const { t } = useTranslation(["sign", "common"]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignInFormType>();

  useEffect(() => {
    if (isMagicLink) {
      setValue("password", undefined);
    }
  }, [isMagicLink, setValue]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Title>{t("sign_in.title")}</Title>
        <Text>{t("sign_in.text")}</Text>
      </div>

      <div className={styles.magicLinkWrapper}>
        <Button
          className={styles.magicLink}
          type="default"
          onClick={() =>
            isMagicLink
              ? setLocation("/auth/signin")
              : setLocation("/auth/signin?magicLink")
          }
        >
          {isMagicLink
            ? t("sign_in.sign_in_password")
            : t("sign_in.magic_link_login")}
        </Button>
      </div>

      <Form className={styles.form}>
        <Input
          className={cn(styles.formItem, styles.input, {
            [styles.error]: errors?.email,
          })}
          bordered={false}
          placeholder={t("common:form.placeholders.email")}
          control={control}
          rules={{
            required: true,
            validate: (v: string) =>
              validate.email(v) || t("common:form.errors.email"),
          }}
          name="email"
        />
        {!isMagicLink && (
          <Input
            className={cn(styles.formItem, styles.input, {
              [styles.error]: errors?.password,
            })}
            bordered={false}
            placeholder={t("common:form.placeholders.password")}
            control={control}
            rules={{
              required: true,
            }}
            name="password"
            fieldType="password"
          />
        )}
        <Button
          className={styles.formItem}
          type="primary"
          htmlType="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {isMagicLink ? t("sign_in.send_link") : t("sign_in.login")}
        </Button>

        <Text className={styles.text}>
          {t("sign_in.bottom_text")}{" "}
          <Button
            className={styles.link}
            type="link"
            onClick={() => setLocation("/auth/signup")}
          >
            {t("sign_in.sign_up_link")}
          </Button>
        </Text>
      </Form>
    </div>
  );
};

export default SignInForm;
