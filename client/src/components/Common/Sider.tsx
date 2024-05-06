import React, { useState } from "react";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
  ShopOutlined
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
      <Menu.Item
          key="dashboard"
          icon={<UserOutlined />}
          onClick={() => handleMenuClick("dashboard")}
        >
          <NavLink to="/">Dashboard</NavLink>
        </Menu.Item>
        <Menu.SubMenu key="supplierSubMenu" title="Supplier">
          <Menu.Item key="supplierList" icon={<ShopOutlined />} onClick={() => handleMenuClick("supplierList")}>
            <NavLink to="/supplier/list">List</NavLink>

          </Menu.Item>

        </Menu.SubMenu>
        <Menu.SubMenu key="unitsSubMenu" title="Units">
          <Menu.Item key="unitsList" icon={<ShopOutlined />} onClick={() => handleMenuClick("unitsList")}>
            <NavLink to="/units/list">List</NavLink>

          </Menu.Item>

        </Menu.SubMenu>
        <Menu.SubMenu key="catagorySubMenu" title="Catagory">
          <Menu.Item key="catagoryList" icon={<ShopOutlined />} onClick={() => handleMenuClick("catagoryList")}>
            <NavLink to="/catagory/list">List</NavLink>

          </Menu.Item>

        </Menu.SubMenu>
        <Menu.SubMenu key="inventorySubMenu" title="Product">
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
        </Menu.SubMenu>
        <Menu.SubMenu key="stockSubMenu" title="Stock">
          <Menu.Item key="stockList" icon={<ShopOutlined />} onClick={() => handleMenuClick("stockList")}>
            <NavLink to="/stock/list">items</NavLink>

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
