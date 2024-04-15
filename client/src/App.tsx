import React from "react";
import { Routes, Route } from "react-router-dom";
import { DatePicker } from "antd";
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
          
      </Routes>

      {/* <DatePicker /> */}
    </>
  );
}

export default App;
