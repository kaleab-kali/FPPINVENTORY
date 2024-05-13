import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, message } from "antd";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import { useCreateSupplier, useUpdateSupplier } from "../../services/mutations/supplierMutation";

interface SupplierFormProps {
  initialValues?: SupplierInfo;
  visible: boolean;
  onCancel: () => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({initialValues, visible, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        mobilenumber: initialValues.mobileNumber,
        email: initialValues.email,
        address: initialValues.address,
      });
      console.log("Initial Values after edit dispaly:", initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);
  
  
  const createSupplierMutation = useCreateSupplier();
  const updateSupplierMutation = useUpdateSupplier();

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mobilenumber", values.mnumber);
      formData.append("email", values.email);
      formData.append("address", values.address);

      const supplierInfo: SupplierInfo = {
        sid: initialValues?.sid || "", 
        name: formData.get("name") as string,
        mobileNumber: formData.get("mobilenumber") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
      };

      if (initialValues) {
        updateSupplierMutation.mutate(supplierInfo);
        message.success("Supplier updated successfully!");
      } else {
        createSupplierMutation.mutate(supplierInfo);
        console.log("Creating supplier:", supplierInfo);
        message.success("Supplier added successfully!");
      }
      form.resetFields();
      onCancel(); 
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Supplier" : "Add Supplier"}
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
              name="mobilenumber"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please enter the mobile number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please enter the address" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
          {initialValues ? "Update Supplier" : "Add Supplier"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierForm;

