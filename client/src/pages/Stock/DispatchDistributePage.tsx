import React from "react";
import { Layout, theme, Typography } from "antd";
import DispatchDistribute from "../../components/Stock/DispatchDistribute";

const { Content } = Layout;
const { Title } = Typography;

const DispatchDistributePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Dispatch Distribution Confirmaiton
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
          <Title level={5}> Disparch Data</Title>
          <DispatchDistribute />
        </Content>
      </Layout>
    </>
  );
};

export default DispatchDistributePage;
