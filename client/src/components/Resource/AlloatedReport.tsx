import React from 'react';
import { Table, Input, DatePicker, Select, Tag } from 'antd';
import moment from 'moment';

const { Option } = Select;

interface DispatchInfo {
  key: string;
  employeeId: string;
  issueDate: string;
  expectedReturnDate: string;
  productId: string;
  productName: string;
  itemCategory: string;
  quantity: number;
  purpose: string;
  status: string;
}

const AllocatedReport: React.FC = () => {
  // Dummy data
  const dummyData: DispatchInfo[] = [
    {
      key: '1',
      employeeId: 'EMP001',
      issueDate: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      expectedReturnDate: moment().add(3, 'days').format('YYYY-MM-DD'),
      productId: 'PROD001',
      productName: 'Product 1',
      itemCategory: 'Category A',
      quantity: 5,
      purpose: 'Sample purpose',
      status: 'Dispatched',
    },
    {
      key: '2',
      employeeId: 'EMP002',
      issueDate: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      expectedReturnDate: moment().add(4, 'days').format('YYYY-MM-DD'),
      productId: 'PROD002',
      productName: 'Product 2',
      itemCategory: 'Category B',
      quantity: 3,
      purpose: 'Testing purpose',
      status: 'Pending',
    },
  ];

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      filters: dummyData.map(item => ({ text: item.employeeId, value: item.employeeId })),
      onFilter: (value: any, record: any) => record.employeeId.indexOf(value) === 0,
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
      sorter: (a: DispatchInfo, b: DispatchInfo) => moment(a.issueDate).unix() - moment(b.issueDate).unix(),
      render: (text: string) => <span>{text}</span>,
      filterDropdown: () => (
        <DatePicker placeholder="Issue Date" style={{ padding: 8 }} />
      ),
    },
    {
      title: 'Expected Return Date',
      dataIndex: 'expectedReturnDate',
      key: 'expectedReturnDate',
      sorter: (a: DispatchInfo, b: DispatchInfo) => moment(a.expectedReturnDate).unix() - moment(b.expectedReturnDate).unix(),
      render: (text: string) => <span>{text}</span>,
      filterDropdown: () => (
        <DatePicker placeholder="Expected Return Date" style={{ padding: 8 }} />
      ),
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
      filters: dummyData.map(item => ({ text: item.productId, value: item.productId })),
      onFilter: (value: any, record: any) => record.productId.indexOf(value) === 0,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      filters: dummyData.map(item => ({ text: item.productName, value: item.productName })),
      onFilter: (value: any, record: any) => record.productName.indexOf(value) === 0,
    },
    {
      title: 'Category',
      dataIndex: 'itemCategory',
      key: 'itemCategory',
      filters: dummyData.map(item => ({ text: item.itemCategory, value: item.itemCategory })),
      onFilter: (value: any, record: any) => record.itemCategory.indexOf(value) === 0,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: DispatchInfo, b: DispatchInfo) => a.quantity - b.quantity,
      render: (text: number) => <span>{text}</span>,
      filterDropdown: () => (
        <Input placeholder="Quantity" style={{ padding: 8 }} />
      ),
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      filters: dummyData.map(item => ({ text: item.purpose, value: item.purpose })),
      onFilter: (value: any, record: any) => record.purpose.indexOf(value) === 0,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Dispatched', value: 'Dispatched' },
        { text: 'Returned', value: 'Returned' },
        { text: 'Pending', value: 'Pending' },
        
      ],
      onFilter: (value: any, record: any) => record.status.indexOf(value) === 0,
      render: (status: string) => {
        let color = '';
        switch (status) {
          case 'Dispatched':
            color = 'green';
            break;
          case 'Returned':
            color = 'blue';
            break;
          case 'Pending':
            color = 'orange';
            break;
         
          default:
            color = 'default';
            break;
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return <Table dataSource={dummyData} columns={columns} />;
};

export default AllocatedReport;
