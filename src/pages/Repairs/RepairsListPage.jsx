import React, { useState, useEffect } from "react";
import { PlusIcon, PencilIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import 'preline/preline';

const initialDevices = [
  {
    id: 1,
    name: "مودم بی‌سیم",
    serial: "981276",
    station: "ایستگاه 1",
    date: "1403/07/01",
    priority: "فوری",
    description: "عدم شارژ باتری",
  },
  {
    id: 2,
    name: "تلفن داخلی",
    serial: "872345",
    station: "ایستگاه 5",
    date: "1403/07/02",
    priority: "متوسط",
    description: "مشکل در اتصال به سانترال",
  },
  {
    id: 3,
    name: "دوربین مداربسته",
    serial: "123987",
    station: "ایستگاه 12",
    date: "1403/07/03",
    priority: "عادی",
    description: "تنظیم زاویه و فوکوس",
  },
];

const getPriorityColor = (priority) => {
  switch (priority) {
    case "فوری":
      return "bg-red-100 border-red-300";
    case "متوسط":
      return "bg-yellow-100 border-yellow-300";
    case "عادی":
      return "bg-green-100 border-green-300";
    default:
      return "bg-gray-100 border-gray-300";
  }
};

const RepairsListPage = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [showModal, setShowModal] = useState(false); // افزودن دستگاه جدید
  const [showDetailsModal, setShowDetailsModal] = useState(null); // نمایش جزئیات دستگاه
  const [showStatusModal, setShowStatusModal] = useState(null); // تغییر وضعیت دستگاه
  const [toastMessage, setToastMessage] = useState("");
  const [newDevice, setNewDevice] = useState({
    name: "",
    serial: "",
    station: "",
    date: "",
    priority: "عادی",
    description: "",
  });

  // تغییر ورودی فرم
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prev) => ({ ...prev, [name]: value }));
  };

  // ثبت دستگاه جدید
  const handleAddDevice = () => {
    setDevices((prev) => [
      ...prev,
      { id: Date.now(), ...newDevice },
    ]);
    setShowModal(false);
    setToastMessage("دستگاه با موفقیت ثبت شد!");
    setNewDevice({
      name: "",
      serial: "",
      station: "",
      date: "",
      priority: "عادی",
      description: "",
    });
  };

  // تغییر وضعیت دستگاه
  const handleChangeStatus = (deviceId, newPriority) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === deviceId ? { ...d, priority: newPriority } : d
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

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-bold mb-4">دستگاه‌های تحویل گرفته شده</h2>

      {/* Grid کارت‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <div
            key={device.id}
            className={`border rounded-lg p-4 flex flex-col justify-between ${getPriorityColor(
              device.priority
            )}`}
          >
            <div>
              <h3 className="font-semibold text-lg">{device.name}</h3>
              <p className="text-sm text-gray-600">سریال: {device.serial}</p>
              <p className="text-sm text-gray-600">ایستگاه: {device.station}</p>
              <p className="text-sm text-gray-600">تاریخ تحویل: {device.date}</p>
              <p className="text-sm mt-1">{device.description}</p>
            </div>

            {/* دکمه‌ها */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowDetailsModal(device)}
                className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
              >
                <EyeIcon className="w-4 h-4" /> جزئیات
              </button>
              <button
                onClick={() => setShowStatusModal(device)}
                className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
              >
                <PencilIcon className="w-4 h-4" /> تغییر وضعیت
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* دکمه افزودن دستگاه */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded"
        >
          <PlusIcon className="w-5 h-5" /> افزودن دستگاه جدید
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}

      {/* Modal افزودن دستگاه جدید */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">ثبت دستگاه جدید</h3>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                placeholder="نام دستگاه"
                value={newDevice.name}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                name="serial"
                placeholder="شماره سریال"
                value={newDevice.serial}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
              <input
                type="text"
                name="station"
                placeholder="ایستگاه تحویل‌دهنده"
                value={newDevice.station}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
              <input
                type="date"
                name="date"
                value={newDevice.date}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
              <select
                name="priority"
                value={newDevice.priority}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              >
                <option value="فوری">فوری</option>
                <option value="متوسط">متوسط</option>
                <option value="عادی">عادی</option>
              </select>
              <textarea
                name="description"
                placeholder="توضیحات"
                value={newDevice.description}
                onChange={handleInputChange}
                className="border px-2 py-1 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                انصراف
              </button>
              <button
                onClick={handleAddDevice}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                ثبت
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal جزئیات دستگاه */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">جزئیات دستگاه</h3>
              <button onClick={() => setShowDetailsModal(null)}>
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="space-y-2 text-gray-700">
              <p><strong>نام:</strong> {showDetailsModal.name}</p>
              <p><strong>سریال:</strong> {showDetailsModal.serial}</p>
              <p><strong>ایستگاه:</strong> {showDetailsModal.station}</p>
              <p><strong>تاریخ تحویل:</strong> {showDetailsModal.date}</p>
              <p><strong>اولویت:</strong> {showDetailsModal.priority}</p>
              <p><strong>توضیحات:</strong> {showDetailsModal.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal تغییر وضعیت */}
      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">تغییر وضعیت دستگاه</h3>
              <button onClick={() => setShowStatusModal(null)}>
                <XMarkIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <select
                value={showStatusModal.priority}
                onChange={(e) => handleChangeStatus(showStatusModal.id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="فوری">فوری</option>
                <option value="متوسط">متوسط</option>
                <option value="عادی">عادی</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairsListPage;
