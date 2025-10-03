import React, { useState, useMemo } from "react";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const initialNotifications = [
  { id: 1, type: "critical", message: "سرور شبکه پاسخ نمی‌دهد!", read: false, date: "1402/07/01 12:00" },
  { id: 2, type: "warning", message: "تعداد پرینترهای موجود کمتر از حد مجاز است.", read: true, date: "1402/07/01 13:00" },
  { id: 3, type: "info", message: "گزارش اموال امروز آماده است.", read: false, date: "1402/07/01 14:00" },
  { id: 4, type: "critical", message: "قطع برق در اتاق سرور!", read: false, date: "1402/07/01 15:00" },
  { id: 5, type: "info", message: "آپدیت نرم افزار پایش انجام شد.", read: true, date: "1402/07/01 16:00" },
  { id: 6, type: "warning", message: "تجهیزات تعمیر نشده بیش از حد معمول است.", read: false, date: "1402/07/01 17:00" },
];

const typeConfig = {
  critical: { color: "bg-red-500", icon: <ExclamationCircleIcon className="w-5 h-5 text-white" /> },
  warning: { color: "bg-yellow-500", icon: <ExclamationTriangleIcon className="w-5 h-5 text-white" /> },
  info: { color: "bg-blue-500", icon: <InformationCircleIcon className="w-5 h-5 text-white" /> },
};

export default function WarningListpage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filterType, setFilterType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("date"); // date | type
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const pageSize = 3;

  // Mark as Read
  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Delete
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Open modal
  const openModal = (notification) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedNotification(null);
    setModalOpen(false);
  };

  // Filtered & searched
  const filteredNotifications = useMemo(() => {
    let data = notifications.filter(n =>
      (filterType === "all" || n.type === filterType) &&
      n.message.includes(searchText)
    );
    if (sortKey === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortKey === "type") {
      data.sort((a, b) => a.type.localeCompare(b.type));
    }
    return data;
  }, [notifications, filterType, searchText, sortKey]);

  const pageCount = Math.ceil(filteredNotifications.length / pageSize);
  const currentData = filteredNotifications.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <h2 className="text-lg font-bold text-gray-700">لیست هشدارها</h2>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">همه</option>
            <option value="critical">بحرانی</option>
            <option value="warning">هشدار</option>
            <option value="info">اطلاع</option>
          </select>
          <input
            type="text"
            placeholder="جستجو..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          />
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="date">مرتب‌سازی بر اساس تاریخ</option>
            <option value="type">مرتب‌سازی بر اساس نوع</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-3 text-right">نوع هشدار</th>
              <th className="py-2 px-3 text-right">پیام هشدار</th>
              <th className="py-2 px-3 text-right">وضعیت</th>
              <th className="py-2 px-3 text-right">زمان ثبت</th>
              <th className="py-2 px-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">هشدار پیدا نشد</td>
              </tr>
            )}
            {currentData.map((n) => (
              <tr key={n.id} className={`${!n.read ? "bg-gray-50" : ""} border-b border-gray-100`}>
                {/* Type */}
                <td className="py-2 px-3 text-right">
                  <div className={`inline-flex items-center gap-2 ${typeConfig[n.type].color} text-white px-2 py-1 rounded`}>
                    {typeConfig[n.type].icon}
                    <span className="text-sm capitalize">{n.type}</span>
                  </div>
                </td>

                {/* Message */}
                <td className="py-2 px-3 text-right">
                  <button onClick={() => openModal(n)} className="hover:underline text-gray-700">{n.message}</button>
                </td>

                {/* Status */}
                <td className="py-2 px-3 text-right">
                  {n.read ? (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <CheckCircleIcon className="w-4 h-4" /> خوانده شده
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-red-600">جدید</span>
                  )}
                </td>

                {/* Date */}
                <td className="py-2 px-3 text-right">{n.date}</td>

                {/* Actions */}
                <td className="py-2 px-3 text-right flex gap-2 justify-end">
                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      خوانده شد
                    </button>
                  )}
                  <button
                    onClick={() => removeNotification(n.id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg w-96 p-5 shadow-lg">
            <h2 className="text-lg font-bold mb-4">جزئیات هشدار</h2>
            <p><strong>نوع هشدار:</strong> {selectedNotification.type}</p>
            <p><strong>پیام:</strong> {selectedNotification.message}</p>
            <p><strong>وضعیت:</strong> {selectedNotification.read ? "خوانده شده" : "جدید"}</p>
            <p><strong>زمان ثبت:</strong> {selectedNotification.date}</p>
            <div className="flex justify-end mt-4 gap-2">
              {!selectedNotification.read && (
                <button
                  onClick={() => { markAsRead(selectedNotification.id); closeModal(); }}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  خوانده شد
                </button>
              )}
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}






