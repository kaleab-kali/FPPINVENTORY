import React from 'react';
import { Table, Button, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';
import { useAllPurchases } from '../../services/queries/purchaseQueries';
import { PurchaseInfo } from '../../../../shared/types/Purchase';
import { formatDate} from '../../utils/utilityfunction'


const ListAllPurchaseTable: React.FC = () => {
  const allPurchasesQuery = useAllPurchases();
  console.log('All Purchases Query:', allPurchasesQuery.data);
  const source = allPurchasesQuery.data ? allPurchasesQuery.data.map(
    (queryResult: PurchaseInfo) => {
      console.log('Query Result:', queryResult.purchaseDate)
      return {
        key: queryResult.purchaseID,
        purchaseID: queryResult.purchaseID,
        purchaseDate: queryResult.purchaseDate,
        productName: queryResult.productName,
        category: queryResult.category,
        supplier: queryResult.supplier,
        quantity: queryResult.quantity,
        status: queryResult.status

      }
    }
  ): [];


  const columns: ColumnsType<PurchaseInfo> = [
    {
      title: 'Purchase ID',
      dataIndex: 'purchaseID',
      key: 'purchaseID',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render:  (text: string) => formatDate(text),
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
          <Button type="primary" danger onClick={() => handleApprove(record.purchaseID || "")}>
            Approve
          </Button>
        )
      ),
    },
  ];

  const tableProps: TableProps<PurchaseInfo> = {
    columns,
    dataSource: source,
    rowKey: 'purchaseID',
    scroll: { x: 'max-content' }, 
  };
  function handleApprove(arg0: string): void {
    throw new Error('Function not implemented.');
  }
  return (
    <Table {...tableProps} />
  );
};

export default ListAllPurchaseTable;


