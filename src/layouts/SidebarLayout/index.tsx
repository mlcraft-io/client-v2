import AppLayout from "@/layouts/AppLayout";
import Sidebar from "@/components/Sidebar";

import type { ReactNode } from "react";

export type SidebarLayoutProps = {
  icon?: ReactNode;
  title?: ReactNode | string;
  subTitle?: ReactNode | string;
  items?: ReactNode[] | ReactNode;
  children: ReactNode;
  divider?: boolean;
  burgerTitle?: string;
};

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  icon,
  title = "Main",
  subTitle = "Settings",
  items = [],
  children,
  divider = true,
  burgerTitle,
}) => {
  return (
    <AppLayout
      title={title}
      divider={divider}
      burgerTitle={burgerTitle}
      sidebar={
        <Sidebar icon={icon} title={subTitle}>
          {items}
        </Sidebar>
      }
    >
      <main>{children}</main>
    </AppLayout>
  );
};

export default SidebarLayout;
