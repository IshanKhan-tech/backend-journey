import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import Feed from "./features/posts/pages/Feed";

const AppRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Feed/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRoutes;
