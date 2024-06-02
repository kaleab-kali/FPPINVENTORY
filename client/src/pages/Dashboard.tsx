import React, { useState } from "react";
import {  Layout } from "antd";

import Header from "../components/Common/Header";
import Sider from "../components/Common/Sider";
import {  Route, Routes } from "react-router-dom";


import InventoryProfilePage from "./InventoryProfile/InventoryProfilePage";
import Stat from "./Stat";
import InventoryRegistrationPage from "./InventoryRegistration/InventoryRegistrationPage";
import InventoryDeletingForm from "../components/InventoryOperations/InventoryDelete";
import SupplierPage from "./SupplierPage/SupplierPage";
import UnitsPage from "./Units/UnitsPage";
import CatagoryPage from "./Catagory/CatagoryPage";
import StockPage from "./Stock/StockPage";
import ResourcePage from "./Resource/ResourcePage";
import InactiveSupplierPage from "./SupplierPage/InactivSupplierPage";
import AddPurchasePage from "./Purchase/AddPurchasePage";
import AllPurchasePage from "./Purchase/AllPurchasePage";
import ApprovedPurchasePage from "./Purchase/ApprovedPurchasePage";
import ResourceAllocationPage from "./Resource/ResourceAllocationPage";
// import Stat from "./Stat";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <Sider collapsed={collapsed} />
     
      {/* <Divider /> */}
      <Layout>
      <Header collapsed={collapsed} toggleCollapsed={toggleCollapsed}/>
        
        <Content>
          <Routes>
            <Route path="/" element={<Stat />}></Route>
            <Route path="/supplier" >
              <Route path="list" element={<SupplierPage />} />
              <Route path="inactivelist" element={<InactiveSupplierPage />} />
            </Route>
            <Route path="/category" >
              <Route path="list" element={<CatagoryPage />} />
            </Route>
            <Route path="/units" >
              <Route path="list" element={<UnitsPage />} />
            </Route>
            <Route path="/product">
              <Route
                path="registration"
                element={<InventoryRegistrationPage />}
              />

              <Route path="view" element={<InventoryProfilePage />} />
            </Route>
            <Route path="/purchase">
              <Route
                path="addPurchase"
                element={<AddPurchasePage />}
              />

              <Route path="list" element={<AllPurchasePage />} />
              <Route path="approved" element={<ApprovedPurchasePage />} />
              <Route path="report" element={<ApprovedPurchasePage />} />
            </Route>
            <Route path="/stock" >
              <Route path="list" element={<StockPage />} />
            </Route>

            <Route path="/resource">
              <Route path="request" element={<ResourcePage />} />
              <Route path="currentDispatch" element={<ResourceAllocationPage />} />
              
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
