import React from "react";
import { Layout, theme, Typography } from "antd";
import DispatchApproval from "../../components/Resource/DispatchApproval";
import ReturnApproval from "../../components/Stock/ReturnApproval";

const { Content } = Layout;
const { Title } = Typography;

const ApproveReturnPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <>
          <Title
            level={4}
            style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
          >
            All Approval request for Return
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
              <Title level={5}> Return Approval Item Lsit </Title>
              <ReturnApproval />
             
            </Content>
          </Layout>
        </>
      );
}

export default ApproveReturnPage