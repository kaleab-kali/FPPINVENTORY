import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Layout,
  Typography,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

// const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const InventoryRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form data:", values);
  };
  const handleDatePickerChange = (
    date: moment.Moment | null,
    dateString: string
  ) => {
    console.log(dateString);
    console.log(date?.format("DD/MM/YYYY"));
    form.setFieldsValue({ manufacturedate: date?.format("DD/MM/YYYY") }); // Set the moment object directly
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="model"
              label="model"
              rules={[{ required: true, message: "Please enter model" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="supplier"
              label="Supplier"
              rules={[{ required: true, message: "please enter the supplier" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="manufacturedate"
              label="Manufacture Date"
             
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="expirationdate"
              label="Expiration Date"
            
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
          <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
              name="wight"
              label="Wight/Dimention(LxW)"
            
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>

          </Col>
          <Col span={8}>
          <Form.Item
              name="price"
              label="Unit Price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select category">
                <Option value="consumable">Consumable</Option>
                <Option value="returnable">Returnable</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
          <Form.Item
              name="unit"
              label="Unit"
              rules={[{ required: true, message: "Please select Unit of measurment" }]}
            >
              <Select placeholder="Select Unit">
                <Option value="consumable">KG</Option>
                <Option value="returnable">PCS</Option>
              </Select>
            </Form.Item>
         

          </Col>
          <Col span={8}>
          <Form.Item
              name="purchasedate"
              label="Purchase Date"
            
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
          <Form.Item label="Returnable" name="returnable" valuePropName="checked">
          <Checkbox>yes</Checkbox>
        </Form.Item>
          
          </Col>
          <Col span={8}>
          <Form.Item
              name="description"
              label="Description/Note"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
          
          </Col>
          <Col span={8}>
          
          </Col>

        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InventoryRegistrationForm;
