import { ApolloProvider } from "@apollo/client";
import { ConfigProvider } from "antd";

import client from "@/app/apolloClient";
import theme from "@/app/themes/default.json";

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <ConfigProvider theme={theme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ConfigProvider>
  );
};

export default RootLayout;
