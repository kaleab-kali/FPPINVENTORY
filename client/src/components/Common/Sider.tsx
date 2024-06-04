import React, { useState } from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import {
  FaBoxOpen,
  FaChartLine,
  FaRuler,
  FaWarehouse,
  FaHouseUser,
} from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { RiProductHuntLine } from "react-icons/ri";
import {
  UserOutlined,
  EditOutlined,
  FileTextOutlined,
  HistoryOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UngroupOutlined,
} from "@ant-design/icons";
import { LuWarehouse } from "react-icons/lu";
import { IoPersonAddOutline } from "react-icons/io5";
import { Layout, Menu, Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import "../../styles/SiderLayout.css";
import { useAuth } from "../../context/AuthContext";
const { Sider: AntdSider } = Layout;

interface SiderProps {
  collapsed: boolean;
}

const Sider: React.FC<SiderProps> = ({ collapsed }) => {
  const [activeKey, setActiveKey] = useState("");
  const { user } = useAuth();
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
          <NavLink to="/">Dashboard</NavLink>
        </Menu.Item>
        {(user?.role === "admin" || user?.role === "invmanager") && (
          <Menu.SubMenu
            key="staff"
            title="Staff"
            icon={<LuWarehouse size={20} />}
          >
            <Menu.Item
              key="allStaffList"
              icon={<UngroupOutlined />}
              onClick={() => handleMenuClick("allStaffList")}
            >
              <NavLink to="/staff/allStaff">All Staff</NavLink>
            </Menu.Item>

            {/* {user?.role === "admin" && (
            <Menu.Item
              key="stockStaffList"
              icon={<UngroupOutlined />}
              onClick={() => handleMenuClick("stockStaffList")}
            >
              <NavLink to="/staff/stockStaff">Stock Staff</NavLink>
            </Menu.Item>
          )}
          {user?.role === "admin" && (
            <Menu.Item
              key="inventoryStaffList"
              icon={<FaHouseUser />}
              onClick={() => handleMenuClick("inventoryStaffList")}
            >
              <NavLink to="/staff/inventoryStaff">Inventory Staff</NavLink>
            </Menu.Item>
          )}
          {(user?.role === "admin" || user?.role === "invmanager") && (
            <Menu.Item
              key="personnelStaffList"
              icon={<UsergroupAddOutlined />}
              onClick={() => handleMenuClick("personnelStaffList")}
            >
              <NavLink to="/staff/personnelStaff">Personnel Staff</NavLink>
            </Menu.Item>
          )} */}
          </Menu.SubMenu>
        )}
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
          {(user?.role === "invmanager" || user?.role === "personnel") && (
            <Menu.Item
              key="productRegistration"
              icon={<UserOutlined />}
              onClick={() => handleMenuClick("productRegistration")}
            >
              <NavLink to="/product/registration">Registration</NavLink>
            </Menu.Item>
          )}
          {/* <Menu.Item
            key="productRegistration"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("productRegistration")}
            // style={{
            //   color: activeKey === "employeeRegistration" ? "blue" : "",
            //   fontWeight: activeKey === "employeeRegistration" ? "bold" : "",
            // }}
          >
            <NavLink to="/product/registration">Registration</NavLink>
          </Menu.Item> */}
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
          {user?.role === "invmanager" && (
            <Menu.Item
              key="purchaseRegistration"
              icon={<UserOutlined />}
              onClick={() => handleMenuClick("purchaseRegistration")}
            >
              <NavLink to="/purchase/addPurchase">Registration</NavLink>
            </Menu.Item>
          )}
          {/* <Menu.Item
            key="purchaseRegistration"
            icon={<UserOutlined />}
            onClick={() => handleMenuClick("purchaseRegistration")}
          >
            <NavLink to="/purchase/addPurchase">Registration</NavLink>
          </Menu.Item> */}
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
            <NavLink to="/stock/return">Return Item </NavLink>
          </Menu.Item>
          <Menu.Item
            key="stockDispatch"
            icon={<ShopOutlined />}
            onClick={() => handleMenuClick("stockDispatch")}
          >
            <NavLink to="/stock/dispatch">Dispatch </NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.SubMenu
          key="resourceSubMenu"
          title="Resource"
          icon={<FaBoxOpen />}
        >
          {(user?.role === "invmanager" || user?.role === "employee") && (
            <Menu.Item
              key="request"
              icon={<UserOutlined />}
              onClick={() => handleMenuClick("request")}
            >
              <NavLink to="/resource/request">Request</NavLink>
            </Menu.Item>
          )}
          <Menu.Item key="request" onClick={() => handleMenuClick("request")}>
            <NavLink to="/resource/request">Request</NavLink>
          </Menu.Item>
          <Menu.Item key="resourceApprove" onClick={() => handleMenuClick("resourceApprove")}>
            <NavLink to="/resource/approval">Approval</NavLink>
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
