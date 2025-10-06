// AssetList.jsx
import React, { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const mockAssets = [
  { id: "A001", name: "کامپیوتر اداری", type: "کامپیوتر", status: "فعال", department: "اداره انفورماتیک", purchaseDate: "2025-01-10", owner: "علی رضایی" },
  { id: "A002", name: "پرینتر لیزری", type: "پرینتر", status: "درحال تعمیر", department: "اداره انفورماتیک", purchaseDate: "2024-10-05", owner: "مریم احمدی" },
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
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">شماره</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">نام</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">نوع</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">وضعیت</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">بخش</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">تاریخ خرید</th>
                    <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">کاربر مسئول</th>
                    <th scope="col" className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase">عملیات</th>



                  </tr>
                </thead>
                <tbody>
                  {paginatedAssets.map((asset) => (
                    <tr key={asset.id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">


                        <span class={`py-1 px-1.5  inline-flex items-center gap-x-1 text-xs font-medium ${asset.status === "فعال" ? "bg-teal-50 text-teal-600 rounded-full" :
                          asset.status === "درحال تعمیر" ? "bg-orange-50 text-orange-600 rounded-full" :
                            "bg-red-50 text-red-600 rounded-full"

                          } `}>
                          {
                            asset.status === "فعال" ? <svg class="size-4  rounded-full" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                            </svg> :
                              asset.status === "درحال تعمیر" ?
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22" width="16" height="16" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 22 22" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>



                          }

                          {asset.status}
                        </span>


                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.purchaseDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{asset.owner}</td>
                      <td className="px-6 py-4 flex justify-center  gap-2">
                        <button
                          className=" hover:bg-gray-100 bg-blue-50 rounded-full p-1.5"
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
                <option value="از رده خارج">از رده خارج</option>
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



//  <span
//                         className={`px-2 py-1 rounded text-white text-xs ${asset.status === "فعال"
//                           ? "bg-green-500"
//                           : asset.status === "در تعمیر"
//                             ? "bg-yellow-500"
//                             : "bg-red-500"
//                           }`}
//                       >
//                         {asset.status}
//                       </span>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
