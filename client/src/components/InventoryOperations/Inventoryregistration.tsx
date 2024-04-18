import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Layout,
  Typography,
  message,
} from "antd";
import { useCreateItem } from "../../services/mutations/inventorymutation";

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const InventoryRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();
  const createItemMutuation = useCreateItem();

  const onFinish = async (values: any) => {
    const id = generateID(); 
    const formData = { id, ...values }; 
    console.log("Form data:", formData);
    try {
      // await form.validateFields();

      createItemMutuation.mutate(formData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
    message.success("Form submitted successfully!");
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
  };

  // Function to generate ID in the format "FPCITEM-XXXXX"
  const generateID = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000); // Generate random number between 10000 and 99999
    return `FPCITEM-${randomNum}`;
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
        Inventory Registration Form
      </Title>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          form={form}
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "30px",
            width: "50%",
          }}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={onValuesChange}
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
            <Col span={12}>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: "Please enter description" }]}
              >
                <Input.TextArea placeholder="Enter description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <Input type="number" placeholder="Enter quantity" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input type="number" placeholder="Enter price" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="categoryId"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="consumable">Consumable</Option>
                  <Option value="returnable">Returnable</Option>
              
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default InventoryRegistrationForm;
