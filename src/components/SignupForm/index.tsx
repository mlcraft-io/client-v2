import { Form, Input, Button, Checkbox, Row, Typography } from "antd";

const { Link } = Typography;

import styles from "./index.module.less";

const SignUpForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <Row justify="center">
      <Form
        name="signup"
        className={styles.form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="termsAccepted"
          valuePropName="checked"
          rules={[
            { required: true, message: "You have to accept this to proceed" },
          ]}
        >
          <Checkbox>
            By checking this box, you accept our{" "}
            <Link href="#">terms of use</Link> and our{" "}
            <Link href="#">privacy policy</Link>.
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button className={styles.submit} type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default SignUpForm;
