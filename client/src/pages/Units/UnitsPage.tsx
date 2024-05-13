import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddUnits from "../../components/Units/AddUnits";
import ListUnitTable from "../../components/Units/ListUnitTable";
const { Content } = Layout;

const UnitsPage = () => {
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
          <AddUnits />
          <Title level={5}> Units Data</Title>
          <ListUnitTable />
        </Content>
      </Layout>
    </>
  );
};

export default UnitsPage;
