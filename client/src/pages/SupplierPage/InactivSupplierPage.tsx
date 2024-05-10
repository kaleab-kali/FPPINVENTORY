import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddSupplier from "../../components/supplier/AddSupplier";
import ListTable from "../../components/supplier/ListTable";
import InactiveSupplierTable from "../../components/supplier/InactiveSupplierTable";
const { Content } = Layout;

const InactiveSupplierPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Lsit of Inactive Suppliers
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
            
            <Title level={5}> Inactive Supplier Data</Title>
            <InactiveSupplierTable />


          
        </Content>
      </Layout>
    </>
  );
};

export default InactiveSupplierPage;
