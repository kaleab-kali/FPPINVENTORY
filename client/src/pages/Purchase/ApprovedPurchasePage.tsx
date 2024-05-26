import React from "react";
import { Layout, theme, Typography } from "antd";
import ApprovalPurhase from "../../components/Purchase/ApprovalPurhase";

const { Content } = Layout;
const { Title } = Typography;

const ApprovedPurchasePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
       Approval of ALL Purchases
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
            <ApprovalPurhase />
        </Content>
      </Layout>
    </>
  );
};
export default ApprovedPurchasePage;
