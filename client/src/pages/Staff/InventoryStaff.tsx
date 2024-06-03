import React, { useState } from "react";
import { Layout, Typography, Space, Button, Modal } from "antd";
import RegistrationForm from "../../components/Staff/RegistrationForm";
import Table from "../../components/Staff/Table";

const { Header, Content } = Layout;
const { Title } = Typography;

const InventoryStaff: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [staffData, setStaffData] = useState<any[]>([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    console.log("Form Values:", values);
    setStaffData([...staffData, { key: Date.now().toString(), ...values }]);
    setIsModalVisible(false); // Close the modal on form submit
  };

  return (
    <Layout className="layout">
      <Title>Inventory Staff Management</Title>
      <Content className="content">
        <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
          <Button type="primary" onClick={showModal}>
            Register New Staff
          </Button>
          <Table dataSource={staffData} />
        </Space>
        <Modal
          title="Register New Staff"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null} // No default footer
        >
          <RegistrationForm onSubmit={handleFormSubmit} />
        </Modal>
      </Content>
    </Layout>
  );
};

export default InventoryStaff;
