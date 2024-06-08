import React from 'react'
import { Layout, theme, Typography } from "antd";
import AddPurchase from '../../components/Purchase/AddPurchase';

const { Content } = Layout;
const { Title } = Typography;

const AddPurchasePage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <>
          <Title
            level={4}
            style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
          >
            Add New Purchase
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
                
               <AddPurchase />
                
              
            </Content>
          </Layout>
        </>
      );
}

export default AddPurchasePage