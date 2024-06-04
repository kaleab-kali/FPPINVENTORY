import React from 'react'
import {Form, Col,Row, Input, InputNumber, Button, Select, DatePicker} from 'antd';
import {useReturnDispatch} from '../../services/mutations/dispatchMutation';

const ReturnForm: React.FC = () => {
  const [form] = Form.useForm();

  const updateReturnDispatchMutation = useReturnDispatch();

  const onFinish = (values: any) => {
    console.log(values);
    // updateReturnDispatchMutation.mutate(values);
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
        <Form.Item label="Product ID" name="uniqueId" rules={[{ required: true, message: "Please enter product id" }]}>
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
  )
}

export default ReturnForm