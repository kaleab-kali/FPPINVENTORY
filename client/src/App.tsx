import React from "react";
import { Routes, Route } from "react-router-dom";
import { DatePicker } from "antd";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/UserAuth/LoginPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
        {/* <Route path="/*" element={<LoginPage />} /> */}
          
      </Routes>

      {/* <DatePicker /> */}
    </>
  );
}

export default App;
