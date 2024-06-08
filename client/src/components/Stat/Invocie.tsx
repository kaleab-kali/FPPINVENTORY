import React from "react";
import { Table, Tag } from "antd";

const { Column } = Table;

const data = [
  {
    key: "1",
    refCode: "INV12345",
    customer: "John Doe",
    amount: 500,
    status: "Paid",
  },
  {
    key: "2",
    refCode: "INV67890",
    customer: "Jane Smith",
    amount: 750,
    status: "Pending",
  },
  {
    key: "3",
    refCode: "INV13579",
    customer: "Alice Johnson",
    amount: 900,
    status: "Overdue",
  },
];

const RecentInvoicesTable: React.FC = () => {
  return (
    <Table dataSource={data} pagination={false} style={{width:"100%"}}>
      <Column title="REF. CODE" dataIndex="refCode" key="refCode" />
      <Column title="CUSTOMER" dataIndex="customer" key="customer" />
      <Column title="AMOUNT" dataIndex="amount" key="amount" />
      <Column
        title="STATUS"
        dataIndex="status"
        key="status"
        render={(status: string) => (
          <Tag
            color={
              status === "Paid"
                ? "green"
                : status === "Pending"
                ? "orange"
                : "red"
            }
          >
            {status.toUpperCase()}
          </Tag>
        )}
      />
    </Table>
  );
};

export default RecentInvoicesTable;
