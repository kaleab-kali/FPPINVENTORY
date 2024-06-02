import React from "react";
import { Layout, Row, Col, Input, Avatar, Button, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useAuth } from "../../context/AuthContext";

const { Header: AntdHeader } = Layout;
const { SubMenu } = Menu;

interface HeaderProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  username: string;
}

const Header: React.FC<HeaderProps> = ({
  collapsed,
  toggleCollapsed,
  username,
}) => {
  const { logout } = useAuth();
  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleLogout = () => {
    // Implement logout logic here
    logout()
    console.log("Logging out...");
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntdHeader
      style={{
        background: "linear-gradient(to right, #536976, #292E49)",
        padding: "0 20px",
        height: "70px",
      }}
    >
      <Row>
        <Col span={6} style={{ textAlign: "left" }}>
          <Button
            type="text"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined style={{ color: "#fff" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "#fff" }} />
              )
            }
            onClick={toggleCollapsed}
          />
        </Col>
        {/* <Col span={6} style={{ padding: "10px 0" }}>
          <img
            src="/fpp.jpg"
            alt="Company Logo"
            style={{ height: "50px", borderRadius: "20px" }}
          />
        </Col> */}
        <Col span={12} style={{}}>
          <Input
            placeholder="Search Employee"
            allowClear
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            style={{ border: "2px solid transparent" }}
            prefix={<SearchOutlined style={{ color: "#fff" }} />}
          />
        </Col>
        <Col span={6} style={{ textAlign: "right" }}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: "#fff" }}
            >
              <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
              {username}
            </Link>
          </Dropdown>
        </Col>
      </Row>
    </AntdHeader>
  );
};

export default Header;
