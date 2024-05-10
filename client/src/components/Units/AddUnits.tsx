import React, { useState } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddUnits = () => {
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

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "20px" }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add Units
      </Button>
      <Modal
        title="Add Units"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="addUnitsForm">
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
                name="Standard"
                label="Standard"
                rules={[
                  { required: true, message: "Please enter the Standard" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AddUnits;
