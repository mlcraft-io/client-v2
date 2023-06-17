import { Layout, Row, Col, Space, Button } from "antd";
import { useResponsive } from "ahooks";
import cx from "classnames";
import { Link, useNavigate } from "react-router-dom";

import styles from "./index.module.less";

const { Header: BasicHeader } = Layout;

const Header: React.FC = () => {
  const responsive = useResponsive();
  const isMobile = responsive.md === false;
  const navigate = useNavigate();

  return (
    <BasicHeader className={styles.header}>
      <Row
        className={styles.root}
        style={{ width: "100%" }}
        justify="space-between"
      >
        <Col
          xs={24}
          sm={24}
          md={12}
          className={cx(styles.col, isMobile && styles.colMobile)}
        >
          <Link to="/" className={styles.logo}>
            <img className={styles.logoText} alt="" src="/logo_with_text.png" />
          </Link>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          className={cx(
            styles.col,
            styles.colRight,
            isMobile && styles.colMobile
          )}
        >
          <Space>
            <Button
              type="link"
              className={styles.button}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              type="primary"
              className={styles.button}
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Space>
        </Col>
      </Row>
    </BasicHeader>
  );
};

export default Header;
