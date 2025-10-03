// AssetList.jsx
import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockAssets = [
  { id: "A001", name: "کامپیوتر اداری", type: "کامپیوتر", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2025-01-10", owner: "علی رضایی" },
  { id: "A002", name: "پرینتر لیزری", type: "پرینتر", status: "در تعمیر", department: "اداره انفورماتیک", purchaseDate: "2024-10-05", owner: "مریم احمدی" },
  { id: "A003", name: "میز اداری", type: "مبلمان", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2023-07-20", owner: "حمید رضایی" },
];

export default function PropertyListPage() {
  const [assets, setAssets] = useState(mockAssets);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [form, setForm] = useState({ id: "", name: "", type: "", status: "فعال", department: "", purchaseDate: "", owner: "" });

  const itemsPerPage = 5;

  // فیلتر جستجو
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.includes(search) ||
      asset.id.includes(search) ||
      asset.type.includes(search)
  );

  // Pagination
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // عملیات‌ها
  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این مال مطمئن هستید؟")) {
      setAssets(assets.filter((a) => a.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingAsset(null);
    setForm({ id: "", name: "", type: "", status: "فعال", department: "", purchaseDate: "", owner: "" });
    setModalOpen(true);
  };

  const openEditModal = (asset) => {
    setEditingAsset(asset.id);
    setForm({ ...asset });
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingAsset) {
      setAssets(assets.map((a) => (a.id === editingAsset ? form : a)));
    } else {
      setAssets([...assets, form]);
    }
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">لیست اموال</h1>
        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          onClick={openAddModal}
        >
          <PlusIcon className="w-5 h-5" />
          افزودن مال جدید
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="جستجو بر اساس نام، شماره یا نوع"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
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
              <th className="px-4 py-2 text-center text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedAssets.map((asset) => (
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
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => openEditModal(asset)}
                  >
                    <PencilIcon className="w-5 h-5 text-blue-500" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-gray-100"
                    onClick={() => handleDelete(asset.id)}
                  >
                    <TrashIcon className="w-5 h-5 text-red-500" />
                  </button>
                </td>
              </tr>
            ))}

            {paginatedAssets.length === 0 && (
              <tr>
                <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                  موردی یافت نشد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700">
          صفحه {currentPage} از {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            قبلی
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {editingAsset ? "ویرایش مال" : "افزودن مال جدید"}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="شماره مال"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="نام مال"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                type="text"
                placeholder="نوع مال"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="فعال">فعال</option>
                <option value="در تعمیر">در تعمیر</option>
                <option value="مستعمل">مستعمل</option>
              </select>
              <input
                type="text"
                placeholder="بخش"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="date"
                value={form.purchaseDate}
                onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <input
                type="text"
                placeholder="کاربر مسئول"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {editingAsset ? "ذخیره تغییرات" : "افزودن"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

