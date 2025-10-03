import React, { useState } from "react";
import {
  BellIcon,
  XMarkIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  PlusIcon
} from "@heroicons/react/24/outline";

const typeConfig = {
  critical: { color: "bg-red-500", icon: <ExclamationCircleIcon className="w-5 h-5 text-white" /> },
  warning: { color: "bg-yellow-500", icon: <ExclamationTriangleIcon className="w-5 h-5 text-white" /> },
  info: { color: "bg-blue-500", icon: <InformationCircleIcon className="w-5 h-5 text-white" /> },
};

export default function NewWarningPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "critical", message: "سرور شبکه پاسخ نمی‌دهد!", read: false },
    { id: 2, type: "warning", message: "تعداد پرینترهای موجود کمتر از حد مجاز است.", read: false },
  ]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null); // {message, type}
  const [newNotification, setNewNotification] = useState({ type: "info", message: "" });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? {...n, read: true} : n));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleAddNotification = () => {
    if (newNotification.message.trim() === "") {
      setToast({ message: "متن هشدار نمی‌تواند خالی باشد!", type: "error" });
      return;
    }
    const id = Date.now();
    setNotifications(prev => [{ id, ...newNotification, read: false }, ...prev]);
    setToast({ message: "هشدار با موفقیت ثبت شد!", type: "success" });
    setNewNotification({ type: "info", message: "" });
    setOpenModal(false);
  };

  // Toast اتوماتیک
  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <div className="relative">

      {/* Bell Icon */}
      <div className="flex items-center gap-2">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <BellIcon className="w-6 h-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          onClick={() => setOpenModal(true)}
        >
          <PlusIcon className="w-4 h-4" /> افزودن هشدار
        </button>
      </div>

      {/* Notification Dropdown */}
      {openDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-700">هشدارها</h3>
            <button onClick={() => setOpenDropdown(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length === 0 && (
              <li className="p-3 text-center text-gray-500">هشدار جدیدی وجود ندارد</li>
            )}
            {notifications.map(n => (
              <li key={n.id} className={`flex items-start gap-3 p-3 border-b border-gray-100 ${!n.read ? "bg-gray-50" : ""}`}>
                <div className={`flex-shrink-0 ${typeConfig[n.type].color} rounded-full p-1.5`}>
                  {typeConfig[n.type].icon}
                </div>
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-700">{n.message}</p>
                  <div className="flex gap-2 mt-1">
                    {!n.read && (
                      <button onClick={() => markAsRead(n.id)} className="text-xs text-blue-600 hover:underline">
                        خوانده شد
                      </button>
                    )}
                    <button onClick={() => removeNotification(n.id)} className="text-xs text-red-600 hover:underline">
                      حذف
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal Add Notification */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg w-96 p-5 shadow-lg">
            <h2 className="text-lg font-bold mb-4">ثبت هشدار جدید</h2>
            <div className="mb-3">
              <label className="block mb-1">نوع هشدار</label>
              <select
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={newNotification.type}
                onChange={(e) => setNewNotification(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="info">اطلاع</option>
                <option value="warning">هشدار</option>
                <option value="critical">بحرانی</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block mb-1">متن هشدار</label>
              <textarea
                className="w-full border border-gray-300 rounded px-3 py-2"
                rows="3"
                value={newNotification.message}
                onChange={(e) => setNewNotification(prev => ({ ...prev, message: e.target.value }))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                لغو
              </button>
              <button
                onClick={handleAddNotification}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow text-white ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
