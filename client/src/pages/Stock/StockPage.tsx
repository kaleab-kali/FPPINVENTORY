import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddSupplier from "../../components/supplier/AddSupplier";
import ListTable from "../../components/supplier/ListTable";
import ListStockItems from "../../components/Stock/ListStockItems";
const { Content } = Layout;

const StockPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        List of Stock
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
            
            <Title level={5}> Stock Data</Title>
            <ListStockItems />


          
        </Content>
      </Layout>
    </>
  );
};

export default StockPage;
