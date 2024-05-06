import React from 'react'
import InventoryRegistrationForm from '../../components/InventoryOperations/Inventoryregistration'
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
const { Content } = Layout;

const InventoryRegistrationPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Add Product
      </Title>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: "5px 24px",
            minHeight: 480,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
           < InventoryRegistrationForm />


          
        </Content>
      </Layout>
    </>
  );
}

export default InventoryRegistrationPage