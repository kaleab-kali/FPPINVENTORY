import React, { useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaBoxOpen, FaChartLine, FaRuler, FaWarehouse } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import "../../styles/SiderLayout.css";

const { Sider: AntdSider } = Layout;

interface SiderProps {
  collapsed: boolean;
}

const Sider: React.FC<SiderProps> = ({ collapsed }) => {
  const [activeKey, setActiveKey] = useState("");

  const handleMenuClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <AntdSider
      style={{
        minHeight: "100vh",
        height: "auto",
        paddingTop: "20px",
        backgroundColor: "#001529",
        zIndex: 1,
      }}
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => console.log(collapsed)}
    >
      <div className="logo-image-class">
        <img
          src={process.env.PUBLIC_URL + "/fpp.jpg"}
          alt="Company Logo"
          style={{ height: "50px", borderRadius: "20px" }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[activeKey]}
        style={{ minHeight: "100vh" }}
      >
        <Menu.Item
          key="dashboard"
          icon={<UserOutlined />}
          onClick={() => handleMenuClick("dashboard")}
        >
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>
        <Menu.SubMenu
          key="supplierSubMenu"
          title="Supplier"
          icon={<LiaShippingFastSolid size={20} />}
        >
          <Menu.Item
            key="supplierList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("supplierList")}
          >
            <NavLink to="/supplier/list">List</NavLink>
          </Menu.Item>
          <Menu.Item
            key="supplierInactiveList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("supplierInactiveList")}
          >
            <NavLink to="/supplier/inactivelist">Inactive</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="unitsSubMenu" title="Units" icon={<FaRuler />}>
          <Menu.Item
            key="unitsList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("unitsList")}
          >
            <NavLink to="/units/list">List</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="categorySubMenu"
          title="Category"
          icon={<TbCategory2 />}
        >
          <Menu.Item
            key="categoryList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("categoryList")}
          >
            <NavLink to="/category/list">List</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="productSubMenu"
          title="Product"
          icon={<RiProductHuntLine />}
        >
          <Menu.Item
            key="productRegistration"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("productRegistration")}
            // style={{
            //   color: activeKey === "employeeRegistration" ? "blue" : "",
            //   fontWeight: activeKey === "employeeRegistration" ? "bold" : "",
            // }}
          >
            <NavLink to="/product/registration">Registration</NavLink>
          </Menu.Item>
          <Menu.Item
            key="productView"
            icon={<FileTextOutlined />}
            onClick={() => handleMenuClick("productView")}
          >
            <NavLink to="/product/view">List</NavLink>
          </Menu.Item>
          <Menu.Item
            key="productInactive"
            icon={<FileTextOutlined />}
            onClick={() => handleMenuClick("productInactive")}
          >
            <NavLink to="/product/inactive">Inactive</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="purchaseSubMenu"
          title="Purchase"
          icon={<RiProductHuntLine />}
        >
          <Menu.Item
            key="purchaseRegistration"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("purchaseRegistration")}
          >
            <NavLink to="/purchase/addPurchase">Registration</NavLink>
          </Menu.Item>
          <Menu.Item
            key="purchaseList"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("purchaseList")}
          >
            <NavLink to="/purchase/list">All Purchase</NavLink>
          </Menu.Item>
          <Menu.Item
            key="purchaseApproved"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("purchaseApproved")}
          >
            <NavLink to="/purchase/approved">Approved</NavLink>
          </Menu.Item>
          <Menu.Item
            key="purchaseReport"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("purchaseReport")}
          >
            <NavLink to="/purchase/report">Report</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="stockSubMenu"
          title="Stock Managment"
          icon={<FaWarehouse />}
        >
          <Menu.Item
            key="stockList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("stockList")}
          >
            <NavLink to="/stock/list">Report</NavLink>
          </Menu.Item>
          <Menu.Item
            key="stockReturnableList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("stockReturnableList")}
          >
            <NavLink to="/stock/returnable">Returnable </NavLink>
          </Menu.Item>
          <Menu.Item
            key="stockNonReturnableList"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("stockNonReturnableList")}
          >
            <NavLink to="/stock/nonreturnable">Non Returnable </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="resourceSubMenu"
          title="Resource"
          icon={<FaBoxOpen />}
        >
          <Menu.Item key="request" onClick={() => handleMenuClick("request")}>
            <NavLink to="/resource/request">Request</NavLink>
          </Menu.Item>
          <Menu.Item key="transfer" onClick={() => handleMenuClick("transfer")}>
            <NavLink to="/resource/transfer">Transfer</NavLink>
          </Menu.Item>
          <Menu.Item
            key="currentDispacth"
            onClick={() => handleMenuClick("currentDispatch")}
          >
            <NavLink to="/resource/currentDispatch">Allocated Items</NavLink>
          </Menu.Item>
          <Menu.Item key="resourceHistory">
            <NavLink to="/resource/history">History</NavLink>
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
