import React from "react";
import { Form, Input, Button, Layout, Typography } from "antd";
import { useDeleteItem } from "../../services/mutations/inventorymutation";

const { Content } = Layout;
const { Title } = Typography;

const InventoryDeletingForm: React.FC = () => {
  const deleteItemMutuation = useDeleteItem();
  const onFinish = (values: any) => {
    console.log("Deleted item:", values.id);
    deleteItemMutuation.mutate(values.id);
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
        Delete Inventory Item
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
          <Form.Item
            name="id"
            label="ID"
            rules={[{ required: true, message: "Please enter ID" }]}
          >
            <Input placeholder="Enter ID" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Delete
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default InventoryDeletingForm;
