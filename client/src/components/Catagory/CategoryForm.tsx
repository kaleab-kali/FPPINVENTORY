import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message, Select } from "antd";
import { CategoryInfo } from "../../../../shared/types/Category";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../services/mutations/categoryMutation";
import { UnitInfo } from "../../../../shared/types/Unit";
import { useAllUnits } from "../../services/queries/unitQueries";

interface CategoryFormProps {
  initialValues?: CategoryInfo;
  visible: boolean;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialValues,
  visible,
  onCancel,
}) => {
  
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        categoryName: initialValues.categoryName,
        unit: initialValues.unit,
      });
      console.log("Initial Values after edit dispaly:", initialValues);
      console.log("Initial Values after edit dispaly id:", initialValues.catID);

    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const getAllUnitsQuery = useAllUnits();

  const unitSource = getAllUnitsQuery.data
    ? getAllUnitsQuery.data.map((queryResult: UnitInfo) => {
        return {
          key: queryResult.unitID,
          id: queryResult.unitID,
          name: queryResult.unitName,
          standard: queryResult.standard,
        };
      })
    : [];

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("categoryName", values.categoryName);
      formData.append("unit", values.unit);

      const categoryInfo: CategoryInfo = {
        catID: initialValues?.catID || "",
        categoryName: formData.get("categoryName") as string,
        unit: formData.get("unit") as string,
      };

      if (initialValues) {
        console.log("Updating Category with this specfoc id:", categoryInfo.catID);
        // debugger;
        updateCategoryMutation.mutate(categoryInfo);
        message.success("Category updated successfully!");
      } else {
        createCategoryMutation.mutate(categoryInfo);
        console.log("Creating Category:", categoryInfo);
        message.success("Category added successfully!");
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Category" : "Add Category"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
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
              name="unit"
              label="Unit of Measurment"
              rules={[
                { required: true, message: "Please enter the mobile number" },
              ]}
            >
              <Select placeholder="Select a unit" allowClear>
                {unitSource.map((unit) => {
                  return (
                    <Select.Option
                      key={unit.id}
                      value={unit.name?.toLowerCase()}
                    >
                      {unit.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Category" : "Add Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
