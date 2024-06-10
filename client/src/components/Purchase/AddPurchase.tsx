import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Row, Col, Typography, Table, Popconfirm, Select } from 'antd';
import { PurchaseInfo } from "../../../../shared/types/Purchase";
import { useCreatePurchase } from '../../services/mutations/purchaseMutation';
import { useAllProducts } from '../../services/queries/productQueries';
import { useAllCategorys } from '../../services/queries/categoryQueries';
import { useAllUnits } from '../../services/queries/unitQueries';
import { useAllSuppliers } from '../../services/queries/supplierQueries';
import { ProductInfo } from '../../../../shared/types/Product';
import { UnitInfo } from '../../../../shared/types/Unit';
import { SupplierInfo } from '../../../../shared/types/Supplier';
import { CategoryInfo } from '../../../../shared/types/Category';

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
  const allProductsQuery = useAllProducts();
  const allCategorysQuery = useAllCategorys();
  const allUnitQuery = useAllUnits();
  const allSuppliersQuery = useAllSuppliers();

  const products = allProductsQuery.data ? allProductsQuery.data.map(
    (queryResult: ProductInfo) => {
      
      return {
        key: queryResult.productID,
        productName: queryResult.name,
        productID: queryResult.productID,
        

      }
    }
  ): [];

  const units = allUnitQuery.data ? allUnitQuery.data.map(
    (queryResult: UnitInfo) => {
      return {
        key: queryResult.unitID,
        unit: queryResult.unitName,
        unitID: queryResult.unitID,
      }
    }
  ): [];

  const category = allCategorysQuery.data ? allCategorysQuery.data.map(
    (queryResult: CategoryInfo) => {
      return {
        key: queryResult.catID,
        category: queryResult.categoryName,
        categoryID: queryResult.catID,
      }
    }
  ): [];

  const suppliers = allSuppliersQuery.data ? allSuppliersQuery.data.map(
    (queryResult: SupplierInfo) => {
      return {
        key: queryResult.sid,
        supplier: queryResult.name,
        supplierID: queryResult.sid,
      }
    }
  ): [];
  const createProductMutation = useCreatePurchase();

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
    const dataToSend = purchases.map(({ key, ...rest }) => rest) as PurchaseInfo[];
    
    console.log('Purchasing data:', dataToSend);
    createProductMutation.mutate(dataToSend);
    
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
            <Select
                showSearch
                placeholder="Select a product"
                optionFilterProp="children"
                onChange={(value: string, option: any) => {
                  const selectedProduct = products.find(product => product.productName === value);
                  if (selectedProduct) {
                    form.setFieldsValue({ productId: selectedProduct.productID });
                  }
                }}
                filterOption={(input, option) =>
                  (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                }
              >
                {
                  products.map(product => (
                    <Select.Option key={product.productID} value={product.productName}>
                      {product.productName}
                    </Select.Option>
                  ))
                }
              </Select>
              {/* <Select>
                {
                  products.map(product => (
                    <Select.Option key={product.productID} value={product.productName}>
                      {product.productName}
                    </Select.Option>
                  ))
                }
              </Select> */}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="productId" label="Product ID" rules={[{ required: true }]}>
              {/* based on selelcted product name dispaly the product id */}

              <Input disabled />
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
              <Select>
                {
                  suppliers.map(supplier => (
                    <Select.Option key={supplier.supplierID} value={supplier.supplier}>
                      {supplier.supplier}
                    </Select.Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="unit" label="Unit">
              <Select>
                {
                  units.map(unit => (
                    <Select.Option key={unit.unitID} value={unit.unit}>
                      {unit.unit}
                    </Select.Option>
                  ))
                }
              </Select>
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
              <Select>
                {
                  category.map(category => (
                    <Select.Option key={category.categoryID} value={category.category}>
                      {category.category}
                    </Select.Option>
                  ))
                }
              </Select>
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
