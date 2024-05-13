import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import {
  useSuppliers,
  useAllSuppliers,
  useSupplierIds,
} from "../../services/queries/supplierQueries";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import SupplierForm from "./SupplierForm";


const ListTable = () => {
  
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const allSuppliersQuery = useAllSuppliers();
  console.log("All Suppliers Query:", allSuppliersQuery.data);
  
  const Source = allSuppliersQuery.data
    ? allSuppliersQuery.data.map(
        (queryResult: SupplierInfo) =>{
          return {
            key: queryResult._id,
            sid: queryResult.sid,
            name: queryResult.name,
            mnumber: queryResult.mobileNumber,
            email: queryResult.email,
            address: queryResult.address,
          };
        }
          
      )
    : [];
  
  console.log("Source:", Source);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
  };
  const handleEdit = (record: any) => {
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null); // Clear edit record after modal is closed
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
      dataIndex: "mnumber",
      key: "mnumber",
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
            onConfirm={() => handleDelete(record.key)}
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
      <Table columns={columns} dataSource={Source} />
      <SupplierForm
        initialValues={editRecord} // Pass edit record to pre-fill form if editing
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />

    </>
  );
};

export default ListTable;
