import { Input, Table, Button, Space, Popconfirm, Form, Row, Col, Select, Modal } from "antd";
import React, { useState } from "react";
import { useAllCategorys } from "../../services/queries/categoryQueries";
import { CategoryInfo } from "../../../../shared/types/Category";
import { UnitInfo } from "../../../../shared/types/Unit";
import { useAllUnits } from "../../services/queries/unitQueries";
import { useUpdateCategory, useDeleteCategory } from "../../services/mutations/categoryMutation";
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
  const [selectedRow, setSelectedRow] = useState<CategoryInfo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); 
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const getAllUnitsQuery = useAllUnits();
  console.log("All Units Query:", getAllUnitsQuery.data);
  const unitSource = getAllUnitsQuery.data
    ? getAllUnitsQuery.data.map((queryResult: UnitInfo) => {
        return {
          key: queryResult.unitID,
          unitID: queryResult.unitID,
          unitName: queryResult.unitName,
          standard: queryResult.standard,
        };
      })
    : [];
  const allCategorysQuery = useAllCategorys();
  console.log("All Categorys Query:", allCategorysQuery.data);

  const Source = allCategorysQuery.data
    ? allCategorysQuery.data.map(
        (queryResult: CategoryInfo) => {
          return {
            key: queryResult.catID,
            catID: queryResult.catID,
            categoryName: queryResult.categoryName,
            unit: queryResult.unit,
            _id: queryResult._id,
          };
        }
      )
    : [];

  const handleEdit = (record: any) => {
    setSelectedRow(record);
    form.setFieldsValue({
      categoryName: record.categoryName,
      unitName: record.unitName,
    });
    console.log(record);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };  
  console.log("Source:", Source);
  const filteredData = Source.filter((entry: { categoryName: string }) =>
    entry.categoryName?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
  
  };

  const handleDelete = (key: string) => {
    deleteCategory.mutate(key);
    // const filteredDataSource = dataSource.filter(item => item.key !== key);
    // setDataSource(filteredDataSource);
  };
  const onFinish = (values: any) => {
    const updatedValues = {
      ...values,
      catID: selectedRow?.catID,
      _id: selectedRow?._id
    };
    console.log("Received values of form: ", updatedValues);
    // Implement form submission/update logic
    updateCategory.mutate(updatedValues);
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "catID",
      key: "id",
    },
    {
      title: "Catagory Name",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Unit of Measurment",
      dataIndex: "unitName",
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


  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredData} />
      <Modal
        title="Edit Catagory"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="editCatagoryForm"
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="categoryName"
                label="Name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="unitName"
                label="Unit of Measurment"
                rules={[
                  {
                    required: true,
                    message: "Please enter Unit of Measurment",
                  },
                ]}
              >
                <Select placeholder="Select a unit" allowClear>
                  {unitSource.map(
                    (unit: {
                      id: React.Key | null | undefined;
                      name:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<
                            any,
                            string | React.JSXElementConstructor<any>
                          >
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined;
                    }) => {
                      return (
                        <Select.Option key={unit.id} value={unit.name}>
                          {unit.name}
                        </Select.Option>
                      );
                    }
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>
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

export default ListCatagoryTable;
