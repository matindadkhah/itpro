import React, { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

// 🔹 تبدیل عدد انگلیسی به فارسی
const toPersianNumber = (num) =>
  num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const dropdowns = {
  status: {
    ACTIVE: "فعال",
    REPAIRING: "درحال تعمیر",
    DECOMMISSIONED: "از رده خارج",
  },
  department: {
    IT: "انفورماتیک",
    PREVENTION: "پیشگیری",
    STATION: "ایستگاه",
    FINANCIAL: "مالی",
    MANAGER: "مدیریت",
  },
  typeId: {
    PC: "کامپیوتر",
    PRINTER: "پرینتر",
    LAPTOP: "لپ‌تاپ",
    MONITOR: "مانیتور",
  },
};

const CustomTable = ({
  columns = [],
  data = [],
  onEdit,
  onDelete,
  itemsPerPage = 5,
  showPagination = true,
}) => {
  const [tableData, setTableData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTableData(data);
    setCurrentPage(1);
  }, [data]);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = tableData.slice(startIndex, endIndex);

  const handleDelete = (row) => {
    if (onDelete) onDelete(row);
    setTableData((prev) => prev.filter((r) => r.id !== row.id));
  };

  const handleEdit = (row) => {
    if (onEdit) onEdit(row);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm text-left text-gray-700">
        {/* Header */}
        <thead className="text-sm uppercase bg-gray-100 text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className="px-6 py-3 text-right">
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
                className="bg-white border-b hover:bg-red-50 transition"
              >
                {columns.map((col) => {
                  const value = col.key
                    .split(".")
                    .reduce((obj, k) => obj?.[k], row);

                  // 🔹 تبدیل انگلیسی به فارسی با dropdowns
                  let displayValue = value;
                  if (col.key === "status")
                    displayValue = dropdowns.status[value] || value;
                  else if (col.key === "department")
                    displayValue = dropdowns.department[value] || value;
                  else if (col.key === "typeRef.name")
                    displayValue = dropdowns.typeId[value] || value;

                  return (
                    <td
                      key={col.key}
                      className="px-6 py-4 whitespace-nowrap text-right"
                    >
                      {displayValue}
                    </td>
                  );
                })}

                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-3 rtl:space-x-reverse">
                      {onEdit && (
                        <button
                          onClick={() => handleEdit(row)}
                          className="p-2 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 transition"
                          title="ویرایش"
                        >
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => handleDelete(row)}
                          className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t bg-gray-50">
          {/* متن تعداد */}
          <span className="text-sm text-gray-600">
            نمایش {toPersianNumber(startIndex + 1)} تا{" "}
            {toPersianNumber(Math.min(endIndex, tableData.length))} از{" "}
            {toPersianNumber(tableData.length)} مورد
          </span>

          {/* کنترل صفحات */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition ${
                  currentPage === i + 1
                    ? "bg-[#FF4B4B] text-white shadow"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-red-50"
                }`}
              >
                {toPersianNumber(i + 1)}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTable;
