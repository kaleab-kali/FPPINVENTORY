import React, { useState, useEffect } from "react";
import {
  Layout,
  Row,
  Col,
  Input,
  Avatar,
  Button,
  Menu,
  Dropdown,
  Badge,
  Modal,
  message,
} from "antd";
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
import { FaBell } from "react-icons/fa";
import { useNotification } from "../../services/queries/notificationQueries";
import { useProfile } from "../../services/queries/profileQueries";
import { useEmployeeProfile } from "../../services/queries/employeeQueries";
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
  const { logout, user } = useAuth();
  const [activeKey, setActiveKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleMenuClick = (key: string) => {
    setActiveKey(key);
  };

  const getNotification = useNotification(user?.ObjId || "");
  const employeeNotifications = getNotification.data;
  const staffProfile = useProfile();
  const employee = useEmployeeProfile(user?.employeeId || "");

  const profile = user?.type === "invstaff" ? staffProfile.data : employee.data;

  useEffect(() => {
    // if (!profile) {
    //   message.error("Profile data not loaded");
    // }
  }, [profile]);

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleLogout();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSearch = (value: string) => {
    console.log(value);
  };

  const handleLogout = () => {
    logout();
    console.log("Logging out...");
  };

  let title;
  switch (user?.role) {
    case "admin":
      title = "Admin";
      break;
    case "employee":
      title = "Employee";
      break;
    case "invmanager":
      title = "IManager";
      break;
    case "stockmanager":
      title = "SManager";
      break;
    case "personnel":
      title = "Personnel";
      break;
    default:
      title = "Role";
  }

  const unreadCount = employeeNotifications?.notifications.filter(
    (notification: { isRead: boolean }) => !notification.isRead
  ).length;

  const menu = (
    <Menu>
      <SubMenu key="sub1" title={title} icon={<SettingOutlined />}>
        {user?.role !== "employee" && (
          <>
            <Menu.Item
              key="1"
              icon={<DashboardOutlined />}
              onClick={() => {
                handleMenuClick("dashboard");
                navigate("/");
              }}
            >
              Dashboard
            </Menu.Item>
            {(user?.role === "admin" || user?.role === "invmanager") && (
              <Menu.Item
                key="2"
                icon={<TeamOutlined />}
                onClick={() => {
                  handleMenuClick("allStaffList");
                  navigate("/staff/allStaff");
                }}
              >
                Manage Staff
              </Menu.Item>
            )}
            {user?.role === "admin" && (
              <Menu.Item
                key="3"
                icon={<FileOutlined />}
                onClick={() => navigate("/reports")}
              >
                Reports
              </Menu.Item>
            )}
          </>
        )}
        {user?.role === "employee" && (
          <Menu.Item
            key="7"
            icon={<FaBell />}
            onClick={() => navigate("/profile")}
          >
            Messages
          </Menu.Item>
        )}
      </SubMenu>
      <Menu.Item
        key="4"
        icon={<UserOutlined />}
        onClick={() => navigate("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item key="5" icon={<LogoutOutlined />} onClick={showLogoutConfirm}>
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
          <Badge
            count={unreadCount}
            size="small"
            style={{
              backgroundColor: "#f5222d",
              marginRight: "22px",
              marginTop: "3px",
              cursor: "pointer",
            }}
          >
            <FaBell
              style={{
                color: "#fff",
                fontSize: "20px",
                marginRight: "20px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/profile")}
            />
          </Badge>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Link
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ color: "#fff" }}
            >
              <Avatar
                src={
                  profile?.photo
                    ? `http://localhost:7000/${profile.photo}`
                    : undefined
                }
                icon={!profile?.photo ? <UserOutlined /> : undefined}
                style={{ marginRight: "8px" }}
              />
              {profile?.firstName || "Loading..."}
            </Link>
          </Dropdown>
        </Col>
      </Row>
      <Modal
        title="Confirm Logout"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </AntdHeader>
  );
};

export default Header;
