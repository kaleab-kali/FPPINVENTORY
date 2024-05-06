import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";

const data = [
  {
    key: "1",
    pid: "FPCPID-0001",
    name: "kolo",
    suppliername: "HPC",
    unit: 5,
    catagory: "tech",
  },
  {
    key: "2",
    pid: "FPCPID-0002",
    name: "computer",
    suppliername: "HPC",
    unit: 5,
    catagory: "tech",
  },
  {
    key: "3",
    pid: "FPCPID-0003",
    name: "cable",
    suppliername: "HPC",
    unit: 5,
    catagory: "tech",
  },
  {
    key: "4",
    pid: "FPCPID-0004",
    name: "laptop",
    suppliername: "HPC",
    unit: 5,
   catagory: "tech",
   
  },
];

const ListTable = () => {
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
        title: "PID",
        dataIndex: "pid",
        key: "pid",
      },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Supplier Name",
      dataIndex: "suppliername",
      key: "suppliername"
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
        title: "Catagory",
        dataIndex: "catagory",
        key: "catagory",
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

export default ListTable;
