import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddCatagory from "../../components/Catagory/AddCatagory";
import ListCatagoryTable from "../../components/Catagory/ListCatagory";
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
            List of Catagories
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
                <AddCatagory />
                <Title level={5}> Catagory Data</Title>
                <ListCatagoryTable />
    
    
              
            </Content>
          </Layout>
        </>
      );
}

export default UnitsPage