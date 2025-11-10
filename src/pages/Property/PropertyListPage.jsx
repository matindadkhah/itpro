import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePropertyRegister } from "../../Hooks/usePropertyRegister";
import CustomTable from "../../components/CustomTable/CustomTable";
import {
  UserIcon,
  IdentificationIcon,
  MapPinIcon,
  DocumentTextIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  TagIcon,
  ChevronDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const PropertyListPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const {
    createAsset,
    updateAsset,
    loading,
    getAssets,
    assetList,
    deleteAsset,
  } = usePropertyRegister();

  const [editingRow, setEditingRow] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({
    status: false,
    department: false,
    typeId: false,
  });

  const [selected, setSelected] = useState({
    status: "",
    department: "",
    typeId: "",
  });

  // 🔹 دریافت داده‌ها از سرور
  useEffect(() => {
    const fetchAssets = async () => {
      await getAssets();
    };
    fetchAssets();
  }, []);

  const columns = [
    { key: "code", label: "کد اموال" },
    { key: "department", label: "بخش" },
    { key: "name", label: "نام دستگاه" },
    { key: "owner", label: "مالک" },
    { key: "status", label: "وضعیت" },
    { key: "description", label: "توضیحات" },
    { key: "typeRef.name", label: "نوع دستگاه" },
  ];

  // 🔹 انتخاب از لیست‌ها
  const toggleDropdown = (key) => {
    setDropdownOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelect = (key, value) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
    setDropdownOpen((prev) => ({ ...prev, [key]: false }));
  };

  // 🔹 ذخیره یا بروزرسانی
  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      code: Number(data.code),
      typeId:
        selected.typeId === "PC"
          ? 1
          : selected.typeId === "PRINTER"
          ? 2
          : selected.typeId === "LAPTOP"
          ? 3
          : selected.typeId === "MONITOR"
          ? 4
          : 0,
      status: selected.status,
      department: selected.department,
    };

    if (editingRow) {
      await updateAsset(editingRow.id, formattedData);
      setEditingRow(null);
    } else {
      await createAsset(formattedData);
    }

    reset();
    setSelected({ status: "", department: "", typeId: "" });
  };

  // 🔹 حذف
  const handleDelete = async (row) => {
    await deleteAsset(row.id);
  };

  // 🔹 وقتی روی Edit کلیک میشه
  const handleEdit = (row) => {
    setEditingRow(row);

    // پر کردن فیلدهای فرم
    setValue("name", row.name || "");
    setValue("code", row.code || "");
    setValue("owner", row.owner || "");
    setValue("address", row.address || "");
    setValue("description", row.description || "");
    setValue("description", row.description || "");
    setValue("description", row.description || "");

    // انتخاب دراپ‌دان‌ها
    setSelected({
      status: row.status || "",
      department: row.department || "",
      typeId:
        row.typeRef?.name?.toUpperCase() ||
        (row.typeId === 1
          ? "PC"
          : row.typeId === 2
          ? "PRINTER"
          : row.typeId === 3
          ? "LAPTOP"
          : row.typeId === 4
          ? "MONITOR"
          : ""),
    });
  };

  const dropdowns = {
    status: ["ACTIVE", "REPAIRING", "DECOMMISSIONED"],
    department: ["IT", "PREVENTION", "STATION", "FINANCIAL", "MANAGER"],
    typeId: ["PC", "PRINTER", "LAPTOP", "MONITOR"],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center  ">
      <div className="bg-white shadow-md rounded-xl p-8  w-4/5">
        <h2 className="flex items-center gap-2 font-bold text-gray-800 mb-5 text-xl">
          <PlusIcon className="w-5 h-5 text-red-500" />
          {editingRow ? "ویرایش اموال" : "ثبت اموال سازمان"}
        </h2>

        {/* 🔸 فرم اصلی */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-5 bg-orange-50 p-6 rounded-xl border border-gray-200 shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
            {/* نام */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                نام
              </label>
              <div className="relative mt-1">
                <UserIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("name", {
                    required: { value: true, message: "نام الزامی است" },
                  })}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700 
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="مثلاً چاپگر"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

            {/* کد */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                کد
              </label>
              <div className="relative mt-1">
                <IdentificationIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  {...register("code", {
                    required: { value: true, message: "کد الزامی است" },
                  })}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="کد اموال"
                />
              </div>
            </div>

            {/* مالک */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                مالک
              </label>
              <div className="relative mt-1">
                <BuildingOfficeIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("owner", {
                    required: { value: true, message: "مالک الزامی است" },
                  })}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="نام مالک"
                />
              </div>
            </div>

            {/* دراپ‌دان‌ها (status, typeId, department) */}
            {["status", "typeId", "department"].map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  {key === "status"
                    ? "وضعیت"
                    : key === "typeId"
                    ? "نوع کالا"
                    : "دپارتمان"}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleDropdown(key)}
                    className="w-full flex justify-between items-center rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700  
                      hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all"
                  >
                    {selected[key] || `انتخاب ${key}`}
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                        dropdownOpen[key] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {dropdownOpen[key] && (
                    <div className="absolute mt-2 w-full rounded-lg bg-white border border-gray-200 shadow-lg z-10 overflow-hidden">
                      {dropdowns[key].map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelect(key, opt)}
                          className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* آدرس */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                محل نگهداری
              </label>
              <div className="relative mt-1">
                <MapPinIcon className="absolute left-2 top-2 h-5 w-5 text-gray-400" />
                <input
                  {...register("address")}
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700  
                    hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all pl-8 focus:outline-none"
                  placeholder="مثلاً انفورماتیک"
                />
              </div>
            </div>

            {/* توضیحات */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                توضیحات
              </label>
              <textarea
                {...register("description")}
                className="w-full rounded-lg border border-gray-300 bg-white py-2 px-3 text-sm text-gray-700  
                  hover:border-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-300 transition-all pl-8 focus:outline-none"
                rows="3"
                placeholder="توضیحات اختیاری..."
              ></textarea>
            </div>
          </div>

          {/* دکمه ثبت / ویرایش */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-red-400 text-white px-6 py-2 rounded-xl hover:bg-red-500 transition font-semibold"
            >
              {loading
                ? "در حال پردازش..."
                : editingRow
                ? "ذخیره تغییرات"
                : "ثبت اموال"}
            </button>

            {editingRow && (
              <button
                type="button"
                onClick={() => {
                  setEditingRow(null);
                  reset();
                  setSelected({ status: "", department: "", typeId: "" });
                }}
                className="px-6 py-2 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 transition"
              >
                انصراف
              </button>
            )}
          </div>
        </form>

        {/* 🔸 جدول */}
        <CustomTable
          columns={columns}
          data={assetList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default PropertyListPage;
