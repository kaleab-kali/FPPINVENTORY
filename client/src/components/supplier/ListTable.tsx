import { Input, Table, Button, Space, Popconfirm, Modal, Form } from "antd";
import React, { useState } from "react";
import {
  useSuppliers,
  useAllSuppliers,
  useSupplierIds,
} from "../../services/queries/supplierQueries";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import { useDeleteSupplier, useUpdateSupplier } from "../../services/mutations/supplierMutation";
const ListTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState<SupplierInfo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); 
  const allSuppliersQuery = useAllSuppliers();
  const updateSupplier = useUpdateSupplier();
  const deleteSupplier = useDeleteSupplier()
  console.log("All Suppliers Query:", allSuppliersQuery.data);

  const Source = allSuppliersQuery.data
    ? allSuppliersQuery.data.map((queryResult: SupplierInfo) => {
        return {
          _id: queryResult._id,
          sid: queryResult.sid,
          name: queryResult.name,
          mobileNumber: queryResult.mobileNumber,
          email: queryResult.email,
          address: queryResult.address,
        };
      })
    : [];
  const filteredData = Source.filter((entry: { name: string }) =>
    entry.name?.toLowerCase().includes(searchValue.toLowerCase())
  );    
  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    console.log("delete", key);
    deleteSupplier.mutate(key)
  };

  const handleEdit = (record: SupplierInfo) => {
    setSelectedRow(record);
    form.setFieldsValue({
      name: record.name,
      mobileNumber: record.mobileNumber,
      email: record.email,
      address: record.address,
    });
    console.log(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    const updatedValues = {
      ...values,
      sid: selectedRow?.sid,
      _id: selectedRow?._id
    };
    console.log("Received values of form: ", updatedValues);
    // Implement form submission/update logic
    updateSupplier.mutate(updatedValues);
    setIsModalVisible(false);
  };


  const columns = [
    {
      title: "SID",
      dataIndex: "sid",
      key: "sid",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.sid)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredData} />
      <Modal
        title="Edit Supplier"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="editSupplierForm"
          initialValues={{
            name: selectedRow?.name,
            mobileNumber: selectedRow?.mobileNumber,
            email: selectedRow?.email,
            address: selectedRow?.address,
          }}
          onFinish={onFinish}
        >
          {/* Form fields */}
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile Number">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListTable;
