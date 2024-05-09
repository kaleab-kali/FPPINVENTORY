import React, { useState } from "react";
import { Modal, Button, Form, Input, Row, Col, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useCreateSupplier } from "../../services/mutations/supplierMutation";
import { SupplierInfo } from "../../../../shared/types/Supplier";

const AddSupplier: React.FC = () => {
  const createSupplierMutuation = useCreateSupplier();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Received values:", values);
        form.resetFields();
        setVisible(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const onFinish = async () => {
    // Log the complete form data
    const values = form.getFieldsValue(true);
    // handleFormData(values);
    
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mnumber", values.mnumber);
      formData.append("email", values.email);
      formData.append("address", values.address);

      const supplierInfo: SupplierInfo = {
        sid: "",
        name: formData.get("name") as string,
        mobileNumber: formData.get("mnumber") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
      };

      // Call the mutation
      createSupplierMutuation.mutate(supplierInfo);
    } catch (error) {
      console.error("Validation failed:", error);
    }

    // console.log("Complete Form Data:", formData);
    message.success("Form submitted successfully!");
  };

  

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "20px" }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add Supplier
      </Button>
      <Modal
        title="Add Supplier"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" name="addSupplierForm" onFinish={onFinish}>
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
                name="mnumber"
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
            Add Supplier
          </Button>
        </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSupplier;
