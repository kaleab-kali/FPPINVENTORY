import React from 'react';
import { Table, Button, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';

interface Purchase {
  purchaseID: string;
  purchaseDate: string;
  productName: string;
  category: string;
  supplier: string;
  quantity: number;
  status: 'pending';
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
    status: 'pending',
  },
  // Add more data as needed
];

const ApprovalPurhase: React.FC = () => {
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
      render: (status: 'pending') => (
        <Tag color='orange'>Pending</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(record.purchaseID)}>
          Approve
        </Button>
      ),
    },
  ];

  const handleApprove = (purchaseID: string) => {
    console.log(`Approve purchase with ID: ${purchaseID}`);
    // Implement your approval logic here
  };

  const tableProps: TableProps<Purchase> = {
    columns,
    dataSource: data,
    rowKey: 'purchaseID',
  };

  return (
    <Table {...tableProps} />
  );
};

export default ApprovalPurhase;
