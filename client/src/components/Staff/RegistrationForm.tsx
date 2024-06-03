
import React from "react";
import { Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;

interface RegistrationFormProps {
  onSubmit: (values: any) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: "Please select your role" }]}
      >
        <Select placeholder="Select Role">
          <Option value="invmanager">Inventory Manager</Option>
          <Option value="stockmanager">Stock Manager</Option>
          <Option value="personnel">Personnel</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="employmentDate"
        label="Employment Date"
        rules={[
          { required: true, message: "Please select the employment date" },
        ]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="photo"
        label="Photo"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e && e.fileList)}
      >
        <Upload name="photo" listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Upload Photo</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
