import React from "react";
import Title from "antd/lib/typography/Title";
import { Layout, theme } from "antd";
import AddProduct from "../../components/Product/AddProduct";
import ListProductTable from "../../components/Product/ListProductTable";
import { useAuth } from "../../context/AuthContext";
const { Content } = Layout;

const InventoryProfilePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {user} = useAuth()
  return (
    <>
      <Title
        level={4}
        style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}
      >
        Product list
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
          {user?.role === "invmanager" ? (
            <>
              <AddProduct />
            </>
          ) : (
            ""
          )}
          <Title level={5}> Product Data</Title>
          <ListProductTable />
        </Content>
      </Layout>
      {/* <EmployeeRegistrationForm /> */}
    </>
  );
};

export default InventoryProfilePage;
