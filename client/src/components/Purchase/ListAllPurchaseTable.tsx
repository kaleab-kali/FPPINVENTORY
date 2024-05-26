import React from 'react';
import { Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';

interface Purchase {
  purchaseID: string;
  purchaseDate: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  status: 'pending' | 'approved';
}

const data: Purchase[] = [
  {
    purchaseID: '1',
    purchaseDate: '2023-05-01',
    productName: 'Laptop',
    category: 'Electronics',
    supplier: 'Supplier A',
    quantity: 100,
    status: 'pending',
  },
  {
    purchaseID: '2',
    purchaseDate: '2023-05-02',
    productName: 'Chair',
    category: 'Furniture',
    supplier: 'Supplier B',
    quantity: 50,
    status: 'approved',
  },
    {
        purchaseID: '3',
        purchaseDate: '2023-05-03',
        productName: 'Tablet',
        category: 'Electronics',
        supplier: 'Supplier A',
        quantity: 200,
        status: 'pending',
    },
    {
        purchaseID: '4',
        purchaseDate: '2023-05-04',
        productName: 'Desk',
        category: 'Furniture',
        supplier: 'Supplier B',
        quantity: 30,
        status: 'approved',
    },
    {
        purchaseID: '5',
        purchaseDate: '2023-05-05',
        productName: 'Smartphone',
        category: 'Electronics',
        supplier: 'Supplier A',
        quantity: 150,
        status: 'pending',
    },
];

const ListAllPurchaseTable: React.FC = () => {
  const columns: ColumnsType<Purchase> = [
    {
      title: 'Purchase ID',
      dataIndex: 'purchaseID',
      key: 'purchaseID',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
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
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'pending' | 'approved') => (
        <Tag color={status === 'pending' ? 'orange' : 'green'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.status === 'pending' && (
          <Button type="primary" danger onClick={() => handleDelete(record.purchaseID)}>
            Delete
          </Button>
        )
      ),
    },
  ];

  const handleDelete = (purchaseID: string) => {
    console.log(`Delete purchase with ID: ${purchaseID}`);
    // Implement your delete logic here
  };

  const tableProps: TableProps<Purchase> = {
    columns,
    dataSource: data,
    rowKey: 'purchaseID',
    scroll: { x: 'max-content' }, 
  };

  return (
    <Table {...tableProps} />
  );
};

export default ListAllPurchaseTable;
