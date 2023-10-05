import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import SideMenu from "@/components/SideMenu";
import { userMenu } from "@/mocks/user";
import useUserData from "@/hooks/useUserData";

import styles from "./index.module.less";

import type { ReactNode } from "react";

const { Content } = Layout;

export type AppLayoutProps = {
  sidebar?: ReactNode;
  children: ReactNode;
  title?: ReactNode | string;
  divider?: boolean;
};

const AppLayout: React.FC<AppLayoutProps> = ({
  title = "App",
  divider = false,
  sidebar = null,
  children,
}) => {
  const responsive = useResponsive();
  const { currentUser } = useUserData();

  const isMobile = responsive.md === false;

  const content = (
    <Navbar
      direction={isMobile ? "vertical" : "horizontal"}
      username={currentUser.displayName}
      userAvatar={currentUser.avatarUrl}
      userMenu={userMenu}
      teams={currentUser?.teams}
    />
  );

  return (
    <Layout>
      <SideMenu />
      {sidebar}
      <Layout className={styles.root}>
        <Header
          title={title}
          bordered={divider}
          content={isMobile ? <BurgerMenu>{content}</BurgerMenu> : content}
        />
        <div className={styles.main}>{children}</div>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
