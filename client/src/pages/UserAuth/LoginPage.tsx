import { Layout, Typography, theme } from "antd";
import React from "react";
import LoginForm from "../../components/Common/UserAuth/LoginForm";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header style={{display:"flex", alignItems:"center", justifyContent:"center", padding: 20

      }}>
        <div className="logo-image-class">
          <img
            src={process.env.PUBLIC_URL + "/fpp.jpg"}
            alt="Company Logo"
            style={{ height: "70px", borderRadius: "20px",margin: "20px 10px"}}
          />
        </div>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          የፌደራል ማረሚያ ቤቶች አስተዳደር
        </Title>
      </Header>
      <Content>
        <div
          style={{
            padding: 24,
            margin: "5px 24px",
            minHeight: 480,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title level={4} >Login</Title>
          <LoginForm />
        </div>

      </Content>
        <Footer style={{ textAlign: "center" }}>
            FPC @ {new Date().getFullYear()} Created by FPC Team
        </Footer>
      
    </Layout>
  );
};

export default LoginPage;
