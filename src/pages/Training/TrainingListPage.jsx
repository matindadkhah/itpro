import React, { useState, useEffect } from "react";
import { XCircleIcon, EyeIcon, TrashIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import 'preline/preline';

const initialCategories = [
  {
    id: 1,
    name: "برنامه‌نویسی",
    files: [
      { id: 101, name: "آموزش React", type: "PDF", date: "1403/07/01", size: "2MB" },
      { id: 102, name: "دوره JavaScript", type: "Word", date: "1403/07/03", size: "1.5MB" },
    ],
  },
  {
    id: 2,
    name: "شبکه",
    files: [
      { id: 201, name: "آموزش شبکه TCP/IP", type: "PDF", date: "1403/07/02", size: "3MB" },
      { id: 202, name: "دوره پیکربندی روتر", type: "Video", date: "1403/07/04", size: "400MB" },
    ],
  },
  {
    id: 3,
    name: "سیستم‌عامل",
    files: [
      { id: 301, name: "ویندوز سرور 2022", type: "PDF", date: "1403/07/05", size: "5MB" },
      { id: 302, name: "لینوکس پایه", type: "Video", date: "1403/07/06", size: "700MB" },
    ],
  },
];

const TrainingListPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [openCategory, setOpenCategory] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const toggleCategory = (id) => setOpenCategory(openCategory === id ? null : id);

  const handleDownload = (file) => setToastMessage(`فایل "${file.name}" دانلود شد`);

  const handleDelete = (categoryId, fileId) => {
    setCategories(prevCategories =>
      prevCategories.map(cat => {
        if (cat.id === categoryId) {
          return { ...cat, files: cat.files.filter(f => f.id !== fileId) };
        }
        return cat;
      })
    );
    setToastMessage("فایل حذف شد");
  };

  const handlePreview = (file) => setShowModal(file);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">فایل‌های آموزشی دسته‌بندی‌شده</h2>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
          {toastMessage}
        </div>
      )}

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="border rounded-lg shadow hover:shadow-xl transition-transform transform hover:scale-[1.02] overflow-hidden">
            <button
              className="w-full text-right p-4 bg-gradient-to-r from-gray-100 to-gray-200 font-semibold flex justify-between items-center hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 transition"
              onClick={() => toggleCategory(category.id)}
            >
              <span>{category.name}</span>
              <span className="text-gray-600">{openCategory === category.id ? "▲" : "▼"}</span>
            </button>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${openCategory === category.id ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="p-4 space-y-3">
                {category.files.map(file => (
                  <div key={file.id} className="border rounded-lg p-3 flex flex-col gap-2 hover:shadow-md transition-transform transform hover:scale-[1.01]">
                    <div className="flex items-center gap-2">
                      {file.type === "PDF" && <span className="text-red-500 font-bold">📄</span>}
                      {file.type === "Word" && <span className="text-blue-500 font-bold">📝</span>}
                      {file.type === "Video" && <span className="text-purple-500 font-bold">🎬</span>}
                      <h3 className="font-semibold text-gray-700">{file.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500">نوع: {file.type}</p>
                    <p className="text-sm text-gray-500">تاریخ: {file.date}</p>
                    <p className="text-sm text-gray-500">سایز: {file.size}</p>

                    <div className="flex gap-2 mt-2">
                      <button
                        className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={() => handlePreview(file)}
                      >
                        <EyeIcon className="w-4 h-4" /> مشاهده
                      </button>
                      <button
                        className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                        onClick={() => handleDownload(file)}
                      >
                        <ArrowDownTrayIcon className="w-4 h-4" /> دانلود
                      </button>
                      <button
                        className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        onClick={() => handleDelete(category.id, file.id)}
                      >
                        <TrashIcon className="w-4 h-4" /> حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal پیش‌نمایش */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 px-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative transition-transform transform animate-slide-in">
            <button
              className="absolute top-2 end-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(null)}
            >
              <XCircleIcon className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-bold mb-2">{showModal.name}</h3>
            <p>نوع فایل: {showModal.type}</p>
            <p>تاریخ آپلود: {showModal.date}</p>
            <p>سایز: {showModal.size}</p>
            <p className="mt-2 text-gray-600">نمایش آنلاین فایل (شبیه‌سازی)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingListPage;
