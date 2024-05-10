import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { ProductInfo } from "../../../../shared/types/Product";
import { useAllProducts } from "../../services/queries/productQueries";

const ListTable = () => {
  const [searchValue, setSearchValue] = useState("");

  const allProductsQuery = useAllProducts();

  const Source = allProductsQuery.data
    ? allProductsQuery.data.map(
        (queryResult: ProductInfo) => {
          return {
            key: queryResult.productID,
            pid: queryResult.productID,
            name: queryResult.name,
            suppliername: queryResult.supplier,
            catagory: queryResult.category,
            unit: queryResult.unit,
            quantity: queryResult.quantity,
            
          };
        }
      )
    : [];

  console.log("Source:", Source);
  const filteredData = Source.filter((entry: { name: string; }) =>
    entry.name?.toLowerCase().includes(searchValue.toLowerCase())
  );



  const handleSearch = (value: string) => {
    setSearchValue(value);
  
  };

  const handleDelete = (key: string) => {
    
    // setDataSource(filteredDataSource);
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
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
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
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default ListTable;
