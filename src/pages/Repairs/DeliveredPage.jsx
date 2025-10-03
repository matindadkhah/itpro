import React, { useState, useEffect } from "react";
import {
  EyeIcon,
  PrinterIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import 'preline/preline';

// داده نمونه دستگاه‌ها
const initialDevices = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `دستگاه ${i + 1}`,
  serial: `SN-${1000 + i}`,
  station: `ایستگاه ${((i % 5) + 1)}`,
  deliveredDate: `1403/07/${(i % 30) + 1}`,
  status: "تحویل داده شده",
  priority: ["فوری", "متوسط", "عادی"][i % 3],
  technician: ["علی", "محمد", "رضا"][i % 3],
  repairTime: `${(i % 5) + 1} روز`,
  description: `توضیحات دستگاه ${i + 1}`,
}));

// داده نمونه نمودار خرابی
const chartDataSample = [
  { station: "ایستگاه 1", "دوربین مداربسته": 5, "تلفن داخلی": 2, "مودم بی‌سیم": 1 },
  { station: "ایستگاه 2", "دوربین مداربسته": 3, "تلفن داخلی": 4, "مودم بی‌سیم": 2 },
  { station: "ایستگاه 3", "دوربین مداربسته": 1, "تلفن داخلی": 2, "مودم بی‌سیم": 3 },
];

const DeliveredPage = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStation, setFilterStation] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [chartRange, setChartRange] = useState("روزانه");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stations = [...new Set(devices.map((d) => d.station))];
  const priorities = ["فوری", "متوسط", "عادی"];
  const ranges = ["روزانه", "هفتگی", "ماهانه"];

  const filteredDevices = devices.filter(d =>
    (d.name.includes(searchTerm) || d.serial.includes(searchTerm)) &&
    (filterStation ? d.station === filterStation : true) &&
    (filterPriority ? d.priority === filterPriority : true)
  );

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">دستگاه‌های تحویل داده شده</h2>

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
          {stations.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          className="p-2 border border-gray-300 rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="">همه اولویت‌ها</option>
          {priorities.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow">
          {toastMessage}
        </div>
      )}

      {/* لیست دستگاه‌ها */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">نام دستگاه</th>
              <th className="px-4 py-2 border-b">شماره سریال</th>
              <th className="px-4 py-2 border-b">ایستگاه</th>
              <th className="px-4 py-2 border-b">تاریخ تحویل</th>
              <th className="px-4 py-2 border-b">وضعیت</th>
              <th className="px-4 py-2 border-b">اولویت</th>
              <th className="px-4 py-2 border-b">تکنسین</th>
              <th className="px-4 py-2 border-b">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDevices.map((device, index) => (
              <tr key={device.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{(currentPage-1)*itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 border-b">{device.name}</td>
                <td className="px-4 py-2 border-b">{device.serial}</td>
                <td className="px-4 py-2 border-b">{device.station}</td>
                <td className="px-4 py-2 border-b">{device.deliveredDate}</td>
                <td className="px-4 py-2 border-b">{device.status}</td>
                <td className="px-4 py-2 border-b">{device.priority}</td>
                <td className="px-4 py-2 border-b">{device.technician}</td>
                <td className="px-4 py-2 border-b flex gap-2">
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setShowDetailsModal(device)}
                  >
                    <EyeIcon className="w-4 h-4" /> جزئیات
                  </button>
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                    onClick={() => setToastMessage("عملیات چاپ انجام شد")}
                  >
                    <PrinterIcon className="w-4 h-4" /> چاپ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-2 flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.max(p-1,1))}
          disabled={currentPage===1}
        >
          قبلی
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage(p => Math.min(p+1,totalPages))}
          disabled={currentPage===totalPages}
        >
          بعدی
        </button>
      </div>

      {/* Modal جزئیات */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4 z-50">
          <div className="bg-white rounded p-6 w-full max-w-md relative shadow-lg">
            <button
              className="absolute top-2 end-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowDetailsModal(null)}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-2">{showDetailsModal.name}</h3>
            <p>شماره سریال: {showDetailsModal.serial}</p>
            <p>ایستگاه: {showDetailsModal.station}</p>
            <p>تاریخ تحویل: {showDetailsModal.deliveredDate}</p>
            <p>وضعیت: {showDetailsModal.status}</p>
            <p>اولویت: {showDetailsModal.priority}</p>
            <p>تکنسین: {showDetailsModal.technician}</p>
            <p>مدت زمان تعمیر: {showDetailsModal.repairTime}</p>
            <p>توضیحات: {showDetailsModal.description}</p>
          </div>
        </div>
      )}

      {/* نمودار بیشترین خرابی */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2">
          <span>بازه زمانی:</span>
          <select
            className="p-2 border border-gray-300 rounded"
            value={chartRange}
            onChange={(e) => setChartRange(e.target.value)}
          >
            {ranges.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartDataSample} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="station" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="دوربین مداربسته" stroke="#3b82f6" />
            <Line type="monotone" dataKey="تلفن داخلی" stroke="#f59e0b" />
            <Line type="monotone" dataKey="مودم بی‌سیم" stroke="#10b981" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DeliveredPage;
