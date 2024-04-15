import React, { useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";

const { Sider: AntdSider } = Layout;

const Sider: React.FC = () => {
  const [activeKey, setActiveKey] = useState("");

  const handleMenuClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <AntdSider
      style={{
        backgroundColor: "white",
        minHeight: "100vh",
        height: "auto",
        paddingTop: "20px",
      }}
    >
      <Menu mode="inline" selectedKeys={[activeKey]}>
        <Menu.SubMenu key="inventorySubMenu" title="Inventory">
          <Menu.Item
            key="inventoryRegistration"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("inventoryRegistration")}
            // style={{
            //   color: activeKey === "employeeRegistration" ? "blue" : "",
            //   fontWeight: activeKey === "employeeRegistration" ? "bold" : "",
            // }}
          >
            <NavLink to="/inventory/registration">Registration</NavLink>
          </Menu.Item>
          <Menu.Item
            key="inventoryView"
            icon={<FileTextOutlined />}
            onClick={() => handleMenuClick("inventoryView")}
          >
            <NavLink to="/inventory/view">View</NavLink>
          </Menu.Item>
          <Menu.Item
            key="inventoryEdit"
            icon={<EditOutlined />}
            onClick={() => handleMenuClick("inventoryEdit")}
          >
            <NavLink to="/inventory/edit">Edit</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="dispatchSubMenu" title="Dispatch">
          <Menu.Item key="request" onClick={() => handleMenuClick("request")}>
            <NavLink to="/dispatch/request">Request</NavLink>
          </Menu.Item>
          <Menu.Item
            key="currentDispacth"
            onClick={() => handleMenuClick("currentDispatch")}
          >
            <NavLink to="/dispatch/currentDispacth">Dispatched Items</NavLink>
          </Menu.Item>
          <Menu.Item key="dispatchHistory">
            <NavLink to="/dispatch/history">History</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        {/* <Menu.SubMenu key="attendanceSubMenu" title="Attendance">
          <Menu.Item key="currentAttendance">
            <NavLink to="/attendace/currentCurrentAttendance">
              Current Attendance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="attendanceHistory">
            <NavLink to="/attendance/history">History</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu key="performanceSubMenu" title="performance">
          <Menu.Item key="currentperformance">
            <NavLink to="/performance/currentperformance">
              Current performance
            </NavLink>
          </Menu.Item>
          <Menu.Item key="performanceHistory">
            <NavLink to="/performance/history">History</NavLink>
          </Menu.Item>
        </Menu.SubMenu> */}
      </Menu>
    </AntdSider>
  );
};

export default Sider;
