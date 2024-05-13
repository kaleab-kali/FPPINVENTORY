import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import ResourceRequestForm from "../../components/Resource/RequestForm";

const { Content } = Layout;

const DispatchPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 10 }}
      >
        Item Request Form
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

          <ResourceRequestForm />
          


          
        </Content>
      </Layout>
    </>
  );
}

export default DispatchPage