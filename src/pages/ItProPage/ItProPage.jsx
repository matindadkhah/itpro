import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb"

const Layout = () => {
  return (
    <div className="flex font-shabnam bg-gray-200 " dir="rtl">
      <Sidebar />
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6  ">
          <BreadCrumb />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
