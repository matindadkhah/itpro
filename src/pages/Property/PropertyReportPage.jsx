// Report.jsx
import React, { useState } from "react";
import {
  FunnelIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// داده نمونه
const mockAssets = [
  { id: "A001", name: "کامپیوتر اداری", type: "کامپیوتر", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2025-01-10", owner: "علی رضایی" },
  { id: "A002", name: "پرینتر لیزری", type: "پرینتر", status: "در تعمیر", department: "اداره انفورماتیک", purchaseDate: "2024-10-05", owner: "مریم احمدی" },
  { id: "A003", name: "میز اداری", type: "مبلمان", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2023-07-20", owner: "حمید رضایی" },
  { id: "A004", name: "سرور شبکه", type: "سرور", status: "فعال", department: "شبکه", purchaseDate: "2023-03-15", owner: "حسین کریمی" },
  { id: "A005", name: "روتر", type: "شبکه", status: "در تعمیر", department: "شبکه", purchaseDate: "2024-05-20", owner: "مریم احمدی" },
];

// رنگ‌ها برای نمودار
const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // سبز، زرد، قرمز

export default function PropertyReportPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  // فیلتر داده‌ها
  const filteredAssets = mockAssets.filter((asset) => {
    return (
      (statusFilter === "" || asset.status === statusFilter) &&
      (typeFilter === "" || asset.type === typeFilter) &&
      (departmentFilter === "" || asset.department === departmentFilter)
    );
  });

  // داده برای نمودار Pie
  const pieData = [
    { name: "فعال", value: filteredAssets.filter((a) => a.status === "فعال").length },
    { name: "در تعمیر", value: filteredAssets.filter((a) => a.status === "در تعمیر").length },
    { name: "مستعمل", value: filteredAssets.filter((a) => a.status === "مستعمل").length },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">گزارش‌گیری اموال</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">
          <ArrowDownTrayIcon className="w-5 h-5" />
          خروجی
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="فعال">فعال</option>
            <option value="در تعمیر">در تعمیر</option>
            <option value="مستعمل">مستعمل</option>
          </select>
        </div>
        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">همه نوع‌ها</option>
            <option value="کامپیوتر">کامپیوتر</option>
            <option value="پرینتر">پرینتر</option>
            <option value="مبلمان">مبلمان</option>
            <option value="سرور">سرور</option>
            <option value="شبکه">شبکه</option>
          </select>
        </div>
        <div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">همه بخش‌ها</option>
            <option value="اداره انفورماتیک">اداره انفورماتیک</option>
            <option value="شبکه">شبکه</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">شماره</th>
              <th className="px-4 py-2 text-left text-gray-700">نام</th>
              <th className="px-4 py-2 text-left text-gray-700">نوع</th>
              <th className="px-4 py-2 text-left text-gray-700">وضعیت</th>
              <th className="px-4 py-2 text-left text-gray-700">بخش</th>
              <th className="px-4 py-2 text-left text-gray-700">تاریخ خرید</th>
              <th className="px-4 py-2 text-left text-gray-700">کاربر مسئول</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAssets.map((asset) => (
              <tr key={asset.id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{asset.id}</td>
                <td className="px-4 py-2">{asset.name}</td>
                <td className="px-4 py-2">{asset.type}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      asset.status === "فعال"
                        ? "bg-green-500"
                        : asset.status === "در تعمیر"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-4 py-2">{asset.department}</td>
                <td className="px-4 py-2">{asset.purchaseDate}</td>
                <td className="px-4 py-2">{asset.owner}</td>
              </tr>
            ))}

            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  موردی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-lg font-bold mb-4">وضعیت اموال</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
