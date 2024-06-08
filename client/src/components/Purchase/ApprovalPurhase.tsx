import React from 'react';
import { Table, Button, Tag } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';
import { PurchaseInfo } from '../../../../shared/types/Purchase';
import { useAllPurchases } from '../../services/queries/purchaseQueries';
import { useUpdatePurchase } from '../../services/mutations/purchaseMutation';
import { formatDate} from '../../utils/utilityfunction'
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from '../../context/AuthContext';



const ApprovalPurhase: React.FC = () => {
  const {user}=useAuth()
  const allPurchasesQuery = useAllPurchases();
  const queryClient = useQueryClient();
  console.log('All Purchases Query:', allPurchasesQuery.data);
  const source = allPurchasesQuery.data ?
   allPurchasesQuery.data
   .filter((queryResult: PurchaseInfo) => queryResult.status === 'pending')
   .map(
    (queryResult: PurchaseInfo) => {
     
      return {
        key: queryResult.purchaseID,
        purchaseID: queryResult.purchaseID,
        purchaseDate: queryResult.purchaseDate,
        productName: queryResult.productName,
        category: queryResult.category,
        supplier: queryResult.supplier,
        quantity: queryResult.quantity,
        status: queryResult.status,

      }
    }
  ): [];

  const updatePurchaseMutation = useUpdatePurchase();

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
      render: (text: string) => formatDate(text),
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
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(record.purchaseID || "")}>
    //       Approve
    //     </Button>
    //   ),
    // },
  ];
  if (user?.role === "invmanager") {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CheckCircleOutlined />}
          onClick={() => handleApprove(record.purchaseID || "")}
        >
          Approve
        </Button>
      ),
    });
  }

  const handleApprove = (purchaseID: string) => {
    console.log(`Approve purchase with ID: ${purchaseID}`);
    updatePurchaseMutation.mutate({ purchaseID, status: 'approved' });
   
  };

  const tableProps: TableProps<PurchaseInfo> = {
    columns,
    dataSource: source,
    rowKey: 'purchaseID',
  };

  return (
    <Table {...tableProps} />
  );
};

export default ApprovalPurhase;
