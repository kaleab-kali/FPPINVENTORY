import React from "react";
import {
  Form,
  Col,
  Row,
  Input,
  InputNumber,
  Button,
  Select,
  DatePicker,
  Typography,
  Tag,
  Table,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableProps } from "antd/es/table";
import { useReturnDispatch } from "../../services/mutations/dispatchMutation";
import { UniqueItemInfo } from "../../../../shared/types/UniqueItems";
import { useAllUniqueItems } from "../../services/queries/uniqueItemQueries";
import { formatDate } from "../../utils/utilityfunction";

const { Title } = Typography;

const ReturnForm: React.FC = () => {
  const [form] = Form.useForm();

  const updateReturnDispatchMutation = useReturnDispatch();

  const onFinish = (values: any) => {
    console.log(values);
    updateReturnDispatchMutation.mutate(values);
  };

  const allUniqueItemsQuery = useAllUniqueItems();

  console.log("All dispacth Query:", allUniqueItemsQuery.data);
  const source = allUniqueItemsQuery.data
    ? allUniqueItemsQuery.data
        .filter(
          (queryResult: UniqueItemInfo) => queryResult.status === "dispatched"
        )
        .map((queryResult: UniqueItemInfo) => {
          return {
            key: queryResult.uniqueId,
            uniqueId: queryResult.uniqueId,
            productId: queryResult.productId,
            status: queryResult.status,
            approvalStatus: queryResult.approvalStatus,
            dispatchDate: queryResult.dispatchDate,
            returnDate: queryResult.returnDate,
            employeeId: queryResult.employeeId,
          };
        })
    : [];

  const columns: ColumnsType<UniqueItemInfo> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Unique ID",
      dataIndex: "uniqueId",
      key: "uniqueId",
    },
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Dispatch Date",
      dataIndex: "dispatchDate",
      key: "dispatchDate",
      render: (dispatchDate) => formatDate(dispatchDate),
    },
  ];

  const tableProps: TableProps = {
    columns,
    dataSource: source,
    rowKey: "employeeId",
    pagination: { pageSize: 5 },
  };

  return (
    <>
      <Title level={5}>Return Dispatched Item</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Employee ID"
              name="employeeId"
              rules={[{ required: true, message: "Please enter id" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Product ID"
              name="uniqueId"
              rules={[{ required: true, message: "Please enter product id" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      <Title level={5} style={{ marginTop: 0 }}>
        Lsit of borrowed items
      </Title>

      <Table {...tableProps} />
    </>
  );
};

export default ReturnForm;
