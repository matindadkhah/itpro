import React, { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

/**
 * CustomTable Component (با Pagination داخلی)
 *
 * @param {Array} columns - [{ key: 'name', label: 'نام' }]
 * @param {Array} data - [{ id: 1, name: '...', type: '...' }]
 * @param {Function} onEdit - تابع ویرایش
 * @param {Function} onDelete - تابع حذف
 * @param {Number} itemsPerPage - تعداد ردیف در هر صفحه
 * @param {Boolean} showPagination - نمایش کنترل صفحه‌بندی
 */

const CustomTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  itemsPerPage = 5,
  showPagination = true,
}) => {
  // ✅ نگهداری داده‌های محلی برای رندر سریع
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ وقتی داده‌های بیرونی تغییر کنن، جدول هم آپدیت میشه
  useEffect(() => {
    setTableData(data);
    setCurrentPage(1);
  }, [data]);

  // محاسبه داده‌های صفحه فعلی
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  // 🗑 تابع حذف محلی
  const handleDelete = (row) => {
    if (onDelete) onDelete(row);
    setTableData((prev) => prev.filter((r) => r.id !== row.id)); // حذف فوری از جدول
  };

  // ✏️ تابع ویرایش
  const handleEdit = (row) => {
    if (onEdit) onEdit(row);
  };

  // کنترل صفحه‌بندی
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-700">
        {/* Header */}
        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-3">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th scope="col" className="px-6 py-3 text-center">
                عملیات
              </th>
            )}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {currentData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                className="px-6 py-4 text-center text-gray-500"
              >
                هیچ داده‌ای یافت نشد
              </td>
            </tr>
          ) : (
            currentData.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                className="bg-white border-b hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                    {row[col.key]}
                  </td>
                ))}

                {/* Action Buttons */}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                      {onEdit && (
                        <button
                          onClick={() => handleEdit(row)}
                          className="text-blue-600 hover:text-blue-800 transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => handleDelete(row)}
                          className="text-red-600 hover:text-red-800 transition"
                          title="حذف"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-3 border-t bg-gray-50">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded-lg border text-sm ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
