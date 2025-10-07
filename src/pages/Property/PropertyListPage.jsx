// AssetList.jsx
import React, { useState } from "react";
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AddItemButton from "../../components/Buttons/AddItemButton";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../components/Toastify/ShowToast";
import "react-toastify/dist/ReactToastify.css";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const mockAssets = [
  { id: "A001", name: "کامپیوتر اداری", type: "کامپیوتر", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "1404/07/15", owner: "علی رضایی" },
  { id: "A002", name: "پرینتر لیزری", type: "پرینتر", status: "درحال تعمیر", department: "اداره انفورماتیک", purchaseDate: "1403/07/13", owner: "مریم احمدی" },
  { id: "A003", name: "میز اداری", type: "مبلمان", status: "از رده خارج", department: "اداره انفورماتیک", purchaseDate: "1402/04/29", owner: "حمید رضایی" },
];

export default function PropertyListPage() {
  const [assets, setAssets] = useState(mockAssets);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    type: "",
    status: "فعال",
    department: "",
    purchaseDate: new DateObject({ calendar: persian }).format("YYYY/MM/DD"),
    owner: "",
  });

  const itemsPerPage = 5;
  const filteredAssets = assets.filter(
    (asset) =>
      asset.name.includes(search) ||
      asset.id.includes(search) ||
      asset.type.includes(search)
  );
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);
  const paginatedAssets = filteredAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetForm = () => {
    setForm({
      id: "",
      name: "",
      type: "",
      status: "فعال",
      department: "",
      purchaseDate: new DateObject({ calendar: persian }).format("YYYY/MM/DD"),
      owner: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این مال مطمئن هستید؟")) {
      setAssets(assets.filter((a) => a.id !== id));
      showToast.error("اموال با موفقیت حذف شد");
    }
  };

  const openAddModal = () => {
    setEditingAsset(null);
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (asset) => {
    setEditingAsset(asset.id);
    setForm({ ...asset });
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) {
      showToast.error("لطفاً تمام فیلدها را پر کنید");
      return;
    }
    if (editingAsset) {
      // ویرایش
      setAssets(assets.map((a) => (a.id === editingAsset ? form : a)));
      showToast.info("تغییرات با موفقیت انجام شد ✅");
    } else {
      // افزودن
      const exists = assets.some((a) => a.id === form.id);
      if (exists) {
        showToast.warning("شماره اموال تکراری است ⚠️");
        return;
      }
      setAssets([...assets, form]);
      showToast.success("اموال جدید با موفقیت اضافه شد ✅");
    }

    setModalOpen(false);
    resetForm();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-fit rounded-sm">
      <ToastContainer position="top-center" />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-500">لیست اموال</h1>
        <AddItemButton openAddModal={openAddModal} />
      </div>

      {/* Search */}
      <div className="relative w-1/3 flex right-0 pt-10 py-14" dir="rtl">
        <div className="w-full">
          <div className="relative w-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder=" "
              className="border-b border-gray-300 py-2 focus:border-b-2 focus:border-blue-700 
                transition-colors focus:outline-none peer bg-inherit w-full text-right"
            />
            <label
              className="absolute right-0 text-sm text-gray-500 cursor-text transition-all
                peer-focus:text-xs peer-focus:-top-5 peer-focus:text-blue-700
                peer-placeholder-shown:top-1 peer-placeholder-shown:text-gray-400"
            >
              جستجو بر اساس شماره، نوع و نام
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    {["شماره", "نام", "نوع", "وضعیت", "بخش", "تاریخ خرید", "کاربر مسئول"].map((th) => (
                      <th key={th} className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">
                        {th}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {paginatedAssets.map((asset) => (
                    <tr key={asset.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                      <td className="px-6 py-4 text-sm font-medium">{asset.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">{asset.name}</td>
                      <td className="px-6 py-4 text-sm font-medium">{asset.type}</td>

                      {/* وضعیت با آیکون */}
                      <td className="px-6 py-4 text-sm font-medium">
                        <span
                          className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-full ${asset.status === "فعال"
                            ? "bg-teal-50 text-teal-600"
                            : asset.status === "درحال تعمیر"
                              ? "bg-orange-50 text-orange-600"
                              : "bg-red-50 text-red-600"
                            }`}
                        >
                          {asset.status === "فعال" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg>
                          )}
                          {asset.status === "درحال تعمیر" && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" width="16" height="16" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                            </svg>
                          )}
                          {asset.status === "از رده خارج" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          )}
                          {asset.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium">{asset.department}</td>
                      <td className="px-6 py-4 text-sm font-medium">{asset.purchaseDate}</td>
                      <td className="px-6 py-4 text-sm font-medium">{asset.owner}</td>

                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button
                          className="hover:bg-gray-100 bg-blue-50 rounded-full p-1.5"
                          onClick={() => openEditModal(asset)}
                        >
                          <PencilIcon className="w-5 h-5 text-blue-500" />
                        </button>
                        <button
                          className="bg-red-50 rounded-full p-1.5 hover:bg-gray-100"
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
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span>صفحه {currentPage} از {totalPages}</span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-2 py-1 border-[#FF6F61] border-2  rounded-lg bg-gray-100 text-sm font-medium disabled:opacity-50  text-[#FF6F61]"
          >
            قبلی
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-2 py-1 border-[#FF6F61] border-2  rounded-lg bg-gray-100 text-sm font-medium disabled:opacity-50  text-[#FF6F61]"
          >
            بعدی
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-lg">

            <button
              className="absolute top-7 left-4 text-gray-500 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <h2 className="text-lg font-bold mb-4 text-[#FF4B4B]">
              {editingAsset ? "ویرایش" : "افزودن"}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="شماره مال"
                value={form.id}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
                required
              />
              <input
                type="text"
                placeholder="نام مال"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
                required
              />
              <input
                type="text"
                placeholder="نوع مال"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
                required
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
              >
                <option value="فعال">فعال</option>
                <option value="درحال تعمیر">درحال تعمیر</option>
                <option value="از رده خارج">از رده خارج</option>
              </select>
              <input
                type="text"
                placeholder="بخش"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
              />

              {/* تاریخ شمسی */}
              <DatePicker
                value={form.purchaseDate}
                onChange={(date) =>
                  setForm({ ...form, purchaseDate: date?.format("YYYY/MM/DD") })
                }
                calendar={persian}
                locale={persian_fa}
                inputClass="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
                format="YYYY/MM/DD"
              />

              <input
                type="text"
                placeholder="کاربر مسئول"
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full rounded-2xl px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF914D] transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-2xl font-semibold text-white bg-gradient-to-r from-[#FF4B4B] via-[#FF6F61] to-[#FF914D] hover:from-[#FF6F61] hover:to-[#FF4B4B] transition-all duration-300"
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
