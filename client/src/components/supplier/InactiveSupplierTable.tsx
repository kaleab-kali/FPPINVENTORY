import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";

const data = [
  {
    key: "1",
    sid: "FPCSID-0001",
    name: "John Brown",
    age: 32,
    mnumber: "123456",
    email: "jj@gmail.com",
    address: "New York No. 1 Lake Park",
    status: "inactive"
  },
  {
    key: "2",
    sid: "FPCSID-0002",
    name: "Jim Green",
    age: 42,
    mnumber: "123456",
    email: "dkj@gmail.com",
    address: "London No. 1 Lake Park",
    status: "inactive"
  },
  {
    key: "3",
    sid: "FPCSID-0003",
    name: "Joe Black",
    age: 32,
    mnumber: "123456",
    email: "sda@gmai.com",
    address: "Sidney No. 1 Lake Park",
    status: "inactive"
  },
  {
    key: "4",
    sid: "FPCSID-0004",
    name: "Jim Red",
    age: 32,
    mnumber: "123456",
    email: "sdfsd@gma.com",
    address: "London No. 2 Lake Park",
    status: "inactive"
  },
];

const InactiveSupplierTable = () => {
  const [dataSource, setDataSource] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filteredData = data.filter((entry) =>
      entry.name.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  const handleDelete = (key: string) => {
    const filteredDataSource = dataSource.filter(item => item.key !== key);
    setDataSource(filteredDataSource);
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
      key: "mnumber"
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
        title: "status",
        dataIndex: "status",
        key: "status",
      },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record.key)}>Edit</Button>
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

  const handleEdit = (key: string) => {
    console.log("Edit clicked for row with key:", key);
  };

  return (
    <>
      <Input
        style={{ marginBottom: 10 , float: "right", width: 200}}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default InactiveSupplierTable;
