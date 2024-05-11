import { Input, Table, Button, Space, Popconfirm, Form, Modal } from "antd";
import React, { useState } from "react";
import {
  useAllUnits,
} from "../../services/queries/unitQueries";
import { UnitInfo } from "../../../../shared/types/Unit";
import { useUpdateUnit, useDeleteUnit } from "../../services/mutations/unitMutation";
const ListUnitTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedUnit, setSelectedUnit] = useState<UnitInfo | null>(null);
  const updateUnit = useUpdateUnit();
  const deleteUnit = useDeleteUnit();
  const allUnitsQuery = useAllUnits();
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
    ? Source.filter((unit: { unit: string }) =>
        unit.unit?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : Source;

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleEdit = (unit: UnitInfo) => {
    setSelectedUnit(unit);
    form.setFieldsValue({
      unit: unit.unitName,
      standard: unit.standard,
    });
    console.log("Selected Unit:", unit.unitName);
    setIsModalVisible(true);
  };
  const handleDelete = (key: string|undefined) => {
    deleteUnit.mutate(key);
  };
  const onFinish = (values: any) => {
    // Implement form submission/update logic
    updateUnit.mutate({
      unitID: selectedUnit?.unitID,
      unitName: values.unit,
      standard: values.standard,
    });
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "unitID",
      key: "id",
    },
    {
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Unit Name",
      dataIndex: "unitName",
      key: "unit",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: UnitInfo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.unitID)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredSource} />
      <Modal
        title="Edit Unit"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="unit" label="Unit Name">
            <Input />
          </Form.Item>
          <Form.Item name="standard" label="Standard">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ListUnitTable;