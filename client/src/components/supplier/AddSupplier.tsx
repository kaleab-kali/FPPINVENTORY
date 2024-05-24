import React, { useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import SupplierForm from "./SupplierForm";

const AddSupplier: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
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
      <SupplierForm visible={visible} onCancel={handleCancel} />
    </>
  );
};

export default AddSupplier;

