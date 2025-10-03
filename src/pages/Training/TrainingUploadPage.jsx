import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
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

const TrainingUploadPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // فرم اضافه کردن فایل جدید
  const [newFile, setNewFile] = useState({ name: "", type: "PDF", categoryId: "" });

  const handleAddFile = () => {
    if (!newFile.name || !newFile.categoryId) return;
    const updatedCategories = categories.map(cat => {
      if (cat.id === parseInt(newFile.categoryId)) {
        return {
          ...cat,
          files: [
            ...cat.files,
            {
              id: Date.now(),
              name: newFile.name,
              type: newFile.type,
              date: new Date().toLocaleDateString("fa-IR"),
              size: "1MB", // به صورت پیش‌فرض
            },
          ],
        };
      }
      return cat;
    });
    setCategories(updatedCategories);
    setNewFile({ name: "", type: "PDF", categoryId: "" });
  };

  // فیلتر فایل‌ها
  const filteredFiles = categories
    .filter(cat => !categoryFilter || cat.id === parseInt(categoryFilter))
    .flatMap(cat =>
      cat.files.filter(file => !typeFilter || file.type === typeFilter)
        .map(file => ({ ...file, category: cat.name }))
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">مدیریت فایل‌های آموزشی</h2>

      {/* فرم اضافه کردن فایل جدید */}
      <div className="border rounded-lg p-4 mb-6 bg-gray-50 shadow-sm space-y-3">
        <h3 className="font-semibold text-gray-700">افزودن فایل جدید</h3>
        <input
          type="text"
          placeholder="نام فایل"
          className="border rounded p-2 w-full"
          value={newFile.name}
          onChange={e => setNewFile({ ...newFile, name: e.target.value })}
        />
        <select
          className="border rounded p-2 w-full"
          value={newFile.type}
          onChange={e => setNewFile({ ...newFile, type: e.target.value })}
        >
          <option value="PDF">PDF</option>
          <option value="Word">Word</option>
          <option value="Video">Video</option>
        </select>
        <select
          className="border rounded p-2 w-full"
          value={newFile.categoryId}
          onChange={e => setNewFile({ ...newFile, categoryId: e.target.value })}
        >
          <option value="">انتخاب دسته‌بندی</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          onClick={handleAddFile}
        >
          اضافه کردن فایل
        </button>
      </div>

      {/* فیلترها */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="border rounded p-2"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">همه دسته‌بندی‌ها</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select
          className="border rounded p-2"
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          <option value="">همه نوع‌ها</option>
          <option value="PDF">PDF</option>
          <option value="Word">Word</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* نمایش فایل‌ها */}
      <div className="space-y-3">
        {filteredFiles.length === 0 && (
          <p className="text-gray-500">هیچ فایلی با فیلتر انتخاب شده پیدا نشد</p>
        )}
        {filteredFiles.map(file => (
          <div
            key={file.id}
            className="border rounded-lg p-3 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
          >
            <div>
              <h3 className="font-semibold">{file.name}</h3>
              <p className="text-sm text-gray-500">دسته: {file.category} | نوع: {file.type} | سایز: {file.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingUploadPage;

