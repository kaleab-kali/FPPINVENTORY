import React from "react";
import { Layout, theme, Typography } from "antd";
import DispatchApproval from "../../components/Resource/DispatchApproval";
import AllDispatcheditems from "../../components/Stock/AllDispatcheditems";

const { Content } = Layout;
const { Title } = Typography;

const DispatchedItemsPage = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      return (
        <>
          <Title
            level={4}
            style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
          >
            All Dispatched items List
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
              <AllDispatcheditems />
             
            </Content>
          </Layout>
        </>
      );
    
}

export default DispatchedItemsPage