import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddSupplier from "../../components/supplier/AddSupplier";
import ListTable from "../../components/supplier/ListTable";
const { Content } = Layout;

const SupplierPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Lsit of Suppliers
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
            <AddSupplier />
            <Title level={5}> Supplier Data</Title>
            <ListTable />
          
        </Content>
      </Layout>
    </>
  );
};

export default SupplierPage;
