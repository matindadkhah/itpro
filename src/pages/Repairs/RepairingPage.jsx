import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  EyeIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import 'preline/preline';

const initialDevices = [
  {
    id: 1,
    name: "دوربین مداربسته",
    serial: "112233",
    station: "ایستگاه 3",
    date: "1403/07/01",
    eta: "1403/07/05",
    priority: "فوری",
    status: "در حال تعمیر",
    progress: 30,
    description: "تعمیر لنز",
  },
  {
    id: 2,
    name: "تلفن داخلی",
    serial: "445566",
    station: "ایستگاه 8",
    date: "1403/07/02",
    eta: "1403/07/06",
    priority: "متوسط",
    status: "در حال بررسی",
    progress: 10,
    description: "سیم‌کشی خراب",
  },
  {
    id: 3,
    name: "مودم بی‌سیم",
    serial: "778899",
    station: "ایستگاه 12",
    date: "1403/07/03",
    eta: "1403/07/07",
    priority: "عادی",
    status: "در انتظار قطعه",
    progress: 0,
    description: "آنتن خراب",
  },
];

// رنگ بر اساس وضعیت
const getStatusColor = (status) => {
  switch (status) {
    case "در حال تعمیر": return "bg-yellow-100 border-yellow-300";
    case "در حال بررسی": return "bg-blue-100 border-blue-300";
    case "در انتظار قطعه": return "bg-orange-100 border-orange-300";
    case "تعمیر شده": return "bg-green-100 border-green-300";
    default: return "bg-gray-100 border-gray-300";
  }
};

// رنگ اولویت
const getPriorityColor = (priority) => {
  switch (priority) {
    case "فوری": return "bg-red-100 border-red-300";
    case "متوسط": return "bg-yellow-100 border-yellow-300";
    case "عادی": return "bg-green-100 border-green-300";
    default: return "bg-gray-100 border-gray-300";
  }
};

const RepairingPage = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStation, setFilterStation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  // تغییر وضعیت دستگاه
  const handleChangeStatus = (deviceId, newStatus) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId
          ? {
              ...d,
              status: newStatus,
              progress:
                newStatus === "تعمیر شده" ? 100 : d.progress,
            }
          : d
      )
    );
    setShowStatusModal(null);
    setToastMessage("وضعیت دستگاه با موفقیت تغییر کرد!");
  };

  // پاک کردن Toast بعد از 3 ثانیه
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // فیلتر و جستجو
  const filteredDevices = devices.filter((d) => {
    return (
      (d.name.includes(searchTerm) || d.serial.includes(searchTerm)) &&
      (filterStation ? d.station === filterStation : true) &&
      (filterStatus ? d.status === filterStatus : true) &&
      (filterPriority ? d.priority === filterPriority : true)
    );
  });

  // گزینه‌های ایستگاه، وضعیت و اولویت
  const stations = [...new Set(devices.map((d) => d.station))];
  const statuses = ["در حال بررسی", "در حال تعمیر", "در انتظار قطعه", "تعمیر شده"];
  const priorities = ["فوری", "متوسط", "عادی"];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">دستگاه‌های در دست تعمیر</h2>

      {/* فیلتر و جستجو */}
      <div className="mb-4 flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="جستجو بر اساس نام یا شماره سریال"
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded"
          value={filterStation}
          onChange={(e) => setFilterStation(e.target.value)}
        >
          <option value="">همه ایستگاه‌ها</option>
          {stations.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">همه وضعیت‌ها</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">همه اولویت‌ها</option>
          {priorities.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className={`border p-4 rounded shadow ${getStatusColor(device.status)} ${getPriorityColor(device.priority)}`}
          >
            <h3 className="font-semibold text-lg mb-1">{device.name}</h3>
            <p>شماره سریال: {device.serial}</p>
            <p>ایستگاه: {device.station}</p>
            <p>تاریخ تحویل: {device.date}</p>
            <p>تاریخ پیش‌بینی تحویل: {device.eta}</p>
            <p>اولویت: {device.priority}</p>
            <p>وضعیت: {device.status}</p>

            {/* Progress Bar */}
            <div className="mt-2 bg-gray-200 rounded h-2 w-full">
              <div
                className="h-2 rounded bg-blue-500"
                style={{ width: `${device.progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">پیشرفت: {device.progress}%</p>

            {/* دکمه‌ها */}
            <div className="mt-3 flex gap-2">
              <button
                className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowDetailsModal(device)}
              >
                <EyeIcon className="w-4 h-4" />
                جزئیات
              </button>
              <button
                className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => setShowStatusModal(device)}
              >
                <PencilIcon className="w-4 h-4" />
                تغییر وضعیت
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal جزئیات */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 end-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDetailsModal(null)}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-2">{showDetailsModal.name}</h3>
            <p>شماره سریال: {showDetailsModal.serial}</p>
            <p>ایستگاه: {showDetailsModal.station}</p>
            <p>تاریخ تحویل: {showDetailsModal.date}</p>
            <p>تاریخ پیش‌بینی تحویل: {showDetailsModal.eta}</p>
            <p>اولویت: {showDetailsModal.priority}</p>
            <p>وضعیت: {showDetailsModal.status}</p>
            <p>توضیحات: {showDetailsModal.description}</p>
            <p>پیشرفت: {showDetailsModal.progress}%</p>
          </div>
        </div>
      )}

      {/* Modal تغییر وضعیت */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 end-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowStatusModal(null)}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-4">تغییر وضعیت {showStatusModal.name}</h3>
            <div className="flex flex-col gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => handleChangeStatus(showStatusModal.id, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairingPage;





