import { Layout } from "antd";
import { useResponsive } from "ahooks";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BurgerMenu from "@/components/BurgerMenu";

import styles from "./index.module.less";

import type { ReactNode } from "react";

const { Content } = Layout;

export type BasicLayoutProps = {
  header?: ReactNode;
  disableMenu?: boolean;
  children: ReactNode;
};

const BasicLayout: React.FC<BasicLayoutProps> = ({
  header,
  disableMenu,
  children,
}) => {
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  return (
    <div className={styles.root}>
      <Layout>
        <Header
          content={
            isMobile && !disableMenu ? (
              <BurgerMenu>{header}</BurgerMenu>
            ) : (
              header
            )
          }
          withLogo
          bordered
        />
        <Content>{children}</Content>
        <Footer />
      </Layout>
    </div>
  );
};

export default BasicLayout;
