import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Checkbox, Row, Col, InputNumber, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Option } = Select;
const { TextArea } = Input;

const ResourceRequestForm: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [returnable, setReturnable] = useState(false);

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Form data:", values);
  };
  const handleDatePickerChange = (fieldName: string) => (
    date: moment.Moment | null,
    dateString: string
  ) => {
    console.log(dateString);
    console.log(date?.format("DD/MM/YYYY"));
    form.setFieldsValue({ [fieldName]: date?.format("DD/MM/YYYY") });
  };
  

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
  };
  const handleQuantityChange = (value: number | null) => {
    if (value !== null) {
      setQuantity(value);
    }
  };
  const handleReturnChange = (value: boolean | null ) => {
    if (value !== null) {
      setReturnable(value);
    }
  };
  return (
    <Form form={form}
    layout="vertical"
    onFinish={onFinish}
    onValuesChange={onValuesChange}>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: "Please enter id" }]}
>
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Employee Name" name="employeeName">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Department" name="department">
            <DatePicker  style={{ width: "100%" }} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
        <Form.Item label="Issue Date" name="issuedate">
            <DatePicker  style={{ width: "100%" }} />
          </Form.Item>

        </Col>
        <Col span={8}>
        <Form.Item label="Returnable" name="returnable" valuePropName="checked" >
            <Checkbox onChange={(e: CheckboxChangeEvent) => handleReturnChange(e.target.checked)}>yes</Checkbox>
          </Form.Item>

        </Col>
        <Col span={8}>
        <Form.Item label="Expected Return Date" name="expectedReturnDate">
            <DatePicker style={{ width: "100%" }} disabled={!returnable} />
          </Form.Item>
        </Col>
        
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Item ID" name="itemId">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Item Name" name="itemName">
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
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Quantity" name="quantity">
          <InputNumber min={1} onChange={handleQuantityChange} style={{ width: "100%" }}  />
          </Form.Item>
        </Col>
        <Col span={8}>
        
            <Form.Item label="Item IDs" name="itemIds">
              <TextArea placeholder="Enter item IDs, separated by commas or new lines" disabled={quantity <= 1}/>
            </Form.Item>
          
        </Col>
        <Col span={8}>
        <Form.Item label="Purpose" name="purpose">
            <Input />
          </Form.Item>
          
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Authorized Date" name="authorizedDate">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Authorized By" name="authorizedBy">
            <Input />
          </Form.Item>
        </Col>
         
        <Col span={8}>
          <Form.Item label="Remarks" name="remarks">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
          <Button type="primary" htmlType="submit">
            Request Product
          </Button>
        </Form.Item>
    </Form>
  );
};

export default ResourceRequestForm;
