import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import { DispatchInfo } from "../../../../shared/types/Resource";

const { Option } = Select;
const { TextArea } = Input;

interface ResourceRequestFormProps {
  onFinish: (values: DispatchInfo) => void;
}

const ResourceRequestForm: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [returnable, setReturnable] = useState(false);

  const [form] = Form.useForm();

  const handleDatePickerChange = (fieldName: string) => (
    date: moment.Moment | null,
    dateString: string
  ) => {
    console.log(dateString);
    console.log(date?.format("DD/MM/YYYY"));
    form.setFieldsValue({ [fieldName]: date?.format("DD/MM/YYYY") });
  };

  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    }
  };

  const handleReturnChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.target.checked;
    setReturnable(isChecked);
    if (!isChecked) {
      form.setFieldsValue({ expectedReturnDate: null });
    }
  };

  const onFinish = (values: DispatchInfo) => {
    console.log('Received values:', values);
  }


  

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: "Please enter id" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Dispatch ID" name="dispatchId" rules={[{ required: true, message: "Please enter dispatch ID" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Employee Full Name" name="employeeFullName" rules={[{ required: true, message: "Please enter employee full name" }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Issue Date" name="issueDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Expected Return Date" name="expectedReturnDate">
            <DatePicker style={{ width: "100%" }}  />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Quantity" name="quantity">
            <InputNumber min={1} onChange={handleQuantityChange} style={{ width: "100%" }}  />
          </Form.Item>
        </Col>
    
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Product Name" name="productName">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Item Category" name="itemCategory">
            <Select>
              <Option value="category1">Category 1</Option>
              <Option value="category2">Category 2</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Purpose" name="purpose">
            <Input />
          </Form.Item>
        </Col>
       
      </Row>
     
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResourceRequestForm;
