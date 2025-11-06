import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb"
import LoginPage from "../LoginPage/LoginPage";
import { useAuth } from "../../Hooks/useAuth";

const Layout = () => {
  const { user } = useAuth(); // user وقتی لاگین است وجود دارد

  return user ? (
    <div className="flex font-shabnam bg-gray-200" dir="rtl">
      <Sidebar />
      <div className="flex flex-col flex-1 transition-all duration-300">
        <Header />
        <main className="flex-1 p-6">
          <BreadCrumb />
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <LoginPage />
  );
};

export default Layout;
