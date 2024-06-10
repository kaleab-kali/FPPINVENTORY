import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { useAllUnits } from "../../services/queries/unitQueries";
import { useDeleteUnit } from "../../services/mutations/unitMutation";
import { UnitInfo } from "../../../../shared/types/Unit";
import UnitForm from "./UnitForm";
import { ColumnsType } from "antd/es/table";
import { useAuth } from "../../context/AuthContext";

const ListUnitTable: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { user } = useAuth();
  const allUnitsQuery = useAllUnits();
  const deleteUnitMutation = useDeleteUnit();
  console.log("All Suppliers Query:", allUnitsQuery.data);

  const Source = allUnitsQuery.data
    ? allUnitsQuery.data.map((queryResult: UnitInfo, index: number) => {
        return {
          key: queryResult.unitID,
          unitID: queryResult.unitID,
          unitName: queryResult.unitName,
          standard: queryResult.standard,
        };
      })
    : [];

  console.log("Source:", Source);

  const filteredSource = searchValue
    ? Source.filter((unit: any) =>
        unit.unitName?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : Source;

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleDelete = (key: string) => {
    deleteUnitMutation.mutate(key);
  };

  const handleEdit = (record: any) => {
    console.log("Edit Record:", record);
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null); // Clear edit record after modal is closed
  };

  const columns: ColumnsType<UnitInfo> = [
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
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
    },
  ];

  if (user?.role === "invmanager") {
    columns.push({
      title: "Action",
      key: "action",
      render: (text: string, record: UnitInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.unitID || "")} // Ensure record.unitID is always a string
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
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
