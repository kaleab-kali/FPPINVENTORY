import React from "react";
import { Routes, Route } from "react-router-dom";
import { DatePicker } from "antd";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/UserAuth/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CategoryList from "./pages/Catagory/CatagoryPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute roles={["invmanager","stockmanager","personnel","admin"]} />}>
          <Route path="/*" element={<Dashboard />} />
          {/* <Route path="/categories" element={<CategoryList />} /> */}
        </Route>
        <Route path="/not-authorized" element={<div>Not Authorized</div>} />
      </Routes>

      {/* <DatePicker /> */}
    </AuthProvider>
  );
}

export default App;
