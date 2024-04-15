import React from "react";
import {  Layout } from "antd";

import Header from "../components/Common/Header";
import Sider from "../components/Common/Sider";
import {  Route, Routes } from "react-router-dom";



import InventoryProfilePage from "./InventoryProfile/InventoryProfilePage";
import Stat from "./Stat";
// import Stat from "./Stat";

const { Content } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <Header />
      {/* <Divider /> */}
      <Layout>
        <Sider />
        <Content>
          <Routes>
            <Route path="/" element={<Stat />}></Route>
            <Route path="/inventory">
              <Route
                path="registration"
                element={<InventoryProfilePage />}
              />

              <Route path="view" element={<InventoryProfilePage />} />
              {/* <Route
                path="view/:id/*"
                element={<EmployeeDetailedProfilePage />}
              /> */}

              {/* <Route path="edit" element={<ComplaintForm />} /> */}
            </Route>

            <Route path="/dispatch">
              
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
