import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";

const data = [
  {
    key: "1",
    stid: "FPCSIID-0001",
    productname: "hp",
    catagory: "tech",
    unit: "pcs",
    supplier: "jj",
    intqty: 50,
    outqty: 20,
    remqty: 30,

  },
  {
    key: "2",
    stid: "FPCSIID-0002",
    productname: "Jim Green",
    catagory: "tech",
    unit: "pcs",
    supplier: "jj",
    intqty: 50,
    outqty: 20,
    remqty: 30,
    
  },
  {
    key: "3",
    stid: "FPCSID-0003",
    productname: "Joe Black",
    catagory: "tech",
    unit: "pcs",
    supplier: "jj",
    intqty: 50,
    outqty: 20,
    remqty: 30,
    
  },
  {
    key: "4",
    stid: "FPCSID-0004",
    productname: "Jim Red",
    catagory: "tech",
    unit: "pcs",
    supplier: "jj",
    intqty: 50,
    outqty: 20,
    remqty: 30,
  
  },
];

const ListStockItems = () => {
  const [dataSource, setDataSource] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filteredData = data.filter((entry) =>
      entry.productname.toLowerCase().includes(value.toLowerCase())
    );
    setDataSource(filteredData);
  };

  const handleDelete = (key: string) => {
    const filteredDataSource = dataSource.filter((item) => item.key !== key);
    setDataSource(filteredDataSource);
  };

  const columns = [
    {
      title: "STID",
      dataIndex: "stid",
      key: "stid",
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Catagory",
      dataIndex: "catagory",
      key: "catagory",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
        title: "INTQTY",
        dataIndex: "intqty",
        key: "intqty",
      },
      {
        title: "OutQTY",
        dataIndex: "outqty",
        key: "outqty",
      },
      {
        title: "Stock",
        dataIndex: "remqty",
        key: "remqty",
      },
  ];

  const handleEdit = (key: string) => {
    console.log("Edit clicked for row with key:", key);
  };

  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default ListStockItems;
