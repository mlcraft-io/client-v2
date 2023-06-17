import { Row, Col, Button, Typography } from "antd";

const { Title } = Typography;

import SignUpForm from "@/components/SignupForm";

import styles from "./index.module.less";

const SignUp = () => {
  return (
    <Row justify="center">
      <Col>
        <Title level={2} className={styles.align}>
          Sign Up
        </Title>
        <Title level={3} className={styles.align}>
          Please Enter your details!
        </Title>
        <Row justify="center">
          <Button type="link" className={styles.align}>
            Sign up with magic link
          </Button>
        </Row>
        <SignUpForm />
      </Col>
    </Row>
  );
};

export default SignUp;
