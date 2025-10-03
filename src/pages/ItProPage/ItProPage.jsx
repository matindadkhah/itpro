import { useEffect, useState } from 'react'
import React from 'react'
import Navbar from './Navbar'
import { Link, Outlet } from 'react-router-dom';
import {
  ArchiveBoxIcon,
  BellAlertIcon,
  ChartBarIcon,
  WrenchIcon,
  BookOpenIcon,
  GlobeAltIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import MenuItems from './MenuItem';







const ItProPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);

  const toggleMenu = (title) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };


 

  return (
    <>

      <div className="flex h-screen font-shabnam">
        {/* Sidebar */}

          {/* Header */}



          {/* Navigation */}
          <MenuItems />
 

        {/* Main Content */}
        <div className="flex-1 flex flex-col transition-all duration-300">
          {/* Navbar */}
            <Navbar />
          {/* Page Content */}
          <main className="flex-1 p-4 bg-gray-200">
            <Outlet />
          </main>
        </div>
      </div>


    </>
  )
}

export default ItProPage

