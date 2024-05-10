import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { useAllCategorys } from "../../services/queries/categoryQueries";
import { CategoryInfo } from "../../../../shared/types/Category";

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

  const allCategorysQuery = useAllCategorys();
  console.log("All Categorys Query:", allCategorysQuery.data);

  const Source = allCategorysQuery.data
    ? allCategorysQuery.data.map(
        (queryResult: CategoryInfo) => {
          return {
            key: queryResult.id,
            id: queryResult.id,
            name: queryResult.categoryName,
            unit: queryResult.unit,
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
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
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
      title: "Unit of Measurment",
      dataIndex: "unit",
      key: "unit",
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

export default ListCatagoryTable;
