import React from 'react'
import { Layout, theme, Typography } from "antd";
import ListAllPurchaseTable from '../../components/Purchase/ListAllPurchaseTable';

const { Content } = Layout;
const { Title } = Typography;

const AllPurchasePage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <>
          <Title
            level={4}
            style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
          >
            ALL purchases
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
                <ListAllPurchaseTable />
            
              
            </Content>
          </Layout>
        </>
      );
}

export default AllPurchasePage;