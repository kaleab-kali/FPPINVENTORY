import React from 'react';
import { Table, Button, Tag, Flex } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { TableProps } from 'antd/es/table';
import { DispatchInfo } from '../../../../shared/types/Dispatch';
import { useAllDispatchs } from '../../services/queries/dispatchQueries';
import { useUpdateDispatch } from '../../services/mutations/dispatchMutation';
import { FaRecordVinyl } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const DispatchApproval: React.FC = () => {
  const allDispatchesQuery = useAllDispatchs();
  const {user}=useAuth()
 
  console.log('All dispacth Query:', allDispatchesQuery.data);
  const source = allDispatchesQuery.data ?
   allDispatchesQuery.data
   .filter((queryResult: DispatchInfo) => queryResult.status === 'pending')
   .map(
    (queryResult: DispatchInfo) => {
     
      return {
        key: queryResult.dispatchId,
        dispatchId: queryResult.dispatchId,
        productId: queryResult.productId,
        employeeFullName: queryResult.employeeFullName,
        productName: queryResult.productName,
        purpose: queryResult.purpose,
        status: queryResult.status,
        quantity: queryResult.quantity,
        itemCategory:queryResult.itemCategory,

      }
    }
  ): [];

  const updateDispatchMutation = useUpdateDispatch();

  const columns: ColumnsType<DispatchInfo> = [
    {
      title: 'Dispatch ID',
      dataIndex: 'dispatchId',
      key: 'dispatchId',
    },
    {
      title: 'Product ID',
      dataIndex: 'productId',
      key: 'productId',
      
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Category',
      dataIndex: 'itemCategory',
      key: 'itemCategory',
    },
    {
      title: 'Employee Name',
      dataIndex: 'employeeFullName',
      key: 'employeeFullNamer',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'pending') => (
        <Tag color='orange'>Pending</Tag>
      ),
    },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Flex gap="small">
// <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => handleApprove(record.dispatchId || "")}>
//           Approve
//         </Button>
//         <Button type="dashed" icon={<CheckCircleOutlined />} onClick={() => handleReject(record.dispatchId || "")}>
//           Reject
//         </Button>
//         </Flex>
        
//       ),
//     },
  ];

  if (user?.role === "stockmanager") {
    columns.push({
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap="small">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleApprove(record.dispatchId || "")}
          >
            Approve
          </Button>
          <Button
            type="dashed"
            icon={<CheckCircleOutlined />}
            onClick={() => handleReject(record.dispatchId || "")}
          >
            Reject
          </Button>
        </Flex>
      ),
    });
  }

  const handleApprove = (dispatchId: string) => {
    console.log(`Approve purchase with ID: ${dispatchId}`);
    updateDispatchMutation.mutate({
      dispatchId,
      status: 'approved',
    });
   
  };
  const handleReject = (dispatchId: string) => {
    console.log(`Reject purchase with ID: ${dispatchId}`);
    updateDispatchMutation.mutate({
      dispatchId,
      status: 'rejected',
    });
  
  }

  const tableProps: TableProps = {
    columns,
    dataSource: source,
    rowKey: 'purchaseID',
  };

  return (
    <Table {...tableProps} />
  );
};

export default DispatchApproval;
