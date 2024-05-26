import React from 'react'
import { Layout, theme, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const PurchaseReportPage = () => {
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
                
              
            </Content>
          </Layout>
        </>
      );
}

export default PurchaseReportPage