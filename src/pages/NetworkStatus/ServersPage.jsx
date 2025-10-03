import React, { useState, useEffect } from "react";
import { XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import 'preline/preline';

const initialServers = [
  { id: 1, name: "سرور مرکزی", ip: "192.168.1.1", os: "Windows Server", status: "online", uptime: 99, lastCheck: "10:30", notes: "فعال" },
  { id: 2, name: "سرور پشتیبان", ip: "192.168.1.2", os: "Linux", status: "offline", uptime: 92, lastCheck: "10:28", notes: "در حال تعمیر" },
  { id: 3, name: "سرور دیتابیس", ip: "192.168.1.3", os: "Linux", status: "online", uptime: 97, lastCheck: "10:32", notes: "فعال" },
  // اضافه کردن سایر سرورها تا 28
];

const ServerPage = () => {
  const [servers, setServers] = useState(initialServers);
  const [showModal, setShowModal] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredServers = servers.filter(server => filter === "all" ? true : server.status === filter);

  const refreshServer = (id) => {
    // شبیه سازی Ping سرور
    setServers(prev => prev.map(s => {
      if (s.id === id) {
        const newStatus = Math.random() > 0.2 ? "online" : "offline"; // 80% احتمال آنلاین
        return { ...s, status: newStatus, lastCheck: new Date().toLocaleTimeString() };
      }
      return s;
    }));
  };

  const openModal = (server) => setShowModal(server);

  const closeModal = () => setShowModal(null);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">پایش وضعیت سرورها</h2>

      {/* فیلتر */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >همه</button>
        <button
          className={`px-3 py-1 rounded ${filter === "online" ? "bg-green-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("online")}
        >آنلاین</button>
        <button
          className={`px-3 py-1 rounded ${filter === "offline" ? "bg-red-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("offline")}
        >آفلاین</button>
      </div>

      {/* کارت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServers.map(server => (
          <div
            key={server.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition transform hover:scale-[1.02] relative"
          >
            {/* وضعیت */}
            <div className="absolute top-2 right-2">
              <span
                className={`w-3 h-3 inline-block rounded-full ${
                  server.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
            </div>

            <h3 className="text-lg font-semibold mb-1">{server.name}</h3>
            <p className="text-gray-600 mb-1">IP: {server.ip}</p>
            <p className="text-gray-600 mb-1">سیستم عامل: {server.os}</p>
            <p className="text-gray-600 mb-1">آخرین بررسی: {server.lastCheck}</p>
            <p className="text-gray-600 mb-1">پایداری: {server.uptime}%</p>
            <p className="text-gray-600 mb-2">توضیحات: {server.notes}</p>

            {/* دکمه‌ها */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => refreshServer(server.id)}
                className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                <ArrowPathIcon className="w-4 h-4" /> بررسی مجدد
              </button>
              <button
                onClick={() => openModal(server)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                جزئیات
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative transition-transform transform animate-slide-in">
            <button
              className="absolute top-2 end-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold mb-2">{showModal.name}</h3>
            <p>IP: {showModal.ip}</p>
            <p>سیستم عامل: {showModal.os}</p>
            <p>وضعیت: {showModal.status}</p>
            <p>آخرین بررسی: {showModal.lastCheck}</p>
            <p>پایداری: {showModal.uptime}%</p>
            <p>توضیحات: {showModal.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerPage;

