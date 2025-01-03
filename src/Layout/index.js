import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "../Pages/Login/index.js";
import Dashboard from "../Pages/Dashboard/index.js";

function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Clear user session or token here if necessary
    localStorage.removeItem("authToken"); // Contoh penghapusan token
    navigate("/"); // Redirect to login page
  }, [navigate]);

  return null; // No UI needed for logout
}

function Layout() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Layout;
