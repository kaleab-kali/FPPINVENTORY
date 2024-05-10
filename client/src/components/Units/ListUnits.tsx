import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import {
  useAllUnits,
} from "../../services/queries/unitQueries";
import { UnitInfo } from "../../../../shared/types/Unit";

const ListUnitTable = () => {
  const [searchValue, setSearchValue] = useState("");

  const allUnitsQuery = useAllUnits();
  console.log("All Suppliers Query:", allUnitsQuery.data);
  
  const Source = allUnitsQuery.data
    ? allUnitsQuery.data.map(
        (queryResult: UnitInfo, index: number) =>{
          return {
            key: queryResult.id,
            id: queryResult.id,
            unit: queryResult.unitName,

          };
        }
          
      )
    : [];
  
  console.log("Source:", Source);

  const filteredSource = searchValue
    ? Source.filter((unit) =>
        unit.unit?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : Source;

  // Reverse the filteredSource array to display the latest entry at the first row
  // const reversedSource = [...filteredSource].reverse();

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
      title: "Unit Name",
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
      <Table columns={columns} dataSource={filteredSource} />
    </>
  );
};

export default ListUnitTable;
