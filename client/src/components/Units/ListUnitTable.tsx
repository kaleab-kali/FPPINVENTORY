import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import {
  useAllUnits,
} from "../../services/queries/unitQueries";
import {
  useDeleteUnit,
} from "../../services/mutations/unitMutation";
import { UnitInfo } from "../../../../shared/types/Unit";
import UnitForm from "./UnitForm";

const ListUnitTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const allUnitsQuery = useAllUnits();
  const deleteUnitMutation = useDeleteUnit();
  console.log("All Suppliers Query:", allUnitsQuery.data);
  
  const Source = allUnitsQuery.data
    ? allUnitsQuery.data.map(
        (queryResult: UnitInfo, index: number) =>{
          return {
            key: queryResult.unitID,
            unitID: queryResult.unitID,
            unitName: queryResult.unitName,
            standard: queryResult.standard,

          };
        }
          
      )
    : [];
  
  console.log("Source:", Source);

  const filteredSource = searchValue
    ? Source.filter((unit) =>
        unit.unitName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : Source;

  // Reverse the filteredSource array to display the latest entry at the first row
  // const reversedSource = [...filteredSource].reverse();

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    deleteUnitMutation.mutate(key);
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
  };

  const columns = [
    {
        title: "ID",
        dataIndex: "unitID",
        key: "unitID",
      },
    {
      title: "Unit Name",
      dataIndex: "unitName",
      key: "unitName",
    },
    {
      title: "standard",
      dataIndex: "standard",
      key: "standard",  

    },
    
    {
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.unitID || "")}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: any) => {
    console.log("Edit Record:", record);
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null); // Clear edit record after modal is closed
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
      <UnitForm
        initialValues={editRecord} 
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListUnitTable;
