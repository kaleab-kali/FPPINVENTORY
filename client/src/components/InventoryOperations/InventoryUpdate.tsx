import React from "react";
import { Form, Input, Button, Select, Row, Col, Layout, Typography } from "antd";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const InventoryUpdatingForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Updated data:", values);
  };

  return (
    <Layout>
      <Title
        level={4}
        style={{
          padding: "10px 30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Update Inventory Item
      </Title>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "30px",
            width: "50%",
          }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
            </Col>
            
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default InventoryUpdatingForm;
