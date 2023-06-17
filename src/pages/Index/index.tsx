import { Row, Col } from "antd";

import styles from "./index.module.less";

export default function Index(props: any) {
  return (
    <Row className={styles.container}>
      <Col>Index</Col>
    </Row>
  );
}
