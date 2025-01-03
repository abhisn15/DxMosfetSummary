import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "../Pages/Login/index.js";
import Dashboard from "../Pages/Dashboard/index.js";

function Layout() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Layout;
