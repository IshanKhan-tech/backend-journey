import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>home page</h1>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
