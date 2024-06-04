import React from "react";
import { Layout, Row, Col, Input, Avatar, Button, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  SearchOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  SettingOutlined,
  DashboardOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Link from "antd/es/typography/Link";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  const menu = (
    <Menu>
      <SubMenu key="sub1" title="Admin" icon={<SettingOutlined />}>
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<TeamOutlined />}
          onClick={() => navigate("/manage-staff")}
        >
          Manage Staff
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<FileOutlined />}
          onClick={() => navigate("/reports")}
        >
          Reports
        </Menu.Item>
      </SubMenu>
      <Menu.Item
        key="4"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
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
        <Col span={12}>
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
