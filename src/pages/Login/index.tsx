import { Row, Col } from "antd";

import styles from "./index.module.less";

export default function Login(props: any) {
  console.log(props);

  return (
    <Row className={styles.container}>
      <Col>Login</Col>
    </Row>
  );
}
