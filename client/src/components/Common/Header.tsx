import React from "react";
import { Layout, Row, Col, Input, Avatar } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

const { Header: AntdHeader } = Layout;
// const { Search } = Input;

const Header: React.FC = () => {
  const handleSearch = (value: string) => {
    console.log(value);

  };
  return (
    <AntdHeader
      style={{
        background: "white",
        boxShadow: "0px 2px 8px 0px rgba(0,0,0,0.2)",
        zIndex: 1,
      }}
    >
      <Row>
        <Col span={6} style={{ padding: "6px 2px" }}>
          <img
            src={process.env.PUBLIC_URL + "/fpp.jpg"}
            alt="Company Logo"
            style={{ height: "50px", borderRadius: "20px" }}
          />
        </Col>
        <Col span={12} style={{  }}>
          <Input
            placeholder="Search Employee"
            allowClear
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            style={{ border: "2px solid transparent" }} 
            prefix={<SearchOutlined />}
          />
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Avatar icon={<UserOutlined />} />
        </Col>
      </Row>
    </AntdHeader>
  );
};

export default Header;
