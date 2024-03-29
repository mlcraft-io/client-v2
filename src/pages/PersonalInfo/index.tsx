import { Alert, Space, message } from "antd";
import { useTranslation } from "react-i18next";

import type { GeneralInfo } from "@/components/GeneralInfoForm";
import GeneralInfoForm from "@/components/GeneralInfoForm";
import LogoutSessions from "@/components/LogoutSessions";
import type { Security } from "@/components/SecurityForm";
import SecurityForm from "@/components/SecurityForm";
import { useUpdateUserInfoMutation } from "@/graphql/generated";
import useAuth from "@/hooks/useAuth";
import useCheckResponse from "@/hooks/useCheckResponse";
import useLocation from "@/hooks/useLocation";
import AuthTokensStore from "@/stores/AuthTokensStore";
import CurrentUserStore from "@/stores/CurrentUserStore";
import { SIGNIN } from "@/utils/constants/paths";

import styles from "./index.module.less";

export type PersonalInfoProps = {
  initialValue?: GeneralInfo;
  error?: string | null;
  onInfoSubmit?: (data: GeneralInfo) => void;
  onUpdatePassword?: (data: Security) => void;
  onLogout?: () => void;
};

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  initialValue,
  error,
  onInfoSubmit = () => {},
  onUpdatePassword = () => {},
  onLogout = () => {},
}) => {
  const { t } = useTranslation(["settings", "pages"]);

  return (
    <>
      <Space className={styles.wrapper} direction="vertical" size={25}>
        {error && <Alert type="error" message={error} />}
        <GeneralInfoForm initialValue={initialValue} onSubmit={onInfoSubmit} />
        <SecurityForm onSubmit={onUpdatePassword} />
        <LogoutSessions onSubmit={onLogout} />
      </Space>
    </>
  );
};

const PersonalInfoWrapper = () => {
  const { t } = useTranslation(["settings", "pages"]);
  const { logout, changePass } = useAuth();

  const [, setLocation] = useLocation();
  const { currentUser } = CurrentUserStore();
  const { cleanTokens } = AuthTokensStore();
  const [error, setError] = useState<string | undefined>();

  const [updateMutation, execUpdateMutation] = useUpdateUserInfoMutation();

  useCheckResponse(updateMutation, () => {}, {
    successMessage: t("settings:personal_info.user_updated"),
  });

  const onInfoSubmit = (data: GeneralInfo) => {
    execUpdateMutation({
      user_id: currentUser.id,
      email: data.email,
      display_name: data.displayName,
    });
  };

  const onUpdatePassword = async (data: Security) => {
    const values = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
    };

    const res = await changePass(values);

    if (res.statusCode === 204) {
      setError(undefined);
      message.success(t("settings:personal_info.password_updated"));
    } else {
      setError(res?.message || res?.error);
    }
  };

  const onLogout = async () => {
    await logout();
    cleanTokens();
    setLocation(SIGNIN);
  };

  const initialValue = {
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
  };

  return (
    <PersonalInfo
      error={error}
      initialValue={initialValue}
      onInfoSubmit={onInfoSubmit}
      onUpdatePassword={onUpdatePassword}
      onLogout={onLogout}
    />
  );
};

export default PersonalInfoWrapper;
