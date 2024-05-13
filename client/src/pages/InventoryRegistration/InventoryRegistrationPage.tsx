import React from 'react'
import InventoryRegistrationForm from '../../components/InventoryOperations/Inventoryregistration'
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import { useLocation } from 'react-router-dom';

const { Content } = Layout;

const InventoryRegistrationPage: React.FC= () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const productToEdit = location.state?.product;

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        {productToEdit ? "Update Product" : "Add Product"}
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
           {/* < InventoryRegistrationForm /> */}
           < InventoryRegistrationForm initialValues={productToEdit}/>


          
        </Content>
      </Layout>
    </>
  );
}

export default InventoryRegistrationPage