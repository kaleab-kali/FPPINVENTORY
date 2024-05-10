import React, { useState } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddProduct = () => {
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
        // onClick={showModal}
      >
        Add Product
      </Button>
    </>
  );
};

export default AddProduct;
