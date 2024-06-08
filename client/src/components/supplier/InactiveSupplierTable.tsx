import { Input, Table, Button, Space } from "antd";
import React, { useState } from "react";
import { useAllSuppliers} from "../../services/queries/supplierQueries";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import { ColumnsType } from "antd/es/table";
import {useAuth} from "../../context/AuthContext"

const ListTable = () => {
  
  const [searchValue, setSearchValue] = useState("");
  const {user} = useAuth()
  const allSuppliersQuery = useAllSuppliers();
  console.log("All Suppliers Query:", allSuppliersQuery.data);

  const Source = allSuppliersQuery.data
  ? allSuppliersQuery.data
      .filter((queryResult: SupplierInfo) => queryResult.status === 'inactive') 
      .map((queryResult: SupplierInfo) => {
        return {
          key: queryResult._id,
          sid: queryResult.sid,
          name: queryResult.name,
          mobileNumber: queryResult.mobileNumber,
          email: queryResult.email,
          address: queryResult.address,
          status: queryResult.status, 
        };
      })
  : [];

  console.log("Source:", Source);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleActivate = (key: string) => {
    console.log("Activate Key:");
   
  }


  const columns: ColumnsType = [
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
  ];
  if (user?.role === "invmanager") {
    columns.push({
      title: "Action",
      key: "action",
      render: (text: string, record: SupplierInfo) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleActivate(record.sid || "")}
          >
            Activate
          </Button>
          {/* <Button type="dashed" onClick={() => handleDelete(record.sid || "")}>Delete</Button> */}
          {/* <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.sid || '')} // Ensure record.sid is always a string
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm> */}
        </Space>
      ),
    });
  }


  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={Source} />
     

    </>
  );
};

export default ListTable;
