import React, { useState } from "react";
import { Table, Button, Tag, Modal, Form, Select } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { TableProps } from "antd/es/table";
import { UniqueItemInfo } from "../../../../shared/types/UniqueItems";
import { useAllUniqueItems } from "../../services/queries/uniqueItemQueries";
import {
  useUpdateReturnApproval,
} from "../../services/mutations/dispatchMutation";
import { useAuth } from "../../context/AuthContext";

const ReturnApproval: React.FC = () => {
  const {user}=useAuth()
  const allUniqueItemsQuery = useAllUniqueItems();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] =
    useState<Partial<UniqueItemInfo> | null>(null);
  const [form] = Form.useForm();

  const source = allUniqueItemsQuery.data
    ? allUniqueItemsQuery.data
        .filter(
          (queryResult: UniqueItemInfo) =>
            queryResult.approvalStatus === "pending"
        )
        .map((queryResult: UniqueItemInfo) => {
          return {
            key: queryResult.uniqueId,
            uniqueId: queryResult.uniqueId,
            productId: queryResult.productId,
            status: queryResult.status,
            approvalStatus: queryResult.approvalStatus,
            dispatchDate: queryResult.dispatchDate,
            employeeId: queryResult.employeeId,
          };
        })
    : [];

  const useReturnApprovalMutation = useUpdateReturnApproval();

  const columns: ColumnsType<UniqueItemInfo> = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Approval Status",
      dataIndex: "approvalStatus",
      key: "approvalStatus",
      render: (approvalStatus) => <Tag color="orange">{approvalStatus}</Tag>,
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
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button
    //       type="primary"
    //       icon={<CheckCircleOutlined />}
    //       onClick={() => showApproveModal(record)}
    //     >
    //       Approve
    //     </Button>
    //   ),
    // },
  ];
   if (user?.role === "stockmanager") {
     // if (user?.role === "invmanager") {
     columns.push({
       title: "Action",
       key: "action",
       render: (_, record) => (
         <Button
           type="primary"
           icon={<CheckCircleOutlined />}
           onClick={() => showApproveModal(record)}
         >
           Approve
         </Button>
       ),
     });
   }

  const showApproveModal = (record: Partial<UniqueItemInfo>) => {
    setSelectedItem(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        setIsModalVisible(false);
        handleApprove(values.condition);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleApprove = (condition: string) => {
    if (selectedItem) {
      console.log(
        `Approve purchase with ID: ${selectedItem.uniqueId}, Condition: ${condition}`
      );
      useReturnApprovalMutation.mutate({
        uniqueId: selectedItem.uniqueId,
        approve: true,
        condition: condition,
      });
    }
  };

  const tableProps: TableProps = {
    columns,
    dataSource: source,
    rowKey: "uniqueId",
  };

  return (
    <>
      <Table {...tableProps} />
      <Modal
        title="Approve Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="condition"
            label="Condition"
            rules={[
              {
                required: true,
                message: "Please select the condition of the item",
              },
            ]}
          >
            <Select placeholder="Select a condition">
              <Select.Option value="good">Good</Select.Option>
              <Select.Option value="damaged">Damaged</Select.Option>
              <Select.Option value="missing">Missing</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReturnApproval;
