import React from "react";
import { Layout, theme, Typography } from "antd";
import DispatchApproval from "../../components/Resource/DispatchApproval";

const { Content } = Layout;
const { Title } = Typography;
const DispatchApprovalPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Dispatch Request Approval
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
          <DispatchApproval />
         
        </Content>
      </Layout>
    </>
  );
};

export default DispatchApprovalPage;
