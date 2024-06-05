import React from "react";
import { Table, Button, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { TableProps } from "antd/es/table";
import { DispatchInfo } from "../../../../shared/types/Dispatch";
import { useAllDispatchs } from "../../services/queries/dispatchQueries";
import { useDistributeDispatch } from "../../services/mutations/dispatchMutation";

const AllDispatcheditems: React.FC = () => {
  const allDispatchesQuery = useAllDispatchs();

  console.log("All dispacth Query:", allDispatchesQuery.data);
  const source = allDispatchesQuery.data
    ? allDispatchesQuery.data
        .filter(
          (queryResult: DispatchInfo) => queryResult.status === "dispatched"
        )
        .map((queryResult: DispatchInfo) => {
          return {
            key: queryResult.dispatchId,
            dispatchId: queryResult.dispatchId,
            productId: queryResult.productId,
            employeeFullName: queryResult.employeeFullName,
            productName: queryResult.productName,
            purpose: queryResult.purpose,
            status: queryResult.status,
            quantity: queryResult.quantity,
            itemCategory: queryResult.itemCategory,
          };
        })
    : [];

  const updateDistributeDispatchMutation = useDistributeDispatch();

  const columns: ColumnsType<DispatchInfo> = [
    {
      title: "Dispatch ID",
      dataIndex: "dispatchId",
      key: "dispatchId",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Category",
      dataIndex: "itemCategory",
      key: "itemCategory",
    },
    {
      title: "Employee Name",
      dataIndex: "employeeFullName",
      key: "employeeFullNamer",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="yellow">{status}</Tag>,
    },
  ];

  const tableProps: TableProps = {
    columns,
    dataSource: source,
    rowKey: "dispatchId",
  };

  return <Table {...tableProps} />;
};

export default AllDispatcheditems;
