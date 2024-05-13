import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import { UnitInfo } from "../../../../shared/types/Unit";
import { useCreateUnit, useUpdateUnit } from "../../services/mutations/unitMutation";

interface UnitFormProps {
  initialValues?: UnitInfo;
  visible: boolean;
  onCancel: () => void;
}

const UnitForm: React.FC<UnitFormProps> = ({initialValues, visible, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.unitName,
        standard: initialValues.standard,
        
      });
      console.log("Initial Values after edit dispaly:", initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);
  
  
  const createUnitMutation = useCreateUnit();
  const updateUnitMutation = useUpdateUnit();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
        formData.append("name", values.name);
        formData.append("standard", values.standard);

      const unitInfo: UnitInfo = {
        unitID: initialValues?.unitID || "", 
        unitName: formData.get("name") as string,
        standard: formData.get("standard") as string,
        
      };

      if (initialValues) {
        updateUnitMutation.mutate(unitInfo);
        message.success("Unit updated successfully!");
      } else {
        createUnitMutation.mutate(unitInfo);
        console.log("Creating Unit:", unitInfo);
        message.success("Unit added successfully!");
      }
      form.resetFields();
      onCancel(); 
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Unit" : "Add Unit"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
      <Row gutter={16}>
           <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="standard"
                label="Standard"
                rules={[
                  { required: true, message: "Please enter the Standard" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
          {initialValues ? "Update Unit" : "Add Unit"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UnitForm;

