import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, Typography, Table, Popconfirm } from 'antd';
import { PurchaseInfo } from "../../../../shared/types/Purchase";

const { Title } = Typography;

interface PurchaseTableData extends PurchaseInfo {
  key: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

const AddPurchase: React.FC = () => {
  const [form] = Form.useForm();
  const [purchases, setPurchases] = useState<PurchaseTableData[]>([]);

  const onFinish = (values: PurchaseInfo) => {
    const newPurchase: PurchaseTableData = {
      ...values,
      key: Date.now().toString(),
      quantity: 1, // Default quantity
      unitPrice: 0, // Default unit price
      totalPrice: 0, // Default total price
    };
    setPurchases([...purchases, newPurchase]);
    form.resetFields();
  };

  const handleDelete = (key: string) => {
    setPurchases(purchases.filter(item => item.key !== key));
  };

  const handleSave = (key: string, quantity: number, unitPrice: number) => {
    const newData = [...purchases];
    const index = newData.findIndex(item => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, quantity, unitPrice, totalPrice: quantity * unitPrice });
      setPurchases(newData);
    }
  };

  const handlePurchase = () => {
    console.log('Purchases:', purchases);
    const dataToSend = purchases.map(({ key, ...rest }) => rest);
    console.log('Purchasing data:', dataToSend);
    
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text: number, record: PurchaseTableData) => (
        <InputNumber
          min={1}
          value={text}
          onChange={(value) => handleSave(record.key, value!, record.unitPrice)}
        />
      ),
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      render: (text: number, record: PurchaseTableData) => (
        <InputNumber
          min={0}
          value={text}
          onChange={(value) => handleSave(record.key, record.quantity, value!)}
        />
      ),
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: PurchaseTableData) => (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
          <Button>Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  const totalAmount = purchases.reduce((sum, record) => sum + record.totalPrice, 0);

  return (
    <div>
      <Title level={2}>Add Purchase</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="productName" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="models" label="Models">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="brand" label="Brand">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="supplier" label="Supplier">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="unit" label="Unit">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="manufactureDate" label="Manufacture Date">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="expirationDate" label="Expiration Date">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="weightDimension" label="Weight Dimension">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="description" label="Description">
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="purchaseDate" label="Purchase Date">
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginTop: '30px' }}>
                Add Purchase
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={purchases}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={4} index={0} align='right'>Total</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>{totalAmount}</Table.Summary.Cell>
            <Table.Summary.Cell index={2}>
              <Button type="primary" onClick={handlePurchase}>Purchase</Button>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default AddPurchase;
