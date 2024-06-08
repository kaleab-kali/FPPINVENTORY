import React from "react";
import { Layout, theme, Typography } from "antd";
import DispatchApproval from "../../components/Resource/DispatchApproval";
import ReturnForm from "../../components/Resource/ReturnForm";
const { Content } = Layout;
const { Title } = Typography;

const ReturnablePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Lsit of Dispatch requests
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
          <ReturnForm />
        </Content>
      </Layout>
    </>
  );
};

export default ReturnablePage;
