import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { useAllCategorys } from "../../services/queries/categoryQueries";
import { CategoryInfo } from "../../../../shared/types/Category";
import { useDeleteCategory } from "../../services/mutations/categoryMutation";
import CategoryForm from "./CategoryForm";

const ListCatagoryTable: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [editRecord, setEditRecord] = useState<any>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const allCategorysQuery = useAllCategorys();
  const deleteCategoryMutation = useDeleteCategory();

  console.log("All Categorys Query:", allCategorysQuery.data);

  const Source = allCategorysQuery.data
    ? allCategorysQuery.data.map((queryResult: CategoryInfo) => {
        return {
          key: queryResult.catID,
          catID: queryResult.catID,
          categoryName: queryResult.categoryName,
          unit: queryResult.unit,
        };
      })
    : [];

  console.log("Source:", Source);
  const filteredData = Source.filter((entry) =>
    entry.categoryName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };
  const handleDelete = (key: string) => {
    console.log("Delete Key:", key);
    deleteCategoryMutation.mutate(key);
  };

  const handleEdit = (record: any) => {
    console.log("Edit Record:", record);
    setEditRecord(record);
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditRecord(null);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "catID",
      key: "catID",
    },
    {
      title: "Catagory Name",
      dataIndex: "categoryName",
      key: "categoryName",
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
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.id || "")}
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
      <Table columns={columns} dataSource={filteredData} />
      <CategoryForm
        initialValues={editRecord}
        visible={editModalVisible}
        onCancel={handleEditCancel}
      />
    </>
  );
};

export default ListCatagoryTable;