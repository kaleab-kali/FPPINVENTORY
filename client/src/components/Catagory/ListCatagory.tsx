import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";

const data = [
  {
    key: "1",
    id: "1",
    name: "Drinks",
    
  },
  {
    key: "2",
    id: "2",
    name: "Food",
  },
  {
    key: "3",
    id: "3",
    name: "Tech",
  },
  {
    key: "4",
    id: "4",
    name: "Stationary",
  },
];

const ListCatagoryTable = () => {
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
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
    {
      title: "Catagory Name",
      dataIndex: "name",
      key: "name",
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

export default ListCatagoryTable;